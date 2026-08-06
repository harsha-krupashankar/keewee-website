import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Disallow everything for now — the site isn't ready for search engines yet.
 * Flip `disallow` to a real path list (or drop it) when we're ready to launch.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
