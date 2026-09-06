import Reveal from "@/components/Reveal";
import type { MusicEntry } from "./entries";

/**
 * 今日だけ、一番上に大きく出す曲。
 * 普通の一覧とは別の見た目にして、開いた瞬間に目に入るようにしている。
 *
 * 外すときは entries.ts の `featured: true` の1行を消すだけ。
 * この曲は自動で普通の一覧に戻る。
 */
export default function FeaturedRelease({ entry }: { entry: MusicEntry }) {
  return (
    <Reveal y={24}>
      <section
        id={entry.slug}
        className="relative overflow-hidden rounded-3xl border border-pink/40 shadow-[0_0_80px_-20px_rgba(255,46,136,0.55)]"
      >
        {/* 同じ画をぼかして背景に敷く。板の上に置いた1枚、という感じにする */}
        {entry.posterUrl && (
          <div
            aria-hidden
            className="absolute inset-0 scale-125 bg-cover bg-center opacity-30 blur-2xl"
            style={{ backgroundImage: `url(${entry.posterUrl})` }}
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background"
        />

        <div className="relative px-6 py-14 text-center sm:px-12 sm:py-16">
          <span className="inline-flex items-center gap-3 rounded-full border border-pink bg-pink/15 px-5 py-2 text-[11px] font-black tracking-[0.3em] text-pink-light">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink" />
            </span>
            本日限定
          </span>

          <h1
            className="mt-7 text-5xl font-black leading-tight tracking-tight text-foreground sm:text-7xl"
            style={{ textShadow: "0 0 48px rgba(255,46,136,0.55)" }}
          >
            {entry.title}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-loose text-pink-soft sm:text-base">
            今日だけ、ここに置いています。
          </p>

          {entry.description && (
            <p className="mx-auto mt-6 max-w-xl text-sm leading-loose text-muted sm:text-base">
              {entry.description}
            </p>
          )}

          {entry.videoUrl && (
            <div className="mx-auto mt-10 w-full max-w-[440px]">
              <video
                src={entry.videoUrl}
                poster={entry.posterUrl}
                controls
                playsInline
                preload="none"
                className="aspect-[9/16] w-full rounded-2xl border border-pink/40 bg-black object-cover shadow-[0_0_60px_-15px_rgba(255,46,136,0.7)]"
              />
            </div>
          )}

          {entry.links && entry.links.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
        </div>
      </section>
    </Reveal>
  );
}
