import type { Metadata } from "next";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import Link from "next/link";
import FeaturedRelease from "./FeaturedRelease";
import { MUSIC_ENTRIES } from "./entries";
import { SONGS } from "./songs";

export const metadata: Metadata = {
  title: "音楽 | ROGUE PINK",
  description:
    "自分にしか出せない表現で、心を動かす音楽を。できた曲がここに並んでいきます。",
};

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
}

export default function MusicPage() {
  // 今日だけ特別扱いする曲は、一覧から抜いて一番上で大きく出す
  const featured = MUSIC_ENTRIES.find((entry) => entry.featured);
  const listed = MUSIC_ENTRIES.filter((entry) => !entry.featured);
  // 聞ける曲(音楽カード)。試作の曲は一覧に出さない
  const songs = SONGS.filter((song) => !song.draft);

  return (
    <>
      <BackgroundFX />
      <Header />
      <main
        className={`mx-auto max-w-3xl px-6 pb-32 ${
          featured ? "pt-32 sm:pt-36" : "pt-40"
        }`}
      >
        {featured && <FeaturedRelease entry={featured} />}

        <div className={featured ? "mt-28" : "mt-8"}>
          <SectionHeading eyebrow="MUSIC" title="音楽">
            <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-loose text-muted sm:text-base">
              自分にしか出せない表現で、心を動かす音楽を。
              できた曲が、ここにどんどん並んでいきます。
            </p>
          </SectionHeading>
        </div>

        {songs.length > 0 && (
          <section className="mt-20">
            <Reveal>
              <h2 className="text-xs font-bold tracking-[0.3em] text-pink">
                音楽
              </h2>
              <p className="mt-2 text-sm text-muted">
                歌詞を見ながら聞けて、ダウンロードもできます。
              </p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {songs.map((song, index) => (
                <Reveal key={song.slug} delay={index * 0.1}>
                  <Link
                    href={`/music/${song.slug}`}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background-elevated p-4 transition-colors hover:border-pink/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={song.versions[0].cover}
                      alt={`${song.title}のジャケット`}
                      width={88}
                      height={88}
                      loading="lazy"
                      className="h-[88px] w-[88px] flex-none rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-lg font-black text-foreground">
                        {song.title}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {song.versions.map((v) => v.label).join("・")}
                      </p>
                      <p
                        className="mt-2 text-sm font-bold"
                        style={{ color: song.color }}
                      >
                        ▶ 歌詞つきで聞く
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {listed.length > 0 && songs.length > 0 && (
          <Reveal className="mt-24">
            <h2 className="text-xs font-bold tracking-[0.3em] text-pink">MV</h2>
            <p className="mt-2 text-sm text-muted">曲に映像をつけたものです。</p>
          </Reveal>
        )}

        {listed.length === 0 && songs.length === 0 ? (
          <Reveal className="mt-20">
            <div className="rounded-2xl border border-border bg-background-elevated p-10 text-center">
              <p className="text-3xl">🎵</p>
              <p className="mt-4 text-sm leading-loose text-muted sm:text-base">
                最初の一曲を準備中です。
                <br />
                できた曲から、ここに並んでいきます。
              </p>
            </div>
          </Reveal>
        ) : (
          <div className={songs.length > 0 ? "mt-6 space-y-16" : "mt-20 space-y-16"}>
            {listed.map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 0.1}>
                <article
                  id={entry.slug}
                  className="rounded-2xl border border-border bg-background-elevated p-8 sm:p-10"
                >
                  <time
                    dateTime={entry.date}
                    className="text-xs font-bold tracking-[0.3em] text-pink"
                  >
                    {formatDate(entry.date)}
                  </time>
                  <h2 className="mt-3 text-xl font-black text-foreground sm:text-2xl">
                    {entry.title}
                  </h2>
                  {entry.description && (
                    <p className="mt-6 text-sm leading-loose text-muted sm:text-base">
                      {entry.description}
                    </p>
                  )}
                  {entry.videoUrl && (
                    <div className="mx-auto mt-6 w-full max-w-[380px]">
                      <video
                        src={entry.videoUrl}
                        poster={
                          entry.posterUrl ??
                          (entry.youtubeId
                            ? `https://i.ytimg.com/vi/${entry.youtubeId}/hqdefault.jpg`
                            : undefined)
                        }
                        controls
                        playsInline
                        preload="none"
                        className="aspect-[9/16] w-full rounded-xl border border-border bg-black object-cover"
                      />
                    </div>
                  )}
                  {/* 自前の動画がある曲は、そちらが本編。
                      同じものを YouTube でもう一度出すと二重になるので、
                      YouTube は再生する枠ではなく、リンクだけにする。 */}
                  {(entry.youtubeShortId ||
                    (entry.youtubeId && !entry.videoUrl)) && (
                    <div className="mt-6 flex flex-wrap justify-center gap-6">
                      {entry.youtubeId && !entry.videoUrl && (
                        <div
                          className={
                            entry.youtubeWide ? "w-full" : undefined
                          }
                        >
                          <YouTubeEmbed
                            id={entry.youtubeId}
                            label="YOUTUBE"
                            vertical={!entry.youtubeWide}
                          />
                        </div>
                      )}
                      {entry.youtubeShortId && (
                        <YouTubeEmbed
                          id={entry.youtubeShortId}
                          label="SHORTS"
                          vertical
                        />
                      )}
                    </div>
                  )}
                  {entry.youtubeId && entry.videoUrl && (
                    <div className="mt-6 flex justify-center">
                      <a
                        href={`https://youtu.be/${entry.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-pink/40 px-5 py-2 text-sm font-bold text-pink-light transition-colors hover:border-pink hover:bg-pink/10"
                      >
                        YouTubeで見る →
                      </a>
                    </div>
                  )}
                  {entry.links && entry.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {entry.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-full border border-pink/40 px-5 py-2 text-sm font-bold text-pink-light transition-colors hover:border-pink hover:bg-pink/10"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        )}

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
