// 2026-11-19 ノブさん:「ただいま準備中です みたいな形で 居酒屋ノブを面白そうな形のデザインで載せといて。
//   もちろん無料です という文言も入れて。近日公開予定です という形で」
// → のれん・ちょうちん・「準備中」の木札がかかった 居酒屋の入口ふうのカード。
//   まだ「お店に入る」ボタン・アプリのアドレス・日時は出さない(準備中なので)。
//   開店するときは IzakayaCard.tsx(アプリの news.json を読んで 次の開店日・マスターの回を出すカード)に差しかえる。
//   ★「本日」は使わない。個人の事情は書かない。
// ここは何も動かさない(読んでいる間は何も動かない、のサイトの決まり)。

const MINCHO = "'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif";

function Lantern({ char, className = "" }: { char: string; className?: string }) {
  return (
    <svg className={className} width="46" height="66" viewBox="0 0 40 58" aria-hidden="true">
      <line x1="20" y1="0" x2="20" y2="7" stroke="#2a1a10" strokeWidth="1.5" />
      <rect x="11" y="6" width="18" height="4" rx="1" fill="#1d1a18" />
      <ellipse cx="20" cy="29" rx="17" ry="20" fill="#d12a1e" />
      <ellipse cx="20" cy="29" rx="17" ry="20" fill="url(#izl)" />
      {[15, 21, 27, 33, 39, 45].map((y) => (
        <path key={y} d={`M4 ${y} Q20 ${y + 3} 36 ${y}`} stroke="rgba(0,0,0,.22)" strokeWidth="1" fill="none" />
      ))}
      <text x="20" y="35" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1a0a06" fontFamily={MINCHO}>
        {char}
      </text>
      <rect x="11" y="48" width="18" height="4" rx="1" fill="#1d1a18" />
      <line x1="20" y1="52" x2="20" y2="58" stroke="#e8a33d" strokeWidth="2" />
      <defs>
        <radialGradient id="izl" cx="40%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffd08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d12a1e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function IzakayaComingSoon() {
  const noren = ["居", "酒", "屋", "ノ", "ブ"];
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-[3px]"
      style={{ background: "linear-gradient(135deg,#8a5a2e,#d12a1e 45%,#e8a33d)", boxShadow: "0 18px 50px rgba(209,42,30,.28)" }}
    >
      <div
        className="relative overflow-hidden rounded-[22px] pb-7"
        style={{
          color: "#fff4e0",
          background:
            "repeating-linear-gradient(90deg,rgba(0,0,0,.06) 0 2px,transparent 2px 46px),linear-gradient(180deg,#3a2414 0%,#4a2e1a 60%,#2a1810 100%)",
        }}
      >
        {/* 軒(のき) */}
        <div className="h-4 w-full" style={{ background: "linear-gradient(180deg,#1d1410,#2a1a10)", boxShadow: "0 3px 6px rgba(0,0,0,.5)" }} />

        {/* のれん + 左右のちょうちん */}
        <div className="relative flex items-start justify-center px-3 sm:px-8">
          <Lantern char="ノ" className="mt-1 hidden shrink-0 min-[400px]:block" />
          <div className="mx-2 flex flex-1 justify-center gap-[3px] sm:mx-4" style={{ maxWidth: 420 }}>
            {noren.map((ch, i) => (
              <div
                key={i}
                className="flex h-24 flex-1 items-start justify-center rounded-b-lg pt-3 sm:h-28"
                style={{
                  background: "linear-gradient(180deg,#1f2a4a,#26335a 70%,#1f2a4a)",
                  boxShadow: "inset 0 -6px 10px rgba(0,0,0,.25)",
                  transform: `rotate(${[-1.5, 1, -0.5, 1.2, -1][i]}deg)`,
                  transformOrigin: "top center",
                }}
              >
                <span className="text-2xl font-black sm:text-3xl" style={{ fontFamily: MINCHO, color: "#f6f1e6" }}>
                  {ch}
                </span>
              </div>
            ))}
          </div>
          <Lantern char="ブ" className="mt-1 hidden shrink-0 min-[400px]:block" />
        </div>

        {/* 「準備中」の木札 */}
        <div className="relative mt-4 flex justify-center">
          <div className="relative" style={{ transform: "rotate(-4deg)" }}>
            {/* つるす ひも */}
            <svg className="absolute -top-5 left-1/2 -translate-x-1/2" width="90" height="24" viewBox="0 0 90 24" aria-hidden="true">
              <path d="M8 24 L45 2 L82 24" stroke="#c9a46a" strokeWidth="2" fill="none" />
              <circle cx="45" cy="3" r="3" fill="#8a6a3a" />
            </svg>
            <div
              className="rounded-md px-7 py-3 text-center sm:px-10"
              style={{
                background: "linear-gradient(180deg,#e8cf9e,#d9b77a)",
                border: "3px solid #8a5a2e",
                boxShadow: "0 6px 0 #5a3a1e, 0 10px 20px rgba(0,0,0,.4)",
                color: "#2a1a10",
              }}
            >
              <p className="text-xs font-bold tracking-[0.3em]" style={{ color: "#6b4a2a" }}>ただいま</p>
              <p className="text-4xl font-black tracking-[0.15em] sm:text-5xl" style={{ fontFamily: MINCHO }}>準備中</p>
            </div>
          </div>
          {/* 「近日公開予定」の はんこ */}
          <div
            className="absolute right-3 top-[-6px] flex h-[76px] w-[76px] items-center justify-center rounded-full text-center sm:right-10 sm:h-[88px] sm:w-[88px]"
            style={{ border: "3px solid #ff5a3c", color: "#ff5a3c", transform: "rotate(14deg)", background: "rgba(42,24,16,.55)" }}
          >
            <span className="text-[13px] font-black leading-tight sm:text-sm" style={{ fontFamily: MINCHO }}>
              近日
              <br />
              公開予定
            </span>
          </div>
        </div>

        {/* 紹介 */}
        <div className="relative mt-7 px-5 text-center sm:px-10">
          <p className="text-xs font-bold tracking-[0.25em]" style={{ color: "#e8c89a" }}>
            週に一度、1時間だけ開く
          </p>
          <h3 className="mt-1 text-3xl font-black tracking-wider sm:text-4xl" style={{ fontFamily: MINCHO, textShadow: "0 2px 0 #000" }}>
            居酒屋ノブ
          </h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: "#f0dcb8" }}>
            <span className="inline-block">スマホの中の 小さな居酒屋。</span>{" "}
            <span className="inline-block">カウンター席で、</span>
            <span className="inline-block">なんでも話せる1時間。</span>
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2 text-sm font-bold">
            {["🍢 料理とお酒", "🍻 みんなで乾杯", "🎵 みんなで同じ曲"].map((t) => (
              <li key={t} className="rounded-full px-3 py-1" style={{ background: "rgba(243,230,204,.12)", border: "1px solid rgba(232,163,61,.45)" }}>
                {t}
              </li>
            ))}
          </ul>
          <p
            className="mx-auto mt-5 inline-block rounded-full px-5 py-2 text-lg font-black sm:text-xl"
            style={{ background: "#e8a33d", color: "#2a1a10", boxShadow: "0 4px 0 #8a5a1a" }}
          >
            もちろん、すべて無料です
          </p>
          {/* 2026-11-21 ノブさん:「覗いてみる ボタンをつけて。準備中のあいだは デモ(お客さん4人・後ろでハンターカブの PV・会話も見える)」
              → アプリの見本(#demo)を 別のページで開く。このサイトの中では動かさない(読んでいる間は何も動かない、の決まり) */}
          <div className="mt-5">
            <a
              href="https://roguepink.github.io/izakaya/#demo"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-black sm:text-lg"
              style={{ background: "#1f2a4a", color: "#f6f1e6", border: "2px solid #e8a33d", boxShadow: "0 4px 0 #0e1428" }}
            >
              👀 お店の中を覗いてみる
            </a>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: "#c9b38a" }}>
              <span className="inline-block">見本です。</span>
              <span className="inline-block">お客さん4人と大将が、中で話しています。</span>
            </p>
          </div>
          <p className="mt-4 text-xs leading-relaxed" style={{ color: "#c9b38a" }}>
            <span className="inline-block">開店の日が決まったら、</span>
            <span className="inline-block">ここでお知らせします。</span>
          </p>
        </div>
      </div>
    </div>
  );
}
