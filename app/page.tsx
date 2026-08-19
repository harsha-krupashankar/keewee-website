import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import FreeAuditBanner from "@/components/home/FreeAuditBanner";
import FullFunnel from "@/components/home/FullFunnel";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Problem from "@/components/home/Problem";
import Proof from "@/components/home/Proof";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import WhyKeewee from "@/components/home/WhyKeewee";
import { metadataFrom } from "@/lib/metadata";
import { getHomePage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getHomePage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings, path: "/" });
}

export default function HomeRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const [page, settings] = await Promise.all([
    getHomePage(opts),
    getSiteSettings(opts),
  ]);
  if (!page) notFound();

  return (
    <SiteShell opts={opts}>
      <Hero page={page} />
      <Marquee text={settings?.marqueeText} />
      <Problem page={page} />
      <FullFunnel page={page} />
      <WhyKeewee page={page} />
      <Proof page={page} />
      <FreeAuditBanner page={page} />
      <WhoWeWorkWith page={page} />
      <Faq page={page} />
      <FinalCta page={page} />
    </SiteShell>
  );
}
