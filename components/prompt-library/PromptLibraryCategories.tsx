import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PromptCard from "@/components/prompt-library/PromptCard";
import type { PromptCategory } from "@/sanity/lib/types";

const anchorFor = (index: number) => `cat-${index + 1}`;

export default function PromptLibraryCategories({
  categories,
}: {
  categories: PromptCategory[];
}) {
  if (!categories?.length) return null;

  return (
    <>
      <div
        id="kw-categories"
        className="scroll-mt-[110px] border-b border-border bg-paper py-5.5"
      >
        <Container className="flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <a
              key={cat.name}
              href={`#${anchorFor(i)}`}
              className="whitespace-nowrap rounded-full border border-border bg-white px-4.5 py-2 font-display text-[13px] font-bold text-body transition-colors duration-150 hover:border-green hover:bg-green hover:text-white"
            >
              {cat.name}
            </a>
          ))}
        </Container>
      </div>

      {categories.map((cat, i) => {
        const num = String(i + 1).padStart(2, "0");
        return (
          <section
            key={cat.name}
            id={anchorFor(i)}
            className="relative scroll-mt-[110px] overflow-hidden border-t border-border bg-paper py-13 md:py-14"
          >
            <div
              className="pointer-events-none absolute -top-8 right-5 hidden select-none font-display text-[150px] font-extrabold leading-[0.8] tracking-[-0.05em] text-transparent [-webkit-text-stroke:2px_#E7E1D3] lg:block"
              aria-hidden
            >
              {num}
            </div>

            <Container className="relative">
              <Reveal className="mb-7 max-w-[700px]">
                <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
                  {num} / {cat.name}
                </span>
                <h2 className="mb-3 font-display text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink">
                  {cat.name}
                </h2>
                <p className="font-body text-base leading-[1.6] text-body">{cat.tagline}</p>
              </Reveal>

              <div className="flex flex-col gap-3">
                {cat.prompts.map((prompt, j) => (
                  <PromptCard
                    key={prompt.title}
                    num={String(j + 1).padStart(2, "0")}
                    prompt={prompt}
                    delay={Math.min(j, 6) * 40}
                  />
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
