import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { getLegalSlugs, getPostSlugs, getServiceSlugs } from "@/sanity/lib/content";

const STATIC_ROUTES = [
  "",
  "/about",
  "/blog",
  "/faq",
  "/free-audit",
  "/legal",
  "/newsletter",
  "/prompt-library",
  "/services",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, legalDocs, services] = await Promise.all([
    getPostSlugs(),
    getLegalSlugs(),
    getServiceSlugs(),
  ]);

  // Static, singleton-backed routes don't have a per-route "last changed"
  // signal cheap enough to fetch here, so they get the build time — still
  // more useful to a crawler deciding what to recrawl than no date at all.
  const buildTime = new Date();

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: buildTime,
  }));

  const postEntries = posts.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(updatedAt),
  }));

  const legalEntries = legalDocs.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/legal/${slug}`,
    lastModified: new Date(updatedAt),
  }));

  const serviceEntries = services.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(updatedAt),
  }));

  return [...staticEntries, ...postEntries, ...legalEntries, ...serviceEntries];
}
