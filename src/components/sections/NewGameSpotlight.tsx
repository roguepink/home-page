// 2026-11-14 ノブさん: ニューシングルの1つ下に「ニューゲーム」を。新しく入荷しました、的に、ちょっと楽しそうに。
// 2026-11-15 ノブさん: だるま落としの「すぐ下」に、勇者へっぽこを同じ形で。だるま落としの次に、必ず。
//   → 形は1つにして、中身(題・絵・色)だけを ゲームごとに書く。並びは NEW_GAMES の順(上から)。
// 2026-11-17 ノブさん: だるま落とし・勇者へっぽこを外して、爽快ゾンビ無双の「大型アップデート」を ここに。
//   新しいゲームではなく「アップデートしました」の形で。超巨大ボスを倒せるか、をかっこよく・ゲームっぽいカードで。
//   → 新入荷(NEW_GAMES・明るい紙のカード)とは別に、UPDATES(黒と赤の ゲームふうのカード)を作った。並びは UPDATES → NEW_GAMES。
//   UpdateCard の色は style で書いてある(ほかのカードの色の書き方と分けて、1枚で完結させるため)。
// 2026-11-18 ノブさん: 殴られ屋を ゾンビ無双の下に「新しく入荷しました」で。ストレス解消ゲームとして、見た目も楽しく。
//   作った張本人(NOBU)も思いっきり殴れるかも、という文も。
//   ★「本日入荷」は使わない(次の日も残るので)。「新しく入荷しました」「新入荷」にする。(ノブさん指示 2026-11-18)
//   → 黄色と黒の まんが ふうのカード(StressCard)を作った。並びは UPDATES → STRESS → NEW_GAMES。
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
  /** 「新入荷!」の丸 */
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

type StressGame = {
  url: string;
  poster: string;
  posterAlt: string;
  /** 張本人の顔 */
  face: string;
  faceAlt: string;
  kicker: string;
  title: string;
  /** 題の下の札 */
  label: string;
  /** 本文(1行ずつ。かたまりごとに分ける) */
  lines: string[][];
  /** 張本人の箱(かたまりごと) */
  boss: { head: string; big: string[]; small: string[] };
  points: string[];
  playLabel: string;
  note: string[];
};

// 新入荷(黄色と黒の まんがふうカード)。ゾンビ無双の すぐ下に出る
const STRESS: StressGame[] = [
  // 殴られ屋(roguepink/nagurare) 2026-11-18
  {
    url: "https://roguepink.github.io/nagurare/",
    poster: "/games/nagurare/poster.jpg",
    posterAlt: "ラーメン屋で、ぼったくり店長の顔にグローブがめりこみ「ガツン!」の字と 46コンボが出ている画面",
    face: "/games/nagurare/nobu.jpg",
    faceAlt: "このアプリを作った NOBU の顔。たんこぶが積み上がり、目のまわりが青くはれているのに ニヤニヤしている",
    kicker: "1分間、殴って殴って 殴りまくれ!",
    title: "殴られ屋",
    label: "ストレス解消ゲーム",
    lines: [
      ["相手は、嫌なやつばかりの", "「殴られ屋」10人。"],
      ["タップすると グローブが飛び出して、", "顔に ガツン!"],
      ["殴るほど 顔がはれて、", "たんこぶが 積み上がっていく。"],
      ["やり返しては こないので、", "思う存分 どうぞ。"],
    ],
    boss: {
      head: "⚠ ひみつ情報 ⚠",
      big: ["このアプリを作った", "張本人も、", "思いっきり", "殴れる…", "かも!?"],
      small: ["ただし 作者だけあって、", "いちばん速い。", "「当てられるもんなら", "当ててみな」", "とのこと。"],
    },
    points: ["嫌なやつ 10人", "殴るほど たんこぶタワー", "ひみつの部屋 あり"],
    playLabel: "殴られ屋 を遊ぶ",
    note: ["無料・広告なし・登録なし", "／ ※ パロディです。本物の人は 殴らないでね"],
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

/** 大型アップデート → 新入荷(まんがふう)→ 新入荷 の順に、上から すべて出す */
export default function NewGameSpotlight() {
  return (
    <div className="flex flex-col gap-10">
      {UPDATES.map((u) => (
        <UpdateCard key={u.url} u={u} />
      ))}
      {STRESS.map((g) => (
        <StressCard key={g.url} g={g} />
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
          <span className="hidden min-[380px]:inline">NEW GAME</span>
          新しく入荷しました!
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
              新
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

// ---------- 新入荷: ストレス解消ゲームのカード(黄色と黒・まんがの「バキッ!」) ----------
const INK = "#17102b";
const DOTS = "radial-gradient(rgba(255,170,0,0.45) 1.6px, transparent 1.7px)";
const BURST = "polygon(50% 0%, 61% 22%, 85% 8%, 78% 34%, 100% 42%, 80% 56%, 94% 80%, 68% 74%, 60% 100%, 47% 78%, 26% 96%, 26% 70%, 0% 72%, 16% 52%, 2% 30%, 26% 30%, 22% 6%, 42% 22%)";

function Burst({ text, className, color, bg, rotate }: { text: string; className: string; color: string; bg: string; rotate: number }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-10 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="relative block h-[84px] w-[110px]">
        <span className="absolute inset-0" style={{ background: INK, clipPath: BURST }} />
        <span className="absolute inset-[5px]" style={{ background: bg, clipPath: BURST }} />
        <span
          className="absolute inset-0 flex items-center justify-center text-[22px] font-black"
          style={{ color, textShadow: `2px 2px 0 ${INK}, -2px -2px 0 ${INK}, 2px -2px 0 ${INK}, -2px 2px 0 ${INK}` }}
        >
          {text}
        </span>
      </span>
    </span>
  );
}

function StressCard({ g }: { g: StressGame }) {
  return (
    <div className="relative w-full min-w-0">
      {/* うしろで 黄色く光る */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] blur-2xl"
        style={{ background: "rgba(255,200,40,0.45)" }}
      />

      <article
        className="relative overflow-hidden rounded-2xl"
        style={{ background: "#ffe14a", backgroundImage: DOTS, backgroundSize: "14px 14px", color: INK, boxShadow: `0 0 0 4px ${INK}, 0 10px 0 4px ${INK}` }}
      >
        {/* 上の帯: 新しく入荷しました */}
        <div
          className="relative flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 text-center text-xs font-black tracking-[0.12em] sm:text-sm sm:tracking-[0.18em]"
          style={{ background: INK, color: "#ffe14a" }}
        >
          <span
            className="rounded-full px-2 py-0.5 text-[10px] tracking-[0.2em] motion-safe:animate-pulse sm:text-xs"
            style={{ background: "#ff3b3b", color: "#fff" }}
          >
            NEW
          </span>
          <span className="hidden sm:inline">🥊</span>
          <span className="hidden min-[380px]:inline">NEW GAME</span>
          新しく入荷しました!
          <span className="hidden sm:inline">🥊</span>
        </div>

        <div className="relative flex flex-col items-center gap-8 px-6 py-10 sm:flex-row sm:items-start sm:gap-12 sm:px-14 sm:py-14">
          {/* スマホでは、題を絵より先に見せる */}
          <div className="text-center sm:hidden">
            <StressHeading g={g} />
          </div>

          {/* 左: ゲームの画面(押すとそのまま遊べる)+ まんがの字 */}
          <div className="relative w-full max-w-[210px] shrink-0 sm:max-w-[260px]">
            <Burst text="バキッ!" className="-left-12 top-6" color="#fff" bg="#ff3b3b" rotate={-14} />
            <Burst text="ドゴッ!" className="-right-12 bottom-16" color="#ffe14a" bg="#ff7a1a" rotate={12} />
            <span
              aria-hidden
              className="absolute -right-4 -top-4 z-20 flex h-16 w-16 rotate-12 items-center justify-center rounded-full text-center text-[11px] font-black leading-tight text-white motion-safe:animate-bounce"
              style={{ background: "#ff3b3b", boxShadow: `0 0 0 3px ${INK}` }}
            >
              新
              <br />
              入荷!
            </span>
            <a
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={g.playLabel}
              className="group relative block aspect-[390/844] -rotate-2 overflow-hidden rounded-xl border-4 transition-transform duration-300 hover:rotate-0"
              style={{ borderColor: INK, background: INK, boxShadow: `6px 8px 0 ${INK}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.poster}
                alt={g.posterAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-10 text-center text-xs font-black tracking-[0.15em] text-white">
                タップで すぐ殴れる
              </span>
            </a>
          </div>

          {/* 右: 題・ひとこと・張本人の箱 */}
          <div className="w-full min-w-0 text-center sm:text-left">
            <div className="hidden sm:block">
              <StressHeading g={g} />
            </div>

            <p className="mx-auto mt-0 max-w-md text-sm font-bold leading-loose sm:mx-0 sm:mt-6 sm:text-base">
              {g.lines.map((line, i) => (
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

            {/* 張本人の箱 */}
            <div
              className="relative mx-auto mt-7 flex max-w-md items-center gap-4 rounded-2xl border-[3px] border-dashed bg-white px-4 py-4 text-left sm:mx-0"
              style={{ borderColor: "#ff3b3b", boxShadow: `4px 5px 0 ${INK}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.face}
                alt={g.faceAlt}
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-full border-[3px] object-cover sm:h-24 sm:w-24"
                style={{ borderColor: INK }}
              />
              <div className="min-w-0">
                <p className="text-[11px] font-black tracking-[0.15em]" style={{ color: "#ff3b3b" }}>
                  {g.boss.head}
                </p>
                <p className="mt-1 text-sm font-black leading-snug sm:text-base">
                  {g.boss.big.map((part) => (
                    <span key={part} className="inline-block">
                      {part}
                    </span>
                  ))}
                </p>
                <p className="mt-1.5 text-[11px] font-bold leading-relaxed opacity-75 sm:text-xs">
                  {g.boss.small.map((part) => (
                    <span key={part} className="inline-block">
                      {part}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {g.points.map((point) => (
                <li
                  key={point}
                  className="rounded-full border-2 bg-white px-3 py-1 text-xs font-black"
                  style={{ borderColor: INK }}
                >
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-[3px] px-7 py-3.5 text-sm font-black text-white transition-transform hover:scale-[1.04] focus-visible:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none sm:text-base"
                style={{ background: "#ff3b3b", borderColor: INK, boxShadow: `0 5px 0 ${INK}` }}
              >
                🥊 いますぐ殴る →
              </a>
              <a
                href="/games"
                className="inline-flex items-center gap-2 rounded-full border-[3px] bg-white px-6 py-3.5 text-sm font-black transition-colors hover:bg-white/70 sm:text-base"
                style={{ borderColor: INK }}
              >
                ほかのゲームも見る
              </a>
            </div>

            <p className="mt-5 text-[11px] font-bold tracking-[0.1em] opacity-70">
              {g.note.map((part) => (
                <span key={part} className="inline-block">
                  {part}
                </span>
              ))}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

function StressHeading({ g }: { g: StressGame }) {
  return (
    <>
      <p className="text-sm font-black tracking-[0.12em] sm:text-base" style={{ color: "#e8261c" }}>
        {g.kicker}
      </p>
      <h3
        className="mt-1 text-6xl font-black leading-tight tracking-tight sm:text-7xl"
        style={{ color: "#ff3b3b", textShadow: `3px 3px 0 ${INK}, -3px -3px 0 ${INK}, 3px -3px 0 ${INK}, -3px 3px 0 ${INK}, 6px 8px 0 ${INK}` }}
      >
        {g.title}
      </h3>
      <p className="mt-3 inline-block -rotate-2 rounded-full px-4 py-1.5 text-sm font-black tracking-[0.1em] sm:text-base" style={{ background: INK, color: "#ffe14a" }}>
        {g.label}
      </p>
    </>
  );
}
