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
import IzakayaComingSoon from "@/components/sections/IzakayaComingSoon";
import ObraEternaCard from "@/components/sections/ObraEternaCard";
import ObraShisou from "@/components/sections/ObraShisou";

export default function Home() {
  return (
    <>
      <BackgroundFX scrollTint />
      <SparkleTrail />
      <Header />
      <main>
        {/* 開いた瞬間の入り方は C「一本の糸」(2026-10-22 ノブさんが選んだ) */}
        <HeroIntro scene="thread" />
        {/* 2026-11-19 ノブさん: 上のほうに「居酒屋ノブ」のカード。いまは「ただいま準備中・近日公開予定」。
            開店するときは IzakayaCard(news.json を読んで 次の開店日・マスターの回を出す)に差しかえる */}
        <section id="izakaya" className="mx-auto max-w-3xl px-6 pt-16 sm:pt-24">
          <Reveal>
            <IzakayaComingSoon />
          </Reveal>
        </section>
        {/* 2026-11-25 ノブさん:「オブラ・エテルナ 始まります」のカードを 居酒屋のカードの下に */}
        <section id="obra-eterna" className="mx-auto max-w-3xl px-6 pt-12 sm:pt-16">
          <Reveal>
            <ObraEternaCard />
          </Reveal>
          {/* 2026-11-25 ノブさん: カードの下に「いまの段階の思想」。執筆の読み上げと同じ形(文章で読める・ノブの声で聞ける・速さ3段) */}
          <Reveal>
            <ObraShisou />
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
