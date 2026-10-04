"use client";

import { motion } from "framer-motion";

// トップページの締め。最初の「ドーン」と同じ名前で終わる。
// スマホでも全部見えるように、ROGUE と PINK を上下2段に分けた(ノブさんの指示 2026-10-04)。
// ROGUE は左から、PINK は右から、ゆっくり入ってきて止まる
const EASE = [0.25, 1, 0.5, 1] as const;

function Word({ text, from, delay }: { text: string; from: number; delay: number }) {
  return (
    <motion.span
      className="block bg-gradient-to-r from-pink via-pink-light to-pink bg-clip-text text-transparent"
      initial={{ opacity: 0, x: from, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.8, delay, ease: EASE }}
    >
      {text}
    </motion.span>
  );
}

export default function FlowingName() {
  return (
    <div aria-hidden className="pointer-events-none px-6 py-16 text-center">
      <p className="text-[min(24vw,180px)] font-black leading-[0.9] tracking-tight">
        <Word text="ROGUE" from={-60} delay={0} />
        <Word text="PINK" from={60} delay={0.6} />
      </p>
    </div>
  );
}
