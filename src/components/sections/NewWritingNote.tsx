// 2026-11-15 ノブさん: ニューゲームのカードの下に、執筆の新しいのが出たことを「小さく」お知らせ。
// 大きなカードではなく、小さめで分かりやすく。見た目は可愛らしく。
// 中身はいちばん新しい執筆(WRITING_ENTRIES の先頭)を自動で出す。新しい執筆を足せば勝手に入れ替わる。
// 古くなったお知らせが残らないように、書いた日から SHOW_DAYS 日たったら出さない。

import { WRITING_ENTRIES } from "@/app/writing/entries";

const SHOW_DAYS = 30;

// ふわっと散らす小さな飾り(動かさない)
const SPARKLES = [
  { left: "4%", top: "18%", char: "♡", color: "#ff7eb0", size: "text-xs" },
  { left: "12%", top: "72%", char: "✦", color: "#ffc4dc", size: "text-[10px]" },
  { left: "88%", top: "14%", char: "✦", color: "#ffb1cf", size: "text-[10px]" },
  { left: "95%", top: "66%", char: "♡", color: "#ff9cc2", size: "text-[11px]" },
];

function daysSince(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const written = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((today - written) / 86400000);
}

function shortDate(date: string) {
  const [, m, d] = date.split("-").map(Number);
  return `${m}月${d}日`;
}

export default function NewWritingNote() {
  const latest = WRITING_ENTRIES[0];
  if (!latest || daysSince(latest.date) > SHOW_DAYS) return null;

  return (
    <a
      href={`/writing#${latest.slug}`}
      className="group relative mx-auto flex w-full max-w-md items-center gap-3 overflow-hidden rounded-2xl border-2 border-[#ffc4dc] bg-gradient-to-r from-[#fff0f6] to-[#ffe3ef] px-4 py-3 text-[#6b2341] shadow-[0_10px_28px_-14px_rgba(255,110,170,0.8)] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 motion-reduce:transition-none"
    >
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute leading-none ${s.size}`}
          style={{ left: s.left, top: s.top, color: s.color }}
        >
          {s.char}
        </span>
      ))}

      {/* 左: えんぴつのまる */}
      <span
        aria-hidden
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_2px_#ffc4dc] transition-transform group-hover:-rotate-12 motion-reduce:transition-none"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M4 20l1.2-4.6L15.6 5a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 1 0 2.8L8.6 18.8z" fill="#ffd36b" stroke="#c2477a" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M13.8 6.8l3.4 3.4" stroke="#c2477a" strokeWidth="1.6" />
          <path d="M4 20l1.2-4.6 3.4 3.4z" fill="#ff8fb8" stroke="#c2477a" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <span className="absolute -right-1 -top-1 rounded-full bg-[#ff5c9a] px-1.5 py-px text-[9px] font-black tracking-wider text-white motion-safe:animate-pulse">
          NEW
        </span>
      </span>

      {/* まん中: お知らせと題 */}
      <span className="relative min-w-0 flex-1">
        <span className="block whitespace-nowrap text-[11px] font-bold tracking-[0.08em] text-[#d14d85]">
          執筆を書きました<span className="ml-1.5 font-medium text-[#e07aa6]">{shortDate(latest.date)}</span>
        </span>
        <span className="mt-0.5 line-clamp-2 block text-sm font-black leading-snug sm:text-[15px]">
          {latest.title}
        </span>
      </span>

      {/* 右: よむ */}
      <span className="relative shrink-0 rounded-full bg-[#ff7eb0] px-3 py-1 text-xs font-black text-white transition-colors group-hover:bg-[#ff5c9a]">
        よむ →
      </span>
    </a>
  );
}
