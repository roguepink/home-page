"use client";

import { useState } from "react";

type YouTubeEmbedProps = {
  /** YouTube の動画ID（共有アドレスの、うしろの11桁） */
  id: string;
  /** 再生ボタンの下に出る小さな見出し */
  label?: string;
  /** ショートなど、縦長の動画のときは true */
  vertical?: boolean;
};

/**
 * 押されるまで YouTube を読み込まない。
 * 最初は写真1枚だけなので、ページが重くならない。
 */
export default function YouTubeEmbed({
  id,
  label,
  vertical = false,
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={vertical ? "mx-auto w-full max-w-[240px]" : "w-full"}>
      <div
        className={`relative overflow-hidden rounded-xl border border-border bg-black ${
          vertical ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={label ?? "YouTube"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={label ? `${label}を再生する` : "動画を再生する"}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="ml-1 h-7 w-7 fill-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      {label && (
        <p className="mt-2 text-center text-xs tracking-[0.2em] text-muted">
          {label}
        </p>
      )}
    </div>
  );
}
