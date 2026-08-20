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
  // A conservative baseline, not a full Content-Security-Policy: CSP needs an
  // explicit allow-list across the Sanity image CDN, Google Fonts, Vercel
  // Analytics, and the Studio's own script/style/connect needs at `/studio`
  // (including its live-preview websocket), and getting that wrong silently
  // breaks the Studio rather than failing loudly. These three carry no such
  // compatibility risk. The `X-Robots-Tag` noindex for non-canonical hosts
  // lives in `middleware.ts` instead — it has to read the request's `Host`
  // header, which isn't available in this static config.
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
