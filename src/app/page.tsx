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
import Reveal from "@/components/Reveal";
import IzakayaCard from "@/components/sections/IzakayaCard";

export default function Home() {
  return (
    <>
      <BackgroundFX scrollTint />
      <SparkleTrail />
      <Header />
      <main>
        {/* 開いた瞬間の入り方は C「一本の糸」(2026-10-22 ノブさんが選んだ) */}
        <HeroIntro scene="thread" />
        {/* 2026-11-19 ノブさん: 上のほうに「居酒屋のぶ」のカードを1枚。開店のお知らせ・ほかの人がマスターの回・イベント */}
        <section id="izakaya" className="mx-auto max-w-3xl px-6 pt-16 sm:pt-24">
          <Reveal>
            <IzakayaCard />
          </Reveal>
        </section>
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
