import kiiroGaSuki from "./songs/kiiro-ga-suki.json";

/**
 * 聞ける曲(音楽カード)。ダウンロードもできる。
 * 曲の情報と歌詞の時刻は ongaku リポジトリの tools/export_to_home.py が作る。手で直さない。
 * 曲そのものとジャケットは public/music/<slug>/ に置いてある。
 */
export type LyricLine = {
  /** まとまり(Intro / Chorus など)。変わるところで1行あける */
  sec: string | null;
  text: string;
  /** 1文字ずつの、歌い始めの時刻(秒) */
  t: number[];
};

export type SongVersion = {
  key: string;
  /** 「歌版」「ラップ版」など */
  label: string;
  created: string;
  /** ダウンロードの大きさ(「5.5MB」など) */
  size: string;
  mp3: string;
  cover: string;
  poster: string;
  lyrics: LyricLine[];
};

export type Song = {
  slug: string;
  title: string;
  artist: string;
  /** 歌詞をなぞる色。曲ごとに変える */
  color: string;
  /** 試作。一覧に出さず、検索にも出さない */
  draft: boolean;
  versions: SongVersion[];
};

// 新しい曲は配列の先頭に追加する
export const SONGS: Song[] = [kiiroGaSuki];
