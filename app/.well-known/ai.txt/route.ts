import { buildAiTxt } from "@/lib/discovery";
import { getDiscovery } from "@/sanity/lib/content";

export async function GET() {
  const data = await getDiscovery();
  if (!data) return new Response(null, { status: 404 });
  return new Response(buildAiTxt(data), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
