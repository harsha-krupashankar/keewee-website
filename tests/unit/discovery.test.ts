import { describe, expect, it } from "vitest";

import {
  buildFaq,
  buildLlmsFullTxt,
  buildLlmsTxt,
  buildRss,
  buildService,
  portableTextToMarkdown,
} from "@/lib/discovery";
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
      faqHeading: "FAQ",
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

const block = (style: string, text: string, extra: object = {}) => ({
  _type: "block",
  _key: text,
  style,
  markDefs: [],
  children: [{ _type: "span", _key: "s", text, marks: [] }],
  ...extra,
});

describe("portableTextToMarkdown", () => {
  it("nests headings under the document title and keeps lists and quotes", () => {
    const md = portableTextToMarkdown(
      [
        block("h2", "Why it matters"),
        block("normal", "First", { listItem: "number", level: 1 }),
        block("normal", "Second", { listItem: "number", level: 1 }),
        block("normal", "Point", { listItem: "bullet", level: 1 }),
        block("blockquote", "Quoted."),
        { _type: "pullQuote", _key: "q", text: "Sharp.", attribution: "Kanan" },
      ] as never,
      3
    );
    expect(md).toBe("#### Why it matters\n\n1. First\n2. Second\n- Point\n\n> Quoted.\n\n> Sharp. — Kanan");
  });

  it("renders bold, italic and links", () => {
    const md = portableTextToMarkdown(
      [
        {
          _type: "block",
          _key: "b",
          style: "normal",
          markDefs: [{ _key: "l", _type: "link", href: "https://x.com" }],
          children: [
            { _type: "span", _key: "1", text: "bold", marks: ["strong"] },
            { _type: "span", _key: "2", text: " and ", marks: [] },
            { _type: "span", _key: "3", text: "link", marks: ["l"] },
          ],
        },
      ] as never,
      3
    );
    expect(md).toBe("**bold** and [link](https://x.com)");
  });
});

describe("buildLlmsFullTxt", () => {
  const txt = buildLlmsFullTxt(data, {
    services: [
      {
        category: "Conversion",
        slug: "conversion",
        heroSub: "CRO & landing pages.",
        offerings: [{ title: "CRO audit", description: "Find the leaks." }],
        faq: [{ question: "How long?", answer: answer("Six weeks.") }],
      },
    ],
    posts: [
      {
        title: "SEO vs GEO",
        slug: "seo-vs-geo",
        dek: "How search is changing.",
        publishedAt: "2026-09-01T00:00:00Z",
        author: "Kanan Parmar",
        body: [block("h2", "The shift")] as never,
      },
    ],
  });

  it("puts full service, FAQ and post content under the editor's headings", () => {
    expect(txt).toContain("## Services\n\n### [Conversion](https://www.keewee.in/services/conversion)");
    expect(txt).toContain("- **CRO audit**: Find the leaks.");
    expect(txt).toContain("#### How long?\n\nSix weeks.");
    expect(txt).toContain("## FAQ\n\n### What do you do?\n\nFull-funnel marketing for B2B SaaS.");
    expect(txt).toContain("_2026-09-01 · Kanan Parmar_");
    expect(txt).toContain("#### The shift");
  });
});
