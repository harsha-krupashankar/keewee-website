import { buildLlmsFullTxt } from "@/lib/discovery";
import { getDiscovery, getLlmsFull } from "@/sanity/lib/content";

/** The full text behind `/llms.txt` — services, FAQs and every post, in one file. */
export async function GET() {
  const [data, full] = await Promise.all([getDiscovery(), getLlmsFull()]);
  if (!data || !full) return new Response(null, { status: 404 });
  return new Response(buildLlmsFullTxt(data, full), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
