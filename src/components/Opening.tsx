"use client";

import { useEffect, useRef, type RefObject } from "react";

// トップページを開いた瞬間の演出。
//
// 「ひとりから始まる」を、そのまま動きにしている。
//   1. 真ん中に、光が一点だけ灯る(ひとり)
//   2. ドーンと広がる(始まる)
//   3. 広がった粒が、ゆっくり落ち着いて漂う。ときどき、中心から
//      ひとつの波が通り抜けていく(「ありがとう」がめぐる)
//
// 粒は下に読み進めると薄くなるだけで、消えはしない。
// 画面を触ると、そこから小さく弾ける。
//
// 全部 Canvas に自分で描いている。画像も動画も使わない。
// 「動きを減らす」設定の端末では、止まった粒だけを置く。

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: number; // COLORS の番号
  seed: number; // 粒ごとの揺れをずらすための乱数
  bright: number; // 波が通ると一瞬明るくなる
  life: number; // 1 以上は永久。それ未満は、触ったときの粒で、0 で消える
};

type Ring = { x: number; y: number; born: number; speed: number; alpha: number; width: number };

const COLORS = ["255,46,136", "255,143,196", "255,209,232"] as const;

const DOT_START = 150; // 光が灯りはじめる(ms)
const BURST_AT = 620; // ドーンの瞬間(ms)
const PULSE_EVERY = 3200; // 落ち着いてからの波の間隔(ms)

type OpeningProps = {
  /** 爆発の中心にする要素(ロゴ)。無ければ画面の中心 */
  originRef: RefObject<HTMLElement | null>;
};

export default function Opening({ originRef }: OpeningProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let rings: Ring[] = [];
    let origin = { x: 0, y: 0 };
    let started = performance.now();
    let burstDone = false;
    let lastPulse = 0;
    let raf = 0;
    let lastFrame = performance.now();
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const findOrigin = () => {
      const el = originRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0) {
          origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
          return;
        }
      }
      origin = { x: width / 2, y: height * 0.42 };
    };

    // 粒の数は画面の広さで決める。スマホで重くならない範囲
    const particleCount = () => {
      const area = width * height;
      const base = coarse ? 320 : 640;
      return Math.round(Math.min(base, Math.max(180, area / 2600)));
    };

    const makeParticle = (x: number, y: number, speed: number, life = 2): Particle => {
      const angle = Math.random() * Math.PI * 2;
      // 速さをばらつかせると、爆発に厚みが出る
      const v = speed * (0.25 + Math.pow(Math.random(), 1.6) * 0.75);
      return {
        x,
        y,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v,
        r: 0.8 + Math.random() * 1.9,
        color: Math.random() < 0.55 ? 0 : Math.random() < 0.6 ? 1 : 2,
        seed: Math.random() * Math.PI * 2,
        bright: 0,
        life,
      };
    };

    const burst = () => {
      findOrigin();
      const n = particleCount();
      const scale = Math.min(width, height) / 60;
      particles = Array.from({ length: n }, () => makeParticle(origin.x, origin.y, scale));
      rings = [
        { ...origin, born: performance.now(), speed: 2.4, alpha: 0.9, width: 2.5 },
        { ...origin, born: performance.now() + 90, speed: 1.6, alpha: 0.45, width: 1.2 },
      ];
      burstDone = true;
      lastPulse = performance.now();
    };

    // 動きを減らす設定: 爆発せず、最初から静かに散らばった粒を置く
    const settleQuietly = () => {
      findOrigin();
      const n = Math.round(particleCount() * 0.6);
      particles = Array.from({ length: n }, () => {
        const p = makeParticle(Math.random() * width, Math.random() * height, 0);
        p.vx = 0;
        p.vy = 0;
        return p;
      });
      burstDone = true;
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden) return;

      // 60fps を 1 とした時間の進み。端末が重くてもスピードが変わらないように
      const dt = Math.min((now - lastFrame) / 16.67, 3);
      lastFrame = now;
      const t = now - started;

      // 下へ読み進めると薄くなる。消えはしない
      const scrollFade = 1 - Math.min(window.scrollY / (height * 0.9), 1);
      canvas.style.opacity = String(0.22 + scrollFade * 0.78);

      ctx.clearRect(0, 0, width, height);

      if (!burstDone) {
        if (reduced) {
          settleQuietly();
          return;
        }
        // 1. 一点の光。少しずつ大きく、最後は息を止めるように縮んでから弾ける
        if (t >= DOT_START) {
          findOrigin();
          const k = Math.min((t - DOT_START) / (BURST_AT - DOT_START), 1);
          const squeeze = k > 0.85 ? 1 - (k - 0.85) / 0.15 : 1;
          const r = (2 + k * 9) * (0.55 + squeeze * 0.45);
          const glow = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, r * 7);
          glow.addColorStop(0, `rgba(255,255,255,${0.9 * k})`);
          glow.addColorStop(0.18, `rgba(255,143,196,${0.7 * k})`);
          glow.addColorStop(1, "rgba(255,46,136,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(origin.x, origin.y, r * 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(origin.x, origin.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (t >= BURST_AT) burst();
        return;
      }

      // 3. 落ち着いてからは、ときどき中心から波が出る
      if (!reduced && now - lastPulse > PULSE_EVERY) {
        lastPulse = now;
        rings.push({ ...origin, born: now, speed: 0.7, alpha: 0.28, width: 1 });
      }

      // 2. ドーンの瞬間の閃光(最初の 500ms だけ)
      const sinceBurst = t - BURST_AT;
      if (!reduced && sinceBurst < 500) {
        const k = 1 - sinceBurst / 500;
        const flash = ctx.createRadialGradient(
          origin.x, origin.y, 0,
          origin.x, origin.y, Math.max(width, height) * (0.35 + (1 - k) * 0.5),
        );
        flash.addColorStop(0, `rgba(255,255,255,${0.85 * k * k})`);
        flash.addColorStop(0.3, `rgba(255,143,196,${0.5 * k * k})`);
        flash.addColorStop(1, "rgba(255,46,136,0)");
        ctx.fillStyle = flash;
        ctx.fillRect(0, 0, width, height);
      }

      // 波(輪)。通り過ぎた粒を、少し外へ押して明るくする
      const maxR = Math.hypot(width, height);
      rings = rings.filter((ring) => (now - ring.born) * ring.speed < maxR * 1.1);
      for (const ring of rings) {
        const age = now - ring.born;
        if (age < 0) continue;
        const r = age * ring.speed;
        const fade = 1 - r / (maxR * 1.1);
        ctx.strokeStyle = `rgba(255,143,196,${ring.alpha * fade})`;
        ctx.lineWidth = ring.width;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, r, 0, Math.PI * 2);
        ctx.stroke();

        const push = ring.width > 2 ? 0 : 0.35; // 爆発の輪は押さない(粒自身が飛んでいる)
        for (const p of particles) {
          const d = Math.hypot(p.x - ring.x, p.y - ring.y);
          if (Math.abs(d - r) < 18 * ring.speed + 6) {
            p.bright = Math.max(p.bright, ring.alpha * 2.2 * fade);
            if (push && d > 1) {
              p.vx += ((p.x - ring.x) / d) * push * dt;
              p.vy += ((p.y - ring.y) / d) * push * dt;
            }
          }
        }
      }

      // 粒を動かして描く
      const settled = sinceBurst > 1800;
      const drag = settled ? 0.985 : 0.955;
      const next: Particle[] = [];
      for (const p of particles) {
        // 飛び散ったあとはブレーキ。落ち着いたら、かすかに揺れながら漂う
        p.vx *= Math.pow(drag, dt);
        p.vy *= Math.pow(drag, dt);
        if (settled && !reduced) {
          const w = now * 0.00045 + p.seed;
          p.vx += Math.cos(w) * 0.012 * dt;
          p.vy += (Math.sin(w * 1.3) * 0.012 - 0.004) * dt; // ほんの少し上向き
        }

        // 触った指・カーソルの近くは、そっと避ける
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((110 - d) / 110) * 0.9 * dt;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // 画面の外に出たら、反対側から戻ってくる。粒の数が減らない
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        if (p.life < 1) {
          p.life -= 0.016 * dt;
          if (p.life <= 0) continue;
        }
        p.bright *= Math.pow(0.9, dt);

        const twinkle = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(now * 0.0025 + p.seed * 3);
        const alpha = Math.min(1, (p.life < 1 ? p.life : 1) * (0.35 + twinkle * 0.45 + p.bright));
        const r = p.r * (1 + p.bright * 0.8);
        ctx.fillStyle = `rgba(${COLORS[p.color]},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        next.push(p);
      }
      particles = next;
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    // 画面を触ると、そこから小さく弾ける(リンクの邪魔はしない。canvas は触れない)
    const onPointerDown = (e: PointerEvent) => {
      if (reduced || !burstDone) return;
      const burstScale = Math.min(width, height) / 160;
      for (let i = 0; i < 28; i++) {
        const p = makeParticle(e.clientX, e.clientY, burstScale, 0.999);
        p.bright = 1.2;
        particles.push(p);
      }
      rings.push({
        x: e.clientX,
        y: e.clientY,
        born: performance.now(),
        speed: 1.1,
        alpha: 0.3,
        width: 1,
      });
    };

    resize();
    started = performance.now();
    lastFrame = started;
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerLeave, { passive: true });
    window.addEventListener("pointercancel", onPointerLeave, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerLeave);
      window.removeEventListener("pointercancel", onPointerLeave);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [originRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5]"
    />
  );
}
