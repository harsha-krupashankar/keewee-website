import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";
import { ImageResponse } from "next/og";

import { getHomePage } from "@/sanity/lib/content";
import { PUBLISHED } from "@/sanity/lib/live";
import type { Headline, RichText } from "@/sanity/lib/types";

/**
 * Fallback social card for any route that doesn't set its own `seo.image` (or
 * a site-wide default) in Sanity. Without this, every unshared page renders
 * grey placeholder text on LinkedIn, Slack, X and WhatsApp — see the "No
 * og:image on any page" finding. `metadataFrom` only fills in an explicit
 * `openGraph.images` when Sanity has one, so a route with none inherits this
 * file automatically; it never overrides a page that already has a real image.
 *
 * Recreates the homepage hero (`components/home/Hero.tsx`) — same paper
 * background, badge pill, headline marks and stickers — since it's the card
 * most visitors will actually see when the homepage link gets shared. Fonts
 * are the real brand faces (not satori's default sans) so the card actually
 * reads as this site, not a generic one.
 */
export const alt = "keewee — B2B SaaS marketing agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F6F4EF";
const INK = "#1C1B19";
const BODY = "#57534A";
const GREEN = "#4E7D2E";
const RUST = "#C0552F";
const LIME = "#D9F25C";
const BORDER = "#EBE7DD";

const DISPLAY = "Bricolage Grotesque";
const TEXT = "Archivo";
const STICKER = "Bangers";

const fontsPromise = Promise.all([
  readFile(
    join(process.cwd(), "app/_og-fonts/BricolageGrotesque-ExtraBold.ttf"),
  ),
  readFile(join(process.cwd(), "app/_og-fonts/Archivo-SemiBold.ttf")),
  readFile(join(process.cwd(), "app/_og-fonts/Bangers-Regular.ttf")),
]);

function plainText(blocks?: RichText | null): string {
  if (!blocks?.length) return "";
  return blocks
    .map((block) =>
      "children" in block && Array.isArray(block.children)
        ? block.children
            .map((child) => ("text" in child ? child.text : ""))
            .join("")
        : "",
    )
    .join(" ")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

function renderHeadline(blocks?: Headline | null) {
  if (!blocks?.length) return null;
  return blocks.map((block: PortableTextBlock, blockIndex: number) => {
    if (block._type !== "block" || !Array.isArray(block.children)) return null;
    return (
      <span
        key={blockIndex}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          whiteSpace: "pre-wrap",
        }}
      >
        {block.children.map((child, childIndex) => {
          const span = child as PortableTextSpan;
          if (span._type !== "span") return null;
          const marks = span.marks ?? [];
          let node: React.ReactNode = span.text;

          if (marks.includes("rust"))
            node = <span style={{ color: RUST }}>{node}</span>;
          if (marks.includes("green"))
            node = <span style={{ color: GREEN }}>{node}</span>;
          if (marks.includes("lime"))
            node = <span style={{ color: LIME }}>{node}</span>;
          if (marks.includes("em"))
            node = <span style={{ fontStyle: "italic" }}>{node}</span>;
          if (marks.includes("highlight")) {
            node = (
              <span style={{ display: "flex", position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: -6,
                    right: -8,
                    bottom: 6,
                    height: "32%",
                    background: LIME,
                    borderRadius: 4,
                    transform: "rotate(-1deg)",
                  }}
                />
                <span style={{ position: "relative" }}>{node}</span>
              </span>
            );
          }

          return <span key={childIndex}>{node}</span>;
        })}
      </span>
    );
  });
}

export default async function Image() {
  const [[bricolage, archivo, bangers], home] = await Promise.all([
    fontsPromise,
    getHomePage(PUBLISHED),
  ]);

  const badge = home?.heroBadge;
  const stickerA = home?.heroStickerA;
  const stickerB = home?.heroStickerB;
  const intro = truncate(plainText(home?.heroIntro), 118);
  const headline = renderHeadline(home?.heroHeadline);
  const primaryCta = home?.heroCta?.primary;
  const secondaryCta = home?.heroCta?.secondary;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 22,
        position: "relative",
        padding: "0 90px",
        background: PAPER,
        backgroundImage: `radial-gradient(${INK}1a 1.6px, transparent 2px)`,
        backgroundSize: "22px 22px",
        fontFamily: TEXT,
      }}
    >
      {/* Ghost asterisk, echoing the oversized outline mark behind the hero copy. */}
      <span
        style={{
          position: "absolute",
          top: -50,
          right: 70,
          fontSize: 280,
          fontFamily: DISPLAY,
          color: `${INK}0d`,
          transform: "rotate(-4deg)",
        }}
      >
        *
      </span>

      {stickerA && (
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 76,
            display: "flex",
            alignItems: "center",
            padding: "8px 18px",
            background: LIME,
            border: `2px solid ${INK}`,
            borderRadius: 8,
            transform: "rotate(-7deg)",
            boxShadow: `4px 4px 0 ${INK}`,
            fontFamily: STICKER,
            fontSize: 22,
            color: INK,
          }}
        >
          {stickerA}
        </div>
      )}

      {stickerB && (
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 60,
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            background: "#FFFFFF",
            border: `2px solid ${INK}`,
            borderRadius: 8,
            transform: "rotate(6deg)",
            boxShadow: `4px 4px 0 ${INK}`,
            fontFamily: STICKER,
            fontSize: 18,
            color: RUST,
            textDecoration: "line-through",
          }}
        >
          {stickerB}
        </div>
      )}

      <span
        style={{
          position: "absolute",
          bottom: 130,
          left: 260,
          fontSize: 30,
          color: GREEN,
          transform: "rotate(8deg)",
        }}
      >
        *
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 190,
          right: 240,
          fontSize: 22,
          color: RUST,
          transform: "rotate(-10deg)",
        }}
      >
        *
      </span>

      {badge && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 22px",
            background: "#FFFFFF",
            border: `1px solid ${BORDER}`,
            borderRadius: 999,
          }}
        >
          <span
            style={{
              display: "flex",
              width: 8,
              height: 8,
              borderRadius: 999,
              background: RUST,
            }}
          />
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: RUST,
            }}
          >
            {badge}
          </span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 900,
          fontFamily: DISPLAY,
          fontSize: 78,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: "-0.03em",
          color: INK,
          whiteSpace: "pre-wrap",
        }}
      >
        {headline ?? "Marketing built for B2B SaaS growth."}
      </div>

      {intro && (
        <div
          style={{
            display: "flex",
            maxWidth: 620,
            fontSize: 19,
            fontWeight: 500,
            color: BODY,
          }}
        >
          {intro}
        </div>
      )}

      {(primaryCta || secondaryCta) && (
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {primaryCta && (
            <div
              style={{
                display: "flex",
                padding: "13px 26px",
                background: GREEN,
                borderRadius: 10,
                boxShadow: `3px 3px 0 ${INK}`,
                fontFamily: DISPLAY,
                fontSize: 17,
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              {primaryCta.label}
            </div>
          )}
          {secondaryCta && (
            <span
              style={{
                display: "flex",
                fontFamily: DISPLAY,
                fontSize: 17,
                fontWeight: 800,
                color: INK,
                borderBottom: `2.5px solid ${INK}33`,
                paddingBottom: 3,
              }}
            >
              {secondaryCta.label} →
            </span>
          )}
        </div>
      )}
    </div>,
    {
      ...size,
      fonts: [
        { name: DISPLAY, data: bricolage, style: "normal", weight: 800 },
        { name: TEXT, data: archivo, style: "normal", weight: 600 },
        { name: STICKER, data: bangers, style: "normal", weight: 400 },
      ],
    },
  );
}
