"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  /**
   * 見出しの後ろに、画面より大きな薄い英字を置く(トップページだけ)。
   * スクロールに合わせて横に流れ、指を止めれば止まる。勝手には動かない
   */
  backdrop?: boolean;
};

// ゆっくり、なめらかに止まる。スクロールに追いつこうとして急がない
const EASE = [0.25, 1, 0.5, 1] as const;

function Backdrop({ word }: { word: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      // 見出し(日本語)の高さに合わせる。下の説明文の後ろには重ねない
      className="pointer-events-none absolute inset-x-0 top-[3.4rem] -z-10 flex -translate-y-1/2 justify-center sm:top-[3.8rem]"
    >
      <motion.span
        style={{ x, WebkitTextStroke: "1px rgba(255,143,196,0.22)" }}
        className="whitespace-nowrap text-[28vw] font-black leading-none tracking-tight text-transparent sm:text-[18vw]"
      >
        {word}
      </motion.span>
    </div>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  children,
  backdrop = false,
}: SectionHeadingProps) {
  return (
    <div className="relative isolate">
      {backdrop && <Backdrop word={eyebrow} />}

      <motion.p
        className="text-center text-xs font-bold tracking-[0.4em] text-pink-light"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        {eyebrow}
      </motion.p>

      {/* 見出しは、幕の裏からせり上がる。下の端で切ってあるので、下から湧いて出るように見える。
          ⚠ 見えたかどうかは h2(外枠)で判定する。中の文字で判定すると、
            幕の裏に隠れている間は「画面に無い」扱いになり、いつまでも出てこない */}
      <motion.h2
        className="mt-4 overflow-hidden pb-1 text-center text-3xl font-black tracking-tight text-foreground sm:text-4xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.span
          className="block"
          variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
          transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
        >
          {title}
        </motion.span>
      </motion.h2>

      {children && (
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.5, delay: 0.6, ease: EASE }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
