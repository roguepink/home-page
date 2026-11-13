"use client";

// 2026-11-13 ノブさん: 小説のすぐ下に「待望のニューシングル」を、ドーンと。
// 「心上等」は、AI を使いはじめて最初に「こいつはすごい」と心が震えた曲。ここから始まった。
// ここは文字を読ませる場所ではないので、気持ちはひとことだけ。
// 色は MV と同じ 赤・黒・金。暗いページの中で、小説の白い紙と並んで目立つように。

import { useState } from "react";

const YOUTUBE_ID = "WsvsmZkaC2Q";
const POSTER = "/music/kokoro-joto/poster.jpg";
const MV_PAGE = "/music#2026-11-13-kokoro-joto";

const GOLD =
  "linear-gradient(180deg, #fffbe0 0%, #ffe082 22%, #ffbe2e 50%, #eb8a0f 78%, #b85a05 100%)";

const POINTS = ["三味線 × 演歌 × ラップ", "MV 2分59秒", "AI といっしょに"];

export default function NewSingleSpotlight() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative">
      {/* うしろで ゆらぐ炎の光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-[#ff4d1a]/30 blur-2xl motion-safe:animate-pulse"
      />

      <article className="relative overflow-hidden rounded-2xl bg-[#140606] text-[#fdf3e6] shadow-[0_0_0_1px_rgba(255,170,40,0.55),0_24px_80px_-24px_rgba(255,80,20,0.75)]">
        {/* 下から炎の色がにじむ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_115%,rgba(255,90,20,0.45),transparent_60%)]"
        />

        {/* 上の帯 */}
        <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#7a0d0d] via-[#c4161c] to-[#7a0d0d] px-4 py-2.5 text-center text-xs font-black tracking-[0.18em] text-white sm:text-sm">
          <span className="rounded-full bg-[#ffcf4a] px-2 py-0.5 text-[10px] tracking-[0.2em] text-[#5a0a0a] sm:text-xs">
            NEW
          </span>
          NEW SINGLE RELEASE
        </div>

        <div className="relative flex flex-col items-center gap-9 px-7 py-10 sm:flex-row sm:items-center sm:gap-12 sm:px-14 sm:py-14">
          {/* 左: MV(押すとその場で再生) */}
          <div className="w-full max-w-[260px] shrink-0 sm:max-w-[280px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-xl border border-[#ffb43c]/50 bg-black shadow-[0_0_50px_-12px_rgba(255,120,30,0.8)]">
              {playing ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
                  title="心上等 MV"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="心上等 の MV を再生する"
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={POSTER}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#c4161c]/90 shadow-[0_0_30px_rgba(255,60,20,0.9)] transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="absolute bottom-3 left-0 right-0 text-center text-xs font-bold tracking-[0.2em] text-white/90">
                    MV を再生
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* 右: 題と気持ち */}
          <div className="w-full min-w-0 text-center sm:text-left">
            <p className="text-[11px] font-black tracking-[0.4em] text-[#ffb43c] sm:text-xs">
              DEATH SERIES
            </p>
            <p className="mt-3 text-sm font-bold tracking-[0.2em] text-[#ffd9a8] sm:text-base">
              待望のニューシングル
            </p>
            <h3
              className="mt-1 bg-clip-text text-6xl font-black leading-none tracking-tight text-transparent sm:text-8xl"
              style={{
                backgroundImage: GOLD,
                filter: "drop-shadow(0 0 22px rgba(255,110,20,0.65)) drop-shadow(0 3px 0 #3a0505)",
              }}
            >
              心上等
            </h3>

            <p className="mx-auto mt-7 max-w-md text-sm leading-loose text-[#f2dcc4] sm:mx-0 sm:text-base">
              AI を使いはじめたころ、
              <br />
              はじめて「こいつはすごい」と心が震えた曲。
              <br />
              ここから、始まりました。
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-[#ffb43c]/35 px-3 py-1 text-xs text-[#ffd9a8]"
                >
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href={MV_PAGE}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#e0241f] to-[#9c0f0f] px-7 py-3.5 text-sm font-black text-white shadow-[0_10px_30px_-8px_rgba(255,60,20,0.85)] transition-transform hover:scale-[1.04] focus-visible:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none sm:text-base"
              >
                音楽のページで見る →
              </a>
              <a
                href={`https://youtube.com/shorts/${YOUTUBE_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#ffb43c]/50 px-6 py-3.5 text-sm font-bold text-[#ffd9a8] transition-colors hover:bg-[#ffb43c]/10 sm:text-base"
              >
                YouTube で見る
              </a>
            </div>

            <p className="mt-5 text-[11px] tracking-[0.15em] text-[#b8957a]">
              ROGUE PINK
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
