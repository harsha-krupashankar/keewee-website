import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { aboutStory } from "@/lib/data";

export default function AboutFoundingStory() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-3.5 font-mono text-xs font-bold uppercase tracking-[1.4px] text-rust">
          // The founding story
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mb-9 max-w-[760px] font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink text-pretty sm:text-[36px] lg:text-[42px]">
            How three friends turned a catch-up call into a business.
          </h2>
        </Reveal>

        <div className="flex max-w-[820px] flex-col">
          {aboutStory.map((beat, i) => (
            <Reveal
              key={i}
              delay={120 + i * 60}
              className="flex items-stretch gap-5.5"
            >
              <div className="flex flex-shrink-0 flex-col items-center">
                <span className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-ink bg-green" />
                {i < aboutStory.length - 1 && (
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
