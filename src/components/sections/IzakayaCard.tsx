"use client";

// 2026-11-19 ノブさん: ホームページの上のほうに「居酒屋のぶ」のカードを1枚。
//   今週は何月何日 何時から開店するか、今回はほかの人がマスターをやる回か、などのお知らせを出す。
//   誕生日会や ちょっとしたイベントの お知らせにも使う。「すべて無料です」は必ず入れる。
// 中身は アプリの news.json(https://roguepink.github.io/izakaya/news.json)を その場で読む。
//   読めないときは「毎週金曜 21:00〜22:00」の いつもの表示。お知らせを変えるときは アプリの news.json だけ直せばよい
//   (ホームページは直さなくてよい)。時間は日本時間で計算する。

import { useEffect, useState } from "react";

const NEWS_URL = "https://roguepink.github.io/izakaya/news.json";
const APP_URL = "https://roguepink.github.io/izakaya/";

type Weekly = { day: number; start: string; end: string };
type ShopEvent = {
  date: string; // "2026-11-27"(日本の日付)
  start?: string;
  end?: string;
  title?: string;
  master?: string;
  seats?: number;
  message?: string;
  cancel?: boolean;
};
type News = {
  shop?: string;
  free?: string;
  weekly?: Weekly[];
  events?: ShopEvent[];
  notice?: string;
  app?: string;
  seats?: number;
};

const DEFAULT_NEWS: News = {
  shop: "居酒屋ノブ",
  free: "すべて無料です",
  weekly: [{ day: 5, start: "21:00", end: "22:00" }],
  events: [],
  notice: "",
  app: APP_URL,
  seats: 7,
};

const WEEK = ["日", "月", "火", "水", "木", "金", "土"];
const JST = 9 * 3600e3;
const DAY = 86400e3;

type Session = { start: number; end: number; ev?: ShopEvent };

function hm(s: string | undefined, d: string): [number, number] {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s || d) || /^(\d{1,2}):(\d{2})$/.exec(d)!;
  return [Number(m[1]), Number(m[2])];
}
function jstParts(ts: number) {
  const d = new Date(ts + JST);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), w: d.getUTCDay(), hh: d.getUTCHours(), mi: d.getUTCMinutes() };
}
function fromJst(y: number, m: number, d: number, hh: number, mi: number) {
  return Date.UTC(y, m, d, hh, mi) - JST;
}
function dateKey(ts: number) {
  const p = jstParts(ts);
  return `${p.y}-${String(p.m + 1).padStart(2, "0")}-${String(p.d).padStart(2, "0")}`;
}
function fmtDay(ts: number) {
  const p = jstParts(ts);
  return `${p.m + 1}月${p.d}日(${WEEK[p.w]})`;
}
function fmtTime(ts: number) {
  const p = jstParts(ts);
  return `${p.hh}:${String(p.mi).padStart(2, "0")}`;
}

/** いま(now)から先の営業。いつもの曜日に、イベント(置きかえ・追加・休み)を重ねる */
function sessions(news: News, now: number): Session[] {
  const out: Session[] = [];
  const events = (news.events || []).filter((e) => e && /^\d{4}-\d{2}-\d{2}$/.test(e.date));
  const evDates = new Set(events.map((e) => e.date));
  for (let i = -1; i <= 21; i++) {
    const b = jstParts(now + i * DAY);
    const key = dateKey(now + i * DAY);
    if (evDates.has(key)) continue; // その日は イベントが決める
    (news.weekly || []).forEach((w) => {
      if (w.day !== b.w) return;
      const [sh, sm] = hm(w.start, "21:00");
      const [eh, em] = hm(w.end, "22:00");
      const st = fromJst(b.y, b.m, b.d, sh, sm);
      let en = fromJst(b.y, b.m, b.d, eh, em);
      if (en <= st) en += DAY;
      out.push({ start: st, end: en });
    });
  }
  events.forEach((e) => {
    if (e.cancel) return;
    const [y, mo, d] = e.date.split("-").map(Number);
    const [sh, sm] = hm(e.start, "21:00");
    const [eh, em] = hm(e.end, "22:00");
    const st = fromJst(y, mo - 1, d, sh, sm);
    let en = fromJst(y, mo - 1, d, eh, em);
    if (en <= st) en += DAY;
    out.push({ start: st, end: en, ev: e });
  });
  return out.filter((s) => s.end > now).sort((a, b) => a.start - b.start);
}

function safeAppUrl(u: string | undefined) {
  return u && /^https:\/\/roguepink\.github\.io\//.test(u) ? u : APP_URL;
}

// ちょうちん(動かさない飾り)
function Lantern({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 40 54" aria-hidden="true">
      <line x1="20" y1="0" x2="20" y2="6" stroke="#2a1a10" strokeWidth="1.5" />
      <rect x="11" y="5" width="18" height="4" rx="1" fill="#1d1a18" />
      <ellipse cx="20" cy="27" rx="17" ry="19" fill="#c8261c" />
      <ellipse cx="20" cy="27" rx="17" ry="19" fill="url(#izg)" />
      {[14, 20, 26, 32, 38].map((y) => (
        <path key={y} d={`M4 ${y} Q20 ${y + 3} 36 ${y}`} stroke="rgba(0,0,0,.22)" strokeWidth="1" fill="none" />
      ))}
      <text x="20" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1a0a06" fontFamily="'Hiragino Mincho ProN','Yu Mincho',serif">の</text>
      <rect x="11" y="45" width="18" height="4" rx="1" fill="#1d1a18" />
      <defs>
        <radialGradient id="izg" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffb766" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c8261c" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function IzakayaCard() {
  const [news, setNews] = useState<News>(DEFAULT_NEWS);
  const [now, setNow] = useState<number | null>(null); // 画面に出てから時刻を決める(サーバーとずれないように)

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 60_000);
    let alive = true;
    fetch(NEWS_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: News | null) => {
        if (alive && j && typeof j === "object") setNews({ ...DEFAULT_NEWS, ...j, weekly: j.weekly && j.weekly.length ? j.weekly : DEFAULT_NEWS.weekly });
      })
      .catch(() => {});
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const weeklyText = (news.weekly || [])
    .map((w) => `毎週${WEEK[w.day] ?? ""}曜 ${w.start}〜${w.end}`)
    .join(" ／ ");
  const next = now != null ? sessions(news, now)[0] : undefined;
  const open = !!(next && now != null && now >= next.start);
  const ev = next?.ev;
  const soon = !!(next && now != null && next.start - now < 7 * DAY);
  const seats = ev?.seats || news.seats || 7;
  const appUrl = safeAppUrl(news.app);
  const free = news.free || "すべて無料です";

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-[3px]"
      style={{ background: "linear-gradient(135deg,#8a5a2e,#c8261c 45%,#e8a33d)", boxShadow: "0 18px 50px rgba(200,38,28,.28)" }}
    >
      <div
        className="relative overflow-hidden rounded-[22px] px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7"
        style={{ background: "linear-gradient(180deg,#2a1810 0%,#3a2414 55%,#2a1810 100%)", color: "#fff4e0" }}
      >
        {/* 上の のれん */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-3 gap-[3px] px-6" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex-1 rounded-b-md" style={{ background: "#1f2a4a" }} />
          ))}
        </div>
        {/* うしろの あかり */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(255,150,70,.35),rgba(255,150,70,0) 70%)" }}
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <Lantern />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-[0.25em]" style={{ color: "#e8c89a" }}>
              週に一度、1時間だけの
            </p>
            <h3
              className="mt-1 text-3xl font-black tracking-wider sm:text-4xl"
              style={{ fontFamily: "'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif", textShadow: "0 2px 0 #000" }}
            >
              居酒屋のぶ
            </h3>
            <p className="mt-2 inline-block rounded-full px-3 py-1 text-sm font-black" style={{ background: "#e8a33d", color: "#2a1a10" }}>
              {free}
            </p>
          </div>
        </div>

        {/* 次の開店 */}
        <div className="relative mt-5 rounded-2xl px-4 py-4 sm:px-5" style={{ background: "#f3e6cc", color: "#2a1a10" }}>
          {next && now != null ? (
            open ? (
              <p className="text-lg font-black sm:text-xl">
                <span className="mr-2 inline-block rounded-full px-2.5 py-0.5 text-sm text-white" style={{ background: "#c8261c" }}>
                  いま開店中
                </span>
                <span className="inline-block">{fmtTime(next.end)}まで</span>
              </p>
            ) : (
              <p className="text-lg font-black leading-relaxed sm:text-xl">
                <span className="inline-block">{soon ? "今週は" : "次は"}</span>{" "}
                <span className="inline-block">{fmtDay(next.start)}</span>{" "}
                <span className="inline-block">
                  {fmtTime(next.start)}〜{fmtTime(next.end)}
                </span>{" "}
                <span className="inline-block">開店します</span>
              </p>
            )
          ) : (
            <p className="text-lg font-black sm:text-xl">{weeklyText} 開店</p>
          )}

          {ev && (ev.master || ev.title) && (
            <div className="mt-3 rounded-xl px-3 py-2.5" style={{ background: "#fff8ea", border: "2px dashed #c8261c" }}>
              {ev.master && (
                <p className="font-black" style={{ color: "#c8261c" }}>
                  <span className="inline-block">今回のマスターは</span>{" "}
                  <span className="inline-block">{ev.master}さん</span>
                </p>
              )}
              {ev.title && (
                <p className="mt-0.5 text-base font-bold">
                  <span className="inline-block">{ev.title}</span> <span className="inline-block">開店です</span>
                </p>
              )}
              {ev.message && <p className="mt-1 text-sm leading-relaxed">{ev.message}</p>}
            </div>
          )}
          {ev?.message && !(ev.master || ev.title) && <p className="mt-2 text-sm leading-relaxed">{ev.message}</p>}
          {news.notice && <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6b4a2a" }}>{news.notice}</p>}
        </div>

        <p className="relative mt-4 text-sm leading-relaxed sm:text-base" style={{ color: "#e8d3a6" }}>
          <span className="inline-block">スマホの中の 小さな居酒屋。</span>
          <span className="inline-block">カウンター{seats}席で、</span>
          <span className="inline-block">相談ごとも 世間話も、</span>
          <span className="inline-block">なんでもどうぞ。</span>
          <span className="inline-block">料理もお酒も、みんなで聞く曲も。</span>
        </p>

        <div className="relative mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-black text-white transition-transform active:translate-y-0.5"
            style={{ background: "#c8261c", boxShadow: "0 4px 0 #7a140e" }}
          >
            🏮 お店に入る
          </a>
          <p className="text-xs leading-relaxed" style={{ color: "#c9b38a" }}>
            <span className="inline-block">予約は開店の3時間前から</span>
            <span className="inline-block">／ 登録なし・広告なし</span>
          </p>
        </div>
      </div>
    </div>
  );
}
