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
  /** 一覧に出すアイコン。ゲームに付いているものを使う。
   *  ⚠ キノコ・ゆうしゃ・ジャンケンには無かったので、こちらで描いた仮のもの(icon.svg) */
  icon: string;
};

// ★ ゲーム本体は、別のリポジトリで作っている(2026-10-03 ノブさんの依頼で載せた)
//   どくキノコ大作戦 … roguepink/kinokogame の index.html(main 53f38d6 の時点、2026-10-13 ccr-8a172091-2s3l7k 840d12e の「画面を離れたら音を止める」版に更新)
//   ACORN DIRT GP    … roguepink/game の一式(main ef344e0 の時点)
//     ※ 2026-10-13、写しの index.html に直接「画面を離れたら音を止める」を足した。向こうは「GRIT TRAIL」に名前が変わった新しい版で、入れ替えはノブさんに確認してから
//   ハリセン工場パトロール … roguepink/ijiwarugame の一式(8d3fab9 の時点・2026-10-04 追加、10-06 「おばさんたたき」入りに更新、10-13 86ef968 の「画面を離れたら音を止める」版に更新)
//     ※ このリポジトリには main が無く、作業ブランチ ccr-c2fbf1da-40k3tk だけ
//   TETORISU     … roguepink/TETORISU の一式(main e19fe01 の時点・2026-10-06 追加、その後 iPhone の案内・敵の弾の調整・テトロミノの機体とぷよらしい敵に更新、10-13 81828a0 の「画面を離れたら音を止める」版に更新)
//   ゆうしゃの たいれつ … roguepink/dorakue の index.html(main d39b574 の時点・2026-10-13 追加、同日 章クリアで生き返る・蘇生呪文・裏の調整、タイトルで表と裏を選べる、裏の「いなずまぎり」、MP上限とボスHPの調整、ボスの裏側に回り込めない仕組み、画面を離れたら音を止めるに更新)
//     ※ 1ファイルで完結。BGM・効果音もファイルの中で作っている。向こうは https://roguepink.github.io/dorakue/ でも遊べる
//   たたいて かぶって ジャンケンポン! … roguepink/janken の index.html(claude/rock-paper-scissors-battle-game-198dic 205f8d0 の時点・2026-10-13 追加)
//     ※ 1ファイルで完結。src/ から scripts/build.js で作った index.html だけでよい
//   やさしいナンプレ … roguepink/nanpure の一式(main d298891 の時点・2026-10-20 追加)
//     ※ index.html と engine.js の2つで動く。manifest.webmanifest sw.js アイコン4つも一緒に。向こうは https://roguepink.github.io/nanpure/ でも遊べる
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
    icon: "/games/kinoko/icon.svg",
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
    icon: "/games/acorn/icons/icon-192.png",
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
    icon: "/games/harisen/icons/icon-192.png",
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
    icon: "/games/tetorisu/icons/icon-192.png",
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
  {
    slug: "yuusha",
    icon: "/games/yuusha/icon.svg",
    eyebrow: "昔のRPGふうの 縦スクロールシューティング",
    name: "ゆうしゃの たいれつ",
    description:
      "勇者がひとりで旅に出て、章を進むごとに戦士・魔法使い・僧侶が仲間になり、一列にならんで進むシューティングです。攻撃は自動。じゅもんのボタンを押すと時間がゆっくりになり、炎や氷の魔法で画面の敵をまとめて倒せます。全部で20の章。",
    features: [
      "武器は「けん」「ゆみ」「ブーメラン」の3つ。ボタンで持ちかえて、拾ったアイテムで強くなる",
      "仲間が倒れると「ひつぎ」になって後ろをついてくる。僧侶が生きていれば、生き返ることもある",
      "魔王を倒すと「うらのせかい」が始まる。血と闇に染まった、怖い魔物たちの10章",
    ],
    devices: "パソコン・スマホ(縦向き)",
    url: "/games/yuusha/index.html",
    cover: "/games/yuusha/cover.jpg",
    coverAlt:
      "ゆうしゃの たいれつの画面。まん中にタイトル画面、両わきに緑のドラゴンと戦う場面と、大きな爆発の魔法を使う場面",
  },
  {
    slug: "janken",
    icon: "/games/janken/icon.svg",
    eyebrow: "リングの上の じゃんけん対決",
    name: "たたいて かぶって ジャンケンポン!",
    description:
      "じゃんけんに勝ったら右のボタンでピコピコハンマーやハリセンで相手の頭をたたき、負けたら左のボタンでヘルメットをかぶって守ります。先にHPがなくなったほうの負け。ステージが進むほど相手は悪者になり、会場のお客さんも増えていきます。",
    features: [
      "武器と防具は5種類ずつ。重い武器ほど強いけれど遅く、ガードの上からもダメージが通る",
      "相手は10人。いたずらっ子から始まり、ヤンキー、覆面レスラー、最後は大魔王",
      "むずかしさは3段階。男性か女性を選ぶと、相手も同じになる",
    ],
    devices: "パソコン・スマホ(縦向き)",
    url: "/games/janken/index.html",
    cover: "/games/janken/cover.jpg",
    coverAlt:
      "たたいて かぶって ジャンケンポン!の画面。まん中にタイトル画面、左に満員の会場とリング、右にフライパンで大魔王をたたいた場面",
  },
  {
    slug: "nanpure",
    icon: "/games/nanpure/icon-192.png",
    eyebrow: "ねこと いっしょの 数字パズル",
    name: "やさしいナンプレ",
    description:
      "たて・よこ・太い線の四角に、1〜9の数字を1つずつ入れていく、定番のナンプレ(数独)です。スマホに慣れていない方でも、説明なしですぐ遊べるように作りました。大きなボタンを押すだけで始まり、ステージ1はとても簡単。少しずつ難しくなっていきます。",
    features: [
      "まちがえても赤く出てすぐ消えるだけ。こまったら、ヒントが理由つきで1マス教えてくれる",
      "ステージに終わりはなく、同じ問題は二度と出ない。数字の並びは、左右や点対称のきれいな形",
      "ねこが応援してくれて、3面クリアするごとに動物の「なかま」がふえる",
    ],
    devices: "スマホ・タブレット・パソコン",
    url: "/games/nanpure/index.html",
    cover: "/games/nanpure/cover.jpg",
    coverAlt:
      "やさしいナンプレの画面。まん中にねこのいるタイトル画面、左にヒントで数字が入った盤面、右に星2つのクリア画面",
  },
];

// どのゲームにも共通すること。カードごとに書くとうるさいので、ページの下に1回だけ出す
export const GAME_NOTES: string[] = [
  "無料です。広告も入りません。登録も、ダウンロードも要りません。開けばすぐ遊べます。",
  "ハイスコアや記録は、その端末の中だけに残ります。外には送られません。",
  "スマホでは、画面に操作用のボタンやスティックが出ます。",
  "音が出ます。パソコンでは M キーで消せます。",
];
