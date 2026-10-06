export type GameEntry = {
  slug: string;
  /** カードの上に小さく出る、どんな遊びかの一言 */
  eyebrow: string;
  name: string;
  /** 名前の下に小さく出す、日本語の読み(英語の名前のときだけ) */
  subName?: string;
  description: string;
  /** 3つまで。多いと読まれない */
  features: string[];
  /** どの端末で遊べるか */
  devices: string;
  /** ゲーム本体のアドレス。public/games/<slug>/ に置いてある */
  url: string;
  /** カードの絵(ゲームのタイトル画面を撮ったもの) */
  cover: string;
  coverAlt: string;
};

// ★ ゲーム本体は、別のリポジトリで作っている(2026-10-03 ノブさんの依頼で載せた)
//   どくキノコ大作戦 … roguepink/kinokogame の index.html(main 53f38d6 の時点)
//   ACORN DIRT GP    … roguepink/game の一式(main ef344e0 の時点)
//   ハリセン工場パトロール … roguepink/ijiwarugame の一式(8d3fab9 の時点・2026-10-04 追加、10-06 「おばさんたたき」入りに更新)
//     ※ このリポジトリには main が無く、作業ブランチ ccr-c2fbf1da-40k3tk だけ
//   TETORISU     … roguepink/TETORISU の一式(main 9e71a7d の時点・2026-10-06 追加)
//
//   ここにあるのは「写し」。向こうで直しても、ここは自動では変わらない。
//   向こうを更新したら、public/games/<slug>/ に同じファイルを置き直す。
//   (キノコは src/ から作った index.html だけでよい。バイクは icons/ vendor/
//    manifest.webmanifest sw.js も一緒に。ハリセンと TETORISU は icons/ manifest.webmanifest sw.js も一緒に)
//
// ⚠ 説明文はこちらで書いた仮のもの。ノブさんの言葉が来たら差し替える
//
// 新しいゲームは配列の末尾に追加する
export const GAME_ENTRIES: GameEntry[] = [
  {
    slug: "kinoko",
    eyebrow: "森の おそうじアクション",
    name: "どくキノコ大作戦",
    description:
      "森にはえた毒キノコを、インクの水鉄砲でうちまくって、きれいにしていくゲームです。制限時間は3分。森の形は、毎日かわります。",
    features: [
      "うさぎやリスにさわると、仲間になって一緒に戦ってくれる",
      "時間がたつと夕方から夜へ。夜は毒キノコが光って見える",
      "ステージ1でランクB以上を取ると、ステージ2「まち」が遊べる",
    ],
    devices: "パソコン・スマホ",
    url: "/games/kinoko/index.html",
    cover: "/games/kinoko/cover.jpg",
    coverAlt:
      "どくキノコ大作戦のタイトル画面。森の中に、赤やむらさきのキノコがはえている",
  },
  {
    slug: "acorn",
    eyebrow: "山道の バイクレース",
    name: "ACORN DIRT GP",
    subName: "どんぐりダートGP",
    description:
      "どうぶつたちがオフロードバイクで山道を走る、3Dのレースゲームです。橋をわたり、ヘアピンを登って、大ジャンプで谷へ。3周でゴールです。",
    features: [
      "ドリフトで火花の色が変わったところで離すと、ターボ",
      "おにぎりターボ、どんぐりショット、どろだんごのアイテム",
      "開くと、まずコンピューターどうしのレースが流れる。何か押せば自分で走れる",
    ],
    devices: "パソコン・スマホ(横向き)",
    url: "/games/acorn/index.html",
    cover: "/games/acorn/cover.jpg",
    coverAlt:
      "ACORN DIRT GPのスタート地点。ウサギやカエルのライダーが、オフロードバイクで並んでいる",
  },
  {
    slug: "harisen",
    eyebrow: "工場の パトロールアクション",
    name: "ハリセン工場パトロール",
    description:
      "白菜とキャベツの工場で、サボる人・悪口を言う人・じゃまする人を見つけて、ハリセンでたたいて改心させるゲームです。みんなマスクと白い服で、見えるのは目元だけ。最後には、イジワルおばさんがやってきます。",
    features: [
      "目つきと動きで、まじめな人と悪い人を見分ける。まじめな人をたたくとマイナス",
      "ジャンボハリセン、ビリビリハリセンが床に落ちている",
      "ステージは3つ。進むほど工場が広く、おばさんも強くなる",
    ],
    devices: "パソコン・スマホ(横向き)",
    url: "/games/harisen/index.html",
    cover: "/games/harisen/cover.jpg",
    coverAlt:
      "ハリセン工場パトロールのタイトル画面。マスク姿の、まじめな人・わるい人・おばさんの顔が並んでいる",
  },
  {
    slug: "tetorisu",
    eyebrow: "横スクロールの シューティング",
    name: "TETORISU",
    subName: "テトリス",
    description:
      "かわいい飛行機に乗って、テトリスのブロックの形をした弾で、ぷよぷよのような敵を打ちぬくシューティングです。同じ色の敵がとなりにいると、まとめてはじけて「れんさ」になります。",
    features: [
      "武器はブロックの形で10種類。まっすぐ飛ぶ武器ほど強く、広がる武器や追いかける武器は弱め",
      "機体のまわりに、小さなお供が4つまでついて、ハートのミサイルで手伝ってくれる",
      "ステージは8つ。空、お菓子の海、神社、夜の街、火山、洞窟、オーロラ、ブロックの世界",
    ],
    devices: "パソコン・スマホ(横向き)",
    url: "/games/tetorisu/index.html",
    cover: "/games/tetorisu/cover.jpg",
    coverAlt:
      "TETORISUのタイトル画面。カラフルなブロックの文字のまわりに、赤や青や緑のぷよのような敵が浮かんでいる",
  },
];

// どのゲームにも共通すること。カードごとに書くとうるさいので、ページの下に1回だけ出す
export const GAME_NOTES: string[] = [
  "無料です。登録も、ダウンロードも要りません。開けばすぐ遊べます。",
  "ハイスコアや記録は、その端末の中だけに残ります。外には送られません。",
  "スマホでは、画面に操作用のボタンやスティックが出ます。",
  "音が出ます。パソコンでは M キーで消せます。",
];
