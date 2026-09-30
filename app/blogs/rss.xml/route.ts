import { buildRss } from "@/lib/discovery";
import { getDiscovery } from "@/sanity/lib/content";

/**
 * A static segment, so it wins over the `[slug]` sibling. Linked from every
 * page's `<head>` via `metadataFrom` so readers and crawlers can find it.
 */
export async function GET() {
  const data = await getDiscovery();
  if (!data) return new Response(null, { status: 404 });
  return new Response(buildRss(data), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
