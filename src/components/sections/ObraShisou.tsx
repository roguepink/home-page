"use client";

// 2026-11-25 ノブさん:「ホームページに出す時は、執筆のような形で文字を読みながら、速度も選べるように。
//   文章だけでも読めるようにしたい」
// → 執筆の読み上げ(ReadAloud)と同じ形: 文章はいつでも全部読める。再生すると、いま読んでいる段落が光る。
//   段落をさわると、そこから聞ける。速さは3段。画面は勝手に動かさない(サイトの決まり)。
import { useCallback, useEffect, useRef, useState } from "react";
import { SHISOU, SHISOU_AUDIO, SHISOU_DURATION } from "./obra-shisou-data";

const MINCHO = "'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif";
const DIDOT = "Didot,'Bodoni 72','Bodoni MT','Playfair Display','Times New Roman',serif";
const GOLD = "#e3c27a";
const SOFT = "#bfae86";

type Speed = "slow" | "normal" | "fast";
// ノブさんの声そのものの速さを「ふつう」にする
const SPEEDS: [Speed, string, number][] = [
  ["slow", "ゆっくり", 0.85],
  ["normal", "ふつう", 1],
  ["fast", "はやい", 1.25],
];
const rateOf = (s: Speed) => SPEEDS.find(([k]) => k === s)?.[2] ?? 1;

// 閉じているときに見せる段落の数
const PREVIEW = 4;

function mmss(sec: number) {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function ObraShisou() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>("normal");
  const [active, setActive] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [open, setOpen] = useState(false);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio(SHISOU_AUDIO);
      a.preload = "auto";
      a.addEventListener("timeupdate", () => {
        const t = a.currentTime;
        setTime(t);
        let idx = 0;
        for (let i = 0; i < SHISOU.length; i++) if (t >= SHISOU[i].s - 0.05) idx = i;
        setActive(idx);
        if (idx >= PREVIEW) setOpen(true);
      });
      a.addEventListener("ended", () => {
        setPlaying(false);
        setActive(null);
        setTime(0);
        a.currentTime = 0;
      });
      a.addEventListener("pause", () => setPlaying(false));
      a.addEventListener("play", () => setPlaying(true));
      audioRef.current = a;
    }
    return audioRef.current;
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rateOf(speed);
  }, [speed]);

  useEffect(() => () => audioRef.current?.pause(), []);

  const playFrom = useCallback(
    (sec?: number) => {
      const a = getAudio();
      a.playbackRate = rateOf(speed);
      if (sec !== undefined) a.currentTime = sec;
      a.play().catch(() => setPlaying(false));
    },
    [getAudio, speed],
  );

  const toggle = () => {
    const a = audioRef.current;
    if (playing && a) a.pause();
    else playFrom();
  };

  const shown = open ? SHISOU : SHISOU.slice(0, PREVIEW);
  const progress = Math.min(1, time / SHISOU_DURATION);

  return (
    <div
      className="mt-6 overflow-hidden rounded-3xl px-5 pb-8 pt-7 sm:px-10"
      style={{ background: "linear-gradient(180deg,#0b0b1a,#070814)", border: "1px solid rgba(227,194,122,.35)", color: "#f4ecd8" }}
    >
      <p className="text-center text-[11px] tracking-[0.38em]" style={{ fontFamily: DIDOT, color: GOLD, opacity: 0.8 }}>
        — MANIFIESTO —
      </p>
      <h3 className="mt-3 text-center text-xl tracking-[0.2em] sm:text-2xl" style={{ fontFamily: MINCHO, paddingLeft: "0.2em" }}>
        いまの段階の思想
      </h3>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "読み上げを止める" : "ノブの声で聞く"}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold tracking-[0.1em] transition-colors sm:text-sm"
          style={{
            border: `1px solid ${playing ? GOLD : "rgba(227,194,122,.5)"}`,
            background: playing ? "rgba(227,194,122,.16)" : "transparent",
            color: playing ? "#fff3d0" : GOLD,
          }}
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
            {playing ? (
              <>
                <rect x="3.5" y="3" width="3" height="10" rx="1" />
                <rect x="9.5" y="3" width="3" height="10" rx="1" />
              </>
            ) : (
              <path d="M4 2.8v10.4a.6.6 0 0 0 .92.5l8.2-5.2a.6.6 0 0 0 0-1L4.92 2.3A.6.6 0 0 0 4 2.8Z" />
            )}
          </svg>
          {playing ? "止める" : time > 0 ? "続きから聞く" : "聞く"}
        </button>

        <div role="group" aria-label="読み上げの速さ" className="inline-flex rounded-full p-1" style={{ border: "1px solid rgba(227,194,122,.35)" }}>
          {SPEEDS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSpeed(key)}
              aria-pressed={speed === key}
              className="rounded-full px-4 py-2.5 text-xs font-bold transition-colors"
              style={speed === key ? { background: "rgba(227,194,122,.16)", color: "#fff3d0" } : { color: SOFT }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-sm items-center gap-3 text-[11px] tabular-nums" style={{ color: SOFT }}>
        <span>{mmss(time)}</span>
        <div className="h-[3px] flex-1 overflow-hidden rounded-full" style={{ background: "rgba(227,194,122,.18)" }}>
          <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: GOLD }} />
        </div>
        <span>{mmss(SHISOU_DURATION)}</span>
      </div>

      <div className="relative mx-auto mt-6 max-w-[560px]">
        <div className="space-y-2" style={{ fontFamily: MINCHO }}>
          {shown.map((p, i) => {
            const on = active === i;
            return (
              <p
                key={i}
                onClick={() => playFrom(p.s)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    playFrom(p.s);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`ここから聞く: ${p.lines[0]}`}
                title="ここから聞く"
                className="-mx-3 cursor-pointer rounded-xl px-3 py-2.5 text-[15px] leading-[2.1] transition-colors sm:text-base"
                style={{
                  color: on ? "#fff3d0" : active !== null ? "rgba(230,219,194,.55)" : "#e6dbc2",
                  background: on ? "rgba(227,194,122,.1)" : "transparent",
                }}
              >
                {p.lines.map((l, k) => (
                  <span key={k} className="block">
                    {l}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
        {!open ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: "linear-gradient(180deg,rgba(7,8,20,0),#070814)" }}
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.15em]"
          style={{ border: "1px solid rgba(227,194,122,.35)", color: GOLD }}
        >
          {open ? "閉じる" : "続きを読む"}
        </button>
      </div>
      <p className="mt-5 text-center text-[11px] leading-relaxed" style={{ color: "rgba(191,174,134,.75)" }}>
        声:NOBU(AI で作りました)
      </p>
    </div>
  );
}
