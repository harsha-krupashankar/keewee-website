import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Allow crawling of the public site. The Studio and API routes carry no
 * indexable content, so keep them out of search results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
