"use client";

import { motion } from "framer-motion";

// トップページの締め。最初の「ドーン」と同じ名前で終わる。
// スマホでも全部見えるように、ROGUE と PINK を上下2段に分けた(ノブさんの指示 2026-10-04)。
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

export default function FlowingName() {
  return (
    <div aria-hidden className="pointer-events-none px-6 py-16 text-center">
      <p className="text-[min(24vw,180px)] font-black leading-[0.9] tracking-tight">
        <Word text="ROGUE" delay={0} />
        <Word text="PINK" delay={0.15} />
      </p>
    </div>
  );
}
