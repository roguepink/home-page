export type TravelEntry = {
  slug: string;
  /** 旅に出た時期(表示用の文字そのまま) */
  period: string;
  title: string;
  /** ノブさんの言葉が入るまで空にしておく */
  description?: string;
  /** YouTube の動画。共有アドレスの、うしろの11桁 */
  youtubeId?: string;
  /** 自前の保存先に置いた動画のアドレス(YouTube より優先して出す) */
  videoUrl?: string;
  /** 再生を押すまで見えている静止画のアドレス */
  posterUrl?: string;
};

// 新しい旅は配列の先頭に追加する。
// ⚠ 動画・写真のファイルはこのリポジトリに入れない(public)。アドレスだけ書く
export const TRAVEL_ENTRIES: TravelEntry[] = [
  {
    slug: "solo-camp-bike",
    period: "2021 – 2026",
    title: "道の先へ ｜ CT125 ソロキャン & バイク旅",
    youtubeId: "vH6dLSNraGI",
  },
  {
    slug: "2024-kyoto-newyear",
    period: "2024.01.01 – 01.06",
    title: "京都、六日間 ｜ 2024 正月",
    youtubeId: "IHcICVSYRx0",
  },
];
