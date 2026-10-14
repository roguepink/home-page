"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Song, SongVersion } from "../songs";

const formatTime = (s: number) =>
  Number.isFinite(s)
    ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
    : "0:00";

/**
 * 曲を流しながら、今歌っているところの歌詞を1文字ずつ塗っていく。
 * 歌詞の時刻は文字だけのメモ(1曲 数KB)なので、ページは重くならない。
 *
 * 1秒に何十回も動くところ(塗り・スクロール・時間の表示)は、
 * React で描き直すと重いので、要素を直接さわっている。
 */
export default function LyricPlayer({ song }: { song: Song }) {
  const [version, setVersion] = useState<SongVersion>(song.versions[0]);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const userScrollUntil = useRef(0);

  // 切り替えたら、続きから流す(止まっていたら止まったまま)
  const resumeRef = useRef(false);
  const switchTo = (v: SongVersion) => {
    if (v.key === version.key) return;
    resumeRef.current = !!audioRef.current && !audioRef.current.paused;
    setVersion(v);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const box = boxRef.current;
    if (!audio || !box) return;

    if (resumeRef.current) audio.play().catch(() => {});
    box.scrollTop = 0;

    const lineEls = Array.from(box.querySelectorAll<HTMLElement>("[data-line]"));
    const lines = version.lyrics.map((L, i) => ({
      el: lineEls[i],
      spans: Array.from(lineEls[i].querySelectorAll<HTMLElement>("span")),
      t: L.t,
      start: L.t[0],
      end: L.t[L.t.length - 1] + 0.5,
    }));

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${song.title}(${version.label})`,
        artist: song.artist,
        album: song.title,
        artwork: [{ src: version.cover, sizes: "600x600", type: "image/jpeg" }],
      });
    }

    let current = -2;
    let raf = 0;
    const frame = () => {
      const t = audio.currentTime;

      // 今歌っている行: 歌い始めから、次の行が始まるまで(長い間奏のあいだは消す)
      let now = -1;
      for (let i = 0; i < lines.length; i++) {
        const next = lines[i + 1]?.start ?? Infinity;
        if (t >= lines[i].start - 0.15 && t < Math.min(next - 0.15, lines[i].end + 2.5)) {
          now = i;
          break;
        }
      }

      if (now !== current) {
        lines.forEach((L, i) => {
          L.el.dataset.state = i === now ? "now" : (now >= 0 ? i < now : L.start < t) ? "past" : "";
          if (i !== now) L.spans.forEach((s) => s.style.removeProperty("--p"));
        });
        if (now >= 0 && Date.now() > userScrollUntil.current) {
          const el = lines[now].el;
          box.scrollTo({
            top: el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2,
            behavior: "smooth",
          });
        }
        current = now;
      }

      // 1文字ずつ、歌った分だけ色を塗る
      if (now >= 0) {
        const L = lines[now];
        L.spans.forEach((s, i) => {
          const a = L.t[i];
          const b = i + 1 < L.t.length && L.t[i + 1] > a ? L.t[i + 1] : a + 0.35;
          const p = Math.min(1, Math.max(0, (t - a) / (b - a)));
          s.style.setProperty("--p", `${(p * 100).toFixed(1)}%`);
        });
      }

      if (audio.duration && seekRef.current && timeRef.current) {
        seekRef.current.value = String((t / audio.duration) * 1000);
        timeRef.current.textContent = formatTime(t);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [version, song.title, song.artist]);

  const holdScroll = () => {
    userScrollUntil.current = Date.now() + 3000;
  };

  return (
    <div style={{ "--accent": song.color } as CSSProperties}>
      {/* 同じ絵をぼかして背景に敷く */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 scale-125 bg-cover bg-center opacity-40 blur-3xl transition-[background-image] duration-700"
        style={{ backgroundImage: `url(${version.poster})` }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-background/70" />

      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={version.cover}
          alt={`${song.title}(${version.label})のジャケット`}
          width={108}
          height={108}
          className="h-[108px] w-[108px] flex-none rounded-2xl object-cover shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
        />
        <div>
          <h1 className="text-2xl font-black tracking-wide text-foreground sm:text-3xl">
            {song.title}
          </h1>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            {song.artist} ・ Suno AI で制作
          </p>
        </div>
      </div>

      {song.versions.length > 1 && (
        <div className="mt-5 flex gap-2">
          {song.versions.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => switchTo(v)}
              className={`flex-1 rounded-full border py-2.5 text-sm font-bold transition-colors ${
                v.key === version.key
                  ? "border-[var(--accent)] bg-[var(--accent)] text-background"
                  : "border-white/20 bg-white/5 text-muted"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          aria-label={playing ? "一時停止" : "再生"}
          onClick={() => {
            const a = audioRef.current;
            if (!a) return;
            if (a.paused) a.play();
            else a.pause();
          }}
          className="grid h-14 w-14 flex-none place-items-center rounded-full bg-[var(--accent)]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-background">
            <path d={playing ? "M6 4h4v16H6zM14 4h4v16h-4z" : "M7 4l14 8-14 8z"} />
          </svg>
        </button>
        <div className="flex-1">
          <input
            ref={seekRef}
            type="range"
            min={0}
            max={1000}
            defaultValue={0}
            aria-label="再生位置"
            onInput={(e) => {
              const a = audioRef.current;
              if (a?.duration) a.currentTime = (Number(e.currentTarget.value) / 1000) * a.duration;
            }}
            className="w-full accent-[var(--accent)]"
          />
          <div className="mt-0.5 flex justify-between text-[11px] tabular-nums text-muted">
            <span ref={timeRef}>0:00</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div
        ref={boxRef}
        onTouchStart={holdScroll}
        onWheel={holdScroll}
        className="lyrics relative mt-5 h-[56vh] overflow-y-auto px-1 py-[24vh]"
      >
        {version.lyrics.map((L, i) => (
          <div
            key={`${version.key}-${i}`}
            data-line
            onClick={() => {
              const a = audioRef.current;
              if (!a) return;
              a.currentTime = Math.max(0, L.t[0] - 0.3);
              a.play();
            }}
            className={`lyric-line cursor-pointer py-[7px] text-[19px] font-extrabold leading-normal ${
              i > 0 && L.sec !== version.lyrics[i - 1].sec ? "mt-6" : ""
            }`}
          >
            {Array.from(L.text).map((ch, j) => (
              <span key={j}>{ch}</span>
            ))}
          </div>
        ))}
      </div>

      <a
        href={version.mp3}
        download={`${song.title}(${version.label}).mp3`}
        className="mt-6 block rounded-2xl border border-white/20 bg-white/5 py-4 text-center font-extrabold text-foreground transition-colors hover:border-[var(--accent)]"
      >
        この曲をダウンロード({version.size})
      </a>
      <p className="mt-3 text-xs leading-loose text-muted">
        iPhone は「ファイル」アプリに保存され、そこで再生できます。
        <br />
        LINE から開いたときは、右上のメニューから Safari / Chrome で開いてください。
      </p>

      <audio
        ref={audioRef}
        src={version.mp3}
        preload="metadata"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
    </div>
  );
}
