"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import IntroCanvas, { type IntroScene } from "@/components/intro/IntroCanvas";
import RMark from "@/components/intro/RMark";

// 開いた瞬間の入り方(2026-10-21 B「ふたすじ」と C「一本の糸」を試し版で作り、
// 2026-10-22 ノブさんが C を選んで公開した)。B の動きも IntroCanvas に残してある
//
// ★ 決まり(前から変わらない): 動くのは「出てくる瞬間」だけ。読んでいる間は何も動かない。
//   毎回この入り方をする。ただし、その日の2回目からは短い版
// ★ 前の入り方(ロゴ画像を130倍から引いていく)は Hero.tsx にあったが、入れ替えたので消した
//
// 専門家の意見で、どの案でも直すこと(ここでは両方に入れてある)
//   ・ロゴは画像の拡大をやめ、線の形(RMark)で描く。拡大してもぼやけない
//   ・文字の「ぼかしからくっきり」をやめる(iPhone で重く、カクつきの原因)。左から幕を開けるように出す
//   ・SCROLL の矢印は2回動いたら止める(読んでいる間は何も動かない)
//   ・「ROGUE PINK」は画面の幅に合わせた大きさ(小さいスマホで切れない)

const EASE_GLIDE = [0.22, 1, 0.36, 1] as const;
const TAGLINE = "ひとりから始まる、なんでもありのブランド。";

// 文字の出る時刻(秒)。ロゴが描き終わってから
function timing(scene: IntroScene, short: boolean) {
  if (short) return { title: 1.3, line1: 1.5, line2: 1.8, tagline: 2.1, slow: 0.8 };
  return scene === "strokes"
    ? { title: 3.4, line1: 4.4, line2: 5.6, tagline: 6.8, slow: 1.6 }
    : { title: 6.0, line1: 6.9, line2: 8.0, tagline: 9.1, slow: 1.6 };
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// 左から右へ、幕を開けるように見せる(ぼかしを使わない)
const wipe = {
  maskImage: "linear-gradient(90deg, #000 0%, #000 40%, transparent 60%, transparent 100%)",
  maskSize: "260% 100%",
};

export default function HeroIntro({ scene }: { scene: IntroScene }) {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const seenKey = `rp-intro-seen-${scene}`;
  const [short] = useState(() => {
    try {
      return typeof window !== "undefined" && window.localStorage.getItem(seenKey) === today();
    } catch {
      return false;
    }
  });
  const t = timing(scene, short);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(seenKey, today());
    } catch {
      // 保存できない端末では、毎回長い入り方になるだけ
    }
  }, [seenKey]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const showLogo = done || reduced;
  // 動きを減らす設定なら、文字はすぐ出す
  const at = (s: number) => (reduced ? 0 : s);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
    >
      {!showLogo && (
        <IntroCanvas scene={scene} short={short} targetRef={logoRef as React.RefObject<HTMLElement | null>} onDone={() => setDone(true)} />
      )}

      <motion.div style={{ opacity: fade, y: lift }} className="flex flex-col items-center">
        <RMark
          ref={logoRef}
          className="mb-7 h-32 w-auto sm:mb-9 sm:h-40"
          style={{ opacity: showLogo ? 1 : 0 }}
        />

        <motion.h1
          className="whitespace-nowrap text-[min(12vw,4.5rem)] font-black leading-tight tracking-tight text-foreground"
          style={wipe}
          initial={{ maskPosition: "100% 0%", y: 8 }}
          animate={{ maskPosition: "0% 0%", y: 0 }}
          transition={{ duration: 1.3, delay: at(t.title), ease: EASE_GLIDE }}
        >
          ROGUE PINK
        </motion.h1>

        <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-pink-light sm:text-2xl">
          {/* 1行目は外側の帯と同じ左から、2行目は内側の帯と同じ右から */}
          <motion.span
            className="block whitespace-nowrap"
            initial={{ x: "-22vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: t.slow, delay: at(t.line1), ease: EASE_GLIDE }}
          >
            ありがとうと言ってもらいたい。
          </motion.span>
          <motion.span
            className="block whitespace-nowrap"
            initial={{ x: "22vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: t.slow, delay: at(t.line2), ease: EASE_GLIDE }}
          >
            そして、ありがとうと言いたい。
          </motion.span>
        </p>

        <motion.p
          className="mt-4 max-w-md text-sm text-muted sm:text-base"
          style={wipe}
          initial={{ maskPosition: "100% 0%", y: 6 }}
          animate={{ maskPosition: "0% 0%", y: 0 }}
          transition={{ duration: t.slow, delay: at(t.tagline), ease: EASE_GLIDE }}
        >
          {TAGLINE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: at(t.tagline + t.slow * 0.6) }}
          className="mt-14"
        >
          <Link href="/#concept" className="flex flex-col items-center gap-2 text-xs font-medium text-muted">
            <span className="tracking-[0.3em]">SCROLL</span>
            {/* 2回だけ動いて止まる */}
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: 1, ease: "easeInOut", delay: at(t.tagline + t.slow) }}
              className="h-8 w-px bg-gradient-to-b from-pink to-transparent"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
