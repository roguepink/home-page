import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { GAME_ENTRIES, GAME_NOTES } from "./entries";

export const metadata: Metadata = {
  title: "ゲーム | ROGUE PINK",
  description:
    "登録なし、ダウンロードなしで遊べるゲーム。毒キノコ退治のアクション、山道を走るオフロードバイクのレース、工場でイジワルおばさんをこらしめるハリセンのアクション、ブロックの弾でぷよを打ちぬくシューティング。",
};

export default function GamesPage() {
  return (
    <>
      <BackgroundFX />
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-32 pt-40">
        <SectionHeading eyebrow="GAMES" title="ゲーム">
          <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-loose text-muted sm:text-base">
            ブラウザで開けば、すぐ遊べます。
          </p>
        </SectionHeading>

        <div className="mt-20 space-y-8">
          {GAME_ENTRIES.map((game, index) => (
            // 着地点(id)は、動かない外枠に付ける(アプリのページと同じ理由)
            <div key={game.slug} id={game.slug}>
              <Reveal delay={index * 0.1}>
                <article className="overflow-hidden rounded-2xl border border-border bg-background-elevated">
                  {/* ゲームは全画面で動くので、新しいタブで開く */}
                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="block"
                  >
                    <Image
                      src={game.cover}
                      alt={game.coverAlt}
                      width={1280}
                      height={720}
                      sizes="(min-width: 768px) 768px, 100vw"
                      priority={index === 0}
                      className="aspect-video w-full border-b border-border object-cover transition-opacity hover:opacity-90"
                    />
                  </a>

                  <div className="p-8 sm:p-10">
                    <p className="text-xs font-black tracking-[0.2em] text-pink">
                      {game.eyebrow}
                    </p>
                    <h2 className="mt-3 text-xl font-black text-foreground sm:text-2xl">
                      {game.name}
                    </h2>
                    {game.subName && (
                      <p className="mt-1 text-sm font-bold text-muted">
                        {game.subName}
                      </p>
                    )}
                    <p className="mt-4 text-sm leading-loose text-muted sm:text-base">
                      {game.description}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                      {game.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <a
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full bg-pink/10 px-6 py-3 text-sm font-bold text-pink-light transition-colors hover:bg-pink hover:text-white focus-visible:bg-pink focus-visible:text-white"
                      >
                        あそぶ →
                      </a>
                      <span className="text-xs tracking-wider text-muted">
                        {game.devices}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>

        {/* 共通すること。カードの中でくり返さず、ここで1回だけ言う */}
        <Reveal delay={0.1} className="mt-16">
          <div className="rounded-2xl border border-border p-8 sm:p-10">
            <p className="text-xs font-black tracking-[0.2em] text-pink">
              どのゲームも
            </p>
            <ul className="mt-6 space-y-3">
              {GAME_NOTES.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 text-sm leading-loose text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                  />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-20 text-center">
          <Link
            href="/"
            className="inline-block rounded-full border border-border px-6 py-3 text-sm font-bold text-muted transition-colors hover:border-pink/50 hover:text-pink-light"
          >
            ← ホームへ戻る
          </Link>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
