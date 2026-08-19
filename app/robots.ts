import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Allow crawling of the public site. The Studio and API routes carry no
 * indexable content, so keep them out of search results.
 *
 * On anything but the production deployment, disallow everything — the
 * sitemap and canonical tags both advertise keewee.in, so a preview left
 * crawlable would only ever compete with the real domain for the same URLs.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production") {
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
