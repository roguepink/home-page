// 2026-11-14 ノブさん: ニューシングルの1つ下に「ニューゲーム」を。新しく入荷しました、的に、ちょっと楽しそうに。
// 2026-11-15 ノブさん: だるま落としの「すぐ下」に、勇者へっぽこを同じ形で。だるま落としの次に、必ず。
//   → 形は1つにして、中身(題・絵・色)だけを ゲームごとに書く。並びは NEW_GAMES の順(上から)。
// 2026-11-17 ノブさん: だるま落とし・勇者へっぽこを外して、爽快ゾンビ無双の「大型アップデート」を ここに。
//   新しいゲームではなく「アップデートしました」の形で。超巨大ボスを倒せるか、をかっこよく・ゲームっぽいカードで。
//   → 新入荷(NEW_GAMES・明るい紙のカード)とは別に、UPDATES(黒と赤の ゲームふうのカード)を作った。並びは UPDATES → NEW_GAMES。
//   UpdateCard の色は style で書いてある(ほかのカードの色の書き方と分けて、1枚で完結させるため)。
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

// 新入荷(いまは なし)。だるま落とし・勇者へっぽこは 2026-11-17 に外した(書き方は git の歴史 / UpdateCard の上の NewGame の形を見る)
const NEW_GAMES: NewGame[] = [];

type GameUpdate = {
  url: string;
  poster: string;
  posterAlt: string;
  /** 上の帯の字 */
  band: string;
  /** 題の上の小さい字 */
  kicker: string;
  title: string;
  /** 題の下の大きな一言 */
  catchcopy: string;
  /** 本文(1行ずつ。スマホで変なところで切れないように、かたまりごとに分ける) */
  lines: string[][];
  /** アップデートの中身 */
  /** アップデートの中身(かたまりごとに分けて、スマホで変なところで切れないように) */
  updates: { icon: string; text: string[] }[];
  points: string[];
  playLabel: string;
  /** 下の小さい字(かたまりごと) */
  note: string[];
};

// 大型アップデート(黒と赤の ゲームふうのカード)
const UPDATES: GameUpdate[] = [
  // 爽快ゾンビ無双(roguepink/sokai) 第5弾 2026-11-17
  {
    url: "https://roguepink.github.io/sokai/",
    poster: "/games/sokai/poster.jpg",
    posterAlt: "夕焼けの町のビルの向こうに、高さ90mの超巨大ボス「終末竜 ムクロドン」が立ちはだかる登場の画面",
    band: "大型アップデート",
    kicker: "最強の主人公 VS 超巨大ボス",
    title: "爽快ゾンビ無双",
    catchcopy: "高さ90m。倒せるか!?",
    lines: [
      ["ビルよりも高い 最強の怪獣、", "「終末竜 ムクロドン」が出現。"],
      ["ゾンビの大群を なぎ倒し、", "この超巨大ボスに 挑め!"],
    ],
    updates: [
      { icon: "🦖", text: ["最強の超巨大ボス", "「終末竜 ムクロドン」", "(高さ90m)"] },
      { icon: "🤠", text: ["新しい町「ウエスタン通り」", "酒場・保安官事務所・機関車"] },
      { icon: "💥", text: ["31種類の武器が、", "本物の形の絵に"] },
      { icon: "🌆", text: ["影と奥行きで、", "もっと立体的な3Dに"] },
    ],
    points: ["最初から最強・死なない", "武器 31種類", "巨大ボス 17体"],
    playLabel: "爽快ゾンビ無双 を遊ぶ",
    note: ["無料・広告なし・登録なし", "／ スマホは横向きがおすすめ"],
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

/** 大型アップデート → 新入荷 の順に、上から すべて出す */
export default function NewGameSpotlight() {
  return (
    <div className="flex flex-col gap-10">
      {UPDATES.map((u) => (
        <UpdateCard key={u.url} u={u} />
      ))}
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

// ---------- 大型アップデートのカード(黒と赤・注意の しましま・ゲームの画面ふう) ----------
const HAZARD = "repeating-linear-gradient(-45deg, #ffd23f 0 14px, #141414 14px 28px)";
const SCAN = "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 3px)";

function UpdateCard({ u }: { u: GameUpdate }) {
  return (
    <div className="relative">
      {/* うしろで 赤く光る */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] blur-2xl motion-safe:animate-pulse"
        style={{ background: "rgba(255,60,30,0.28)" }}
      />

      <article
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(160deg, #1d0609 0%, #0c0a12 55%, #221005 100%)",
          color: "#fff",
          boxShadow: "0 0 0 1px rgba(255,90,40,0.75), 0 24px 70px -24px rgba(255,70,30,0.8)",
        }}
      >
        {/* 走査線(古いゲーム画面ふう) */}
        <span aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: SCAN }} />

        {/* 上の帯: 注意の しましま + 大型アップデート */}
        <div className="relative px-3 py-2.5" style={{ backgroundImage: HAZARD }}>
          <div className="flex items-center justify-center">
            <span
              className="flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-1 text-xs font-black tracking-[0.12em] sm:text-sm sm:tracking-[0.18em]"
              style={{ background: "#141414", color: "#ffd23f", boxShadow: "0 0 0 2px #ffd23f" }}
            >
              <span
                className="rounded-full px-2 py-0.5 text-[10px] tracking-[0.2em] motion-safe:animate-pulse sm:text-xs"
                style={{ background: "#e8261c", color: "#fff" }}
              >
                UPDATE
              </span>
              ⚠ {u.band} ⚠
            </span>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-8 px-7 py-10 sm:flex-row sm:items-center sm:gap-12 sm:px-14 sm:py-14">
          {/* スマホでは、題を絵より先に見せる */}
          <div className="text-center sm:hidden">
            <UpdateHeading u={u} />
          </div>

          {/* 左: ゲームの画面(押すとそのまま遊べる) */}
          <div className="relative w-full max-w-[200px] shrink-0 sm:max-w-[250px]">
            <span
              aria-hidden
              className="absolute -right-5 -top-5 z-10 flex h-[72px] w-[72px] rotate-12 items-center justify-center rounded-full text-center text-[11px] font-black leading-tight motion-safe:animate-bounce"
              style={{ background: "#e8261c", color: "#fff", boxShadow: "0 0 0 3px #ffd23f, 0 8px 18px -4px rgba(232,38,28,0.9)" }}
            >
              超巨大
              <br />
              ボス
              <br />
              襲来!
            </span>
            <a
              href={u.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={u.playLabel}
              className="group relative block aspect-[390/844] overflow-hidden rounded-xl border-4"
              style={{ borderColor: "#ff5a1f", background: "#120808", boxShadow: "0 14px 40px -12px rgba(255,80,30,0.7)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={u.poster}
                alt={u.posterAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10 text-center text-xs font-black tracking-[0.15em] text-white">
                タップで すぐ挑める
              </span>
            </a>
          </div>

          {/* 右: 題・ひとこと・アップデートの中身 */}
          <div className="w-full min-w-0 text-center sm:text-left">
            <div className="hidden sm:block">
              <UpdateHeading u={u} />
            </div>

            <p className="mx-auto mt-0 max-w-md text-sm leading-loose sm:mx-0 sm:mt-6 sm:text-base" style={{ color: "#f3e6dc" }}>
              {u.lines.map((line, i) => (
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

            {/* アップデートの中身 */}
            <div
              className="mx-auto mt-6 max-w-md rounded-xl px-4 py-4 text-left sm:mx-0"
              style={{ background: "rgba(255,255,255,0.05)", boxShadow: "inset 0 0 0 1px rgba(255,210,63,0.35)" }}
            >
              <p className="text-[11px] font-black tracking-[0.3em]" style={{ color: "#ffd23f" }}>
                UPDATE 内容
              </p>
              <ul className="mt-3 space-y-2">
                {u.updates.map((item) => (
                  <li key={item.text.join("")} className="flex gap-2 text-sm leading-relaxed" style={{ color: "#fff" }}>
                    <span aria-hidden className="shrink-0">
                      {item.icon}
                    </span>
                    <span>
                      {item.text.map((part) => (
                        <span key={part} className="inline-block">
                          {part}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {u.points.map((point) => (
                <li
                  key={point}
                  className="rounded-full border px-3 py-1 text-xs font-bold"
                  style={{ borderColor: "rgba(255,90,40,0.6)", color: "#ffb08a", background: "rgba(255,90,40,0.08)" }}
                >
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href={u.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black transition-transform hover:scale-[1.04] focus-visible:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none sm:text-base"
                style={{
                  background: "linear-gradient(180deg, #ffd23f, #ff5a1f)",
                  color: "#2a0500",
                  boxShadow: "0 10px 26px -8px rgba(255,90,31,0.95)",
                }}
              >
                いますぐ挑む →
              </a>
              <a
                href="/games"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-colors hover:bg-white/10 sm:text-base"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
              >
                ほかのゲームも見る
              </a>
            </div>

            <p className="mt-5 text-[11px] tracking-[0.15em]" style={{ color: "#b39a8c" }}>
              {u.note.map((part) => (
                <span key={part} className="inline-block">
                  {part}&nbsp;
                </span>
              ))}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

function UpdateHeading({ u }: { u: GameUpdate }) {
  return (
    <>
      <p className="text-sm font-bold tracking-[0.2em] sm:text-base" style={{ color: "#ffd23f" }}>
        {u.kicker}
      </p>
      <h3
        className="mt-1 whitespace-nowrap text-[2.6rem] font-black leading-tight tracking-tight sm:text-7xl"
        style={{ color: "#fff", textShadow: "0 3px 0 #b3140e, 0 6px 22px rgba(255,60,30,0.55)" }}
      >
        {u.title}
      </h3>
      <p
        className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
        style={{ color: "#ff5a1f", textShadow: "0 2px 0 #000, 0 0 18px rgba(255,90,31,0.6)" }}
      >
        {u.catchcopy}
      </p>
    </>
  );
}
