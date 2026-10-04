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
// ★ 2026-10-04 ノブさんが旅の動画を作り直して YouTube に上げ直した。
//   前の「道の先へ」(fGDoFby6muI)と「京都、六日間」(QwHOVBxE1U4)は
//   YouTube から2本とも消えていたので外した。
//   新しい動画(YouTube の題は日付だけ「2026年10月4日」・2分40秒)が
//   どちらの作り直しなのか分からないので、題は仮、時期は空にしてある。
//   ⚠ ノブさんから題と時期を聞いたら差し替える
export const TRAVEL_ENTRIES: TravelEntry[] = [
  {
    slug: "2026-10-remake",
    title: "旅の映像",
    youtubeId: "EtXsStSuXY8",
  },
];
