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
  path,
}: {
  seo?: Seo | null;
  settings?: SiteSettings | null;
  title?: string;
  description?: string;
  /**
   * This route's own path (e.g. `/blog/my-post`), used to self-reference a
   * canonical URL. Without one, a non-production host serving the same 30
   * routes (a Vercel preview alias, say) competes with the real domain for
   * every URL instead of deferring to it.
   */
  path?: string;
}): Metadata {
  const siteName = settings?.title ?? "keewee.in";
  const defaults = settings?.defaultSeo;

  const resolvedTitle = seo?.title ?? title ?? defaults?.title ?? siteName;
  const resolvedDescription =
    seo?.description ?? description ?? defaults?.description ?? undefined;

  const image = seo?.image ?? defaults?.image;
  // A leaf route that defines its own `openGraph` object at all — which every
  // route does, for the title/description — fully replaces the parent's
  // `openGraph`, file-convention image included. So the root
  // `opengraph-image.tsx` route only reaches routes without their own Sanity
  // image if it's referenced here explicitly, not left to Next's inheritance.
  const imageUrl = image?.asset?._ref
    ? urlFor(image).width(1200).height(630).fit("crop").url()
    : `${SITE_URL}/opengraph-image`;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      siteName,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [imageUrl],
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}
