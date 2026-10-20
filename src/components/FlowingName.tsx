"use client";

import { motion } from "framer-motion";

// トップページの締め。最初の「ドーン」と同じ名前で終わる。
// スマホでも全部見えるように、ROGUE と PINK を上下2段に分けた(ノブさんの指示 2026-10-04)。
// その下に「PROGRAM」を、左右の線にはさんで、字の間を大きくあけて置く(ノブさんの指示 2026-10-20)。
// 下から少しだけ浮き上がる(向きはサイト全体でそろえる。ぼかしは最初の画面だけにした)
const EASE = [0.25, 1, 0.5, 1] as const;

function Word({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.span
      className="block bg-gradient-to-r from-pink via-pink-light to-pink bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {text}
    </motion.span>
  );
}

// 「PROGRAM」の左右の線。名前が出たあと、内側から外へ伸びる
function Rule({ from }: { from: "left" | "right" }) {
  return (
    <motion.span
      aria-hidden
      className={`h-px flex-1 from-transparent to-pink/70 ${
        from === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l"
      }`}
      style={{ transformOrigin: from === "left" ? "right" : "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
    />
  );
}

export default function FlowingName() {
  return (
    <div aria-hidden className="pointer-events-none px-6 py-16 text-center">
      <p className="text-[min(24vw,180px)] font-black leading-[0.9] tracking-tight">
        <Word text="ROGUE" delay={0} />
        <Word text="PINK" delay={0.15} />
      </p>

      <div className="mx-auto mt-5 flex max-w-[min(100%,680px)] items-center gap-4 sm:mt-7 sm:gap-6">
        <Rule from="left" />
        <motion.span
          // 字の間をあけると最後の字の右にも隙間ができるので、同じだけ左にもあけて真ん中に見せる
          className="whitespace-nowrap pl-[0.5em] text-[min(6.4vw,46px)] font-black tracking-[0.5em] text-pink-light"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          PROGRAM
        </motion.span>
        <Rule from="right" />
      </div>
    </div>
  );
}
