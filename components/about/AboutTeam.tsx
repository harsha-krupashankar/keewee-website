import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { aboutTeam } from "@/lib/data";

export default function AboutTeam() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-3.5 font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
          // The team
        </Reveal>
        <Reveal
          delay={60}
          className="mb-9 flex flex-wrap items-baseline gap-3.5"
        >
          <h2 className="font-display text-[28px] font-extrabold leading-none tracking-[-0.03em] text-ink sm:text-[36px] lg:text-[42px]">
            The founder trio!
          </h2>
          <span className="font-sticker text-xl text-green">Say hi.</span>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutTeam.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 60}
              className="flex flex-col rounded-[18px] border border-border bg-white p-6.5 shadow-[0_8px_24px_rgba(28,27,25,0.04)] transition-all duration-150 hover:-translate-y-1 hover:border-[#D9C9B8] hover:shadow-[0_16px_34px_rgba(28,27,25,0.1)]"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-ink bg-green-bg font-display text-lg font-extrabold text-green-dark shadow-[2px_2px_0_#1C1B19]">
                  {member.initials}
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold leading-tight tracking-[-0.02em] text-ink">
                    {member.name}
                  </div>
                  <span className="mt-1.5 inline-block rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.5px] text-green-dark">
                    {member.role}
                  </span>
                </div>
              </div>
              <p className="mb-4 flex-1 font-body text-sm font-medium leading-relaxed text-body">
                {member.bio}
              </p>
              <div className="flex flex-col gap-1 border-t border-dashed border-border-line pt-3.5">
                <span className="font-sticker text-[15px] text-rust">
                  {member.factLabel}
                </span>
                <span className="font-body text-[13px] font-medium leading-relaxed text-muted">
                  {member.fact}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
