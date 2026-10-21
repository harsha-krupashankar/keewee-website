import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Button from "@/components/Button";
import Container from "@/components/Container";
import PerspectiveGate from "@/components/PerspectiveGate";
import Reveal from "@/components/Reveal";
import SiteShell from "@/components/SiteShell";
import Copy, { toPlainText } from "@/components/sanity/Copy";
import Headline from "@/components/sanity/Headline";
import ReferralThankYouBody from "@/components/referral/ReferralThankYouBody";
import Sticker from "@/components/referral/Sticker";
import { metadataFrom } from "@/lib/metadata";
import { getReferralPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

/** Only reached after submitting the form, so it never belongs in search. */
export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getReferralPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({
    seo: { noIndex: true },
    settings,
    title: toPlainText(page?.thankYouHeadline ?? undefined) || undefined,
    path: "/referral-program/thank-you",
  });
}

export default function ReferralThankYouRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getReferralPage(opts);
  if (!page) notFound();

  return (
    <SiteShell opts={opts}>
      <Container className="flex flex-col gap-12 pb-24 pt-14 md:pt-16">
        <div className="flex max-w-[820px] flex-col gap-6">
          {page.thankYouSticker && (
            <div>
              <Sticker tone="green" size="medium" className="-rotate-[3deg]">
                {page.thankYouSticker}
              </Sticker>
            </div>
          )}
          <Reveal eager y={18}>
            <h1 className="font-display text-[44px] font-extrabold leading-[0.94] tracking-[-0.04em] text-ink sm:text-[64px] lg:text-[84px]">
              <Headline value={page.thankYouHeadline} />
            </h1>
          </Reveal>
          {page.thankYouBody && (
            <ReferralThankYouBody
              body={page.thankYouBody}
              fallback={page.thankYouCompanyFallback ?? ""}
            />
          )}
          {page.thankYouNote && (
            <p className="inline-flex items-center gap-2.5 self-start rounded-full bg-green-bg px-4.5 py-3 font-body text-[15px] font-semibold leading-snug text-ink">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4E7D2E"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              {page.thankYouNote}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col items-start gap-4 rounded-[24px] bg-ink p-8 text-paper sm:p-10">
            <h2 className="font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-4xl">
              {page.anotherHeadline}
            </h2>
            {page.anotherBody && (
              <p className="font-body text-[17px] font-medium leading-relaxed text-dark-text-softer">
                {page.anotherBody}
              </p>
            )}
            {page.anotherButton && (
              <div className="pt-2">
                <Button
                  href={page.anotherButton.href}
                  className="px-7 py-3.5 text-lg shadow-[3px_3px_0_#D9F25C]! hover:shadow-[1px_1px_0_#D9F25C]!"
                >
                  {page.anotherButton.label}
                </Button>
              </div>
            )}
          </Reveal>
          <Reveal
            delay={100}
            className="flex flex-col items-start gap-4 rounded-[24px] border-2 border-ink bg-white p-8 shadow-[6px_6px_0_#1C1B19] sm:p-10"
          >
            <h2 className="font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl">
              {page.callHeadline}
            </h2>
            <Copy
              value={page.callBody}
              className="font-body text-[17px] font-medium leading-relaxed text-body"
            />
          </Reveal>
        </div>
      </Container>
    </SiteShell>
  );
}
