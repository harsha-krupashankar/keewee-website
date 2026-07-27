import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import type { FaqGroup } from "@/sanity/lib/types";

export default function FaqGroups({ groups }: { groups: FaqGroup[] }) {
  if (!groups?.length) return null;

  return (
    <>
      {groups.map((group, i) => (
        <section
          key={group._id}
          id={group.slug}
          className="scroll-mt-[130px] py-10 md:py-12"
        >
          <Container>
            <Reveal className="mb-5 flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[1.2px] text-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 border-b border-border-line" />
            </Reveal>

            <Reveal delay={40} className="mb-6">
              <h2 className="font-display text-[26px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[34px]">
                {group.title}
              </h2>
            </Reveal>

            {/* Only the first group opens by default; the rest start collapsed. */}
            <FaqAccordion items={group.items} defaultOpen={i === 0 ? 0 : -1} />
          </Container>
        </section>
      ))}
    </>
  );
}
