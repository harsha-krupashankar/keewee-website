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
  // The sitemap and robots.txt both advertise keewee.in as canonical, but
  // every Vercel preview — including the one this site currently answers
  // requests on — serves the identical 30 routes. Without this, a preview
  // discovered by a crawler competes with the real domain for the same URLs.
  // `VERCEL_ENV` is fixed per build, so this is safe to resolve at build time.
  async headers() {
    if (process.env.VERCEL_ENV === "production") return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
