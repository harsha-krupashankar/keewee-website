import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DarkCtaSection from "@/components/DarkCtaSection";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import AboutFoundingStory from "@/components/about/AboutFoundingStory";
import AboutHero from "@/components/about/AboutHero";
import AboutTeam from "@/components/about/AboutTeam";
import AboutWhatWeAre from "@/components/about/AboutWhatWeAre";
import { metadataFrom } from "@/lib/metadata";
import { getAboutPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getAboutPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings });
}

export default function AboutRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getAboutPage(opts);
  if (!page) notFound();

  return (
    <SiteShell opts={opts}>
      <AboutHero hero={page.hero} />
      <AboutWhatWeAre page={page} />
      <AboutFoundingStory page={page} />
      {/* <AboutTeam page={page} /> */}
      <DarkCtaSection
        eyebrow={page.ctaEyebrow}
        headline={page.ctaHeadline}
        body={page.ctaBody}
        buttons={page.ctaButtons}
        className="py-8 md:pb-16 md:pt-10"
      />
    </SiteShell>
  );
}
