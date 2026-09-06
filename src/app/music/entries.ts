export type MusicEntry = {
  slug: string;
  date: string;
  title: string;
  /** まだ文章が無い曲では空にしておく */
  description?: string;
  videoUrl?: string;
  /** YouTube の普通の動画。共有アドレスの、うしろの11桁 */
  youtubeId?: string;
  /** YouTube ショート。同じく、うしろの11桁 */
  youtubeShortId?: string;
  links?: { label: string; url: string }[];
};

// 新しい曲は配列の先頭に追加する
export const MUSIC_ENTRIES: MusicEntry[] = [
  {
    slug: "2026-09-04-sena-no-rule",
    date: "2026-09-04",
    title: "聖奈のルール",
    // ⚠ 文章はまだ無い。ノブさんの言葉が入るまで空のまま
    youtubeShortId: "zTkUrPNrBEo",
  },
  {
    slug: "2026-08-12-code-love",
    date: "2026-08-12",
    title: "CODE LOVE",
    description:
      "この曲を作ったのは、AIです。この映像を作ったのも、AIです。その二つを一本につなぎ合わせたのも、AIです。そして、テロップまで、AIです。俺がやったのは、お願いして、ここに載せただけ。できあがったものを見たとき、まじまじとAIの凄さを感じました。それが一番素直な感想です。",
    videoUrl:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HB6SVADKta7xCKiPnLpSPjn1jc/3b9a751e-a073-444d-b1cd-c9d887b16852.mp4",
    youtubeId: "Ud0yZ-VS2lU",
  },
];
