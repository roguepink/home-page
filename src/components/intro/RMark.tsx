import { forwardRef } from "react";
import { BOTTOM, BOX, INNER, OUTER, TOP } from "./rMark";

// 動き終わったあとに置いておく、本物のロゴ(R の2本の帯)。拡大してもぼやけない
const RMark = forwardRef<SVGSVGElement, { className?: string; style?: React.CSSProperties }>(
  function RMark({ className, style }, ref) {
    return (
      <svg
        ref={ref}
        viewBox={`${BOX.x} ${BOX.y} ${BOX.w} ${BOX.h}`}
        className={className}
        style={style}
        role="img"
        aria-label="ROGUE PINK"
      >
        <defs>
          <linearGradient id="rmark-pink" x1="0" y1={BOX.y} x2="0" y2={BOX.y + BOX.h} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={TOP} />
            <stop offset="1" stopColor={BOTTOM} />
          </linearGradient>
        </defs>
        <path d={OUTER} fill="url(#rmark-pink)" />
        <path d={INNER} fill="url(#rmark-pink)" />
      </svg>
    );
  },
);

export default RMark;
