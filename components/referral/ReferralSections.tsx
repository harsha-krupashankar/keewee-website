import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import Copy from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import type { ReferralPage } from "@/sanity/lib/types";
import ReferralForm from "./ReferralForm";
import { CARD_TITLE, LinkButton, SECTION_TITLE, Sticker, WRAP } from "./shared";

/** Pitch on the left, the three-step form on the right; stacks below ~900px. */
export function ReferralHero({ page }: { page: ReferralPage }) {
  return (
    <section
      className={`${WRAP} flex flex-wrap items-start gap-20 pb-[clamp(96px,10vw,144px)] pt-[clamp(40px,5vw,72px)]`}
    >
      <Reveal eager className="flex min-w-0 flex-[1_1_440px] flex-col gap-8 pt-8">
        {(page.heroEyebrow || page.heroSticker) && (
          <div className="flex flex-wrap items-center gap-4">
            {page.heroEyebrow && (
              <span className="font-display text-xs font-bold uppercase tracking-[0.12em] text-body">
                {page.heroEyebrow}
              </span>
            )}
            {page.heroSticker && <Sticker rotate={-4}>{page.heroSticker}</Sticker>}
          </div>
        )}
        <h1 className="font-display text-[length:clamp(48px,7vw,92px)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink">
          <Headline value={page.heroHeadline} />
        </h1>
        {page.heroIntro && (
          <p className="max-w-[520px] font-body text-xl font-medium leading-[1.55] text-body">
            {page.heroIntro}
          </p>
        )}
        {page.heroNote && (
          <p className="max-w-[520px] rounded-[18px] bg-green-bg px-5 py-4 font-body text-base font-medium leading-relaxed text-ink">
            {page.heroNote}
          </p>
        )}
      </Reveal>

      <ReferralForm copy={page.form} />
    </section>
  );
}

export function ReferralHowItWorks({ page }: { page: ReferralPage }) {
  const steps = page.howItWorksSteps ?? [];
  if (!steps.length) return null;

  return (
    <section className="border-y-2 border-ink bg-white">
      <div className={`${WRAP} flex flex-col gap-16 py-[clamp(88px,10vw,136px)]`}>
        <Reveal>
          <h2 className={`max-w-[720px] ${SECTION_TITLE}`}>
            <Headline value={page.howItWorksHeadline} />
          </h2>
        </Reveal>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-8">
          {steps.map((step, i) => (
            <li key={step.title}>
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
                  {step.title}
                </h3>
                <p className="font-body text-[15px] font-medium leading-relaxed text-body">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const FIGURE =
  "font-display text-[length:clamp(56px,7vw,88px)] font-extrabold leading-[0.92] tracking-[-0.04em]";

export function ReferralEarnings({ page }: { page: ReferralPage }) {
  return (
    <section className={`${WRAP} flex flex-wrap gap-8 py-[clamp(88px,10vw,136px)]`}>
      <Reveal className="box-border flex min-w-0 flex-[1_1_460px] flex-col gap-7 rounded-[24px] bg-ink p-[clamp(32px,5vw,64px)] text-paper">
        <h2 className={`text-[length:clamp(30px,3.4vw,40px)] text-paper ${CARD_TITLE}`}>
          <Headline value={page.earningsHeadline} />
        </h2>
        {page.earningsFigure && <div className={`text-lime ${FIGURE}`}>{page.earningsFigure}</div>}
        {page.earningsBody && (
          <p className="font-body text-[17px] font-medium leading-relaxed text-[#E4E0D6]">
            {page.earningsBody}
          </p>
        )}
        {page.earningsFootnote && (
          <p className="border-t border-[#3A3833] pt-7 font-display text-xl font-bold leading-[1.3] text-paper">
            {page.earningsFootnote}
          </p>
        )}
      </Reveal>
      <Reveal
        delay={100}
        className="box-border flex min-w-0 flex-[1_1_360px] flex-col gap-7 rounded-[24px] bg-green-bg p-[clamp(32px,5vw,64px)]"
      >
        <h2 className={`text-[length:clamp(30px,3.4vw,40px)] text-ink ${CARD_TITLE}`}>
          <Headline value={page.eligibilityHeadline} />
        </h2>
        {page.eligibilityFigure && (
          <div className={`text-green ${FIGURE}`}>{page.eligibilityFigure}</div>
        )}
        {page.eligibilityBody && (
          <p className="font-body text-[17px] font-medium leading-relaxed text-ink">
            {page.eligibilityBody}
          </p>
        )}
      </Reveal>
    </section>
  );
}

export function ReferralTerms({ page }: { page: ReferralPage }) {
  const terms = page.terms ?? [];
  if (!terms.length) return null;

  return (
    <section
      id="terms"
      className={`${WRAP} flex flex-col gap-12 pb-[clamp(88px,10vw,136px)]`}
    >
      <Reveal>
        <h2 className={SECTION_TITLE}>
          <Headline value={page.termsHeadline} />
        </h2>
      </Reveal>
      <Reveal>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-16 gap-y-9 rounded-[24px] bg-white p-[clamp(32px,4.5vw,64px)] shadow-[0_8px_24px_rgba(28,27,25,0.04)]">
          {terms.map((term) => (
            <li
              key={term}
              className="flex items-start gap-3 font-body text-[15px] font-medium leading-relaxed text-body"
            >
              <span
                aria-hidden
                className="flex-shrink-0 font-display text-lg font-extrabold leading-[1.4] text-green"
              >
                ✱
              </span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function ReferralFaq({ page }: { page: ReferralPage }) {
  if (!page.faqItems?.length) return null;

  return (
    <section className="bg-surface">
      <div className={`${WRAP} flex flex-wrap gap-16 py-[clamp(88px,10vw,136px)]`}>
        <Reveal className="min-w-0 flex-[1_1_300px]">
          <h2 className={SECTION_TITLE}>
            <Headline value={page.faqHeadline} />
          </h2>
        </Reveal>
        <Reveal delay={80} className="min-w-0 flex-[999_1_560px]">
          <FaqAccordion items={page.faqItems} variant="soft" />
        </Reveal>
      </div>
    </section>
  );
}

export function ReferralCta({ page }: { page: ReferralPage }) {
  return (
    <section className="bg-ink text-paper">
      <Reveal
        className={`${WRAP} flex flex-col items-start gap-10 pb-[clamp(80px,9vw,120px)] pt-[clamp(104px,12vw,168px)]`}
      >
        <h2 className="max-w-[900px] font-display text-[length:clamp(40px,6vw,76px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-paper">
          <Headline value={page.ctaHeadline} />
        </h2>
        {page.ctaBody && (
          <p className="font-body text-xl font-medium leading-[1.55] text-[#E4E0D6]">
            {page.ctaBody}
          </p>
        )}
        {page.ctaButton && (
          <LinkButton
            href={page.ctaButton.href}
            openInNewTab={page.ctaButton.openInNewTab}
            variant="primary-on-dark"
            size="large"
          >
            {page.ctaButton.label}
          </LinkButton>
        )}
        {page.ctaContact?.length ? (
          <div className="mt-16 w-full border-t border-[#3A3833] pt-10">
            <Copy
              value={page.ctaContact}
              tone="dark"
              className="font-body text-base font-medium leading-relaxed text-[#C9C3B6] [&_a]:border-lime/40 [&_a]:text-lime [&_a:hover]:border-lime [&_a:hover]:text-lime"
            />
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
