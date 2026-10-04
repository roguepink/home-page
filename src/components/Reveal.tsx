"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** 下からの距離。0 にすると縦には動かない */
  y?: number;
  /** 横からの距離。マイナスは左から、プラスは右から */
  x?: number;
  /** 横から幕が開くように現れる(左から右へ) */
  wipe?: boolean;
};

// 見えた瞬間に一度だけ出てくる。出たら止まる
export default function Reveal({
  children,
  delay = 0,
  className,
  y = 40,
  x = 0,
  wipe = false,
}: RevealProps) {
  if (wipe) {
    // ⚠ 見えたかどうかは外枠で判定する。幕が閉じている中身で判定すると、
    //   全部隠れているので「画面に無い」扱いになり、いつまでも開かない
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="h-full"
          variants={{
            hidden: { clipPath: "inset(0px 100% 0px 0px round 16px)" },
            show: { clipPath: "inset(0px 0% 0px 0px round 16px)" },
          }}
          transition={{ duration: 1.1, delay, ease: [0.77, 0, 0.18, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
