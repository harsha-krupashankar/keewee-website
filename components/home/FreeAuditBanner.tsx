import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { HomePage } from "@/sanity/lib/types";

export default function FreeAuditBanner({ page }: { page: HomePage }) {
  const header = page.auditHeader;

  return (
    <section className="py-14 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-green-border bg-green-bg p-8 shadow-[0_16px_40px_rgba(78,125,46,0.12)] sm:p-10">
          <div
            className="pointer-events-none absolute -bottom-8 -left-6 h-[190px] w-[230px] opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(#4E7D2E 2px, transparent 2.4px)",
              backgroundSize: "14px 14px",
            }}
          />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              {header?.eyebrow && (
                <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green-deep">
                  {header.eyebrow}
                </span>
              )}
              <h2 className="my-3 max-w-[560px] font-display text-[30px] font-extrabold leading-none tracking-[-0.035em] text-ink sm:text-[40px] lg:text-[52px]">
                <Headline value={header?.headline} />
              </h2>
              <Copy
                value={page.auditBody}
                className="mb-5 max-w-[520px] font-body text-base font-semibold leading-relaxed text-green-deep"
              />
              <div className="flex flex-wrap items-center gap-3.5">
                {page.auditCta && (
                  <a
                    href={page.auditCta.href}
                    className="inline-block rounded-xl bg-green px-7 py-4 font-display text-[17px] font-bold text-white shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
                  >
                    {page.auditCta.label}
                  </a>
                )}
                {page.auditSticker && (
                  <span className="-rotate-3 rounded-lg border-2 border-ink bg-green px-3.5 py-1 font-sticker text-lg text-white shadow-[2px_2px_0_#1C1B19] transition-transform duration-300 hover:rotate-0">
                    {page.auditSticker}
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal
              delay={120}
              className="rounded-[18px] bg-ink p-6 text-paper shadow-[0_12px_30px_rgba(28,27,25,0.2)]"
            >
              {page.auditListTitle && (
                <div className="mb-3.5 font-display text-[13px] font-bold uppercase tracking-[0.09em] text-lime">
                  {page.auditListTitle}
                </div>
              )}
              {page.auditItems?.map((item, i) => (
                <div
                  key={item}
                  className="flex gap-2.5 border-b border-dark-border py-2.5 font-body text-sm font-medium leading-snug text-dark-text-softer transition-colors duration-150 hover:text-white"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <span className="font-extrabold text-green-dark">✓</span>
                  {item}
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
