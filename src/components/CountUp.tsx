"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

// 「4 本公開中」の数字が、見えた瞬間に 0 から数え上がる。
// 一度だけ。動きを減らす設定なら、最初から答えを出す
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const raw = useMotionValue(0);
  const rounded = useTransform(raw, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(raw, value, {
      duration: reduced ? 0 : 0.9,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, value, raw]);

  return (
    <motion.b ref={ref} className="text-base font-black tabular-nums text-pink-soft">
      {rounded}
    </motion.b>
  );
}
