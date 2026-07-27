import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Headline from "@/components/sanity/Headline";
import type { AboutPage } from "@/sanity/lib/types";

export default function AboutFoundingStory({ page }: { page: AboutPage }) {
  const beats = page.storyBeats ?? [];
  if (!beats.length) return null;

  return (
    <section className="py-14 md:py-16">
      <Container>
        {page.storyEyebrow && (
          <Reveal className="mb-3.5 font-mono text-xs font-bold uppercase tracking-[1.4px] text-rust">
            {page.storyEyebrow}
          </Reveal>
        )}
        <Reveal delay={60}>
          <h2 className="mb-9 max-w-[760px] font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink text-pretty sm:text-[36px] lg:text-[42px]">
            <Headline value={page.storyHeadline} />
          </h2>
        </Reveal>

        <div className="flex max-w-[820px] flex-col">
          {beats.map((beat, i) => (
            <Reveal key={beat} delay={120 + i * 60} className="flex items-stretch gap-5.5">
              <div className="flex flex-shrink-0 flex-col items-center">
                <span className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-ink bg-green" />
                {i < beats.length - 1 && (
                  <span className="my-1 w-[2px] flex-1 bg-border-line" />
                )}
              </div>
              <p className="flex-1 pb-6.5 font-body text-base font-medium leading-relaxed text-body">
                {beat}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
