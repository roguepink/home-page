"use client";

// 2026-11-27 ノブさん: 季節もの。ホームページの一番上に、すごくキラキラしたクリスマスのカード。
// 「クリスマスですよ」のひとことを大きめに、可愛らしく。題名と、みんなの絵(最後の場面の、
// 一番上のおじさんがにっこり笑っているところ)を貼る。押すとその場で MV が流れる。
// クリスマスが終わったら、page.tsx からこのカードの行を消すだけで下ろせる。

import { useState, type CSSProperties } from "react";
import { Mochiy_Pop_One } from "next/font/google";

const pop = Mochiy_Pop_One({ weight: "400", subsets: ["latin"], display: "swap", preload: false });

// ★ YouTube に上げたら、共有アドレスのうしろの11桁を入れる
const YOUTUBE_ID = "";
const POSTER = "/music/bell-ga-nattara/poster.jpg";
const TITLE_IMG = "/music/bell-ga-nattara/title.png";
const MV_PAGE = "/music#2026-11-27-bell-ga-nattara";

const GOLD =
  "linear-gradient(180deg, #fffbe6 0%, #ffe9a3 25%, #ffcf4a 55%, #e0a325 80%, #a8700f 100%)";

// 雪とキラキラ(場所・大きさ・速さは決め打ち。毎回同じ形になるように)
const SNOW = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 3 + ((i * 7) % 5),
  delay: -((i * 1.7) % 9),
  dur: 7 + ((i * 3) % 6),
  drift: ((i % 5) - 2) * 10,
}));
const STARS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 53 + 7) % 96,
  top: (i * 31 + 11) % 92,
  size: 8 + ((i * 5) % 9),
  delay: -((i * 0.7) % 3),
}));

export default function ChristmasSpotlight() {
  const [playing, setPlaying] = useState(false);
  const canPlay = YOUTUBE_ID.length === 11;

  return (
    <div className="relative">
      {/* うしろで ゆらぐ金と赤の光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[30px] bg-[radial-gradient(60%_60%_at_30%_30%,rgba(255,207,74,0.45),transparent_70%),radial-gradient(60%_60%_at_75%_75%,rgba(214,32,48,0.5),transparent_70%)] blur-2xl motion-safe:animate-pulse"
      />

      <article className="xmas-card relative overflow-hidden rounded-[24px] bg-[#0d3a26] text-[#fff8ec] shadow-[0_0_0_2px_rgba(255,214,110,0.75),0_0_0_7px_rgba(196,22,28,0.85),0_0_0_9px_rgba(255,214,110,0.6),0_30px_90px_-24px_rgba(255,180,60,0.7)]">
        {/* 夜空のグラデーションと、下の雪の丘 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#1c6b45_0%,#0d3a26_55%,#061f14_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(255,255,255,0.22),transparent_70%)]"
        />

        {/* 降る雪 */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {SNOW.map((s, i) => (
            <span
              key={i}
              className="xmas-snow absolute top-[-12px] rounded-full bg-white"
              style={
                {
                  left: `${s.left}%`,
                  width: s.size,
                  height: s.size,
                  opacity: 0.55 + (s.size - 3) * 0.08,
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.dur}s`,
                  "--drift": `${s.drift}px`,
                } as CSSProperties
              }
            />
          ))}
          {/* きらきら光る星 */}
          {STARS.map((s, i) => (
            <svg
              key={`s${i}`}
              viewBox="0 0 24 24"
              className="xmas-twinkle absolute fill-[#ffe08a]"
              style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
            >
              <path d="M12 0c.6 5.4 2.6 9.2 12 12-9.4 2.8-11.4 6.6-12 12-.6-5.4-2.6-9.2-12-12 9.4-2.8 11.4-6.6 12-12z" />
            </svg>
          ))}
        </div>

        {/* 上の帯(赤と白のキャンディ) */}
        <div className="relative flex items-center justify-center gap-2 whitespace-nowrap bg-[repeating-linear-gradient(135deg,#c4161c_0_14px,#e8323a_14px_28px)] px-4 py-2.5 text-center text-xs font-black tracking-[0.14em] text-white shadow-[inset_0_-2px_0_rgba(255,214,110,0.7)] sm:text-sm sm:tracking-[0.2em]">
          <span className="rounded-full bg-[#ffcf4a] px-2 py-0.5 text-[10px] tracking-[0.2em] text-[#6a0a0a] sm:text-xs">
            NEW
          </span>
          MERRY CHRISTMAS ・ NEW MV
        </div>

        <div className="relative px-6 pb-10 pt-8 sm:px-12 sm:pb-14 sm:pt-10">
          {/* ひとこと(大きめ・可愛らしく) */}
          <p
            className={`${pop.className} xmas-bounce whitespace-nowrap text-center text-[min(8.4vw,2.6rem)] leading-tight sm:text-6xl`}
            style={{
              backgroundImage: GOLD,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter:
                "drop-shadow(0 3px 0 #8a0f14) drop-shadow(0 0 18px rgba(255,210,100,0.55))",
            }}
          >
            クリスマスですよ。
          </p>
          <p className="mt-3 text-center text-xs tracking-[0.25em] text-[#ffe3a8] sm:text-sm">
            ✦ おもちゃたちの クリスマス MV ✦
          </p>

          <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
            {/* スマホでは、題名を絵より先に見せる */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TITLE_IMG}
              alt="ベルがなったら"
              loading="lazy"
              className="xmas-sway -mb-2 w-full max-w-[300px] drop-shadow-[0_0_18px_rgba(255,230,170,0.6)] sm:hidden"
            />
            {/* 左: みんなの絵(押すとその場で再生) */}
            <div className="w-full max-w-[230px] shrink-0 sm:max-w-[290px]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border-[3px] border-[#ffd66e] bg-black shadow-[0_0_0_4px_rgba(196,22,28,0.9),0_0_50px_-8px_rgba(255,214,110,0.9)]">
                {playing && canPlay ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
                    title="ベルがなったら MV"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => canPlay && setPlaying(true)}
                    aria-label="ベルがなったら の MV を再生する"
                    className="group absolute inset-0 h-full w-full cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={POSTER}
                      alt="クリスマスの衣装を着たおもちゃたちが、絵本の中で眠っている絵"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#c4161c]/95 shadow-[0_0_0_3px_#ffd66e,0_0_30px_rgba(255,214,110,0.9)] transition-transform group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-3 left-0 right-0 text-center text-xs font-bold tracking-[0.2em] text-white/95">
                      MV を再生
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* 右: 題名とボタン */}
            <div className="w-full min-w-0 text-center sm:text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TITLE_IMG}
                alt="ベルがなったら"
                loading="lazy"
                className="xmas-sway hidden w-full max-w-[400px] drop-shadow-[0_0_18px_rgba(255,230,170,0.6)] sm:block"
              />

              <ul className="mt-0 flex flex-wrap sm:mt-6 justify-center gap-2 sm:justify-start">
                {["スウィング ジャズ", "MV 1分46秒", "AI といっしょに"].map((point) => (
                  <li
                    key={point}
                    className="rounded-full border border-[#ffd66e]/45 bg-[#c4161c]/25 px-3 py-1 text-xs text-[#ffe3a8]"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
                <a
                  href={MV_PAGE}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e8323a] to-[#a10f15] px-7 py-3.5 text-sm font-black text-white shadow-[0_0_0_2px_#ffd66e,0_10px_30px_-8px_rgba(255,180,60,0.8)] transition-transform hover:scale-[1.04] focus-visible:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none sm:text-base"
                >
                  音楽のページで見る →
                </a>
                {canPlay && (
                  <a
                    href={`https://youtube.com/shorts/${YOUTUBE_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#ffd66e]/60 px-6 py-3.5 text-sm font-bold text-[#ffe3a8] transition-colors hover:bg-[#ffd66e]/10 sm:text-base"
                  >
                    YouTube で見る
                  </a>
                )}
              </div>

              <p className="mt-5 text-[11px] tracking-[0.15em] text-[#c9b48a]">ROGUE PINK</p>
            </div>
          </div>
        </div>
      </article>

      <style>{`
        .xmas-snow { animation-name: xmas-fall; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes xmas-fall {
          0% { transform: translate3d(0, -10px, 0); }
          100% { transform: translate3d(var(--drift), 900px, 0); }
        }
        .xmas-twinkle { animation: xmas-tw 2.6s ease-in-out infinite; }
        @keyframes xmas-tw {
          0%, 100% { opacity: 0.15; transform: scale(0.6) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(20deg); }
        }
        .xmas-bounce { animation: xmas-bn 2.4s ease-in-out infinite; }
        @keyframes xmas-bn {
          0%, 100% { transform: translateY(0) scale(1); }
          12% { transform: translateY(-6px) scale(1.03); }
          24% { transform: translateY(0) scale(1); }
        }
        .xmas-sway { animation: xmas-sw 4s ease-in-out infinite; transform-origin: 50% 80%; }
        @keyframes xmas-sw {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .xmas-snow, .xmas-twinkle, .xmas-bounce, .xmas-sway { animation: none; }
        }
      `}</style>
    </div>
  );
}
