import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook target.
 *
 * `<SanityLive />` already refreshes any browser that has the site open, but a
 * marketing site is mostly read by people who arrive *after* an edit. This route
 * is what keeps the static output fresh in that case: point a Sanity webhook at
 * `POST /api/revalidate` with the same secret as `SANITY_REVALIDATE_SECRET`, and
 * every page that queried the changed document type gets rebuilt on next visit.
 *
 * The tags come from `sanity/lib/tags.ts` and are attached by
 * `sanity/lib/content.ts`, so a document type maps to its tag by name.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 }
    );
  }

  const { isValidSignature, body } = await parseBody<{ _type: string }>(
    request,
    secret
  );

  if (!isValidSignature) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }
  if (!body?._type) {
    return Response.json({ message: "Bad request" }, { status: 400 });
  }

  // Stale-while-revalidate: visitors keep getting the cached page while the
  // fresh one builds in the background.
  revalidateTag(body._type, "max");

  return Response.json({ revalidated: true, type: body._type });
}
