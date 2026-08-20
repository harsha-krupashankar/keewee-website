import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SITE_URL } from "@/lib/site";

const CANONICAL_HOST = new URL(SITE_URL).host;

/**
 * Sets `X-Robots-Tag: noindex` on every response served from a host other
 * than the canonical domain. `robots.ts` handles the crawl-directive side of
 * this for well-behaved bots reading `/robots.txt`; this covers the header
 * Google treats as authoritative regardless of what robots.txt said, and
 * applies it to a host that already got indexed before noticing robots.txt.
 *
 * A `VERCEL_ENV === "production"` check isn't the right signal here — the
 * default `<project>.vercel.app` domain (the exact host this site was
 * audited on before `keewee.in`'s DNS was live) *is* a production
 * deployment, just not on the canonical host, so that check alone would
 * leave it fully indexable.
 */
export default function proxy(request: NextRequest) {
  if (request.headers.get("host") === CANONICAL_HOST) return NextResponse.next();

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
