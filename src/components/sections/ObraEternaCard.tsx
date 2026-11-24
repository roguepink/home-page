// 2026-11-25 ノブさん:「オブラ・エテルナ 始まります みたいな形で、何が始まるんだろうというカードを。壮大なスケールで」
//   「真ん中の塔はそのまま少しだけ細く。まわりに芸術的でありえない形の建物を4〜5個(らせん階段・中二階のいびつな建物・
//    大きな木の枝にお店がつく建物など)、前後左右にバランスよく」「一番下の大きな窓はカラフルにせず、ゴージャスにまとめる。
//    上の小窓のいろんな色はそのまま」「居酒屋のカードの下に」
// → 絵は public/obra-eterna/castle.svg(scripts/obra-eterna/make_castle_svg.py で作る。手で直さない)。
//   文のうち「永遠の作品、永遠の工事。」「完成しない建物を…」「Siempre en obras」は こちらで足した文(ノブさんに伝えて OK をもらった)。
// ここは何も動かさない(読んでいる間は何も動かない、のサイトの決まり)。工事の日数だけ、開いたときに1回数える。

import ObraDayCount from "@/components/sections/ObraDayCount";

const MINCHO = "'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif";
const DIDOT = "Didot,'Bodoni 72','Bodoni MT','Playfair Display','Times New Roman',serif";
const GOLD = "#e3c27a";
const SOFT = "#bfae86";

export default function ObraEternaCard() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-[3px]"
      style={{
        background: "linear-gradient(135deg,#6a4a1e,#e9c77a 35%,#8a6a2e 60%,#f3dca0 85%,#6a4a1e)",
        boxShadow: "0 20px 60px rgba(227,194,122,.22)",
      }}
    >
      <div className="overflow-hidden rounded-[21px]" style={{ background: "#05060d", color: "#f4ecd8" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/obra-eterna/castle.svg"
          alt="雲を突き抜けて空の外まで建ちつづける塔と、そのまわりの不思議な形の建物たち。てっぺんはまだ工事中"
          width={600}
          height={600}
          className="block h-auto w-full"
          loading="lazy"
          decoding="async"
        />
        <div
          className="px-5 pb-8 pt-2 text-center sm:px-10"
          style={{ background: "linear-gradient(180deg,#030308,#070814 60%,#0b0b1a)" }}
        >
          <p className="text-[11px] tracking-[0.38em]" style={{ fontFamily: DIDOT, color: GOLD, opacity: 0.8 }}>
            — CONSTRUCCIÓN ETERNA —
          </p>
          <h3
            className="mt-3.5"
            style={{
              fontFamily: DIDOT,
              fontWeight: 400,
              fontSize: "clamp(38px,10vw,72px)",
              letterSpacing: "0.16em",
              paddingLeft: "0.16em",
              lineHeight: 1,
              background: "linear-gradient(180deg,#fff3d0 0%,#e9c77a 45%,#a77d38 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            OBRA ETERNA
          </h3>
          <p className="mt-3 text-[15px] tracking-[0.5em] max-[359px]:tracking-[0.3em]" style={{ fontFamily: MINCHO, paddingLeft: "0.5em" }}>
            オブラ・エテルナ
          </p>
          <p className="mt-1.5 text-xs tracking-[0.2em]" style={{ fontFamily: MINCHO, color: SOFT }}>
            永遠の作品、永遠の工事。
          </p>

          <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-3" style={{ color: GOLD }} aria-hidden="true">
            <i className="h-px flex-1" style={{ background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />✦
            <i className="h-px flex-1" style={{ background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />
          </div>

          <p
            className="mt-4 font-extrabold text-white"
            style={{
              fontFamily: MINCHO,
              fontSize: "clamp(30px,8vw,46px)",
              letterSpacing: "0.3em",
              paddingLeft: "0.3em",
              textShadow: "0 0 24px rgba(255,214,144,.35)",
            }}
          >
            始まります。
          </p>
          <p className="mt-4 text-[15px] leading-loose" style={{ fontFamily: MINCHO, color: "#e6dbc2" }}>
            <span className="inline-block">完成しない建物を、</span>
            <span className="inline-block">建てはじめます。</span>
            <br />
            <span className="inline-block">中に何が生まれるのかは、</span>
            <span className="inline-block">まだ秘密。</span>
            <br />
            <span className="inline-block">建っていく様子を、</span>
            <span className="inline-block">ここで少しずつお見せします。</span>
          </p>

          <dl
            className="mx-auto mt-6 grid max-w-[520px] grid-cols-3 overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(227,194,122,.35)" }}
          >
            {[
              { v: "2026.11.24", k: "着工" },
              { v: <ObraDayCount />, k: "工事の日数" },
              { v: "∞", k: "完成予定" },
            ].map((s, i) => (
              <div
                key={s.k}
                className="flex flex-col-reverse px-1 py-3"
                style={{ borderLeft: i ? "1px solid rgba(227,194,122,.25)" : undefined }}
              >
                <dt className="mt-1 text-[11px] tracking-[0.15em]" style={{ color: SOFT }}>
                  {s.k}
                </dt>
                <dd style={{ fontFamily: DIDOT, fontSize: "clamp(15px,4.4vw,20px)", color: "#fff3d0", letterSpacing: "0.04em" }}>
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm italic tracking-[0.12em]" style={{ fontFamily: DIDOT, color: GOLD }}>
            Siempre en obras{" "}
            <span className="inline-block text-xs not-italic tracking-[0.15em]" style={{ fontFamily: MINCHO, color: SOFT }}>
              ── いつまでも工事中
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
