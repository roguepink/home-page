import type { Metadata } from "next";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StoreList from "@/components/StoreList";
import { APP_ENTRIES, APP_NOTES, APP_DISCLAIMERS, TOOL_ENTRIES } from "./entries";

export const metadata: Metadata = {
  title: "アプリ | ROGUE PINK",
  description:
    "登録なし、ダウンロードなしで使えるアプリ。禁酒・節酒・禁煙・ギャンブル断ちの記録を、その端末の中だけに残します。写真や動画を軽くする道具もあります。",
};

export default function AppsPage() {
  return (
    <>
      <BackgroundFX />
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-32 pt-40">
        <SectionHeading eyebrow="APPS" title="アプリ">
          <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-loose text-muted sm:text-base">
            登録なし。ダウンロードなし。
            開けばすぐ使えるアプリを作っています。
          </p>
        </SectionHeading>

        {/* Google Play のように、アイコンと名前の一覧。押すと説明が下から出る */}
        <Reveal className="mt-16">
          <StoreList items={APP_ENTRIES} action="使ってみる" />
        </Reveal>

        {/* 4本に共通すること。カードの中で4回くり返さず、ここで1回だけ言う */}
        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-2xl border border-border p-8 sm:p-10">
            <p className="text-xs font-black tracking-[0.2em] text-pink">
              4つに共通すること
            </p>
            <ul className="mt-6 space-y-3">
              {APP_NOTES.map((note) => (
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
            <div className="mt-6 space-y-3 border-t border-border pt-6">
              {APP_DISCLAIMERS.map((note) => (
                <p
                  key={typeof note === "string" ? note : note.telLabel}
                  className="flex gap-2 text-xs leading-loose text-muted"
                >
                  <span aria-hidden="true">※</span>
                  {typeof note === "string" ? (
                    <span>{note}</span>
                  ) : (
                    <span>
                      {note.before}
                      {/* ボタンにはしない。番号のまま、掛けたい人だけが掛けられればいい */}
                      <a
                        href={`tel:${note.tel}`}
                        className="whitespace-nowrap py-2 font-bold text-pink-light underline decoration-pink/40 underline-offset-4 transition-colors hover:decoration-pink"
                      >
                        {note.telLabel}
                      </a>
                      {note.after}
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 便利な道具。上の4本とは性格が違うので、節を分ける(上の「4つに共通すること」は、こちらには当てはまらない) */}
        <div className="mt-32">
          <SectionHeading eyebrow="TOOLS" title="便利な道具">
            <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-loose text-muted sm:text-base">
              ちょっと困ったときに、すぐ使える道具です。
            </p>
          </SectionHeading>
          <Reveal className="mt-12">
            <StoreList items={TOOL_ENTRIES} action="使ってみる" />
          </Reveal>
        </div>

        <Reveal className="mt-20 text-center">
          <a
            href="/"
            className="inline-block rounded-full border border-border px-6 py-3 text-sm font-bold text-muted transition-colors hover:border-pink/50 hover:text-pink-light"
          >
            ← ホームへ戻る
          </a>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
