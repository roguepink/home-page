"use client";

import { motion, useScroll, useTransform } from "framer-motion";

type BackgroundFXProps = {
  /**
   * 下へ読み進めるにつれて、背景の色がゆっくり変わる(トップページだけ)。
   * 読むページは静かなままにしたいので、既定では変えない
   */
  scrollTint?: boolean;
};

// 読み進める位置ごとの、3つのぼかしの色。
// 上から: 最初の画面 → コンセプト → やっていくこと → 世界観 → 連絡先
const STOPS = [0, 0.25, 0.5, 0.75, 1];
const TINTS = [
  [
    "rgba(255,46,136,0.25)",
    "rgba(178,60,255,0.22)",
    "rgba(255,46,136,0.28)",
    "rgba(122,44,255,0.24)",
    "rgba(255,94,107,0.24)",
  ],
  [
    "rgba(255,143,196,0.20)",
    "rgba(255,46,136,0.18)",
    "rgba(255,143,196,0.22)",
    "rgba(255,46,136,0.16)",
    "rgba(255,170,120,0.20)",
  ],
  [
    "rgba(255,46,136,0.15)",
    "rgba(122,44,255,0.16)",
    "rgba(178,60,255,0.14)",
    "rgba(255,46,136,0.18)",
    "rgba(255,46,136,0.14)",
  ],
];

export default function BackgroundFX({ scrollTint = false }: BackgroundFXProps) {
  const { scrollYProgress } = useScroll();
  const colors = [
    useTransform(scrollYProgress, STOPS, TINTS[0]),
    useTransform(scrollYProgress, STOPS, TINTS[1]),
    useTransform(scrollYProgress, STOPS, TINTS[2]),
  ];
  const tint = (i: number) =>
    scrollTint ? { backgroundColor: colors[i] } : { backgroundColor: TINTS[i][0] };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <motion.div
        className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full blur-[120px]"
        style={tint(0)}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10rem] top-1/3 h-[28rem] w-[28rem] rounded-full blur-[130px]"
        style={tint(1)}
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-12rem] left-1/3 h-[30rem] w-[30rem] rounded-full blur-[140px]"
        style={tint(2)}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
