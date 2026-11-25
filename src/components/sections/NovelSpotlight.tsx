// 2026-11-08 ノブさん: 小説を「やっていくこと」のいちばん上に。初めて出す小説なので、ひときわ目立つ形で。
// ✏ 2026-11-25 ノブさん「ほかのカードと比べて安っぽい。ちゃんとした小説のような形に」
//   → 本屋の平台に置かれた一冊のように作り直した。
//     左: 表紙の絵(AI で作った夏の谷の絵)に縦書きの題、帯つきの本。右: 本のカバーの袖のような紹介。
//   題名は 2026-11-11 に決まった『ようこそ、新しい地球へ』(前の「クラッシュ 未来への手紙」から変更)。
//   紹介の文は、小説アプリの「この物語と、三人」(公開済み)から。先の話(ネタバレ)は書かない。
// 本文・声・曲はここ(公開の箱)に置かない。ボタンで小説アプリへ飛ぶだけ。

const NOVEL_URL = "https://crash-novel.pages.dev/";

// 表紙と同じ明朝体。入っていない端末では、ふつうの明朝(serif)になる
const MINCHO =
  '"Hiragino Mincho ProN", "Hiragino Mincho Pro", "Yu Mincho", YuMincho, "Noto Serif JP", "Noto Serif CJK JP", serif';

// 暗い紙の色と、本の色
const NIGHT = "#0f1a17"; // 夜の緑
const PAPER = "#f4efe4"; // 紙
const INK = "#1d2420"; // 墨
const GOLD = "#c9b27c"; // 光の粒
const SEAL = "#a8323e"; // 赤い印

// 奥付(本のいちばん後ろの、作品の情報)のような表
const SPEC: [string, string][] = [
  ["読み方", "文字で読む ／ 声で聞く"],
  ["長さ", "約4時間半(ナレーションと声つき)"],
  ["音楽", "物語の中の曲つき"],
  ["料金", "無料・広告なし・登録なし"],
];

// 背景にただよう光の粒(位置・大きさ・速さ)。決まった値にして、毎回同じ絵にする
const SPECKS = [
  { x: 6, y: 78, s: 3, d: 9, t: 0 },
  { x: 14, y: 30, s: 2, d: 12, t: 2 },
  { x: 23, y: 88, s: 4, d: 10, t: 4 },
  { x: 38, y: 12, s: 2, d: 14, t: 1 },
  { x: 47, y: 70, s: 3, d: 11, t: 6 },
  { x: 58, y: 92, s: 2, d: 13, t: 3 },
  { x: 66, y: 22, s: 3, d: 10, t: 5 },
  { x: 74, y: 60, s: 2, d: 12, t: 7 },
  { x: 83, y: 84, s: 4, d: 9, t: 2 },
  { x: 91, y: 40, s: 2, d: 14, t: 4 },
  { x: 96, y: 10, s: 3, d: 11, t: 8 },
  { x: 31, y: 52, s: 2, d: 13, t: 9 },
];

function Book() {
  return (
    <div className="relative mx-auto w-[220px] shrink-0 sm:w-[260px] [perspective:1400px]">
      {/* 床に落ちる影 */}
      <div
        aria-hidden
        className="absolute -bottom-5 left-1/2 h-8 w-[90%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl"
      />
      <div
        className="relative transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(-14deg)_rotateX(2deg)] group-hover:[transform:rotateY(-6deg)_rotateX(1deg)] motion-reduce:transition-none"
      >
        {/* ページの小口(右側の紙の束) */}
        <div
          aria-hidden
          className="absolute right-[-10px] top-[6px] bottom-[6px] w-[12px] rounded-r-[3px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #efe8d8 0 1px, #d9d0bd 1px 2px)",
            transform: "translateZ(-6px)",
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.25)",
          }}
        />

        {/* 表紙 */}
        <div
          className="relative aspect-[2/3] overflow-hidden rounded-r-[4px] rounded-l-[2px]"
          style={{
            boxShadow:
              "0 30px 60px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/novel/cover.jpg"
            alt="小説『ようこそ、新しい地球へ』の表紙。夏の谷の道を、三人が歩いていく絵"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* 背(左はしの折り目)の光と影 */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[14px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,255,255,0.25) 40%, rgba(0,0,0,0.12) 70%, transparent)",
            }}
          />
          {/* 紙の上の、うすい光 */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.12) 100%)",
            }}
          />

          {/* 縦書きの題(空の上に) */}
          <div
            aria-hidden
            className="absolute right-[11%] top-[7%] flex items-start gap-[6px] select-none"
            style={{ fontFamily: MINCHO, color: INK }}
          >
            <span
              className="text-[25px] leading-[1.15] tracking-[0.08em] sm:text-[30px]"
              style={{ writingMode: "vertical-rl", textShadow: "0 0 12px rgba(255,255,255,0.7)" }}
            >
              新しい地球へ
            </span>
            <span
              className="mt-[-2px] text-[25px] leading-[1.15] tracking-[0.08em] sm:text-[30px]"
              style={{ writingMode: "vertical-rl", textShadow: "0 0 12px rgba(255,255,255,0.7)" }}
            >
              ようこそ、
            </span>
          </div>
          {/* 作者名 */}
          <p
            aria-hidden
            className="absolute left-[10%] top-[8%] text-[10px] tracking-[0.35em] sm:text-[11px]"
            style={{ fontFamily: MINCHO, color: INK, writingMode: "vertical-rl" }}
          >
            NOBU
          </p>
          {/* 作者名の下の、赤い印(はんこ) */}
          <span
            aria-hidden
            className="absolute left-[10.5%] top-[25%] h-[9px] w-[9px] rounded-[2px] sm:top-[24%]"
            style={{ background: SEAL }}
          />

          {/* 帯 */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[23%] px-[9%] pt-[5%]"
            style={{
              background: PAPER,
              boxShadow: "0 -6px 14px -6px rgba(0,0,0,0.45)",
              fontFamily: MINCHO,
            }}
          >
            <p className="text-[11px] leading-[1.6] sm:text-[12.5px]" style={{ color: INK }}>
              「また明日」と言える相手が、
              <br />
              画面の向こうにいた。
            </p>
            <p
              className="mt-[6px] text-[8px] tracking-[0.2em] sm:text-[9px]"
              style={{ color: SEAL }}
            >
              読む・聞く 長編小説
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NovelSpotlight() {
  return (
    <article
      className="group relative isolate overflow-hidden rounded-2xl"
      style={{
        background: `radial-gradient(120% 90% at 20% 30%, #1d3029 0%, ${NIGHT} 55%, #0a110f 100%)`,
        boxShadow: `0 0 0 1px rgba(201,178,124,0.28), 0 30px 90px -30px rgba(0,0,0,0.9)`,
      }}
    >
      <style>{`
        @keyframes novel-drift {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: .9; }
          100% { transform: translateY(-90px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .novel-speck { animation: none !important; opacity: .5 !important; } }
      `}</style>

      {/* 光の粒 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {SPECKS.map((p, i) => (
          <span
            key={i}
            className="novel-speck absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              background: GOLD,
              boxShadow: `0 0 ${p.s * 3}px ${GOLD}`,
              animation: `novel-drift ${p.d}s linear ${p.t}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* 上の細い札 */}
      <div
        className="flex items-center justify-center gap-3 border-b px-4 py-2.5 text-[11px] tracking-[0.3em] sm:text-xs"
        style={{ borderColor: "rgba(201,178,124,0.25)", color: GOLD, fontFamily: MINCHO }}
      >
        <span className="h-px w-8" style={{ background: GOLD, opacity: 0.6 }} />
        はじめての小説、公開中
        <span className="h-px w-8" style={{ background: GOLD, opacity: 0.6 }} />
      </div>

      <div className="flex flex-col items-center gap-12 px-6 py-12 sm:flex-row sm:items-center sm:gap-14 sm:px-14 sm:py-16">
        <Book />

        {/* カバーの袖のような紹介 */}
        <div className="w-full min-w-0 text-center sm:text-left" style={{ color: PAPER }}>
          <p className="text-[11px] tracking-[0.4em]" style={{ color: GOLD }}>
            NOVEL ／ 長編小説
          </p>

          <h3
            className="mt-4 text-[28px] leading-snug tracking-[0.06em] text-balance sm:text-[40px]"
            style={{ fontFamily: MINCHO }}
          >
            <span className="inline-block">ようこそ、</span>
            <span className="inline-block">新しい地球へ</span>
          </h3>
          <p
            className="mt-2 text-sm tracking-[0.3em] opacity-80"
            style={{ fontFamily: MINCHO }}
          >
            NOBU 著
          </p>

          <div
            className="mx-auto mt-7 h-px w-16 sm:mx-0"
            style={{ background: GOLD, opacity: 0.7 }}
          />

          <p
            className="mx-auto mt-7 max-w-[30em] text-left text-[15px] leading-[2.1] opacity-90 text-pretty sm:mx-0"
            style={{ fontFamily: MINCHO }}
          >
            {"画面の中の小さな部屋で、毎晩「また明日」と言い合う三人。まだ一度も、会ったことはない。ある夏の日、世界じゅうの電波が止まった。"}
            <br className="hidden sm:block" />
            {"だから、会いに行く。信号の消えた道を、紙の地図をたよりに。"}
          </p>

          {/* 奥付のような表 */}
          <dl
            className="mx-auto mt-8 grid max-w-md grid-cols-[auto_1fr] gap-x-5 border-y py-4 text-left text-[13px] sm:mx-0"
            style={{ borderColor: "rgba(201,178,124,0.3)" }}
          >
            {SPEC.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="py-1 tracking-[0.2em]" style={{ color: GOLD }}>
                  {k}
                </dt>
                <dd className="py-1 opacity-90">{v}</dd>
              </div>
            ))}
          </dl>

          <a
            href={NOVEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm font-bold tracking-[0.15em] transition-transform hover:scale-[1.03] focus-visible:scale-[1.03] active:scale-[0.98] motion-reduce:transition-none sm:text-base"
            style={{
              background: PAPER,
              color: INK,
              boxShadow: "0 12px 34px -10px rgba(201,178,124,0.65)",
              fontFamily: MINCHO,
            }}
          >
            ページをひらく
            <span aria-hidden>→</span>
          </a>

          <p className="mt-5 text-[11px] tracking-[0.2em] opacity-60">
            作 NOBU ／ 制作 ROGUE PINK ／ 表紙の絵は AI で作成
          </p>
        </div>
      </div>
    </article>
  );
}
