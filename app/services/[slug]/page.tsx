import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import ServiceDifferently from "@/components/services/ServiceDifferently";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOfferings from "@/components/services/ServiceOfferings";
import ServiceProblem from "@/components/services/ServiceProblem";
import ServiceQuoteForm from "@/components/services/ServiceQuoteForm";
import ServiceTalkToUs from "@/components/services/ServiceTalkToUs";
import ServiceTestimonial from "@/components/services/ServiceTestimonial";
import { metadataFrom } from "@/lib/metadata";
import {
  getServicePage,
  getServiceSlugs,
  getSiteSettings,
  toStaticParams,
} from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateStaticParams() {
  return toStaticParams(await getServiceSlugs());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [doc, settings] = await Promise.all([
    getServicePage(slug, PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  if (!doc) return {};

  return metadataFrom({
    seo: doc.seo,
    settings,
    title: `${doc.category} for B2B SaaS — ${settings?.title ?? "keewee.in"}`,
    description: doc.heroSub,
    path: `/services/${slug}`,
  });
}

export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PerspectiveGate render={(opts) => <Content slug={slug} opts={opts} />} />;
}

async function Content({ slug, opts }: { slug: string; opts: FetchOptions }) {
  const [doc, settings] = await Promise.all([
    getServicePage(slug, opts),
    getSiteSettings(opts),
  ]);
  if (!doc) notFound();

  // Service pages reuse the global header CTA for their in-page buttons, so the
  // booking destination only has to be maintained in Site settings.
  const cta = settings?.headerCta;

  return (
    <SiteShell opts={opts}>
      <ServiceHero doc={doc} cta={cta} />
      <ServiceProblem doc={doc} />
      <ServiceOfferings doc={doc} />
      <ServiceDifferently doc={doc} />
      <ServiceTestimonial doc={doc} />
      <ServiceFaq doc={doc} />
      <ServiceQuoteForm doc={doc} />
      <ServiceTalkToUs doc={doc} cta={cta} />
    </SiteShell>
  );
}
