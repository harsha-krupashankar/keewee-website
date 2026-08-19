import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import ServicesAudit from "@/components/services-index/ServicesAudit";
import ServicesCategory from "@/components/services-index/ServicesCategory";
import ServicesHero from "@/components/services-index/ServicesHero";
import ServicesQuoteForm from "@/components/services-index/ServicesQuoteForm";
import { metadataFrom } from "@/lib/metadata";
import { getServicesPage, getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getServicesPage(PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  return metadataFrom({ seo: page?.seo, settings, path: "/services" });
}

export default function ServicesRoute() {
  return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
}

async function Content({ opts }: { opts: FetchOptions }) {
  const page = await getServicesPage(opts);
  if (!page) notFound();

  return (
    <SiteShell opts={opts}>
      <ServicesHero hero={page.hero} secondaryCta={page.heroSecondaryCta} />
      {page.categories?.map((category, i) => (
        <ServicesCategory key={category.name} category={category} index={i} />
      ))}
      <ServicesAudit page={page} />
      <ServicesQuoteForm page={page} />
    </SiteShell>
  );
}
