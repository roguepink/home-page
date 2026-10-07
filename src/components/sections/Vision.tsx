import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Vision() {
  return (
    <section id="vision" className="mx-auto max-w-3xl px-6 py-32 sm:py-40">
      <SectionHeading eyebrow="VISION" title="目指す世界" />

      <div className="mt-12 space-y-6 text-center text-base leading-loose text-muted sm:text-lg">
        <Reveal delay={0.05}>
          <p>
            アプリも、音楽も、洋服も。暮らしの全部が、ここでゆるやかにつながっていく。
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p>遊んで、話して、買って、聴いて。なんでもあり、だけどちゃんと真面目。</p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="font-bold text-foreground">
            ひとりから始まる事業が、いつか誰かの「ありがとう」に変わる場所を目指します。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
