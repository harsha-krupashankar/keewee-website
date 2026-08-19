import { ImageResponse } from "next/og";

import { getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED } from "@/sanity/lib/live";

/**
 * Fallback social card for any route that doesn't set its own `seo.image` (or
 * a site-wide default) in Sanity. Without this, every unshared page renders
 * grey placeholder text on LinkedIn, Slack, X and WhatsApp — see the "No
 * og:image on any page" finding. `metadataFrom` only fills in an explicit
 * `openGraph.images` when Sanity has one, so a route with none inherits this
 * file automatically; it never overrides a page that already has a real image.
 */
export const alt = "keewee — B2B SaaS marketing agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const settings = await getSiteSettings(PUBLISHED);
  const title = settings?.title ?? "keewee";
  const tagline = settings?.tagline ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#1C1B19",
          backgroundImage:
            "radial-gradient(circle at 78px 78px, rgba(217,242,92,0.16) 3px, transparent 3.6px)",
          backgroundSize: "36px 36px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 40,
            fontWeight: 800,
            color: "#F6F4EF",
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#D9F25C",
              transform: "rotate(-6deg)",
            }}
          />
          {title}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#F6F4EF",
              maxWidth: 980,
            }}
          >
            {tagline || "Marketing built for B2B SaaS growth."}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              color: "#CFCABE",
            }}
          >
            keewee.in
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
