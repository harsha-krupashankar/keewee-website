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
  // Analytics, Google Tag Manager, and the Studio's own script/style/connect
  // needs at `/studio` (including its live-preview websocket), and getting
  // that wrong silently breaks the Studio rather than failing loudly. These
  // carry no such compatibility risk. The `X-Robots-Tag` noindex for non-canonical hosts
  // lives in `middleware.ts` instead — it has to read the request's `Host`
  // header, which isn't available in this static config.
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      // Report-only so nothing breaks silently: watch the console on the
      // Studio (`/studio`) and the main site for a week, widen any directive
      // that trips, then rename this to `Content-Security-Policy` to enforce.
      {
        key: "Content-Security-Policy-Report-Only",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: blob: https://cdn.sanity.io",
          "connect-src 'self' https://*.api.sanity.io wss://*.api.sanity.io https://va.vercel-scripts.com https://www.googletagmanager.com",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
        ].join("; "),
      },
    ];

    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
