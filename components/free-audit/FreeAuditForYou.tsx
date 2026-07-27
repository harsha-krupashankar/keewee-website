import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Headline from "@/components/sanity/Headline";
import type { FreeAuditPage } from "@/sanity/lib/types";

export default function FreeAuditForYou({ page }: { page: FreeAuditPage }) {
  const header = page.forYouHeader;
  const pointers = page.forYouPointers ?? [];
  if (!pointers.length) return null;

  return (
    <section className="relative overflow-hidden bg-ink py-14 text-paper md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-7 right-8 select-none font-display text-[150px] font-extrabold text-[#262523]"
        aria-hidden
      >
        ✱
      </div>
      <Container className="relative z-[2] max-w-[780px]">
        <Reveal>
          {header?.eyebrow && (
            <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-lime">
              {header.eyebrow}
            </span>
          )}
          <h2 className="mb-8 font-display text-[28px] font-extrabold leading-[1.06] tracking-[-0.03em] text-paper sm:text-[42px]">
            <Headline value={header?.headline} />
          </h2>
        </Reveal>
        <div className="flex flex-col">
          {pointers.map((pointer, i) => (
            <Reveal
              key={pointer}
              delay={i * 40}
              className="flex items-start gap-3.5 border-t border-[#33322E] py-4"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[7px] bg-lime text-[13px] font-extrabold text-ink">
                ✓
              </span>
              <p className="font-body text-base font-medium leading-relaxed text-[#D7D2C6]">
                {pointer}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
