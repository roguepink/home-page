import type { Metadata } from "next";
import Link from "next/link";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { TRAVEL_ENTRIES } from "./entries";

export const metadata: Metadata = {
  title: "旅 | ROGUE PINK",
  description: "旅先で撮った写真を、曲にのせて一本の映像に。",
};

export default function TravelPage() {
  return (
    <>
      <BackgroundFX />
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-32 pt-40">
        <SectionHeading eyebrow="TRAVEL" title="旅">
          <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-loose text-muted sm:text-base">
            旅先で撮った写真を、曲にのせて一本の映像に。
          </p>
        </SectionHeading>

        <div className="mt-20 space-y-16">
          {TRAVEL_ENTRIES.map((entry, index) => (
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
                  {entry.videoUrl ? (
                    <video
                      src={entry.videoUrl}
                      poster={entry.posterUrl}
                      controls
                      playsInline
                      preload="none"
                      className="aspect-video w-full rounded-xl border border-border bg-black"
                    />
                  ) : entry.youtubeId ? (
                    <YouTubeEmbed id={entry.youtubeId} label="YOUTUBE" />
                  ) : (
                    <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border bg-black/40">
                      <p className="text-sm tracking-[0.2em] text-muted">
                        動画は準備中
                      </p>
                    </div>
                  )}
                </div>
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
