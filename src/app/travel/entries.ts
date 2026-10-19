export type TravelEntry = {
  slug: string;
  /** 旅に出た時期(表示用の文字そのまま)。分からないうちは空にしておく */
  period?: string;
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
//
// ★ 2026-10-04 ノブさんが旅の動画を2本とも作り直して、YouTube に上げ直した。
//   前の動画(道の先へ fGDoFby6muI / 京都 QwHOVBxE1U4)は YouTube から消えている。
//   先に上げたほう(EtXsStSuXY8)が「道の先へ」(ノブさん確認)。
//   時期は前と同じ。slug も前と同じにして、前に送ったリンクの着地点が変わらないようにした
//
// ★ 2026-10-07 伊勢神宮巡りを追加(ノブさん「YouTube にあげといたから ホームページにあげといて」)。
//   動画は ryokoshi の trips/2026-ise で作ったもの。YouTube の題は「2026年10月7日」(スマホから上げたときの名前)
export const TRAVEL_ENTRIES: TravelEntry[] = [
  {
    slug: "2026-ise-newyear",
    period: "2025.12.31 – 2026.01.03",
    title: "伊勢神宮巡り",
    youtubeId: "xgdnkC6Zk7E",
  },
  {
    slug: "solo-camp-bike",
    period: "2021 – 2026",
    title: "道の先へ",
    youtubeId: "EtXsStSuXY8",
  },
  {
    slug: "2024-kyoto-newyear",
    period: "2024.01.01 – 01.06",
    title: "京都、六日間",
    youtubeId: "vVNb-xA1B_4",
  },
];

// ---------------------------------------------------------------- PV(旅とは別の枠)
// ★ 2026-10-19 ノブさん「ショートと横長の動画をホームページにあげといて。ハンターカブの PV として。動画のところでいい」
//   動画は ct125-pv で作ったもの。旅の本数(トップの「本 公開中」)には数えない
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
