import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Headline from "@/components/sanity/Headline";
import type { ReferralPage } from "@/sanity/lib/types";

/** “How the referral program works”. Numbered by position; the last step is the payoff. */
export default function ReferralSteps({ page }: { page: ReferralPage }) {
  const steps = page.steps ?? [];
  if (!steps.length) return null;

  return (
    <section className="border-y-2 border-ink bg-white py-20 md:py-32">
      <Container className="flex flex-col gap-12 md:gap-16">
        <h2 className="max-w-[720px] font-display text-[34px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[52px]">
          <Headline value={page.stepsHeadline} />
        </h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal
                delay={i * 80}
                className={`flex h-full flex-col gap-5 rounded-[18px] px-8 py-10 ${
                  i === steps.length - 1 ? "bg-green-bg" : "bg-paper"
                }`}
              >
                <span className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] text-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[22px] font-bold leading-[1.1] text-ink">
                  {s.title}
                </h3>
                <p className="font-body text-[15px] font-medium leading-relaxed text-body">
                  {s.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
