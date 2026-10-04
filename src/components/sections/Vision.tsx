import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Vision() {
  return (
    <section id="vision" className="mx-auto max-w-3xl px-6 py-32 sm:py-40">
      <SectionHeading backdrop eyebrow="VISION" title="目指す世界" />

      <div className="mt-12 space-y-6 text-center text-base leading-loose text-muted sm:text-lg">
        <Reveal x={-32} y={0} delay={0.3}>
          <p>
            アプリも、音楽も、洋服も。暮らしの全部が、ここでゆるやかにつながっていく。
          </p>
        </Reveal>
        <Reveal x={-32} y={0} delay={0.8}>
          <p>遊んで、話して、買って、聴いて。なんでもあり、だけどちゃんと真面目。</p>
        </Reveal>
        {/* 最後の一文だけ、裏からせり上がる。ここがこの節の言いたいこと */}
        <Reveal y={24} delay={1.3}>
          <p className="font-bold text-foreground">
            ひとりから始まる事業が、いつか誰かの「ありがとう」に変わる場所を目指します。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
