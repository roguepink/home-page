"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

// 開いた瞬間の「ドーン」(2026-10-04 ノブさんの指示で作り直し・2回目)
//
//   0.0秒  画面全体がピンク一色
//   0.15秒 ロゴが画面いっぱいの大きさで現れる
//   0.5秒  ロゴが縮みながら定位置へ。ピンクはロゴに吸い込まれるように引いていく
//   1.4秒  ロゴ着地。輪が1回だけ広がる
//   1.4秒  ロゴの裏から、大きな「ROGUE PINK」が出てきて、縮んでドンと着地。画面が一瞬揺れる
//   2.2秒  「言ってもらいたい」が左から、「言いたい」が右から、すべるように入る
//   2.6秒  「ひとりから始まる…」が、左から右へ、なめらかに浮かび上がる
//   そのあとは、ぴたっと止まる
//
// ★ 決まり: 動くのは「出てくる瞬間」だけ。読んでいる間は何も動かない
// ★ 毎回ドーンする(ノブさんの判断)
// ★ 下の文章は「カクつく」と言われたので、一文字ずつ跳ねる動きはやめた。
//   行ごとに、ぼかしから澄んでいくように流れ込ませる

const LOGO_IN = 0.15;
const LOGO_SHRINK = 0.5;
const LOGO_LAND = 1.4;
const TEXT_LAND = 2.1;
const LINES = 2.2;
const TAGLINE_AT = 2.65;
const INTRO_END = 3.6;

// 強く始まって、最後はふわっと止まる
const EASE_ZOOM = [0.7, 0, 0.2, 1] as const;
// 加速しながら落ちてくる。着地の瞬間がいちばん速いので「ドン」と感じる
const EASE_SLAM = [0.55, 0, 0.85, 0.35] as const;
// すべるように入って、なめらかに止まる(行き過ぎない)
const EASE_GLIDE = [0.22, 1, 0.36, 1] as const;

const TAGLINE = "ひとりから始まる、なんでもありのブランド。";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // 演出の間だけ、中身をピンクの幕より手前に出す。終わったら元に戻す
  // (戻さないと、下へ読み進めたときに文字がヘッダーの上に重なる)
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), INTRO_END * 1000);
    return () => window.clearTimeout(timer);
  }, []);

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
      {!reduced && (
        <>
          {/* 最初のピンク一色。ロゴが縮むのに合わせて、ロゴのあたりへ吸い込まれて消える */}
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[60] bg-pink"
            initial={{ clipPath: "circle(150% at 50% 40%)" }}
            animate={{ clipPath: "circle(0% at 50% 40%)" }}
            transition={{ duration: 0.9, delay: LOGO_SHRINK, ease: EASE_ZOOM }}
          />

          {/* ロゴ着地の瞬間に、輪が1回だけ広がる。終わったら二度と出ない */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[65] flex items-center justify-center"
          >
            <motion.div
              className="absolute h-40 w-40 rounded-full border-2 border-pink-light"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.3, 3.5, 8] }}
              transition={{ duration: 1, delay: LOGO_LAND - 0.05, times: [0, 0.2, 1], ease: "easeOut" }}
            />
            <motion.div
              className="absolute h-[60vmax] w-[60vmax] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,209,232,0.7) 0%, rgba(255,46,136,0.4) 22%, rgba(255,46,136,0) 62%)",
              }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 1.4] }}
              transition={{ duration: 0.8, delay: TEXT_LAND, times: [0, 0.2, 1], ease: "easeOut" }}
            />
          </div>
        </>
      )}

      <motion.div
        style={{ opacity: fade, y: lift }}
        className={introDone ? "relative" : "relative z-[70]"}
      >
        {/* 大きな文字の着地の衝撃で、画面全体が一瞬だけ揺れる */}
        <motion.div
          className="flex flex-col items-center"
          animate={{ x: [0, -14, 11, -7, 4, -2, 0], y: [0, 8, -6, 4, -2, 0, 0] }}
          transition={{ duration: 0.45, delay: TEXT_LAND, ease: "easeOut" }}
        >
          {/* ロゴ: 画面いっぱいから、縮んで定位置へ */}
          <motion.img
            src="/logo.jpg"
            alt="ROGUE PINK"
            className="relative z-20 mb-6 h-28 w-28 rounded-2xl shadow-[0_0_60px_rgba(255,46,136,0.35)] sm:mb-8 sm:h-36 sm:w-36"
            initial={{ scale: 8, opacity: 0 }}
            animate={{ scale: [8, 8, 1], opacity: [0, 1, 1] }}
            transition={{
              scale: {
                duration: LOGO_LAND - LOGO_IN,
                delay: LOGO_IN,
                times: [0, (LOGO_SHRINK - LOGO_IN) / (LOGO_LAND - LOGO_IN), 1],
                ease: ["linear", EASE_ZOOM],
              },
              opacity: { duration: 0.25, delay: LOGO_IN, times: [0, 1, 1] },
            }}
          />

          {/* 大きな文字: ロゴの裏から大きく出てきて、縮んでドンと着地 */}
          <motion.h1
            className="relative z-10 whitespace-nowrap text-5xl font-black tracking-tight text-foreground sm:text-7xl"
            initial={{ scale: 7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              scale: { duration: TEXT_LAND - LOGO_LAND, delay: LOGO_LAND, ease: EASE_SLAM },
              opacity: { duration: 0.2, delay: LOGO_LAND },
            }}
          >
            ROGUE PINK
          </motion.h1>

          {/* 左右から、すべるように。ぼかしから澄んでいく */}
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-pink-light sm:text-2xl">
            <motion.span
              className="block"
              initial={{ x: "-35vw", opacity: 0, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: LINES, ease: EASE_GLIDE }}
            >
              ありがとうと言ってもらいたい。
            </motion.span>
            <motion.span
              className="block"
              initial={{ x: "35vw", opacity: 0, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: LINES + 0.15, ease: EASE_GLIDE }}
            >
              そして、ありがとうと言いたい。
            </motion.span>
          </p>

          {/* 左から右へ、光が通るように浮かび上がる(一文字ずつ跳ねさせない) */}
          <motion.p
            className="mt-4 max-w-md text-sm text-muted sm:text-base"
            style={{
              maskImage:
                "linear-gradient(90deg, #000 0%, #000 40%, transparent 60%, transparent 100%)",
              maskSize: "260% 100%",
            }}
            initial={{ maskPosition: "100% 0%", y: 6 }}
            animate={{ maskPosition: "0% 0%", y: 0 }}
            transition={{ duration: 1.3, delay: TAGLINE_AT, ease: EASE_GLIDE }}
          >
            {TAGLINE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: TAGLINE_AT + 0.9 }}
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
