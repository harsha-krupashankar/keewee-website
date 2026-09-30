import { defineField, defineType } from "sanity";

/**
 * Copy for the machine-readable files AI search engines read: `/llms.txt`,
 * `/llms-full.txt`, `/ai/summary.json` and friends. Page titles, descriptions,
 * services, posts and FAQs are pulled in from their own documents — only the
 * words that exist nowhere else on the site live here.
 */
export const aiDiscovery = defineType({
  name: "aiDiscovery",
  title: "AI discovery",
  type: "object",
  fields: [
    defineField({
      name: "summary",
      title: "Summary for AI engines",
      type: "text",
      rows: 5,
      description:
        "A plain, factual paragraph on who Keewee is, who it serves and what it does. Opens /llms.txt and /ai/summary.json. Write it the way you'd want ChatGPT or Perplexity to describe you — no slogans.",
      validation: (rule) => rule.required().min(80),
    }),
    defineField({
      name: "pagesHeading",
      title: "Pages section heading",
      type: "string",
      description: "Heading over the list of main pages in /llms.txt.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "servicesHeading",
      title: "Services section heading",
      type: "string",
      description: "Heading over the service pages in /llms.txt and /llms-full.txt.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postsHeading",
      title: "Articles section heading",
      type: "string",
      description: "Heading over the list of blog posts in /llms.txt and /llms-full.txt.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ section heading",
      type: "string",
      description: "Heading over the full FAQ in /llms-full.txt.",
      validation: (rule) => rule.required(),
    }),
  ],
});
