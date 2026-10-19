import type { Metadata } from "next";
import type { ReactNode } from "react";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StoreList from "@/components/StoreList";
import {
  ALL_APP_NOTES,
  APP_DISCLAIMERS,
  APP_ENTRIES,
  APP_NOTES,
  TOOL_ENTRIES,
} from "./entries";

// 5本を続けて1つの一覧に(2026-10-19 ノブさんの指示)。「やめる・減らす」の4本が先、道具が後
const ALL_APPS = [...APP_ENTRIES, ...TOOL_ENTRIES];

export const metadata: Metadata = {
  title: "アプリ | ROGUE PINK",
  description:
    "登録なし、ダウンロードなしで使えるアプリ。禁酒・節酒・禁煙・ギャンブル断ちの記録を、その端末の中だけに残します。写真や動画を軽くする道具もあります。",
};

function Note({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-loose text-muted">
      <span
        aria-hidden="true"
        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
      />
      {children}
    </li>
  );
}

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
          <StoreList items={ALL_APPS} action="使ってみる" />
        </Reveal>

        {/* 説明は一番下に1回だけ。全部に当てはまることと、「やめる・減らす」の4つだけのことを分けて書く
            (分けないと、リサイズにも相談窓口やバックアップがあるように読めてしまう) */}
        <Reveal delay={0.1} className="mt-16">
          <div className="rounded-2xl border border-border p-8 sm:p-10">
            <p className="text-xs font-black tracking-[0.2em] text-pink">
              どのアプリも
            </p>
            <ul className="mt-6 space-y-3">
              {ALL_APP_NOTES.map((note) => (
                <Note key={note}>{note}</Note>
              ))}
            </ul>

            <p className="mt-10 border-t border-border pt-8 text-xs font-black tracking-[0.1em] text-pink">
              禁酒・節酒・禁煙・ギャンブル断ちの4つは
            </p>
            <ul className="mt-6 space-y-3">
              {APP_NOTES.map((note) => (
                <Note key={note}>{note}</Note>
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
