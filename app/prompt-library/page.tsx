import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DarkCtaSection from "@/components/DarkCtaSection";
import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import PromptLibraryCategories from "@/components/prompt-library/PromptLibraryCategories";
import PromptLibraryHero from "@/components/prompt-library/PromptLibraryHero";
import PromptLibraryPrimer from "@/components/prompt-library/PromptLibraryPrimer";
import { metadataFrom } from "@/lib/metadata";
import { getPromptLibraryPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getPromptLibraryPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings, path: "/prompt-library" });
}

export default function PromptLibraryRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getPromptLibraryPage(opts);
  if (!page) notFound();

  return (
    <SiteShell opts={opts}>
      <PromptLibraryHero page={page} />
      <PromptLibraryPrimer page={page} />
      <PromptLibraryCategories categories={page.categories} />
      <DarkCtaSection
        eyebrow={page.ctaLabel}
        headline={page.ctaHeadline}
        body={page.ctaBody}
        button={page.ctaButton}
        showAsterisk
        className="py-14 md:pb-20 md:pt-16"
      />
    </SiteShell>
  );
}
