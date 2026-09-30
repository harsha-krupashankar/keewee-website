import { richTextToPlainText } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import type { Discovery, DiscoveryPageType } from "@/sanity/lib/types";

/**
 * Builders for the machine-readable files AI engines and feed readers fetch:
 * `/llms.txt`, `/.well-known/ai.txt`, `/ai/*.json` and the blog RSS feed.
 *
 * Pure functions over one `getDiscovery()` read, so the route handlers stay
 * one-liners and these can be unit-tested without Next or Sanity.
 */

/** Where each singleton page lives. Routes are code; their titles are content. */
export const PAGE_PATHS: Record<DiscoveryPageType, string> = {
  homePage: "/",
  aboutPage: "/about",
  servicesPage: "/services",
  blogIndexPage: "/blogs",
  faqPage: "/faq",
  freeAuditPage: "/free-audit",
  newsletterPage: "/newsletter",
  promptLibraryPage: "/prompt-library",
};

/** Order the pages are listed in `/llms.txt` — most important first. */
const PAGE_ORDER = Object.keys(PAGE_PATHS) as DiscoveryPageType[];

export const RSS_PATH = "/blogs/rss.xml";

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** Editors leave stray spaces around SEO titles; they matter in plain text. */
const clean = (value?: string | null) => value?.trim() ?? "";

function siteDescription(data: Discovery) {
  const home = data.pages.find((p) => p._type === "homePage");
  return clean(home?.description) || clean(data.settings?.defaultSeo?.description);
}

// --- /llms.txt --------------------------------------------------------------

const listItem = (title: string, href: string, note?: string | null) =>
  `- [${title}](${href})${clean(note) ? `: ${clean(note)}` : ""}`;

/** https://llmstxt.org — H1, blockquote, free text, then H2 link lists. */
export function buildLlmsTxt(data: Discovery): string {
  const ai = data.settings?.aiDiscovery;
  const out: string[] = [`# ${clean(data.settings?.title)}`, ""];

  const description = siteDescription(data);
  if (description) out.push(`> ${description}`, "");
  if (clean(ai?.summary)) out.push(clean(ai?.summary), "");

  const pages = [...data.pages].sort(
    (a, b) => PAGE_ORDER.indexOf(a._type) - PAGE_ORDER.indexOf(b._type)
  );
  const sections: [string | null | undefined, string[]][] = [
    [
      ai?.pagesHeading,
      pages
        .filter((p) => clean(p.title))
        .map((p) => listItem(clean(p.title), url(PAGE_PATHS[p._type]), p.description)),
    ],
    [
      ai?.servicesHeading,
      data.services.map((s) =>
        listItem(s.category, url(`/services/${s.slug}`), s.description || s.heroSub)
      ),
    ],
    [
      ai?.postsHeading,
      data.posts.map((p) => listItem(p.title, url(`/blogs/${p.slug}`), p.dek)),
    ],
  ];

  for (const [heading, items] of sections) {
    if (!clean(heading) || items.length === 0) continue;
    out.push(`## ${clean(heading)}`, "", ...items, "");
  }

  return out.join("\n");
}

// --- /.well-known/ai.txt ----------------------------------------------------

/** Mirrors `app/robots.ts` for the public site and points at the other files. */
export function buildAiTxt(data: Discovery): string {
  return [
    `# ${clean(data.settings?.title)}`,
    `# ${SITE_URL}`,
    "",
    "User-Agent: *",
    "Allow: /",
    "Disallow: /studio",
    "Disallow: /api",
    "",
    `LLMs: ${url("/llms.txt")}`,
    `Summary: ${url("/ai/summary.json")}`,
    `FAQ: ${url("/ai/faq.json")}`,
    `Service: ${url("/ai/service.json")}`,
    `Feed: ${url(RSS_PATH)}`,
    `Sitemap: ${url("/sitemap.xml")}`,
    "",
  ].join("\n");
}

// --- /ai/*.json -------------------------------------------------------------

export function buildSummary(data: Discovery) {
  const s = data.settings;
  return {
    name: clean(s?.title),
    url: SITE_URL,
    description: clean(s?.aiDiscovery?.summary) || siteDescription(data),
    contact: s?.contactEmail ? { email: s.contactEmail } : undefined,
    sameAs: s?.socialLinks?.map((l) => l.href) ?? [],
    llms: url("/llms.txt"),
    feed: url(RSS_PATH),
    services: data.services.map((svc) => ({
      name: svc.category,
      url: url(`/services/${svc.slug}`),
    })),
  };
}

/** Deduplicated by question — the home page repeats a few from `/faq`. */
export function buildFaq(data: Discovery) {
  const seen = new Set<string>();
  const faqs = data.faqs.flatMap(({ question, answer }) => {
    const key = question.trim().toLowerCase();
    const text = richTextToPlainText(answer);
    if (!text || seen.has(key)) return [];
    seen.add(key);
    return [{ question: question.trim(), answer: text }];
  });
  return { name: clean(data.settings?.title), url: url("/faq"), faqs };
}

export function buildService(data: Discovery) {
  return {
    name: clean(data.settings?.title),
    url: url("/services"),
    description: siteDescription(data),
    capabilities: data.services.map((s) => ({
      name: s.category,
      description: s.heroSub,
      url: url(`/services/${s.slug}`),
      offerings: s.offerings?.map((o) => o.title) ?? [],
    })),
  };
}

// --- /blogs/rss.xml ---------------------------------------------------------

const xml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function buildRss(data: Discovery): string {
  const blog = data.pages.find((p) => p._type === "blogIndexPage");
  const title = clean(blog?.title) || clean(data.settings?.title);
  const description = clean(blog?.description) || siteDescription(data);
  const lastBuild = data.posts
    .map((p) => p._updatedAt)
    .sort()
    .at(-1);

  const items = data.posts.map((p) => {
    const link = url(`/blogs/${p.slug}`);
    return [
      "    <item>",
      `      <title>${xml(p.title)}</title>`,
      `      <link>${link}</link>`,
      `      <guid isPermaLink="true">${link}</guid>`,
      `      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>`,
      p.dek ? `      <description>${xml(p.dek)}</description>` : null,
      p.author ? `      <dc:creator>${xml(p.author)}</dc:creator>` : null,
      p.category ? `      <category>${xml(p.category)}</category>` : null,
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">`,
    "  <channel>",
    `    <title>${xml(title)}</title>`,
    `    <link>${url("/blogs")}</link>`,
    `    <description>${xml(description)}</description>`,
    "    <language>en</language>",
    lastBuild ? `    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>` : null,
    `    <atom:link href="${url(RSS_PATH)}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
