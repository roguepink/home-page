// PV(旅とは別のページ)
// ★ 2026-10-19 ノブさん「ショートと横長の動画をホームページにあげといて。ハンターカブの PV として。動画のところでいい」
//   動画は ct125-pv で作ったもの。
// ★ 2026-10-19 ノブさん「旅とは分けて、別のところに飛ぶ形に」→ 旅のページから外して /pv に。
//   トップの「旅」のカードに「ハンターカブ PV を見る」ボタンを並べる(カードは数が増えるまで旅と同じ1枚)
export type PvEntry = {
  slug: string;
  period?: string;
  title: string;
  /** ノブさんの言葉が入るまで空にしておく */
  description?: string;
  /** 横長の本編(YouTube の11桁) */
  youtubeId: string;
  /** 縦長のショート(YouTube の11桁) */
  shortsId?: string;
};

export const PV_ENTRIES: PvEntry[] = [
  {
    slug: "ct125-are-you-a-hunter",
    period: "2026.10",
    title: "ハンターカブ PV「ARE YOU A HUNTER?」",
    youtubeId: "6-EKdZDA0-Q",
    shortsId: "ykRnLK5t4J8",
  },
];
