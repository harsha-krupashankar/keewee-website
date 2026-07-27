import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function AboutWhatWeAre() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <Reveal className="mb-7">
          <span className="mb-3.5 block font-mono text-xs font-bold uppercase tracking-[1.4px] text-green">
            // What we are
          </span>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="rounded-[18px] border border-border bg-white p-7.5 shadow-[0_10px_30px_rgba(28,27,25,0.05)] sm:p-8">
            <p className="mb-4 font-body text-base font-medium leading-relaxed text-body">
              Keewee is a B2B marketing agency for SaaS companies that are
              tired of sounding like every other SaaS company. Positioning,
              content, demand gen, conversion, the whole funnel — run by
              people who&apos;ve actually sat inside marketing teams and
              gotten annoyed at the same things you have.
            </p>
            <p className="font-body text-base font-medium leading-relaxed text-body">
              Every B2B company in 2026 has access to the same AI tools, the
              same templates, the same &ldquo;10 frameworks&rdquo; carousels.
              What most of them don&apos;t have is an opinion. That&apos;s
              the actual gap. Not another content calendar —{" "}
              <strong className="bg-lime px-1 font-bold text-ink [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                a point of view about what to say, who to say it to, and why
                anyone should care.
              </strong>
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="relative overflow-hidden rounded-[18px] bg-ink p-7.5 text-paper shadow-[0_16px_40px_rgba(28,27,25,0.18)] sm:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(#F6F4EF 1.4px, transparent 1.8px)",
                backgroundSize: "15px 15px",
              }}
            />
            <div className="relative mb-3 font-mono text-[11px] font-bold uppercase tracking-[1.2px] text-lime">
              // our mission, if we have to call it that
            </div>
            <p className="relative font-display text-[20px] font-bold leading-[1.35] tracking-[-0.015em] text-paper sm:text-[23px]">
              Make B2B marketing that doesn&apos;t read like it was written by
              a company trying very hard not to offend anyone. Fewer decks.
              More receipts. If a campaign works, we tell you why. If it
              doesn&apos;t, we tell you that too — before you find out from
              your pipeline.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
