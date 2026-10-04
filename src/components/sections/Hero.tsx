"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// 後ろの粒(チラチラ)は、ノブさんの判断で止めた(2026-10-04)。
// 新しい「ドーン」ができるまでの、つなぎの出方
const AFTER_BURST = 0.1;
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const logoRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // 下へ読み進めると、最初の画面の文字は上へ流れて薄くなる(落ち着く)
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
      <motion.div
        style={{ opacity: fade, y: lift }}
        className="flex flex-col items-center"
      >
        <motion.img
          ref={logoRef}
          src="/logo.jpg"
          alt="ROGUE PINK"
          className="mb-8 h-28 w-28 rounded-2xl shadow-[0_0_60px_rgba(255,46,136,0.35)] sm:h-36 sm:w-36"
          initial={{ opacity: 0, scale: 1.6, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: AFTER_BURST, ease: EASE }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 24, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "-0.025em" }}
          transition={{ duration: 1, delay: AFTER_BURST + 0.25, ease: EASE }}
          className="text-4xl font-black text-foreground sm:text-6xl"
        >
          ROGUE PINK
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: AFTER_BURST + 0.55, ease: EASE }}
          className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-pink-light sm:text-2xl"
        >
          ありがとうと言ってもらいたい。
          <br />
          そして、ありがとうと言いたい。
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: AFTER_BURST + 0.8, ease: EASE }}
          className="mt-4 max-w-md text-sm text-muted sm:text-base"
        >
          ひとりから始まる、なんでもありのブランド。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: AFTER_BURST + 1.4 }}
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
    </section>
  );
}
