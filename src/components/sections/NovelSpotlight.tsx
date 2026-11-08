// 2026-11-08 ノブさん: 小説「クラッシュ 未来への手紙」を「やっていくこと」のいちばん上に。
// 初めて出す小説なので、ひときわ目立つ形で。
// → 暗いページの中で、この1枚だけ「白い紙に縦書きの題」(小説アプリの表紙と同じ形)にして光らせる。
// 本文・声・曲・表紙の画像はここ(公開の箱)に置かない。ボタンで小説アプリへ飛ぶだけ。

const NOVEL_URL = "https://crash-novel.pages.dev/";

// 表紙と同じ明朝体。入っていない端末では、ふつうの明朝(serif)になる
const MINCHO =
  '"Hiragino Mincho ProN", "Hiragino Mincho Pro", "Yu Mincho", YuMincho, "Noto Serif JP", "Noto Serif CJK JP", serif';

const POINTS = ["読む・聞く", "ナレーションと声つき", "約4時間半", "物語の中の曲つき"];

export default function NovelSpotlight() {
  return (
    <div className="relative">
      {/* うしろで ゆっくり息をするピンクの光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-pink/30 blur-2xl motion-safe:animate-pulse"
      />

      <article className="relative overflow-hidden rounded-2xl bg-[#faf8f4] text-[#1f1d22] shadow-[0_0_0_1px_rgba(255,46,136,0.55),0_24px_80px_-24px_rgba(255,46,136,0.7)]">
        {/* 上の帯: 初めての小説 */}
        <div className="flex items-center justify-center gap-2 bg-pink px-4 py-2.5 text-center text-xs font-black tracking-[0.18em] text-white sm:text-sm">
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] tracking-[0.2em] text-pink sm:text-xs">
            NEW
          </span>
          はじめての小説を、公開しました
        </div>

        <div className="flex flex-col-reverse items-center gap-8 px-7 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:px-14 sm:py-14">
          {/* 左: 説明とボタン */}
          <div className="w-full min-w-0 text-center sm:text-left">
            <p className="text-[11px] font-bold tracking-[0.3em] text-pink">NOVEL</p>
            <h3
              className="mt-3 text-2xl font-bold leading-snug text-balance sm:text-4xl"
              style={{ fontFamily: MINCHO }}
            >
              クラッシュ
              <span className="ml-2 text-lg font-normal text-[#5b5862] sm:text-2xl">
                未来への手紙
              </span>
            </h3>

            <p className="mx-auto mt-5 max-w-md text-sm leading-loose text-[#4a4750] sm:mx-0 sm:text-base">
              文字で読むことも、声で聞くこともできる小説です。
              無料・広告なし・登録なしで、スマホのホーム画面にも入れられます。
            </p>

            <ul className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-[#1f1d22]/15 px-3 py-1 text-xs text-[#3a3740]"
                >
                  {point}
                </li>
              ))}
            </ul>

            <a
              href={NOVEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-sm font-black text-white shadow-[0_10px_30px_-8px_rgba(255,46,136,0.8)] transition-transform hover:scale-[1.04] focus-visible:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none sm:text-base"
            >
              小説を読む・聞く →
            </a>

            <p className="mt-5 text-[11px] tracking-[0.15em] text-[#8a8690]">
              作 NOBU ／ 制作 ROGUE PINK
            </p>
          </div>

          {/* 右: 表紙と同じ、縦書きの題 */}
          <div
            aria-hidden
            className="flex shrink-0 select-none items-start gap-4 sm:gap-6"
            style={{ fontFamily: MINCHO }}
          >
            <div className="flex flex-col items-center gap-5 pt-10 sm:pt-14">
              <span
                className="text-xl tracking-[0.25em] text-[#6b6870] sm:text-3xl"
                style={{ writingMode: "vertical-rl" }}
              >
                未来への手紙
              </span>
              <span className="h-3 w-3 rounded-full bg-[#b5a27a] blur-[1.5px]" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <span
                className="text-5xl leading-none tracking-[0.12em] sm:text-7xl"
                style={{ writingMode: "vertical-rl" }}
              >
                クラッシュ
              </span>
              <span className="h-4 w-4 rounded-full bg-[#a8323e] sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
