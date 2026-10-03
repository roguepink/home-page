"use client";

import { motion, type Variants } from "framer-motion";

export type BusinessIconName =
  | "app"
  | "game"
  | "music"
  | "film"
  | "pen"
  | "shirt"
  | "travel"
  | "cycle";

type BusinessIconProps = {
  name: BusinessIconName;
  className?: string;
  /** 見えた瞬間に、線がペンで描かれるように出てくる */
  draw?: boolean;
};

// 線を描く動き。親の motion.svg が "show" になると、子の線が順に伸びる
const STROKE: Variants = {
  hidden: { pathLength: 0, opacity: 0.2 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] },
  }),
};

const P = (props: React.ComponentProps<typeof motion.path> & { i: number }) => {
  const { i, ...rest } = props;
  return <motion.path variants={STROKE} custom={i} {...rest} />;
};
const R = (props: React.ComponentProps<typeof motion.rect> & { i: number }) => {
  const { i, ...rest } = props;
  return <motion.rect variants={STROKE} custom={i} {...rest} />;
};
const C = (props: React.ComponentProps<typeof motion.circle> & { i: number }) => {
  const { i, ...rest } = props;
  return <motion.circle variants={STROKE} custom={i} {...rest} />;
};

// 絵文字は端末ごとに絵が変わるので、ブランドの線で描いた自前のアイコンを使う
const PATHS: Record<BusinessIconName, React.ReactNode> = {
  app: (
    <>
      <R i={0} x="6" y="2.5" width="12" height="19" rx="3" />
      <P i={1} d="M10 18.5h4" />
    </>
  ),
  // ゲームのコントローラー。左に十字キー、右にボタン2つ
  game: (
    <>
      <R i={0} x="2.5" y="7" width="19" height="11" rx="5.5" />
      <P i={1} d="M8 10.5v4M6 12.5h4" />
      <C i={2} cx="15.5" cy="11.5" r="0.9" />
      <C i={2} cx="17.5" cy="13.8" r="0.9" />
    </>
  ),
  music: (
    <>
      <C i={0} cx="6.5" cy="17.5" r="3" />
      <C i={1} cx="17.5" cy="15.5" r="3" />
      <P i={2} d="M9.5 17.5V6l11-2v11.5" />
    </>
  ),
  film: (
    <>
      <R i={0} x="2" y="6" width="14" height="12" rx="2.5" />
      <P i={1} d="M16 11l6-3.2v8.4L16 13z" />
    </>
  ),
  pen: (
    <>
      <P i={0} d="M4 20l3-8 9-9 5 5-9 9-8 3z" />
      <P i={1} d="M13 6l5 5" />
    </>
  ),
  shirt: <P i={0} d="M9 3.5l3 2 3-2 5.5 3-2 4.2-2-1V21H7.5V9.7l-2 1-2-4.2z" />,
  // 山並みと、その向こうの太陽
  travel: (
    <>
      <P i={0} d="M2.5 19.5l6-9 4 5.5 3-4 6 7.5z" />
      <C i={1} cx="17" cy="6" r="2.2" />
    </>
  ),
  cycle: (
    <>
      <P i={0} d="M4.5 13a7.5 7.5 0 0 1 12.4-5.7" />
      <P i={1} d="M19.5 11a7.5 7.5 0 0 1-12.4 5.7" />
      <P i={2} d="M14 6.4l3.2.6-.5 3.2" />
      <P i={2} d="M10 17.6l-3.2-.6.5-3.2" />
    </>
  ),
};

export default function BusinessIcon({ name, className, draw = false }: BusinessIconProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      initial={draw ? "hidden" : false}
      whileInView={draw ? "show" : undefined}
      viewport={{ once: true, amount: 0.6 }}
    >
      {PATHS[name]}
    </motion.svg>
  );
}
