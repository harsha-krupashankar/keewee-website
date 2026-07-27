import type { NextConfig } from "next";
import { sanity } from "next-sanity/live/cache-life";

const nextConfig: NextConfig = {
  /**
   * Cache Components gives us a prerendered static shell per route while
   * `sanityFetch` results stay revalidatable by tag. See `sanity/lib/content.ts`.
   */
  cacheComponents: true,
  cacheLife: {
    /**
     * Sanity's Live Content API and the `/api/revalidate` webhook both
     * invalidate on demand, so time-based expiry is a backstop rather than the
     * mechanism. The default 15-minute revalidate would just add pointless
     * refetches.
     */
    default: sanity,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
