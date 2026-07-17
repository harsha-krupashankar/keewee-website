import Container from "./Container";
import { segments } from "@/lib/data";
import Reveal from "./Reveal";

export default function WhoWeWorkWith() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-5 flex items-center gap-3">
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
            Who we work with
          </span>
          <span className="flex-1 border-b border-border-line" />
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mb-3 max-w-[940px] font-display text-[30px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[40px] lg:text-[52px]">
            We work with B2B SaaS that has a real product{" "}
            <span className="text-green">and is serious about growth.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mb-7 max-w-[760px] font-body text-[15px] font-medium leading-relaxed text-body">
            Founder still running marketing, VP at Series A, or growth lead on
            a PLG product — you care about numbers, not just deliverables. So
            do we.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {segments.map((s, i) => (
            <Reveal
              key={s.tag}
              delay={180 + i * 80}
              className="rounded-[18px] border border-border bg-white p-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.10)]"
            >
              <span className="rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-muted">
                {s.tag}
              </span>
              <h3 className="mb-2 mt-3.5 font-display text-xl font-bold leading-tight tracking-[-0.02em] text-ink">
                {s.title}
              </h3>
              <p className="font-body text-sm font-medium leading-relaxed text-muted">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
