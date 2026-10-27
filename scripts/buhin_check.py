#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""部品チェック(buhin-check)

外から取り込む部品が「すり替えられていないか」「新しすぎないか」「悪い報告がないか」を確かめる。
公式の部品でも、作者のアカウントが乗っ取られて悪い版が出ることがある(2026年 axios・keyv など)。
だから 1か所だけを信じず、3か所で突き合わせる:
  1. npm の公式の置き場 … 中身の指紋(integrity)が lock と同じか / 消された版ではないか / 非推奨の理由
  2. Google の deps.dev …… 別の場所で取った指紋から「この中身は 名前@版 か」を引き直す / 公開日
  3. OSV(危ない部品の報告の集まり) … 乗っ取り・悪い仕掛けの報告(MAL-)と、弱点の報告(GHSA など)

使い方:
  python3 check.py [フォルダ] [--base origin/main]
      npm のプロジェクトを調べる(package-lock.json が要る)。--base と比べて変わった部品も出す
  python3 check.py file <手で置いたファイル> <npm名@版> <部品の中のパス>
      lib/ などに手で置いた部品(例: jsQR.js)が、公式の部品の中身と同じか
  python3 check.py sha256 <落としたファイル> <公式の SHASUMS の URL か 64桁> [<もう1か所> ...]
      落とした道具(例: Node.js)の指紋が、公式の一覧と同じか(2か所以上を渡すと全部と比べる)
オプション: --days N(公開から何日たっていればよいか。既定 7) --json
終わりの数字: 0 = 全部 ○ / 1 = × がある(先に進まない) / 2 = 使い方の間違い
標準ライブラリだけで動く(このチェック自体が、ほかの部品に頼らないように)。
道具の元は ~/.claude/skills/buhin-check/check.py。各リポジトリには scripts/buhin_check.py として写す。
"""
import argparse
import base64
import concurrent.futures as cf
import datetime as dt
import hashlib
import io
import json
import os
import re
import subprocess
import sys
import tarfile
import time
import urllib.error
import urllib.parse
import urllib.request

UA = "buhin-check/1"
REG = "https://registry.npmjs.org/"
DEPS = "https://api.deps.dev/v3/"
OSV = "https://api.osv.dev/v1/"
NOW = dt.datetime.now(dt.timezone.utc)
BAD_WORDS = re.compile(r"malicious|malware|compromis|hijack|security holding|backdoor|stolen", re.I)


# ---------------------------------------------------------------- つなぐ
def http(url, data=None, tries=4):
    last = None
    for i in range(tries):
        try:
            headers = {"User-Agent": UA, "Accept": "application/json"}
            body = None
            if data is not None:
                body = json.dumps(data).encode()
                headers["Content-Type"] = "application/json"
            with urllib.request.urlopen(urllib.request.Request(url, data=body, headers=headers), timeout=90) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            if e.code in (404, 410):
                return e.code, b""
            last = e
        except Exception as e:  # つながらない・時間切れ
            last = e
        time.sleep(1.5 * (i + 1))
    raise RuntimeError(f"つながりませんでした: {url} ({last})")


def jget(url, data=None):
    st, body = http(url, data)
    return st, (json.loads(body) if body else None)


def q(name):
    return urllib.parse.quote(name, safe="@")  # @scope/name → @scope%2Fname


def days_since(iso):
    try:
        t = dt.datetime.fromisoformat(iso.replace("Z", "+00:00"))
        return (NOW - t).total_seconds() / 86400
    except Exception:
        return None


# ---------------------------------------------------------------- 3か所に聞く
def ask_registry(name, ver):
    st, doc = jget(f"{REG}{q(name)}/{urllib.parse.quote(ver)}")
    if st in (404, 410) or not doc:
        return {"missing": True}
    dep = doc.get("deprecated") or ""
    return {"missing": False, "integrity": (doc.get("dist") or {}).get("integrity"),
            "tarball": (doc.get("dist") or {}).get("tarball"), "deprecated": dep}


def ask_depsdev(name, ver, integrity):
    """指紋(SHA512)から引き直し、同じ名前と版が出てくるか。"""
    if not integrity or not integrity.startswith("sha512-"):
        return {"match": False, "why": "指紋が sha512 ではない"}
    h = integrity.split("-", 1)[1]
    st, doc = jget(DEPS + "query?" + urllib.parse.urlencode({"hash.type": "SHA512", "hash.value": h}))
    for r in (doc or {}).get("results", []):
        v = r.get("version") or {}
        k = v.get("versionKey") or {}
        if k.get("system") == "NPM" and k.get("name") == name and k.get("version") == ver:
            att = any(l.get("label") == "ATTESTATION" for l in v.get("links") or [])
            return {"match": True, "how": "deps.dev", "published": v.get("publishedAt"), "attested": att}
    # deps.dev の「指紋で引く」記録には抜けがある(2026-10 に next@16.3.8・16.4.2 で確認)。
    # そのときは ① deps.dev の版の記録で公開日を取り ② npm の「作った場所の証明」の指紋と比べて確かめ直す
    st2, v = jget(f"{DEPS}systems/npm/packages/{q(name)}/versions/{urllib.parse.quote(ver)}")
    prov = ask_provenance(name, ver, integrity)
    if prov:
        return {"match": True, "how": "provenance", "published": (v or {}).get("publishedAt"), "attested": True,
                "repo": prov}
    return {"match": False, "why": "指紋の記録が見つからず、作った場所の証明もない"}


def ask_provenance(name, ver, integrity):
    """npm の「作った場所の証明」(provenance)に書かれた指紋が、この中身と同じなら、作った場所を返す。"""
    st, doc = jget(f"{REG}-/npm/v1/attestations/{q(name)}@{urllib.parse.quote(ver)}")
    for att in (doc or {}).get("attestations", []):
        if "slsa" not in (att.get("predicateType") or ""):
            continue
        try:
            env = att["bundle"]["dsseEnvelope"]
            stmt = json.loads(base64.b64decode(env["payload"]))
            for subj in stmt.get("subject", []):
                d = (subj.get("digest") or {}).get("sha512")
                if d and "sha512-" + base64.b64encode(bytes.fromhex(d)).decode() == integrity:
                    wf = stmt["predicate"]["buildDefinition"]["externalParameters"]["workflow"]
                    return f"{wf.get('repository')} の {wf.get('ref')}"
        except Exception:
            continue
    return None


def ask_osv(pairs):
    """[(name, ver)] → {(name, ver): [id, ...]}。報告の中身(重さ)は別に引く。"""
    out = {}
    for i in range(0, len(pairs), 500):
        chunk = pairs[i:i + 500]
        st, doc = jget(OSV + "querybatch", {"queries": [
            {"package": {"ecosystem": "npm", "name": n}, "version": v} for n, v in chunk]})
        for (n, v), res in zip(chunk, (doc or {}).get("results", [])):
            ids = [x["id"] for x in res.get("vulns", [])]
            if res.get("next_page_token"):
                ids.append("(続きあり)")
            out[(n, v)] = ids
    return out


def osv_detail(vid):
    st, doc = jget(OSV + "vulns/" + urllib.parse.quote(vid))
    doc = doc or {}
    sev = ((doc.get("database_specific") or {}).get("severity") or "").upper()
    return {"id": vid, "severity": sev or "不明", "summary": (doc.get("summary") or "")[:90],
            "withdrawn": bool(doc.get("withdrawn"))}


# ---------------------------------------------------------------- npm のプロジェクト
def lock_packages(lock):
    out = []
    for key, e in (lock.get("packages") or {}).items():
        if not key or e.get("link"):
            continue
        name = e.get("name") or key.rsplit("node_modules/", 1)[-1]
        out.append({"key": key, "name": name, "version": e.get("version"), "resolved": e.get("resolved"),
                    "integrity": e.get("integrity"), "dev": bool(e.get("dev")), "script": bool(e.get("hasInstallScript")),
                    "bundled": bool(e.get("inBundle"))})
    return out


def read_npmrc(folder):
    conf = {}
    try:
        for line in open(os.path.join(folder, ".npmrc"), encoding="utf-8"):
            line = line.split("#", 1)[0].strip()
            if "=" in line:
                k, v = line.split("=", 1)
                conf[k.strip()] = v.strip()
    except FileNotFoundError:
        pass
    return conf


def base_lock(folder, base):
    if not base:
        return None
    try:
        raw = subprocess.run(["git", "-C", folder, "show", f"{base}:package-lock.json"],
                             capture_output=True, text=True, timeout=30)
        return json.loads(raw.stdout) if raw.returncode == 0 else None
    except Exception:
        return None


def check_npm(folder, days, base, as_json):
    lock_path = os.path.join(folder, "package-lock.json")
    if not os.path.exists(lock_path):
        print("package-lock.json がありません(npm の部品を使っていないフォルダです)")
        return 0
    conf_path = os.path.join(folder, ".buhin-check.json")
    conf = json.load(open(conf_path, encoding="utf-8")) if os.path.exists(conf_path) else {}
    allow_scripts = set(conf.get("allow_install_scripts", []))
    days = conf.get("min_days", days)
    pk = lock_packages(json.load(open(lock_path, encoding="utf-8")))
    problems, warns, info = [], [], []

    # 1) lock の中だけで分かること
    bad_place = []
    for p in pk:
        if p["bundled"]:
            continue
        r, i = p["resolved"] or "", p["integrity"] or ""
        tail = f"-{p['version']}.tgz"
        if not r.startswith(REG) or "/-/" not in r or not r.endswith(tail):
            bad_place.append(f"{p['name']}@{p['version']} の取り寄せ先がおかしい: {r[:80]}")
        if not i.startswith("sha512-"):
            bad_place.append(f"{p['name']}@{p['version']} に sha512 の指紋がない")
    problems += bad_place
    scripts = sorted({p["name"] for p in pk if p["script"]})
    not_allowed = [s for s in scripts if s not in allow_scripts]
    for s in not_allowed:
        problems.append(f"{s} は入れるときに命令を動かす部品なのに、許可の一覧(.buhin-check.json)にない")

    # 2) 3か所に聞く(同じ名前と版は1回だけ)
    uniq = {}
    for p in pk:
        if not p["bundled"] and p["version"]:
            uniq.setdefault((p["name"], p["version"]), p)
    keys = sorted(uniq)
    reg, dd = {}, {}
    with cf.ThreadPoolExecutor(max_workers=12) as ex:
        fr = {ex.submit(ask_registry, n, v): (n, v) for n, v in keys}
        fd = {ex.submit(ask_depsdev, n, v, uniq[(n, v)]["integrity"]): (n, v) for n, v in keys}
        for f in cf.as_completed(fr):
            reg[fr[f]] = f.result()
        for f in cf.as_completed(fd):
            dd[fd[f]] = f.result()
    osv = ask_osv(keys)

    young, attested = [], 0
    for k in keys:
        n, v = k
        p, r, d = uniq[k], reg[k], dd[k]
        if r["missing"]:
            problems.append(f"{n}@{v} が npm の公式の置き場にない(消された版。悪い版はよく消される)")
        elif r["integrity"] != p["integrity"]:
            problems.append(f"{n}@{v} の中身の指紋が、npm の公式の記録と違う(すり替えの疑い)")
        if r.get("deprecated"):
            msg = f"{n}@{v} は非推奨: {r['deprecated'][:90]}"
            (problems if BAD_WORDS.search(r["deprecated"]) else warns).append(msg)
        if not d["match"]:
            problems.append(f"{n}@{v}: deps.dev で{d['why']}(すり替えの疑い、または まだ記録されていない)")
        else:
            attested += 1 if d.get("attested") else 0
            age = days_since(d.get("published") or "")
            if age is not None and age < days:
                young.append(f"{n}@{v}(公開から {age:.1f} 日)")
    for y in young:
        problems.append(f"{y}: 公開から {days} 日たっていない")

    ids = sorted({i for v in osv.values() for i in v if i != "(続きあり)"})
    detail = {}
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for res in ex.map(osv_detail, [i for i in ids if not i.startswith("MAL-")]):
            detail[res["id"]] = res
    mal, vul_hi, vul_lo = [], [], []
    for (n, v), vs in osv.items():
        dev = uniq[(n, v)]["dev"]
        for vid in vs:
            if vid.startswith("MAL-"):
                mal.append(f"{n}@{v}: {vid}(乗っ取り・悪い仕掛けの報告)")
            elif vid == "(続きあり)":
                warns.append(f"{n}@{v}: 報告が多くて全部は読めなかった")
            else:
                dt_ = detail.get(vid, {"severity": "不明", "summary": "", "withdrawn": False})
                if dt_["withdrawn"]:
                    continue
                line = f"{n}@{v}{'(組み立て用)' if dev else ''}: {vid} 重さ={dt_['severity']} {dt_['summary']}"
                (vul_hi if dt_["severity"] in ("CRITICAL", "HIGH") else vul_lo).append(line)
    problems += mal + vul_hi
    warns += vul_lo

    rc = read_npmrc(folder)
    try:
        ok_age = int(rc.get("min-release-age", "0")) >= days
    except ValueError:
        ok_age = False
    ok_scripts = rc.get("ignore-scripts", "").lower() == "true"
    if not ok_age:
        warns.append(f".npmrc に min-release-age={days} がない(新しすぎる版を入れてしまう)")
    if not ok_scripts:
        warns.append(".npmrc に ignore-scripts=true がない(入れるときに部品の命令が動く)")

    changes = []
    bl = base_lock(folder, base)
    if bl is not None:
        old = {(p["key"]): p["version"] for p in lock_packages(bl)}
        new = {(p["key"]): p["version"] for p in pk}
        for k in sorted(set(old) | set(new)):
            if old.get(k) != new.get(k):
                nm = k.rsplit("node_modules/", 1)[-1]
                changes.append(f"{nm}: {old.get(k) or '(なし)'} → {new.get(k) or '(なし)'}")

    result = {"folder": os.path.abspath(folder), "packages": len(pk), "unique": len(keys),
              "problems": problems, "warnings": warns, "changes": changes, "attested": attested}
    if as_json:
        print(json.dumps(result, ensure_ascii=False, indent=1))
    else:
        name = os.path.basename(os.path.abspath(folder))
        mark = lambda bad: "×" if bad else "○"
        print(f"部品チェック: {name}(部品 {len(keys)} 種類・公開から {days} 日ルール)")
        print(f"{mark(bad_place)} 取り寄せ先と指紋の形: 全部 npm の公式から・sha512 の指紋つき" if not bad_place else f"× 取り寄せ先と指紋の形: {len(bad_place)} 件おかしい")
        n_reg = sum(1 for k in keys if not reg[k]['missing'] and reg[k]['integrity'] == uniq[k]['integrity'])
        print(f"{mark(n_reg != len(keys))} 中身の指紋(npm の公式): {n_reg} / {len(keys)} 一致")
        n_dd = sum(1 for k in keys if dd[k]['match'])
        n_pv = [f"{k[0]}@{k[1]}" for k in keys if dd[k].get('how') == 'provenance']
        print(f"{mark(n_dd != len(keys))} 中身の指紋(npm 以外の場所で確かめ直し): {n_dd} / {len(keys)} 一致"
              + (f"(うち {len(n_pv)} 件は deps.dev に記録がなく、作った場所の証明で確認: {', '.join(n_pv[:5])})" if n_pv else ""))
        print(f"{mark(young)} 公開から {days} 日以上: " + ("全部" if not young else f"{len(young)} 件たっていない"))
        print(f"{mark(mal)} 乗っ取り・悪い仕掛けの報告(OSV の MAL): " + ("なし" if not mal else f"{len(mal)} 件"))
        print(f"{mark(vul_hi)} 重い弱点の報告(高・とても高い): " + ("なし" if not vul_hi else f"{len(vul_hi)} 件") + (f" / 軽いもの {len(vul_lo)} 件" if vul_lo else ""))
        print(f"{mark(not_allowed)} 入れるとき命令を動かす部品: " + (f"許可した {len(scripts)} 個だけ({', '.join(scripts)})" if not not_allowed else f"許可していないもの {len(not_allowed)} 個"))
        print(f"{'○' if ok_age and ok_scripts else '△'} 入れ方の決まり(.npmrc): " + ("7日待つ・命令を止める、の両方あり" if ok_age and ok_scripts else "足りない"))
        print(f"   (作った場所の証明つきの部品: {attested} / {len(keys)})")
        if changes:
            print(f"\n{base} と比べて変わった部品: {len(changes)} 個")
            for c in changes[:60]:
                print("   ", c)
            if len(changes) > 60:
                print(f"    …ほか {len(changes) - 60} 個")
        if problems:
            print("\n× 直すこと:")
            for x in problems:
                print("   -", x)
        if warns:
            print("\n△ 気にしておくこと:")
            for x in warns:
                print("   -", x)
        print("\n結果: " + ("全部 ○" if not problems else f"× が {len(problems)} 件。先に進まないでください"))
    return 1 if problems else 0


# ---------------------------------------------------------------- 手で置いた部品
def split_spec(spec):
    at = spec.rfind("@")
    if at <= 0:
        raise SystemExit("npm名@版 の形で書いてください(例: jsqr@1.4.0)")
    return spec[:at], spec[at + 1:]


def check_file(path, spec, inner, days):
    name, ver = split_spec(spec)
    bad = []
    r = ask_registry(name, ver)
    if r["missing"]:
        print(f"× {name}@{ver} が npm の公式の置き場にありません")
        return 1
    st, tgz = http(r["tarball"])
    got = "sha512-" + base64.b64encode(hashlib.sha512(tgz).digest()).decode()
    ok1 = got == r["integrity"]
    d = ask_depsdev(name, ver, r["integrity"])
    o = ask_osv([(name, ver)]).get((name, ver), [])
    mal = [i for i in o if i.startswith("MAL-")]
    with tarfile.open(fileobj=io.BytesIO(tgz), mode="r:gz") as tf:
        member = tf.extractfile("package/" + inner.lstrip("/"))
        if member is None:
            print(f"× 部品の中に package/{inner} がありません")
            return 1
        official = member.read()
    local = open(path, "rb").read()
    ok3 = hashlib.sha256(local).digest() == hashlib.sha256(official).digest()
    age = days_since(d.get("published") or "") if d.get("match") else None
    print(f"部品チェック(手で置いたファイル): {path} ← {name}@{ver} の {inner}")
    print(f"{'○' if ok1 else '×'} 落とした部品の指紋が npm の公式の記録と一致")
    print(f"{'○' if d['match'] else '×'} deps.dev でも同じ部品だと確認" + ("" if d["match"] else f"({d['why']})"))
    print(f"{'○' if not mal else '×'} 乗っ取り・悪い仕掛けの報告: " + ("なし" if not mal else ", ".join(mal)))
    others = [i for i in o if not i.startswith("MAL-")]
    if others:
        print(f"△ 弱点の報告: {', '.join(others)}")
    if age is not None:
        print(f"{'○' if age >= days else '×'} 公開から {age:.0f} 日")
    print(f"{'○' if ok3 else '×'} 手元のファイルが、公式の部品の中身と同じ")
    bad = not (ok1 and d["match"] and not mal and ok3 and (age is None or age >= days))
    print("結果: " + ("全部 ○" if not bad else "× があります。使わないでください"))
    return 1 if bad else 0


# ---------------------------------------------------------------- 落とした道具
def check_sha256(path, sources):
    h = hashlib.sha256(open(path, "rb").read()).hexdigest()
    base = os.path.basename(path)
    print(f"部品チェック(落とした道具): {base}")
    print(f"   手元の指紋: {h}")
    bad = False
    for src in sources:
        if re.fullmatch(r"[0-9a-fA-F]{64}", src):
            want, where = src.lower(), "渡された指紋"
        else:
            st, body = http(src)
            want = None
            for line in body.decode("utf-8", "replace").splitlines():
                parts = line.split()
                if len(parts) >= 2 and parts[-1].lstrip("*") == base and re.fullmatch(r"[0-9a-fA-F]{64}", parts[0]):
                    want = parts[0].lower()
            where = src
        ok = want == h
        bad |= not ok
        print(f"{'○' if ok else '×'} {where}: " + ("一致" if ok else f"違う({want or '一覧に名前がない'})"))
    if len(sources) < 2:
        print("△ 確かめた先が1か所だけです。同じ場所が乗っ取られると見抜けません。できれば別の場所の指紋とも比べてください")
    print("結果: " + ("○ 公式と同じ" if not bad else "× 公式と違います。使わないでください"))
    return 1 if bad else 0


def main():
    ap = argparse.ArgumentParser(description="部品チェック(すり替え・新しすぎ・悪い報告)", add_help=True)
    ap.add_argument("args", nargs="*")
    ap.add_argument("--days", type=int, default=7)
    ap.add_argument("--base", default="origin/main")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    try:
        if a.args and a.args[0] == "file":
            if len(a.args) != 4:
                print(__doc__)
                return 2
            return check_file(a.args[1], a.args[2], a.args[3], a.days)
        if a.args and a.args[0] == "sha256":
            if len(a.args) < 3:
                print(__doc__)
                return 2
            return check_sha256(a.args[1], a.args[2:])
        return check_npm(a.args[0] if a.args else ".", a.days, a.base, a.json)
    except RuntimeError as e:
        print(f"× 確かめられませんでした: {e}")
        print("結果: × 確かめられないものは、通さない決まりです")
        return 1


if __name__ == "__main__":
    sys.exit(main())
