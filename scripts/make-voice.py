"""記事の朗読音声を作る(Gemini TTS)。

使い方(Mac。mlx-whisper の入った Python で):
  source ~/.local/venvs/ryokoshi/bin/activate
  python3 scripts/make-voice.py            # まだ音声のない記事だけ作る
  python3 scripts/make-voice.py --force    # 全部作り直す

やること
  1. src/app/writing と journal の entries.ts を読む
  2. 題名 + 段落を、読みの辞書(src/lib/reading.ts)に通して Gemini に読ませる
  3. 書き起こして原稿と照らし、抜け・読み飛ばしがないか確かめる
  4. 言葉ごとの時刻から、段落の開始時刻を割り出す(再生中の段落を光らせるため)
  5. public/voice/<ハッシュ>.m4a と src/lib/voice-data.ts を書く

文章を直すとハッシュが変わるので、古い音声は自動で使われなくなる(ブラウザの声に戻る)。
その記事だけ、もう一度このスクリプトを走らせれば音声が作り直される。

⚠ API キーは ~/.config/gemini/api_key から読む。リポジトリには絶対に入れない。
"""
import base64
import difflib
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KEY = Path(os.path.expanduser("~/.config/gemini/api_key")).read_text().strip()
MODEL = "gemini-3.8-flash-lite-tts"   # ノブさんが聞いて選んだ「21番」と同じ
VOICE = "Alnilam"
STYLE = "calm, steady, unhurried, like a thoughtful man reading his own essay aloud in Japanese"
CACHE = Path(os.path.expanduser("~/claude-work/ryokoshi/trips/2026-ise/out/_tts/voice-cache"))
CACHE.mkdir(parents=True, exist_ok=True)
FFMPEG = "ffmpeg"


# ---------------------------------------------------------------- 読みの辞書(reading.ts の toSpeech と同じ内容にしておく)
def load_dict():
    s = (ROOT / "src/lib/reading.ts").read_text(encoding="utf8")
    pairs = [(m.group(1), m.group(2)) for m in re.finditer(r'^\s*\["([^"]+)",\s*"([^"]*)"\]', s, re.M)]
    return sorted(pairs, key=lambda p: -len(p[0]))


def to_speech(t, pairs):
    for w, r in pairs:
        t = t.replace(w, r)
    t = re.sub(r"([ぁ-ん])分(?![かけ])", r"\1ぶん", t)
    t = re.sub(r"([ただる])方(?![法向面角程式針位])", r"\1ほう", t)
    t = re.sub(r"([ただ])後(?![ろ日半者方年部輩悔退継])", r"\1あと", t)
    t = re.sub(r"[—―−–]+|…+|\.{3,}", "、", t)
    return re.sub(r"[「」『』]", " ", t)


# ---------------------------------------------------------------- ハッシュ(ReadAloud.tsx の voiceKey と同じ計算)
def fnv(units, seed):
    h = seed
    for u in units:
        h ^= u
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def voice_key(title, paragraphs):
    s = title + "\n" + "\n".join(paragraphs)
    b = s.encode("utf-16-le")
    units = [b[i] | (b[i + 1] << 8) for i in range(0, len(b), 2)]
    return f"{fnv(units, 0x811C9DC5):08x}{fnv(units, 0x2A5F1B07):08x}"


# ---------------------------------------------------------------- entries.ts から記事を読む
def js_unescape(s):
    return json.loads('"' + s + '"')


def load_entries():
    out = []
    for kind in ("writing", "journal"):
        s = (ROOT / f"src/app/{kind}/entries.ts").read_text(encoding="utf8")
        starts = [m.start() for m in re.finditer(r"^  \{\s*$", s, re.M)]
        for a, b in zip(starts, starts[1:] + [len(s)]):
            blk = s[a:b]
            slug = re.search(r'slug: "([^"]+)"', blk)
            title = re.search(r'title: "((?:[^"\\]|\\.)*)"', blk)
            if not (slug and title and "paragraphs: [" in blk):
                continue
            body = blk.split("paragraphs: [", 1)[1]
            paras = [js_unescape(x) for x in re.findall(r'^\s+"((?:[^"\\]|\\.)*)",?\s*$', body, re.M)]
            out.append({"kind": kind, "slug": slug.group(1), "title": js_unescape(title.group(1)), "paragraphs": paras})
    return out


# ---------------------------------------------------------------- Gemini
def tts(text, out_wav):
    body = {"model": MODEL,
            "input": [{"type": "user_input", "content": [{"type": "text", "text": text,
                       "annotations": [{"type": "speech_metadata", "style": STYLE}]}]}],
            "response_format": {"type": "audio"},
            "generation_config": {"speech_config": [{"voice": VOICE}]}}
    req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/interactions",
                                 data=json.dumps(body).encode(),
                                 headers={"x-goog-api-key": KEY, "Content-Type": "application/json"})
    for attempt in range(6):
        try:
            r = json.load(urllib.request.urlopen(req, timeout=300))
            break
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:160]
            print("   HTTP", e.code, msg, flush=True)
            if e.code == 429 and "per day" in msg:
                raise SystemExit("今日の上限に当たりました。課金の設定か、明日に。")
            time.sleep(20 * (attempt + 1))
        except Exception as e:  # 通信の一時的な失敗
            print("   ERR", e, flush=True)
            time.sleep(10)
    else:
        raise SystemExit("Gemini から音声が返りませんでした")

    def find(o):
        if isinstance(o, dict):
            if isinstance(o.get("data"), str) and len(o["data"]) > 1000:
                return o
            for v in o.values():
                f = find(v)
                if f:
                    return f
        elif isinstance(o, list):
            for v in o:
                f = find(v)
                if f:
                    return f
    out_wav.write_bytes(base64.b64decode(find(r)["data"]))


# ---------------------------------------------------------------- 書き起こしと段落の開始時刻
def clean(t):
    return re.sub(r"[\s、。,.「」『』！？!?・…—―]", "", t)


def transcribe(wav):
    import mlx_whisper
    r = mlx_whisper.transcribe(str(wav), path_or_hf_repo="mlx-community/whisper-large-v3-turbo", language="ja",
                               word_timestamps=True, condition_on_previous_text=False)
    heard, times = "", []
    for seg in r["segments"]:
        for w in seg.get("words", []):
            for c in clean(w["word"]):
                heard += c
                times.append(float(w["start"]))
    return heard, times


def align(want_parts, heard, times, duration):
    """want_parts = [題名, 段落1, 段落2, ...](読ませた文)。各部分の開始時刻と、一致率を返す。"""
    want = "".join(clean(p) for p in want_parts)
    sm = difflib.SequenceMatcher(None, want, heard, autojunk=False)
    blocks = [b for b in sm.get_matching_blocks() if b.size >= 2]
    starts, pos = [], 0
    for p in want_parts:
        idx = pos
        pos += len(clean(p))
        t = None
        for b in blocks:
            if b.a + b.size > idx:  # この位置以降で最初に一致した所
                j = b.b + max(0, idx - b.a)
                if j < len(times):
                    t = times[j]
                break
        starts.append(t)
    # 取れなかった所は、前後から補う
    last = 0.0
    for i, t in enumerate(starts):
        if t is None:
            starts[i] = last
        last = starts[i]
    starts = [0.0] + [max(0.0, round(t - 0.12, 2)) for t in starts[1:]]
    for i in range(1, len(starts)):
        starts[i] = max(starts[i], starts[i - 1])
    return starts, sm.ratio()


def duration_of(path):
    out = subprocess.run([FFMPEG, "-i", str(path)], capture_output=True, text=True).stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))


# ---------------------------------------------------------------- 本体
def main():
    force = "--force" in sys.argv
    pairs = load_dict()
    outdir = ROOT / "public/voice"
    outdir.mkdir(parents=True, exist_ok=True)
    data_path = ROOT / "src/lib/voice-data.ts"
    old = {}
    if data_path.exists():
        for m in re.finditer(r'"([0-9a-f]{16})":\s*(\{[^}]*\})', data_path.read_text(encoding="utf8")):
            try:
                old[m.group(1)] = json.loads(re.sub(r"(\w+):", r'"\1":', m.group(2)))
            except Exception:
                pass
    result, problems = {}, []
    entries = load_entries()
    keys = {voice_key(e["title"], e["paragraphs"]) for e in entries}
    for n, e in enumerate(entries, 1):
        key = voice_key(e["title"], e["paragraphs"])
        m4a = outdir / f"{key}.m4a"
        label = f"[{n}/{len(entries)}] {e['kind']}/{e['slug']}"
        if not force and m4a.exists() and key in old:
            result[key] = old[key]
            print(label, "既にある", flush=True)
            continue
        parts = [to_speech(e["title"], pairs)] + [to_speech(p, pairs) for p in e["paragraphs"]]
        text = "\n\n".join(parts)
        wav = CACHE / f"{key}.wav"
        if not wav.exists():
            print(label, f"作る({len(text)}文字)", flush=True)
            tts(text, wav)
        else:
            print(label, "キャッシュの音声を使う", flush=True)
        heard, times = transcribe(wav)
        starts, ratio = align(parts, heard, times, 0)
        subprocess.run([FFMPEG, "-v", "error", "-y", "-i", str(wav), "-ac", "1", "-ar", "24000",
                        "-c:a", "aac", "-b:a", "56k", "-movflags", "+faststart", str(m4a)], check=True)
        dur = round(duration_of(m4a), 2)
        flag = "" if ratio >= 0.93 else "  ← 要確認"
        print(f"   一致率 {ratio:.3f}  長さ {dur}s  段落 {len(e['paragraphs'])}{flag}", flush=True)
        if ratio < 0.93:
            problems.append((label, round(ratio, 3)))
        result[key] = {"d": dur, "s": starts[1:]}
    # 使われなくなった音声を消す
    for f in outdir.glob("*.m4a"):
        if f.stem not in keys:
            f.unlink()
            print("古い音声を消した", f.name)
    body = ",\n".join(f'  "{k}": {{ d: {v["d"]}, s: {json.dumps(v["s"])} }}' for k, v in sorted(result.items()))
    data_path.write_text(
        "// scripts/make-voice.py が作るファイル。手で直さない。\n"
        "// キーは voiceKey(題名, 段落)。文章を直すと変わるので、古い音声は自動で使われなくなる。\n"
        "// d = 音声の長さ(秒)、s = 各段落が始まる秒(題名は 0 秒から)。\n"
        "export const VOICE_DATA: Record<string, { d: number; s: number[] }> = {\n" + body + ",\n};\n",
        encoding="utf8")
    print("\n書いた:", data_path.relative_to(ROOT), f"({len(result)} 本)")
    print("要確認:", problems or "なし")


if __name__ == "__main__":
    main()
