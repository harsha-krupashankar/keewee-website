"use client";

/**
 * The embedded Sanity Studio.
 *
 * This is a Client Component on purpose. `sanity.config.ts` carries functions —
 * the structure resolver, the Presentation location resolvers, Vision's i18n
 * loaders — and functions cannot be serialized across the Server/Client
 * boundary. Importing the config here keeps it entirely on the client side.
 *
 * `metadata` and `viewport` therefore live in the sibling `layout.tsx`, which is
 * still a Server Component.
 *
 * The catch-all segment lets the Studio own every path under /studio and drive
 * its own routing.
 */
import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
