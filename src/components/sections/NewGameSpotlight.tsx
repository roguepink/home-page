// 2026-11-14 ノブさん: ニューシングルの1つ下に「ニューゲーム」を。新しく入荷しました、的に、ちょっと楽しそうに。
// 中身は「こっち見ないで!だるま落とし」(roguepink/daruma)。ゲーム本体は向こうのアドレスをそのまま開く。
// ニューシングル(赤・黒・炎)と並ぶので、こちらは だるまの赤と金に、明るいクリーム色の紙と紙吹雪で にぎやかに。

const GAME_URL = "https://roguepink.github.io/daruma/";
const POSTER = "/games/daruma/poster.jpg";

const POINTS = ["だるまさんが ころんだ × だるま落とし", "表情 100こ", "ゴールデンだるま"];

// 紙吹雪(動かさない飾り。位置と色だけ)
const CONFETTI = [
  { left: "6%", top: "14%", color: "#ff4d6d", rotate: 20 },
  { left: "14%", top: "70%", color: "#ffbe2e", rotate: -30 },
  { left: "28%", top: "8%", color: "#3fa7ff", rotate: 45 },
  { left: "46%", top: "88%", color: "#5ccf6a", rotate: -15 },
  { left: "62%", top: "10%", color: "#ff8a3d", rotate: 60 },
  { left: "78%", top: "78%", color: "#b26bff", rotate: -50 },
  { left: "90%", top: "22%", color: "#ff4d6d", rotate: 10 },
  { left: "94%", top: "60%", color: "#ffbe2e", rotate: -25 },
];

export default function NewGameSpotlight() {
  return (
    <div className="relative">
      {/* うしろで ふわっと光る金色 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-[#ffc93c]/25 blur-2xl"
      />

      <article className="relative overflow-hidden rounded-2xl bg-[#fff7e6] text-[#3a1208] shadow-[0_0_0_1px_rgba(255,180,40,0.7),0_24px_70px_-24px_rgba(255,150,30,0.7)]">
        {/* 紙吹雪 */}
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute h-3 w-1.5 rounded-sm opacity-70"
            style={{ left: c.left, top: c.top, background: c.color, transform: `rotate(${c.rotate}deg)` }}
          />
        ))}

        {/* 上の帯: 新入荷のお知らせ */}
        <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#c4161c] via-[#ff4d2a] to-[#c4161c] whitespace-nowrap px-4 py-2.5 text-center text-xs font-black tracking-[0.12em] text-white sm:text-sm sm:tracking-[0.18em]">
          <span className="rounded-full bg-[#ffe066] px-2 py-0.5 text-[10px] tracking-[0.2em] text-[#7a0d0d] motion-safe:animate-pulse sm:text-xs">
            NEW
          </span>
          NEW GAME 新入荷しました!
        </div>

        <div className="relative flex flex-col items-center gap-8 px-7 py-10 sm:flex-row sm:items-center sm:gap-12 sm:px-14 sm:py-14">
          {/* スマホでは、題を絵より先に見せる */}
          <div className="text-center sm:hidden">
            <Heading />
          </div>

          {/* 左: ゲームの画面(押すとそのまま遊べる) */}
          <div className="relative w-full max-w-[200px] shrink-0 sm:max-w-[250px]">
            {/* 値札ふうの「入荷」のしるし */}
            <span
              aria-hidden
              className="absolute -right-4 -top-4 z-10 flex h-16 w-16 rotate-12 items-center justify-center rounded-full bg-[#c4161c] text-center text-[11px] font-black leading-tight text-white shadow-[0_6px_16px_-4px_rgba(150,20,20,0.8)] motion-safe:animate-bounce"
            >
              本日
              <br />
              入荷!
            </span>
            <a
              href={GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="こっち見ないで!だるま落とし を遊ぶ"
              className="group relative block aspect-[390/844] overflow-hidden rounded-xl border-4 border-[#ffbe2e] bg-[#2a1020] shadow-[0_14px_40px_-12px_rgba(196,22,28,0.6)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={POSTER}
                alt="ゴールデンだるまを連打でふくらませている画面。金色のだるまさんの顔がパンパンにふくらんでいる"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10 text-center text-xs font-black tracking-[0.15em] text-white">
                タップで すぐ遊べる
              </span>
            </a>
          </div>

          {/* 右: 題と ひとこと */}
          <div className="w-full min-w-0 text-center sm:text-left">
            <div className="hidden sm:block">
              <Heading />
            </div>

            <p className="mx-auto mt-0 max-w-md text-sm leading-loose text-[#5a2a14] sm:mx-0 sm:mt-6 sm:text-base">
              <span className="inline-block">だるまさんが 向こうを向いている間に、</span>
              <span className="inline-block">何段 落とせるか。</span>
              <br />
              <span className="inline-block">「ころんだ」の赤い字が出たら、</span>
              <span className="inline-block">手を止めて!</span>
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-[#c4161c]/30 bg-white/70 px-3 py-1 text-xs font-bold text-[#8a1a10]"
                >
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#ffd84a] to-[#f0a10f] px-7 py-3.5 text-sm font-black text-[#5a0a0a] shadow-[0_10px_26px_-8px_rgba(240,150,10,0.9)] transition-transform hover:scale-[1.04] focus-visible:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none sm:text-base"
              >
                いますぐ遊ぶ →
              </a>
              <a
                href="/games"
                className="inline-flex items-center gap-2 rounded-full border border-[#c4161c]/40 px-6 py-3.5 text-sm font-bold text-[#8a1a10] transition-colors hover:bg-[#c4161c]/10 sm:text-base"
              >
                ほかのゲームも見る
              </a>
            </div>

            <p className="mt-5 text-[11px] tracking-[0.15em] text-[#a0705a]">
              無料・広告なし・登録なし
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

function Heading() {
  return (
    <>
      <p className="text-sm font-bold tracking-[0.2em] text-[#c4161c] sm:text-base">
        こっち見ないで!
      </p>
      <h3
        className="mt-1 text-5xl font-black leading-tight tracking-tight text-[#c4161c] sm:text-7xl"
        style={{ textShadow: "0 3px 0 #ffbe2e, 0 6px 18px rgba(196,22,28,0.25)" }}
      >
        だるま落とし
      </h3>
    </>
  );
}
