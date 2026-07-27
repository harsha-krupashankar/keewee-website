import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton for `/`. Grouped by the sections as they appear down the page, so
 * the Studio form reads in the same order as the site.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "problem", title: "Problem" },
    { name: "funnel", title: "Full funnel" },
    { name: "why", title: "Why Keewee" },
    { name: "how", title: "How it works" },
    { name: "who", title: "Who we work with" },
    { name: "proof", title: "Proof" },
    { name: "audit", title: "Free audit" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Final CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Hero -------------------------------------------------------------
    defineField({
      name: "heroBadge",
      title: "Badge",
      type: "string",
      group: "hero",
      description: "The pill above the headline, e.g. “Meanwhile, in most B2B companies…”",
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
    defineField({ name: "heroCta", title: "Buttons", type: "cta", group: "hero" }),
    defineField({
      name: "heroFootnote",
      title: "Footnote",
      type: "string",
      group: "hero",
      description: "The small mono line under the buttons.",
    }),
    defineField({
      name: "heroStickerA",
      title: "Sticker (left)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroStickerB",
      title: "Sticker (right)",
      type: "string",
      group: "hero",
    }),

    // --- Problem ----------------------------------------------------------
    defineField({
      name: "problemHeader",
      title: "Header",
      type: "sectionHeader",
      group: "problem",
    }),
    defineField({
      name: "problemBody",
      title: "Body",
      type: "richText",
      group: "problem",
    }),
    defineField({
      name: "lookalikes",
      title: "Lookalike headlines",
      type: "array",
      group: "problem",
      of: [defineArrayMember({ type: "string" })],
      description:
        "The interchangeable hero lines shown in the mock browser cards. Four works best.",
    }),
    defineField({
      name: "problemSticker",
      title: "Sticker",
      type: "string",
      group: "problem",
    }),
    defineField({
      name: "problemCaption",
      title: "Caption",
      type: "string",
      group: "problem",
    }),

    // --- Full funnel ------------------------------------------------------
    defineField({
      name: "funnelHeader",
      title: "Header",
      type: "sectionHeader",
      group: "funnel",
    }),
    defineField({
      name: "funnelStages",
      title: "Stages",
      type: "array",
      group: "funnel",
      of: [defineArrayMember({ type: "funnelStage" })],
    }),
    defineField({
      name: "funnelOutcomeSticker",
      title: "Outcome sticker",
      type: "string",
      group: "funnel",
      description: "e.g. “Real pipeline.”",
    }),
    defineField({
      name: "funnelOutcomeText",
      title: "Outcome text",
      type: "text",
      rows: 2,
      group: "funnel",
    }),

    // --- Why Keewee -------------------------------------------------------
    defineField({
      name: "whyHeader",
      title: "Header",
      type: "sectionHeader",
      group: "why",
    }),
    defineField({
      name: "whyReasons",
      title: "Reasons",
      type: "array",
      group: "why",
      of: [defineArrayMember({ type: "titledCard" })],
    }),

    // --- How it works -----------------------------------------------------
    defineField({
      name: "howHeader",
      title: "Header",
      type: "sectionHeader",
      group: "how",
    }),
    defineField({
      name: "howPhases",
      title: "Phases",
      type: "array",
      group: "how",
      of: [defineArrayMember({ type: "titledCard" })],
    }),
    defineField({
      name: "howBanner",
      title: "Banner",
      type: "text",
      rows: 2,
      group: "how",
      description: "The green statement bar under the three phases.",
    }),

    // --- Who we work with -------------------------------------------------
    defineField({
      name: "whoHeader",
      title: "Header",
      type: "sectionHeader",
      group: "who",
    }),
    defineField({
      name: "whoSegments",
      title: "Segments",
      type: "array",
      group: "who",
      of: [defineArrayMember({ type: "titledCard" })],
      description: "Use the Tag field for the pill label, e.g. “Series A+”.",
    }),

    // --- Proof ------------------------------------------------------------
    defineField({
      name: "proofHeader",
      title: "Header",
      type: "sectionHeader",
      group: "proof",
    }),
    defineField({
      name: "proofBody",
      title: "Body",
      type: "richText",
      group: "proof",
    }),
    defineField({ name: "proofCta", title: "Button", type: "link", group: "proof" }),
    defineField({
      name: "proofSticker",
      title: "Sticker",
      type: "string",
      group: "proof",
    }),

    // --- Free audit -------------------------------------------------------
    defineField({
      name: "auditHeader",
      title: "Header",
      type: "sectionHeader",
      group: "audit",
    }),
    defineField({
      name: "auditBody",
      title: "Body",
      type: "richText",
      group: "audit",
    }),
    defineField({ name: "auditCta", title: "Button", type: "link", group: "audit" }),
    defineField({
      name: "auditSticker",
      title: "Sticker",
      type: "string",
      group: "audit",
      description: "e.g. “ONLY 5 / MONTH”",
    }),
    defineField({
      name: "auditListTitle",
      title: "Checklist title",
      type: "string",
      group: "audit",
    }),
    defineField({
      name: "auditItems",
      title: "Checklist items",
      type: "array",
      group: "audit",
      of: [defineArrayMember({ type: "string" })],
    }),

    // --- FAQ --------------------------------------------------------------
    defineField({
      name: "faqHeader",
      title: "Header",
      type: "sectionHeader",
      group: "faq",
    }),
    defineField({
      name: "faqItems",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
    }),

    // --- Final CTA --------------------------------------------------------
    defineField({
      name: "ctaHeadline",
      title: "Headline",
      type: "headline",
      group: "cta",
    }),
    defineField({
      name: "ctaBody",
      title: "Body",
      type: "richText",
      group: "cta",
    }),
    defineField({ name: "ctaButtons", title: "Buttons", type: "cta", group: "cta" }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
