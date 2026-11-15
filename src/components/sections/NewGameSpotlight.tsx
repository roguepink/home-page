// 2026-11-14 ノブさん: ニューシングルの1つ下に「ニューゲーム」を。新しく入荷しました、的に、ちょっと楽しそうに。
// 2026-11-15 ノブさん: だるま落としの「すぐ下」に、勇者へっぽこを同じ形で。だるま落としの次に、必ず。
//   → 形は1つにして、中身(題・絵・色)だけを ゲームごとに書く。並びは NEW_GAMES の順(上から)。
// ゲーム本体は向こうのアドレスをそのまま開く。

type Theme = {
  /** 上の帯の色(左→まん中→右) */
  band: string;
  /** 帯の「NEW」の札 */
  badge: string;
  /** 題の色と影 */
  title: string;
  titleShadow: string;
  /** 小さい題・札・枠の色 */
  accent: string;
  /** 本文の色 */
  body: string;
  /** 下の小さい字 */
  muted: string;
  /** 絵のまわりの枠 */
  frame: string;
  /** 「本日入荷!」の丸 */
  stamp: string;
  /** うしろで光る色 */
  glow: string;
  /** カードの地の色 */
  paper: string;
  /** カードの影 */
  shadow: string;
  /** 「いますぐ遊ぶ」のボタン */
  button: string;
};

type NewGame = {
  url: string;
  poster: string;
  posterAlt: string;
  /** 題の上の小さい字 */
  kicker: string;
  /** 大きい題 */
  title: string;
  /** 本文(1行ずつ。スマホで変なところで切れないように、かたまりごとに分ける) */
  lines: string[][];
  points: string[];
  playLabel: string;
  theme: Theme;
};

const NEW_GAMES: NewGame[] = [
  // ① こっち見ないで!だるま落とし(roguepink/daruma)。だるまの赤と金に、明るいクリーム色の紙と紙吹雪
  {
    url: "https://roguepink.github.io/daruma/",
    poster: "/games/daruma/poster.jpg",
    posterAlt: "ゴールデンだるまを連打でふくらませている画面。金色のだるまさんの顔がパンパンにふくらんでいる",
    kicker: "こっち見ないで!",
    title: "だるま落とし",
    lines: [
      ["だるまさんが 向こうを向いている間に、", "何段 落とせるか。"],
      ["「ころんだ」の赤い字が出たら、", "手を止めて!"],
    ],
    points: ["だるまさんが ころんだ × だるま落とし", "表情 100こ", "ゴールデンだるま"],
    playLabel: "こっち見ないで!だるま落とし を遊ぶ",
    theme: {
      band: "from-[#c4161c] via-[#ff4d2a] to-[#c4161c]",
      badge: "bg-[#ffe066] text-[#7a0d0d]",
      title: "#c4161c",
      titleShadow: "0 3px 0 #ffbe2e, 0 6px 18px rgba(196,22,28,0.25)",
      accent: "#c4161c",
      body: "#5a2a14",
      muted: "#a0705a",
      frame: "border-[#ffbe2e] bg-[#2a1020] shadow-[0_14px_40px_-12px_rgba(196,22,28,0.6)]",
      stamp: "bg-[#c4161c] shadow-[0_6px_16px_-4px_rgba(150,20,20,0.8)]",
      glow: "bg-[#ffc93c]/25",
      paper: "bg-[#fff7e6] text-[#3a1208]",
      shadow: "shadow-[0_0_0_1px_rgba(255,180,40,0.7),0_24px_70px_-24px_rgba(255,150,30,0.7)]",
      button: "from-[#ffd84a] to-[#f0a10f] text-[#5a0a0a] shadow-[0_10px_26px_-8px_rgba(240,150,10,0.9)]",
    },
  },
  // ② 勇者へっぽこの小さな冒険(roguepink/heppoko)。ゲームと同じ、クリーム色・金・ピンクに こげ茶の字
  {
    url: "https://roguepink.github.io/heppoko/",
    poster: "/games/heppoko/poster.jpg",
    posterAlt: "王冠をかぶり、伝説の剣とマンホールのふたの盾を持った へっぽこが、装備をお披露目している画面",
    kicker: "お金の力で 大魔王を!",
    title: "勇者へっぽこ",
    lines: [
      ["お金持ちの子・へっぽこが、", "お金の力で 大魔王に挑む。"],
      ["でも仲間は、", "お金では 仲間になってくれない!"],
    ],
    points: ["装備 100種類以上", "仲間 30組", "大魔王が 変身する"],
    playLabel: "勇者へっぽこの小さな冒険 を遊ぶ",
    theme: {
      band: "from-[#ff8fc8] via-[#ffb347] to-[#ff8fc8]",
      badge: "bg-[#fff6e6] text-[#b0306e]",
      title: "#5a3d2b",
      titleShadow: "0 3px 0 #ffd84d, 0 6px 18px rgba(255,143,200,0.35)",
      accent: "#d0478a",
      body: "#5a3d2b",
      muted: "#a08060",
      frame: "border-[#ffd84d] bg-[#fff6e6] shadow-[0_14px_40px_-12px_rgba(208,71,138,0.55)]",
      stamp: "bg-[#ff6fb5] shadow-[0_6px_16px_-4px_rgba(200,50,120,0.8)]",
      glow: "bg-[#ff8fc8]/25",
      paper: "bg-[#fff6e6] text-[#5a3d2b]",
      shadow: "shadow-[0_0_0_1px_rgba(255,143,200,0.7),0_24px_70px_-24px_rgba(255,120,180,0.6)]",
      button: "from-[#ffe066] to-[#ffb347] text-[#5a3d2b] shadow-[0_10px_26px_-8px_rgba(255,160,60,0.9)]",
    },
  },
];

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

/** 新入荷のゲームを、上から順に すべて出す */
export default function NewGameSpotlight() {
  return (
    <div className="flex flex-col gap-10">
      {NEW_GAMES.map((game) => (
        <GameCard key={game.url} game={game} />
      ))}
    </div>
  );
}

function GameCard({ game }: { game: NewGame }) {
  const t = game.theme;
  return (
    <div className="relative">
      {/* うしろで ふわっと光る */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-3 -z-10 rounded-[28px] blur-2xl ${t.glow}`}
      />

      <article className={`relative overflow-hidden rounded-2xl ${t.paper} ${t.shadow}`}>
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
        <div
          className={`relative flex items-center justify-center gap-2 bg-gradient-to-r ${t.band} whitespace-nowrap px-4 py-2.5 text-center text-xs font-black tracking-[0.12em] text-white sm:text-sm sm:tracking-[0.18em]`}
        >
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] tracking-[0.2em] motion-safe:animate-pulse sm:text-xs ${t.badge}`}
          >
            NEW
          </span>
          NEW GAME 新入荷しました!
        </div>

        <div className="relative flex flex-col items-center gap-8 px-7 py-10 sm:flex-row sm:items-center sm:gap-12 sm:px-14 sm:py-14">
          {/* スマホでは、題を絵より先に見せる */}
          <div className="text-center sm:hidden">
            <Heading game={game} />
          </div>

          {/* 左: ゲームの画面(押すとそのまま遊べる) */}
          <div className="relative w-full max-w-[200px] shrink-0 sm:max-w-[250px]">
            {/* 値札ふうの「入荷」のしるし */}
            <span
              aria-hidden
              className={`absolute -right-4 -top-4 z-10 flex h-16 w-16 rotate-12 items-center justify-center rounded-full text-center text-[11px] font-black leading-tight text-white motion-safe:animate-bounce ${t.stamp}`}
            >
              本日
              <br />
              入荷!
            </span>
            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={game.playLabel}
              className={`group relative block aspect-[390/844] overflow-hidden rounded-xl border-4 ${t.frame}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={game.poster}
                alt={game.posterAlt}
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
              <Heading game={game} />
            </div>

            <p
              className="mx-auto mt-0 max-w-md text-sm leading-loose sm:mx-0 sm:mt-6 sm:text-base"
              style={{ color: t.body }}
            >
              {game.lines.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line.map((part) => (
                    <span key={part} className="inline-block">
                      {part}
                    </span>
                  ))}
                </span>
              ))}
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {game.points.map((point) => (
                <li
                  key={point}
                  className="rounded-full border bg-white/70 px-3 py-1 text-xs font-bold"
                  style={{ borderColor: `${t.accent}4d`, color: t.accent }}
                >
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-b px-7 py-3.5 text-sm font-black transition-transform hover:scale-[1.04] focus-visible:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none sm:text-base ${t.button}`}
              >
                いますぐ遊ぶ →
              </a>
              <a
                href="/games"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-colors hover:bg-black/5 sm:text-base"
                style={{ borderColor: `${t.accent}66`, color: t.accent }}
              >
                ほかのゲームも見る
              </a>
            </div>

            <p className="mt-5 text-[11px] tracking-[0.15em]" style={{ color: t.muted }}>
              無料・広告なし・登録なし
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

function Heading({ game }: { game: NewGame }) {
  const t = game.theme;
  return (
    <>
      <p className="text-sm font-bold tracking-[0.2em] sm:text-base" style={{ color: t.accent }}>
        {game.kicker}
      </p>
      <h3
        className="mt-1 text-5xl font-black leading-tight tracking-tight sm:text-7xl"
        style={{ color: t.title, textShadow: t.titleShadow }}
      >
        {game.title}
      </h3>
    </>
  );
}
