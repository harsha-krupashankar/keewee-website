import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque, Bangers } from "next/font/google";
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

export const metadata: Metadata = {
  title: "keewee.in — B2B marketing with a spine.",
  description:
    "Most B2B marketing is AI-generated mush in a slide template. We're the agency that fixes it — sharp positioning and a full-funnel system that moves pipeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${bricolage.variable} ${bangers.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
