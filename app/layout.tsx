import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Archivo, Bricolage_Grotesque, Bangers } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { Analytics } from "@vercel/analytics/next";

import DraftModeBanner from "@/components/sanity/DraftModeBanner";
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

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${bricolage.variable} ${bangers.variable}`}
    >
      <body>
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
      </body>
    </html>
  );
}
