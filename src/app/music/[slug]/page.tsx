import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LyricPlayer from "./LyricPlayer";
import { SONGS } from "../songs";

// 曲のページは、SONGS にある曲だけ作る。ほかのアドレスは「見つかりません」
export const dynamicParams = false;

export function generateStaticParams() {
  return SONGS.map((song) => ({ slug: song.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/music/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const song = SONGS.find((s) => s.slug === slug);
  if (!song) return {};
  const title = `${song.title} | ROGUE PINK`;
  const description = `${song.title}(${song.versions.map((v) => v.label).join("・")})。歌詞を見ながら聞けて、ダウンロードもできます。`;
  return {
    title,
    description,
    // 試作のあいだは検索に出さない
    robots: song.draft ? { index: false, follow: false } : undefined,
    // LINE などに貼ったとき、ジャケットが出るようにする
    openGraph: {
      title,
      description,
      images: [{ url: song.versions[0].cover, width: 600, height: 600 }],
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function SongPage({ params }: PageProps<"/music/[slug]">) {
  const { slug } = await params;
  const song = SONGS.find((s) => s.slug === slug);
  if (!song) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-5 pb-24 pt-28 sm:pt-32">
        {song.draft && (
          <p className="mb-6 text-center text-[11px] font-bold tracking-[0.3em] text-muted">
            試作版
          </p>
        )}
        <LyricPlayer song={song} />
        <div className="mt-14 text-center">
          <a
            href="/music"
            className="inline-block rounded-full border border-border px-6 py-3 text-sm font-bold text-muted transition-colors hover:border-pink/50 hover:text-pink-light"
          >
            ← 音楽へ戻る
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
