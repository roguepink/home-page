"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

// 開いた瞬間の入り方(2026-10-04 ノブさんの指示・3回目)
//
//   ロゴの中のピンク(R の縦棒)を、画面いっぱいに超アップにしたところから始まる。
//   そこから一本の動きで、ゆっくりロゴが引いていき、画面の中に現れる。
//   何かが別に出てきて消えるのではなく、「ピンクが、だんだんロゴになっていく」だけ。
//   ロゴが落ち着いたら、文字が順番に、ゆっくり入ってくる。
//
//   0.0秒  画面全体がピンク(ロゴの R の縦棒を超アップにしたもの)
//   0.35秒 ゆっくり引きはじめる
//   2.85秒 ロゴが定位置に落ち着く
//   2.4秒  「ROGUE PINK」がぼかしから浮かび上がる(ロゴが落ち着くのと重ねて、流れを切らない)
//   3.2秒〜 「言ってもらいたい」(左から)→「言いたい」(右から)→「ひとりから始まる…」
//          の順に、1行ずつゆっくり
//
// ★ 前の版にあった「ドン」(文字が叩きつけられる・画面が揺れる・輪や光が広がる)と、
//   最初の絵は全部やめた。「ドーン、ドーン、ドーン」と3回に感じたため
// ★ 決まり: 動くのは「出てくる瞬間」だけ。読んでいる間は何も動かない
// ★ 毎回この入り方をする(ノブさんの判断)
// ★ 2026-10-08 ノブさんと相談して変更: その日の2回目からは、同じ入り方を短く(約2.5秒)する。
//   初めての人には全部見せる。何度も来てくれる人を、毎回7秒待たせない

// ロゴの画像(public/logo.jpg)の中で、ピンクが一番太いところ。
// 画像の左から 32%・上から 40%(R の縦棒の真ん中)。ここを中心に拡大する
const PINK_ORIGIN = "32% 40%";
// これだけ拡大すると、スマホでもパソコンでも画面がピンクで埋まる
const START_SCALE = 130;

// 下の3行は、1行ずつ順番に出す。前の行がほぼ出きってから次の行
function timing(short: boolean) {
  const t = short
    ? { hold: 0.1, zoom: 1.2, titleAt: 0.9, lineSlow: 0.8, lineGap: 0.3, lines: 1.1, title: 0.8 }
    : { hold: 0.35, zoom: 2.5, titleAt: 2.4, lineSlow: 1.8, lineGap: 1.3, lines: 3.2, title: 1.5 };
  return { ...t, taglineAt: t.lines + t.lineGap * 2, introEnd: t.hold + t.zoom + 0.1 };
}

// 「今日もう見た」の印。端末の中にだけ残る(だれが来たかは分からない)
const SEEN_KEY = "rp-intro-seen";

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function seenToday() {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(SEEN_KEY) === today();
  } catch {
    return false;
  }
}

// 引きはじめはそっと、途中はなめらかに、最後はふわっと止まる
const EASE_PULL = [0.6, 0, 0.2, 1] as const;
// すべるように入って、なめらかに止まる(行き過ぎない)
const EASE_GLIDE = [0.22, 1, 0.36, 1] as const;

const TAGLINE = "ひとりから始まる、なんでもありのブランド。";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // 開いた時に一度だけ決める(途中で長さが変わらないように)
  const [t] = useState(() => timing(seenToday()));

  // 引いていく進み具合(0 = 超アップ、1 = 定位置)。
  // 大きさは「倍率の対数」で動かす。ふつうに数字を減らすと、最初はほとんど動かず、
  // 最後だけ急に縮んで見える。対数にすると、ずっと同じ調子で引いていくように見える
  const progress = useMotionValue(0);
  const logoScale = useTransform(progress, (p) => Math.pow(START_SCALE, 1 - p));

  // 拡大している間だけ、ロゴをヘッダーより手前に出す。終わったら元に戻す
  // (戻さないと、下へ読み進めたときに文字がヘッダーの上に重なる)
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(SEEN_KEY, today());
    } catch {
      // 保存できない端末では、毎回いちばん長い入り方になるだけ
    }
    const controls = animate(progress, 1, {
      duration: reduced ? 0 : t.zoom,
      delay: reduced ? 0 : t.hold,
      ease: EASE_PULL,
    });
    const timer = window.setTimeout(
      () => setIntroDone(true),
      reduced ? 0 : t.introEnd * 1000,
    );
    return () => {
      controls.stop();
      window.clearTimeout(timer);
    };
  }, [progress, reduced, t]);

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
      <motion.div
        style={{ opacity: fade, y: lift }}
        className={`flex flex-col items-center ${introDone ? "relative" : "relative z-[70]"}`}
      >
        <motion.img
          src="/logo.jpg"
          alt="ROGUE PINK"
          className="mb-6 h-28 w-28 rounded-2xl shadow-[0_0_60px_rgba(255,46,136,0.35)] sm:mb-8 sm:h-36 sm:w-36"
          style={{
            scale: logoScale,
            transformOrigin: PINK_ORIGIN,
          }}
        />

        <motion.h1
          className="whitespace-nowrap text-5xl font-black tracking-tight text-foreground sm:text-7xl"
          initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: t.title, delay: t.titleAt, ease: EASE_GLIDE }}
        >
          ROGUE PINK
        </motion.h1>

        {/* 左右から、すべるように。ぼかしから澄んでいく */}
        <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-pink-light sm:text-2xl">
          <motion.span
            className="block"
            initial={{ x: "-22vw", opacity: 0, filter: "blur(10px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: t.lineSlow, delay: t.lines, ease: EASE_GLIDE }}
          >
            ありがとうと言ってもらいたい。
          </motion.span>
          <motion.span
            className="block"
            initial={{ x: "22vw", opacity: 0, filter: "blur(10px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: t.lineSlow, delay: t.lines + t.lineGap, ease: EASE_GLIDE }}
          >
            そして、ありがとうと言いたい。
          </motion.span>
        </p>

        {/* 左から右へ、光が通るように浮かび上がる */}
        <motion.p
          className="mt-4 max-w-md text-sm text-muted sm:text-base"
          style={{
            maskImage:
              "linear-gradient(90deg, #000 0%, #000 40%, transparent 60%, transparent 100%)",
            maskSize: "260% 100%",
          }}
          initial={{ maskPosition: "100% 0%", y: 6 }}
          animate={{ maskPosition: "0% 0%", y: 0 }}
          transition={{ duration: t.lineSlow, delay: t.taglineAt, ease: EASE_GLIDE }}
        >
          {TAGLINE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: t.taglineAt + t.lineSlow * 0.6 }}
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
