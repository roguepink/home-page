import type { Metadata } from "next";
import Link from "next/link";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { PV_ENTRIES } from "./entries";

export const metadata: Metadata = {
  title: "ハンターカブ PV | ROGUE PINK",
  description: "愛車の CT125 ハンターカブで作った PV。",
};

export default function PvPage() {
  return (
    <>
      <BackgroundFX />
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-32 pt-40">
        <SectionHeading eyebrow="PROMOTION VIDEO" title="ハンターカブ PV" />

        <div className="mt-20 space-y-16">
          {PV_ENTRIES.map((entry, index) => (
            <Reveal key={entry.slug} delay={index * 0.1}>
              <article
                id={entry.slug}
                className="rounded-2xl border border-border bg-background-elevated p-6 sm:p-10"
              >
                {entry.period && (
                  <p className="text-xs font-bold tracking-[0.3em] text-pink">
                    {entry.period}
                  </p>
                )}
                <h2 className="mt-3 text-xl font-black text-foreground sm:text-2xl">
                  {entry.title}
                </h2>
                {entry.description && (
                  <p className="mt-6 text-sm leading-loose text-muted sm:text-base">
                    {entry.description}
                  </p>
                )}
                <div className="mt-6">
                  <YouTubeEmbed id={entry.youtubeId} label="本編" />
                </div>
                {entry.shortsId && (
                  <div className="mt-10">
                    <YouTubeEmbed id={entry.shortsId} label="ショート" vertical />
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

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
