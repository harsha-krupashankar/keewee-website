import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import LegalDocument from "@/components/legal/LegalDocument";
import { metadataFrom } from "@/lib/metadata";
import {
  getLegalDoc,
  getLegalSlugs,
  getSiteSettings,
  toStaticParams,
} from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateStaticParams() {
  return toStaticParams(await getLegalSlugs());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [doc, settings] = await Promise.all([
    getLegalDoc(slug, PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  if (!doc) return {};

  return metadataFrom({
    seo: doc.seo,
    settings,
    title: `${doc.title} — ${settings?.title ?? "keewee.in"}`,
    description: doc.intro,
  });
}

export default async function LegalRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PerspectiveGate render={(opts) => <Content slug={slug} opts={opts} />} />;
}

async function Content({ slug, opts }: { slug: string; opts: FetchOptions }) {
  const doc = await getLegalDoc(slug, opts);
  if (!doc) notFound();

  return (
    <SiteShell opts={opts}>
      <LegalDocument doc={doc} />
    </SiteShell>
  );
}
