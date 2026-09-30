import { buildLlmsTxt } from "@/lib/discovery";
import { getDiscovery } from "@/sanity/lib/content";

/** https://llmstxt.org — what the site is and which pages matter, for LLMs. */
export async function GET() {
  const data = await getDiscovery();
  if (!data) return new Response(null, { status: 404 });
  return new Response(buildLlmsTxt(data), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
