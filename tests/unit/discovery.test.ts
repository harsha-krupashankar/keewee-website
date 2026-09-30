import { describe, expect, it } from "vitest";

import { buildFaq, buildLlmsTxt, buildRss, buildService } from "@/lib/discovery";
import type { Discovery } from "@/sanity/lib/types";

const answer = (text: string) => [
  { _type: "block", _key: "a", children: [{ _type: "span", _key: "b", text }] },
];

const data: Discovery = {
  settings: {
    title: "keewee.in",
    contactEmail: "team@keewee.in",
    aiDiscovery: {
      summary: "Keewee is a B2B marketing agency for SaaS companies.",
      pagesHeading: "Pages",
      servicesHeading: "Services",
      postsHeading: "Articles",
    },
  },
  pages: [
    { _type: "faqPage", title: " FAQs ", description: "Questions, answered." },
    { _type: "homePage", title: "Home", description: "Full-funnel B2B SaaS marketing." },
    { _type: "aboutPage", title: null, description: "No title, so not listed." },
  ],
  services: [
    { category: "Conversion", slug: "conversion", heroSub: "CRO & landing pages.", offerings: [{ title: "CRO audit" }] },
  ],
  posts: [
    {
      title: "SEO <vs> GEO & AEO",
      slug: "seo-vs-geo",
      dek: "How search is changing.",
      publishedAt: "2026-09-01T00:00:00Z",
      _updatedAt: "2026-09-02T00:00:00Z",
      author: "Kanan Parmar",
      category: null,
    },
  ],
  faqs: [
    { question: "What do you do?", answer: answer("Full-funnel marketing for B2B SaaS.") },
    { question: "what do you do? ", answer: answer("A duplicate from the home page.") },
    { question: "Empty answer?", answer: [] },
  ],
};

describe("buildLlmsTxt", () => {
  const txt = buildLlmsTxt(data);

  it("follows the llms.txt shape: H1, blockquote, then H2 link lists", () => {
    expect(txt.startsWith("# keewee.in\n\n> Full-funnel B2B SaaS marketing.\n")).toBe(true);
    expect(txt).toContain("## Services\n\n- [Conversion](https://www.keewee.in/services/conversion): CRO & landing pages.");
  });

  it("lists pages in route order with trimmed titles, skipping untitled ones", () => {
    expect(txt.indexOf("[Home](https://www.keewee.in)")).toBeLessThan(txt.indexOf("[FAQs](https://www.keewee.in/faq)"));
    expect(txt).not.toContain("No title");
  });

  it("drops a section whose heading is empty", () => {
    const noHeading = { ...data, settings: { ...data.settings!, aiDiscovery: { ...data.settings!.aiDiscovery, postsHeading: "" } } };
    expect(buildLlmsTxt(noHeading)).not.toContain("seo-vs-geo");
  });
});

describe("buildFaq", () => {
  it("dedupes by question and skips empty answers", () => {
    expect(buildFaq(data).faqs).toEqual([
      { question: "What do you do?", answer: "Full-funnel marketing for B2B SaaS." },
    ]);
  });
});

describe("buildService", () => {
  it("exposes each service page as a capability", () => {
    expect(buildService(data).capabilities).toEqual([
      { name: "Conversion", description: "CRO & landing pages.", url: "https://www.keewee.in/services/conversion", offerings: ["CRO audit"] },
    ]);
  });
});

describe("buildRss", () => {
  it("escapes XML in CMS strings", () => {
    const rss = buildRss(data);
    expect(rss).toContain("<title>SEO &lt;vs&gt; GEO &amp; AEO</title>");
    expect(rss).toContain("<dc:creator>Kanan Parmar</dc:creator>");
    expect(rss).not.toContain("<category>");
  });
});
