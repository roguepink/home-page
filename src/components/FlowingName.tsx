"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// トップページの締め。最初の「ドーン」と同じ名前が、最後にもう一度大きく横に流れる。
// スクロールに合わせて動くだけ。指を止めれば止まる
export default function FlowingName() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-45%"]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none overflow-hidden py-10">
      <motion.p
        style={{ x }}
        className="whitespace-nowrap bg-gradient-to-r from-pink via-pink-light to-pink bg-clip-text text-[22vw] font-black leading-none tracking-tight text-transparent opacity-90 sm:text-[16vw]"
      >
        ROGUE PINK ROGUE PINK
      </motion.p>
    </div>
  );
}
