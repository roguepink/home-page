"use client";

import { useEffect, useRef } from "react";
import {
  BAND,
  BOTTOM,
  BOX,
  INNER,
  INNER_LINE,
  INNER_STEM,
  OUTER,
  OUTER_LINE,
  TOP,
} from "./rMark";

// 開いた瞬間の「コードで作った動画」(2026-10-21 試し版。ノブさんが B と C を見比べる)
//
//   B「ふたすじ」 … 画面いっぱいのピンクはペン先。引いていきながら、R の2本の帯が逆向きから描かれ、
//                   丸のところで一度すれちがい、カメラが止まるのと同時に描き終わる
//   C「一本の糸」 … 一本のピンクの糸が、途切れずに、書く・音楽・映像・ゲーム・アプリ・旅の形をなぞって
//                   ぐるっと一周し、まん中へ入って R になる。まわりの形は最後に消える
//
// しくみ
//   ・1枚のキャンバスに、毎回「カメラの位置と大きさ」を計算して描く(動画のように1コマずつ)
//   ・帯は「太い線を少しずつ伸ばして、帯の形で切り抜く」。だから切り口がロゴどおりに正確
//   ・最後のコマは、ページの中に置いた本物のロゴ(target)とぴったり同じ位置・大きさになる。
//     そこでキャンバスを消して、本物のロゴに入れ替える
//   ・ぼかしは使わない(iPhone で重く、カクつきの原因になる)

export type IntroScene = "strokes" | "thread";

type Props = {
  scene: IntroScene;
  /** その日の2回目からの短い版 */
  short: boolean;
  /** 最後にロゴが収まる場所(ページの中の本物のロゴ) */
  targetRef: React.RefObject<HTMLElement | null>;
  onDone: () => void;
};

type Pt = { x: number; y: number };

// ---------------------------------------------------------------- 時間の流れ方
// CSS の cubic-bezier と同じ計算
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const f = (a: number, b: number, t: number) =>
    3 * a * (1 - t) * (1 - t) * t + 3 * b * (1 - t) * t * t + t * t * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (f(x1, x2, mid) < x) lo = mid;
      else hi = mid;
    }
    return f(y1, y2, (lo + hi) / 2);
  };
}
const easePull = bezier(0.6, 0, 0.2, 1); // そっと動き出して、ふわっと止まる
const easeInOut = bezier(0.45, 0, 0.25, 1);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

// ---------------------------------------------------------------- 線の長さと、長さの位置の点
function measure(d: string): { path: SVGPathElement; length: number } {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  svg.appendChild(path);
  return { path, length: path.getTotalLength() };
}

// ---------------------------------------------------------------- C の糸の道すじ
// ロゴの座標のまま作る。R のまん中を中心にした輪の上に、6つの形を置く
const CENTER: Pt = { x: BOX.x + BOX.w / 2, y: BOX.y + BOX.h / 2 };
const RING = 430;
const ICON = 64; // 形の半分の大きさ

// 6つの形。点を順に結んだ一筆書き(形の中心が 0,0、上がマイナス)
const GLYPHS: Pt[][] = [
  // 書く(ペン先)
  [[-62, 0], [-28, -6], [-20, -56], [20, -56], [28, -6], [0, 58], [-28, -6], [0, 58], [0, 10], [62, 0]],
  // 音楽(音符)
  [[-62, 0], [-6, 30], ...arc(-22, 34, 17, 0, Math.PI * 2, 14), [-5, 34], [-5, -54], [30, -34], [36, -14], [62, 0]],
  // 映像(フィルムと再生の三角)
  [[-62, 0], [-50, 0], [-50, -38], [50, -38], [50, 38], [-50, 38], [-50, 0], [-14, 0], [-14, -20], [20, 0], [-14, 20], [-14, 0], [62, 0]],
  // ゲーム(十字キー)
  [[-62, 0], [-46, 0], [-46, -15], [-15, -15], [-15, -46], [15, -46], [15, -15], [46, -15], [46, 15], [15, 15], [15, 46], [-15, 46], [-15, 15], [-46, 15], [-46, 0], [62, 0]],
  // アプリ(</>)
  [[-62, 0], [-22, -34], [-56, 0], [-22, 34], [-8, 40], [8, -40], [22, -34], [56, 0], [22, 34], [62, 0]],
  // 旅(紙飛行機)
  [[-62, 0], [-56, 12], [56, -42], [12, 46], [-4, 12], [56, -42], [-56, 12], [-4, 12], [-4, 36], [62, 0]],
].map((g) => g.map((p) => (Array.isArray(p) ? { x: p[0], y: p[1] } : p)));

function arc(cx: number, cy: number, r: number, a0: number, a1: number, n: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a = lerp(a0, a1, i / n);
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return out;
}

// 糸の道すじを、細かい点の並びにする
function threadPoints(): { pts: Pt[]; preR: number } {
  const pts: Pt[] = [];
  const onRing = (a: number) => ({ x: CENTER.x + Math.cos(a) * RING, y: CENTER.y + Math.sin(a) * RING });
  const ringTo = (a0: number, a1: number) => {
    const n = Math.max(2, Math.ceil((Math.abs(a1 - a0) * RING) / 12));
    for (let i = 0; i <= n; i++) pts.push(onRing(lerp(a0, a1, i / n)));
  };
  const deg = Math.PI / 180;
  const gap = (ICON * 1.15) / RING; // 形のところでは輪を休む
  let a = -120 * deg;
  const icons = [-60, 0, 60, 120, 180, 240].map((d) => d * deg);
  for (let k = 0; k < icons.length; k++) {
    ringTo(a, icons[k] - gap);
    const c = onRing(icons[k]);
    // 進む向きが左向き(輪の下半分)のときは、形を逆から描く。見た目は同じ
    const leftward = Math.sin(icons[k]) > 0.2;
    const g = leftward ? [...GLYPHS[k]].reverse() : GLYPHS[k];
    for (const p of g) pts.push({ x: c.x + p.x, y: c.y + p.y });
    a = icons[k] + gap;
  }
  ringTo(a, 270 * deg); // 一周して、てっぺんへ戻る
  // てっぺんから、R の外側の帯の書き出しへ入っていく
  const top = onRing(270 * deg);
  const start = { x: 105, y: 40 };
  for (let i = 1; i <= 30; i++) {
    const t = i / 30;
    const c = { x: 110, y: top.y };
    pts.push({
      x: (1 - t) * (1 - t) * top.x + 2 * (1 - t) * t * c.x + t * t * start.x,
      y: (1 - t) * (1 - t) * top.y + 2 * (1 - t) * t * c.y + t * t * start.y,
    });
  }
  return { pts, preR: pts.length };
}

// ---------------------------------------------------------------- 本体
export default function IntroCanvas({ scene, short, targetRef, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      onDone();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let vw = 0;
    let vh = 0;
    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const outer = new Path2D(OUTER);
    const inner = new Path2D(INNER);
    const outerLine = new Path2D(OUTER_LINE);
    const innerLine = new Path2D(INNER_LINE);
    const innerStem = new Path2D(INNER_STEM);
    const outerM = measure(OUTER_LINE);
    const innerM = measure(INNER_LINE);
    const stemLen = measure(INNER_STEM).length;
    const pink = ctx.createLinearGradient(0, BOX.y, 0, BOX.y + BOX.h);
    pink.addColorStop(0, TOP);
    pink.addColorStop(1, BOTTOM);

    // C の糸
    const thread = scene === "thread" ? threadPoints() : null;
    const cum: number[] = [0];
    if (thread) {
      for (let i = 1; i < thread.pts.length; i++) {
        const a = thread.pts[i - 1];
        const b = thread.pts[i];
        cum.push(cum[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
      }
    }
    const threadLen = cum[cum.length - 1] ?? 0;
    const threadAt = (d: number): Pt => {
      if (!thread) return CENTER;
      d = Math.min(Math.max(d, 0), threadLen);
      let lo = 0;
      let hi = cum.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] < d) lo = mid;
        else hi = mid;
      }
      const t = (d - cum[lo]) / Math.max(1e-6, cum[hi] - cum[lo]);
      return { x: lerp(thread.pts[lo].x, thread.pts[hi].x, t), y: lerp(thread.pts[lo].y, thread.pts[hi].y, t) };
    };
    const THREAD_W = 11;

    // 帯を、太い線を伸ばして切り抜いて描く
    const drawBand = (band: Path2D, lines: [Path2D, number, number][], width: number) => {
      ctx.save();
      ctx.clip(band);
      ctx.lineWidth = width;
      ctx.lineCap = "butt";
      ctx.lineJoin = "round";
      ctx.strokeStyle = pink;
      for (const [line, length, f] of lines) {
        if (f <= 0) continue;
        ctx.setLineDash([length * f, length * 2]);
        ctx.stroke(line);
      }
      ctx.restore();
    };
    // 描き終わりは、帯の形そのものを塗る(線の伸ばし方の取りこぼしを残さない)
    const fillBand = (band: Path2D, alpha: number) => {
      if (alpha <= 0) return;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = pink;
      ctx.fill(band);
      ctx.globalAlpha = 1;
    };

    // 最後にロゴが収まる位置と大きさ
    const target = () => {
      const r = targetRef.current?.getBoundingClientRect();
      if (!r || r.width === 0) {
        const w = Math.min(vw * 0.3, 130);
        return { s: w / BOX.w, x: vw / 2 - w / 2, y: vh * 0.3 };
      }
      return { s: r.width / BOX.w, x: r.left, y: r.top };
    };

    // カメラ: ロゴの点 c を画面の (cx, cy) に、s 倍で映す
    const camera = (s: number, c: Pt, cx = vw / 2, cy = vh / 2) => {
      ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * (cx - c.x * s), dpr * (cy - c.y * s));
    };

    // ---- 時間割(秒)
    const T = scene === "strokes"
      ? short
        ? { hold: 0.05, move: 1.2 }
        : { hold: 0.4, move: 2.8 }
      : short
        ? { hold: 0.05, move: 1.6 }
        : { hold: 0.3, move: 5.6 };
    const total = T.hold + T.move;

    let raf = 0;
    let finished = false;
    let t0 = 0;

    let first = true;
    let lastAng = -120 * (Math.PI / 180);
    const frame = (now: number) => {
      if (first) {
        first = false;
        canvas.style.background = "transparent";
      }
      const el = (now - t0) / 1000;
      const lin = clamp01((el - T.hold) / T.move);
      const tg = target();
      const finalC = { x: BOX.x + (vw / 2 - tg.x) / tg.s, y: BOX.y + (vh / 2 - tg.y) / tg.s };

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (scene === "strokes") {
        const t = easePull(lin);
        // 外側の帯は、少し先に書き出しているところから(画面がピンクで埋まるように)
        const fo = short ? clamp01(t / 0.92) : 0.14 + 0.86 * clamp01(t / 0.94);
        const fi = clamp01((t - (short ? 0.05 : 0.18)) / (short ? 0.87 : 0.76));
        const s0 = short ? tg.s * 1.6 : (1.7 * Math.max(vw, vh)) / BAND;
        const s = s0 * Math.pow(tg.s / s0, t);
        // カメラは、はじめはペン先の少し後ろ、引くにつれて最後の位置へ
        let c = finalC;
        if (!short) {
          const p = outerM.path.getPointAtLength(Math.max(0.1, fo - 0.05) * outerM.length);
          const w = clamp01((s0 / s - 1) / (s0 / tg.s - 1));
          c = { x: lerp(p.x, finalC.x, w), y: lerp(p.y, finalC.y, w) };
        }
        camera(s, c);
        drawBand(outer, [[outerLine, outerM.length, fo]], 140);
        // 内側は逆向き: 脚の下から上へ、上の横棒、小さな丸。上に着いたら縦棒を上から下へ
        const legShare = 0.42;
        drawBand(
          inner,
          [
            [innerLine, innerM.length, fi],
            [innerStem, stemLen, clamp01((fi - legShare) / (1 - legShare))],
          ],
          115,
        );
        fillBand(outer, range(t, 0.97, 1));
        fillBand(inner, range(t, 0.97, 1));
      } else if (thread) {
        // ---- C: 一本の糸
        const preLen = cum[thread.preR - 1];
        // 糸の先: 一定の速さで進む(形のところで止まらない)。最初だけ、そっと動き出す
        const drawT = short ? easeInOut(lin) : clamp01(range(el, T.hold, T.hold + 4.3));
        const eased = short ? drawT : drawT < 0.08 ? (drawT * drawT) / 0.16 : drawT - 0.04;
        // 書き出しは少し先から(画面が糸のピンクで埋まるように)
        const d0 = short ? 0 : 60;
        const d = d0 + (short ? eased : eased / 0.96) * (preLen + outerM.length * 0.96 - d0);
        const fo = clamp01((d - preLen) / (outerM.length * 0.96));
        const fi = short ? clamp01((lin - 0.6) / 0.35) : range(el, T.hold + 4.2, T.hold + 5.2);
        const ringAlpha = short ? 1 - range(lin, 0.75, 1) : 1 - range(el, T.hold + 4.6, T.hold + 5.6);

        // カメラ
        const sMin = Math.min(vw, vh);
        const sFollow = sMin / (RING * 1.15);
        const sWide = Math.min(tg.s, (0.9 * sMin) / (RING * 2 + ICON * 2));
        let s: number;
        let c: Pt;
        if (short) {
          s = lerp(sWide, tg.s, easeInOut(range(lin, 0.5, 1)));
          c = { x: lerp(CENTER.x, finalC.x, easeInOut(range(lin, 0.4, 1))), y: lerp(CENTER.y, finalC.y, easeInOut(range(lin, 0.4, 1))) };
        } else {
          const s0 = (1.7 * Math.max(vw, vh)) / THREAD_W;
          const zIn = easeInOut(range(el, T.hold, T.hold + 1.8));
          const zOut = easeInOut(range(el, T.hold + 3.5, T.hold + 5.6));
          s = zOut > 0 ? sFollow * Math.pow(tg.s / sFollow, zOut) : s0 * Math.pow(sFollow / s0, zIn);
          // はじめは糸の先のすぐ後ろ。引いたあとは、糸の先がいる「輪の上の角度」をなめらかに追う
          // (形のジグザグにカメラが振り回されないように、形ではなく角度を追う)
          const behind = threadAt(Math.min(d, preLen) - 30);
          let ang = Math.atan2(behind.y - CENTER.y, behind.x - CENTER.x);
          while (ang - lastAng > Math.PI) ang -= Math.PI * 2;
          while (ang - lastAng < -Math.PI) ang += Math.PI * 2;
          lastAng = lerp(lastAng, ang, 0.12);
          const orbit = { x: CENTER.x + Math.cos(lastAng) * RING * 0.72, y: CENTER.y + Math.sin(lastAng) * RING * 0.72 };
          // 寄りから引きへ移る間は、画面の上での動きが一定になるように混ぜる(B と同じ考え方)
          const wIn = zOut > 0 ? 1 : clamp01((s0 / s - 1) / (s0 / sFollow - 1));
          const follow = { x: lerp(behind.x, orbit.x, wIn), y: lerp(behind.y, orbit.y, wIn) };
          c = { x: lerp(follow.x, finalC.x, zOut), y: lerp(follow.y, finalC.y, zOut) };
        }
        camera(s, c);

        // 糸(通り過ぎたところは薄く、先のほうだけ濃く)
        if (ringAlpha > 0) {
          const dd = Math.min(d, preLen);
          const trace = (from: number, to: number) => {
            ctx.beginPath();
            const a = threadAt(from);
            ctx.moveTo(a.x, a.y);
            for (let i = 0; i < thread.pts.length; i++) {
              if (cum[i] <= from) continue;
              if (cum[i] >= to) break;
              ctx.lineTo(thread.pts[i].x, thread.pts[i].y);
            }
            const b = threadAt(to);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          };
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = THREAD_W;
          ctx.strokeStyle = TOP;
          ctx.globalAlpha = 0.25 * ringAlpha;
          trace(0, dd);
          ctx.globalAlpha = ringAlpha;
          trace(Math.max(0, dd - 520), dd);
          ctx.globalAlpha = 1;
        }
        drawBand(outer, [[outerLine, outerM.length, fo]], 140);
        drawBand(
          inner,
          [
            [innerLine, innerM.length, fi],
            [innerStem, stemLen, clamp01((fi - 0.4) / 0.6)],
          ],
          115,
        );
        fillBand(outer, range(fo, 0.97, 1));
        fillBand(inner, range(fi, 0.97, 1));
      }

      if (el >= total && !finished) {
        finished = true;
        onDone();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    // 文字とロゴの準備ができてから動かす(最初の数コマがカクつかないように)。
    // 待っている間は、画面いっぱいのピンク(最初の1コマと同じ)を出しておく
    let cancelled = false;
    const ready = document.fonts?.ready ?? Promise.resolve();
    Promise.race([ready, new Promise((r) => setTimeout(r, 600))]).then(() => {
      if (cancelled) return;
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // 開いたときに一度だけ動かす
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] h-full w-full"
      // 動き出す前の一瞬も、最初の1コマと同じピンクにしておく
      style={{ background: short ? "transparent" : TOP }}
    />
  );
}
