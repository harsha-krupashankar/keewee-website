import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { getLegalSlugs, getPostSlugs, getServiceSlugs } from "@/sanity/lib/content";

const STATIC_ROUTES = [
  "",
  "/about",
  "/blog",
  "/faq",
  "/free-audit",
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

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const postEntries = posts.map(({ slug }) => ({
    url: `${SITE_URL}/blog/${slug}`,
  }));

  const legalEntries = legalDocs.map(({ slug }) => ({
    url: `${SITE_URL}/legal/${slug}`,
  }));

  const serviceEntries = services.map(({ slug }) => ({
    url: `${SITE_URL}/services/${slug}`,
  }));

  return [...staticEntries, ...postEntries, ...legalEntries, ...serviceEntries];
}
