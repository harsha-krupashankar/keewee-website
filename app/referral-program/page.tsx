import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import ReferralCta from "@/components/referral/ReferralCta";
import ReferralEarn from "@/components/referral/ReferralEarn";
import ReferralFaq from "@/components/referral/ReferralFaq";
import ReferralHero from "@/components/referral/ReferralHero";
import ReferralSteps from "@/components/referral/ReferralSteps";
import ReferralTerms from "@/components/referral/ReferralTerms";
import { metadataFrom } from "@/lib/metadata";
import { getReferralPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getReferralPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings, path: "/referral-program" });
}

export default function ReferralProgramRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getReferralPage(opts);
  if (!page) notFound();

  return (
    <SiteShell opts={opts}>
      <ReferralHero page={page} />
      <ReferralSteps page={page} />
      <ReferralEarn page={page} />
      <ReferralTerms page={page} />
      <ReferralFaq page={page} />
      <ReferralCta page={page} />
    </SiteShell>
  );
}
