import { draftMode } from "next/headers";

/**
 * Leaves preview mode. Presentation calls this when an editor closes the
 * preview; the banner in `components/DraftModeBanner.tsx` posts here too.
 */
export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // Only ever redirect to a same-origin path, never to a caller-supplied host.
  const destination = slug && slug.startsWith("/") ? slug : "/";

  return new Response(null, {
    status: 307,
    headers: { Location: destination },
  });
}
