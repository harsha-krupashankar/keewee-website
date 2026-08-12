import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import type { Seo, SiteSettings } from "@/sanity/lib/types";

/**
 * Single place the metadata fallback chain lives: page SEO overrides win, then
 * whatever the page itself provides (a post title, a service sub-headline), then
 * the defaults on Site settings.
 */
export function metadataFrom({
  seo,
  settings,
  title,
  description,
}: {
  seo?: Seo | null;
  settings?: SiteSettings | null;
  title?: string;
  description?: string;
}): Metadata {
  const siteName = settings?.title ?? "keewee.in";
  const defaults = settings?.defaultSeo;

  const resolvedTitle = seo?.title ?? title ?? defaults?.title ?? siteName;
  const resolvedDescription =
    seo?.description ?? description ?? defaults?.description ?? undefined;

  const image = seo?.image ?? defaults?.image;
  const imageUrl = image?.asset?._ref
    ? urlFor(image).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      siteName,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}
