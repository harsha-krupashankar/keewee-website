import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLayout from "@/components/services/ServiceLayout";
import { serviceDocs } from "@/lib/service-data";

export function generateStaticParams() {
  return serviceDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = serviceDocs.find((d) => d.slug === slug);
  if (!doc) return {};

  return {
    title: `${doc.category} for B2B SaaS — keewee.in`,
    description: doc.heroSub,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = serviceDocs.find((d) => d.slug === slug);
  if (!doc) notFound();

  return <ServiceLayout doc={doc} />;
}
