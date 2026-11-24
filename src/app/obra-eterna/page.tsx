// 2026-11-25 ノブさん:「ホームページに貼ったものを LINE で送りたい。2枚のカードを1つにまとめた形で」
// → トップのオブラ・エテルナのカードと「いまの段階の思想」を1ページにまとめた、送る用のページ。
//   LINE に貼ると出る絵は同じフォルダの opengraph-image.jpg(作り方: お城の絵 castle.svg + 題名を 1200x630 で撮ったもの)。
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ObraEternaCard from "@/components/sections/ObraEternaCard";
import ObraShisou from "@/components/sections/ObraShisou";

const TITLE = "オブラ・エテルナ 始まります | ROGUE PINK";
const DESCRIPTION = "完成しない建物を、建てはじめます。いまの段階の思想を、文章と NOBU の声で。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, siteName: "ROGUE PINK", locale: "ja_JP", type: "website", url: "/obra-eterna" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ObraEternaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 sm:pt-32">
        <ObraEternaCard />
        <ObraShisou />
        <p className="mt-10 text-center text-sm">
          <Link href="/" className="text-muted underline underline-offset-4 hover:text-pink-light">
            ROGUE PINK のトップへ
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
