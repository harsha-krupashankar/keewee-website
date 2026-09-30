import { buildFaq } from "@/lib/discovery";
import { getDiscovery } from "@/sanity/lib/content";

export async function GET() {
  const data = await getDiscovery();
  if (!data) return new Response(null, { status: 404 });
  return Response.json(buildFaq(data));
}
