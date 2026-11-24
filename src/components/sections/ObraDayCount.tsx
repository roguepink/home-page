"use client";

// オブラ・エテルナの「工事の日数」。着工 2026-11-24 を 1日目として、見た日の日数を出す(日本時間)。
// 開いたときに1回数えるだけ。動かない。

import { useEffect, useState } from "react";

const START_UTC = Date.UTC(2026, 10, 24); // 2026-11-24

export default function ObraDayCount() {
  const [day, setDay] = useState<number | null>(null);
  useEffect(() => {
    // 日本時間の今日の日付で数える
    const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const today = Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate());
    setDay(Math.max(1, Math.floor((today - START_UTC) / 86400000) + 1));
  }, []);
  return <>{day === null ? "—" : `${day}日目`}</>;
}
