import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { CANONICAL_HOSTS, SITE_URL } from "@/lib/site";

/**
 * AI search and assistant crawlers. Both the citation bots (answer engines
 * fetching a page to quote it) and the training bots are allowed: for an
 * agency, being in the model's memory is as valuable as being cited live.
 */
const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
];

/**
 * Allow crawling of the public site. The Studio and API routes carry no
 * indexable content, so keep them out of search results.
 *
 * On any host other than the canonical domain, disallow everything. A
 * `VERCEL_ENV === "production"` check isn't enough here: Vercel's own
 * `<project>.vercel.app` domain — the exact URL this site was being audited
 * on before `keewee.in`'s DNS was live — *is* the production deployment, just
 * on the wrong host, so that check alone let it stay fully crawlable. Reading
 * the request `Host` header instead (a Request-time API, so this route
 * becomes per-request rather than cached at build time) catches that case
 * along with every actual preview deployment.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");
  if (!CANONICAL_HOSTS.has(host ?? "")) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const disallow = ["/studio", "/api"];

  return {
    rules: [
      // Named explicitly even though `*` already allows them: some AI
      // crawlers and GEO audits treat an explicit group as the opt-in signal,
      // and it documents intent if a blanket rule ever tightens.
      { userAgent: AI_CRAWLERS, allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
