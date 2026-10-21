import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import ReferralThankYou from "@/components/referral/ReferralThankYou";
import { metadataFrom } from "@/lib/metadata";
import { getReferralPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

/** Only reachable by submitting the form, so never indexed whatever SEO says. */
export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getReferralPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({
    seo: { ...page?.thankYouSeo, noIndex: true },
    settings,
    path: "/referral/thank-you",
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
      <ReferralThankYou page={page} />
    </SiteShell>
  );
}
