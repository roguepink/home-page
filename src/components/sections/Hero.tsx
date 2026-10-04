"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

// 開いた瞬間の「ドーン」(A案・2026-10-04 ノブさんが選んだ形)
//
//   0.0秒  画面からはみ出すほど巨大な「ROGUE PINK」
//   0.7秒  一気に縮んで、真ん中にドンと着地。画面が一瞬揺れて、
//          ピンクの光が1回だけ広がる(花火はここだけ。あとは何も光らない)
//   0.9秒  ロゴマークが、文字の裏からせり上がる
//   1.2秒  「言ってもらいたい」が左から、「言いたい」が右から。
//          向こうから来るありがとうと、こちらから出すありがとうが、すれ違って止まる
//   1.7秒  「ひとりから始まる…」が、下から一文字ずつ
//   そのあとは、ぴたっと止まる
//
// ★ 決まり: 動くのは「出てくる瞬間」だけ。読んでいる間は何も動かない
//   (後ろでずっとチラチラ光る粒は、文字が見づらいのでやめた)
// ★ 毎回ドーンする(ノブさんの判断)

const LAND = 0.7;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
// 加速しながら落ちてくる。着地の瞬間がいちばん速いので「ドン」と感じる
const EASE_SLAM = [0.55, 0, 0.85, 0.35] as const;
// 少し行き過ぎてから戻る。左右の2行がすれ違うように見える
const EASE_PASS = [0.3, 1.45, 0.6, 1] as const;

const TAGLINE = "ひとりから始まる、なんでもありのブランド。";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // 下へ読み進めると、最初の画面の文字は上へ流れて薄くなる
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
    >
      {/* 着地の瞬間に1回だけ広がる光と輪。終わったら消えて、二度と出ない */}
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            className="absolute h-[60vmax] w-[60vmax] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,209,232,0.9) 0%, rgba(255,46,136,0.55) 22%, rgba(255,46,136,0) 62%)",
            }}
            initial={{ opacity: 0, scale: 0.15 }}
            animate={{ opacity: [0, 1, 0], scale: [0.15, 1, 1.5] }}
            transition={{ duration: 0.9, delay: LAND, times: [0, 0.18, 1], ease: "easeOut" }}
          />
          <motion.div
            className="absolute h-40 w-40 rounded-full border-2 border-pink-light"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.2, 4, 9] }}
            transition={{ duration: 1, delay: LAND, times: [0, 0.2, 1], ease: "easeOut" }}
          />
        </div>
      )}

      <motion.div style={{ opacity: fade, y: lift }} className="relative">
        {/* 着地の衝撃で、画面全体が一瞬だけ揺れる */}
        <motion.div
          className="flex flex-col items-center"
          animate={{ x: [0, -14, 11, -7, 4, -2, 0], y: [0, 8, -6, 4, -2, 0, 0] }}
          transition={{ duration: 0.45, delay: LAND, ease: "easeOut" }}
        >
          {/* ロゴは、文字の裏からせり上がる。下の端だけ切って、幕の裏から出てくるように見せる */}
          {/* せり上がり終わったら、下の切れ目も外す(光の下側が切れて線に見えるので) */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ clipPath: "inset(-120px -120px 0px -120px)" }}
            animate={{ clipPath: "inset(-120px -120px -120px -120px)" }}
            transition={{ duration: 0.01, delay: LAND + 0.2 + 0.75 }}
          >
            <motion.img
              src="/logo.jpg"
              alt="ROGUE PINK"
              className="h-28 w-28 rounded-2xl shadow-[0_0_60px_rgba(255,46,136,0.35)] sm:h-36 sm:w-36"
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.75, delay: LAND + 0.2, ease: EASE_OUT }}
            />
          </motion.div>

          <motion.h1
            className="relative z-10 whitespace-nowrap text-5xl font-black tracking-tight text-foreground sm:text-7xl"
            initial={{ scale: 9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              scale: { duration: LAND, ease: EASE_SLAM },
              opacity: { duration: 0.12 },
            }}
          >
            ROGUE PINK
          </motion.h1>

          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-pink-light sm:text-2xl">
            <motion.span
              className="block"
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: LAND + 0.5, ease: EASE_PASS }}
            >
              ありがとうと言ってもらいたい。
            </motion.span>
            <motion.span
              className="block"
              initial={{ x: "100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: LAND + 0.58, ease: EASE_PASS }}
            >
              そして、ありがとうと言いたい。
            </motion.span>
          </p>

          <p
            aria-label={TAGLINE}
            className="mt-4 max-w-md text-sm text-muted sm:text-base"
          >
            {Array.from(TAGLINE).map((char, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block"
                initial={{ y: "0.9em", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: LAND + 1 + i * 0.035, ease: EASE_OUT }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: LAND + 1.9 }}
            className="mt-14"
          >
            <Link
              href="/#concept"
              className="flex flex-col items-center gap-2 text-xs font-medium text-muted"
            >
              <span className="tracking-[0.3em]">SCROLL</span>
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="h-8 w-px bg-gradient-to-b from-pink to-transparent"
              />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
