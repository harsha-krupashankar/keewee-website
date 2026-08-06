import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton for `/prompt-library` — the "Resources" prompt library. A hero, a
 * "why this exists / which AI / what not to paste" primer, then the numbered
 * categories of copyable prompts, then a CTA back to the audit call.
 */
export const promptLibraryPage = defineType({
  name: "promptLibraryPage",
  title: "Prompt library page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "intro", title: "Primer" },
    { name: "categories", title: "Categories" },
    { name: "cta", title: "Final CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Hero ---------------------------------------------------------------
    defineField({
      name: "heroBadge",
      title: "Badge",
      type: "string",
      group: "hero",
      description: "The pill above the headline, e.g. “Resources / Prompt Library”.",
    }),
    defineField({
      name: "heroStickerA",
      title: "Sticker (top)",
      type: "string",
      group: "hero",
      description: "e.g. “30+ PROMPTS!”",
    }),
    defineField({
      name: "heroStickerB",
      title: "Sticker (bottom, struck through)",
      type: "string",
      group: "hero",
      description: "e.g. “GENERIC OUTPUT”",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "headline",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroIntro",
      title: "Intro",
      type: "richText",
      group: "hero",
    }),
    defineField({
      name: "heroCta",
      title: "Button",
      type: "link",
      group: "hero",
      description: "e.g. “Jump to a category ↓” pointing at #kw-categories.",
    }),
    defineField({
      name: "heroBadges",
      title: "Stat pills",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "string" })],
      description: "e.g. “30+ prompts”, “9 categories”, “Free, no email wall”.",
    }),

    // --- Primer ---------------------------------------------------------------
    defineField({ name: "whyLabel", title: "Label", type: "string", group: "intro" }),
    defineField({
      name: "whyHeadline",
      title: "Headline",
      type: "string",
      group: "intro",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "whyBody", title: "Body", type: "richText", group: "intro" }),

    defineField({ name: "aiLabel", title: "Label", type: "string", group: "intro" }),
    defineField({ name: "aiHeadline", title: "Headline", type: "string", group: "intro" }),
    defineField({ name: "aiIntro", title: "Intro", type: "text", rows: 2, group: "intro" }),
    defineField({
      name: "aiPlatforms",
      title: "Platforms",
      type: "array",
      group: "intro",
      of: [defineArrayMember({ type: "titledCard" })],
      description: "One card per model, e.g. ChatGPT, Claude, Perplexity, Gemini.",
    }),

    defineField({
      name: "warningHeadline",
      title: "Warning heading",
      type: "string",
      group: "intro",
      description: "e.g. “What not to feed these prompts.”",
    }),
    defineField({
      name: "warningBody",
      title: "Warning body",
      type: "text",
      rows: 3,
      group: "intro",
    }),

    // --- Categories -----------------------------------------------------------
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "categories",
      of: [defineArrayMember({ type: "promptCategory" })],
      description:
        "Numbered and anchored by position — the first is “01 / …” at #cat-1.",
      validation: (rule) => rule.required().min(1),
    }),

    // --- Final CTA --------------------------------------------------------
    defineField({ name: "ctaLabel", title: "Label", type: "string", group: "cta" }),
    defineField({ name: "ctaHeadline", title: "Headline", type: "headline", group: "cta" }),
    defineField({ name: "ctaBody", title: "Body", type: "richText", group: "cta" }),
    defineField({ name: "ctaButton", title: "Button", type: "link", group: "cta" }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Prompt library page" }) },
});
