import Container from "./Container";
import { reasons } from "@/lib/data";
import Reveal from "./Reveal";

export default function WhyKeewee() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] bg-ink p-8 text-paper shadow-[0_20px_48px_rgba(28,27,25,0.18)] sm:p-10">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[220px] w-[280px] opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
              backgroundSize: "15px 15px",
              maskImage:
                "radial-gradient(circle at top right, #000, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(circle at top right, #000, transparent 72%)",
            }}
          />
          <div className="relative mb-3.5 font-display text-[13px] font-bold uppercase tracking-[0.09em] text-lime">
            The difference
          </div>
          <div className="relative mb-2 flex flex-wrap items-baseline gap-3.5">
            <h2 className="font-display text-[28px] font-extrabold leading-none tracking-[-0.03em] sm:text-[38px] lg:text-[48px]">
              Why Keewee?
            </h2>
            <span className="font-sticker text-xl text-lime">
              Why not just hire someone bigger?
            </span>
          </div>
          <p className="relative mb-6 max-w-[720px] font-body text-[15px] font-medium leading-relaxed text-dark-text">
            Not to brag — we&apos;re not another hollow marketing agency. We
            hate false promises. Here&apos;s why you can trust us:
          </p>
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal
                key={r.no}
                delay={i * 60}
                className="rounded-[18px] border border-dark-border bg-dark-card p-5 transition-all duration-150 hover:-translate-y-1 hover:border-lime/40 hover:bg-[#2c2b28]"
              >
                <span className="font-display text-[26px] font-extrabold tracking-[-0.03em] text-lime">
                  {r.no}
                </span>
                <h3 className="mb-2.5 mt-1.5 font-display text-lg font-bold leading-tight tracking-[-0.02em]">
                  {r.title}
                </h3>
                <p className="font-body text-sm font-medium leading-relaxed text-dark-text-soft">
                  {r.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
