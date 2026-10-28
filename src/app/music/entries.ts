export type MusicEntry = {
  slug: string;
  date: string;
  title: string;
  /** まだ文章が無い曲では空にしておく */
  description?: string;
  videoUrl?: string;
  /** 大きく出すときの静止画。再生を押すまでこれが見えている */
  posterUrl?: string;
  /** ★ 今日だけ、一番上で大きく出す曲。下ろすときはこの1行を消すだけ */
  featured?: boolean;
  /** YouTube の普通の動画。共有アドレスの、うしろの11桁 */
  youtubeId?: string;
  /** MV は true にする(横長の大きな枠で出す。縦長の動画でも、サムネイルが横長なのでこちら)。無いときは縦長の枠 */
  youtubeWide?: boolean;
  /** YouTube ショート。同じく、うしろの11桁 */
  youtubeShortId?: string;
  links?: { label: string; url: string }[];
};

// 新しい曲は、どこに足しても大丈夫。画面では日付の新しい順に自動で並ぶ(page.tsx)
export const MUSIC_ENTRIES: MusicEntry[] = [
  {
    slug: "2026-10-28-dear",
    date: "2026-10-28",
    title: "dear",
    // ⚠ 文章はまだ無い。ノブさんの言葉が入るまで空のまま
    youtubeId: "k0y5ZOXHDFg",
    youtubeWide: true,
  },
  {
    slug: "2026-10-27-mama-e-no-omoi",
    date: "2026-10-27",
    title: "ママへの想い",
    // ⚠ 文章はまだ無い。ノブさんの言葉が入るまで空のまま
    youtubeId: "EL9wC8z6ERc",
    youtubeWide: true,
  },
  {
    slug: "2026-10-27-himitsu-no-omochabako",
    date: "2026-10-27",
    title: "ひみつのおもちゃ箱",
    description: "ハロウィンですよ。",
    youtubeId: "9gTNoVWstSk",
    youtubeWide: true,
  },
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
  {
    slug: "2026-09-05-ganbaranakute-ii",
    date: "2026-09-05",
    title: "頑張らなくていい",
    // ⚠ 文章はまだ無い。ノブさんの言葉が入るまで空のまま
    youtubeShortId: "CxY3V32idt0",
  },
];
