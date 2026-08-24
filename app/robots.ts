import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { CANONICAL_HOSTS, SITE_URL } from "@/lib/site";

/**
 * Allow crawling of the public site. The Studio and API routes carry no
 * indexable content, so keep them out of search results.
 *
 * On any host other than the canonical domain, disallow everything. A
 * `VERCEL_ENV === "production"` check isn't enough here: Vercel's own
 * `<project>.vercel.app` domain — the exact URL this site was being audited
 * on before `keewee.in`'s DNS was live — *is* the production deployment, just
 * on the wrong host, so that check alone let it stay fully crawlable. Reading
 * the request `Host` header instead (a Request-time API, so this route
 * becomes per-request rather than cached at build time) catches that case
 * along with every actual preview deployment.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");
  if (!CANONICAL_HOSTS.has(host ?? "")) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
