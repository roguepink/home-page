import type { Metadata } from "next";
import BackgroundFX from "@/components/BackgroundFX";
import SparkleTrail from "@/components/SparkleTrail";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroIntro from "@/components/sections/HeroIntro";
import Concept from "@/components/sections/Concept";
import Businesses from "@/components/sections/Businesses";
import Vision from "@/components/sections/Vision";
import Contact from "@/components/sections/Contact";
import FlowingName from "@/components/FlowingName";

// 試し版(C 一本の糸)。トップページと同じ中身で、最初の入り方だけ違う。検索には出さない
export const metadata: Metadata = { title: "試し版 C 一本の糸 | ROGUE PINK", robots: { index: false } };

export default function TryPage() {
  return (
    <>
      <BackgroundFX scrollTint />
      <SparkleTrail />
      <Header />
      <main>
        <HeroIntro scene="thread" />
        <Concept />
        <Businesses />
        <Vision />
        <Contact />
        <FlowingName />
      </main>
      <Footer />
    </>
  );
}
