import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Archivo, Bricolage_Grotesque, Bangers } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { Analytics } from "@vercel/analytics/next";

import JsonLd from "@/components/JsonLd";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import DraftModeBanner from "@/components/sanity/DraftModeBanner";
import { siteGraph } from "@/lib/jsonLd";
import { metadataFrom } from "@/lib/metadata";
import { getSiteSettings } from "@/sanity/lib/content";
import { PUBLISHED, SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
});

/**
 * Site-wide metadata defaults. Read with the published perspective on purpose:
 * metadata is not visually edited, and reading cookies here would pull the
 * document head out of the static shell for every visitor.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings(PUBLISHED);
  return metadataFrom({ settings });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();
  const settings = await getSiteSettings(PUBLISHED);

  return (
    <html
      lang="en"
      // globals.css sets `scroll-behavior: smooth` for in-page anchors. Since
      // Next 16 the router only suspends it during route transitions when this
      // attribute is present; without it the reset-to-top on navigation is
      // animated, gets cut off by the incoming render, and strands the new page
      // partway down.
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${bricolage.variable} ${bangers.variable}`}
      // The script below adds `js` before hydration, so React's className
      // won't match the DOM on this one element.
      suppressHydrationWarning
    >
      <body>
        {/* Runs before any content is parsed: scroll-reveal content starts
            hidden only when JS is there to reveal it. See `globals.css`. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={siteGraph(settings)} />
        {children}
        {isDraftMode && (
          <>
            <DraftModeBanner />
            <VisualEditing />
          </>
        )}
        {/* Keeps open sessions in sync with the Content Lake. */}
        <SanityLive includeDrafts={isDraftMode} />
        <Analytics />
        <GoogleTagManager />
      </body>
    </html>
  );
}
