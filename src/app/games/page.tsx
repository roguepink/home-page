import type { Metadata } from "next";
import Link from "next/link";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StoreList from "@/components/StoreList";
import { GAME_ENTRIES, GAME_NOTES } from "./entries";

export const metadata: Metadata = {
  title: "ゲーム | ROGUE PINK",
  description:
    "登録なし、ダウンロードなしで遊べるゲーム。毒キノコ退治のアクション、山道を走るオフロードバイクのレース、工場でイジワルおばさんをこらしめるハリセンのアクション、ブロックの弾でぷよを打ちぬくシューティング、勇者の一行が魔王に挑む昔のRPGふうのシューティング、じゃんけんに勝ったらたたき負けたらかぶるリングの対決。",
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

        {/* Google Play のように、アイコンと名前の一覧。押すと説明(ゲームの画面つき)が下から出る */}
        <Reveal className="mt-16">
          <StoreList items={GAME_ENTRIES} action="あそぶ" />
        </Reveal>

        {/* 共通すること。カードの中でくり返さず、ここで1回だけ言う */}
        <Reveal delay={0.1} className="mt-10">
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
