import { defineArrayMember, defineField, defineType } from "sanity";

export const freeAuditPage = defineType({
  name: "freeAuditPage",
  title: "Free audit page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "cover", title: "What we cover" },
    { name: "forYou", title: "Is this for you" },
    { name: "deliverables", title: "What you get" },
    { name: "form", title: "Booking form" },
    { name: "faq", title: "FAQ" },
    { name: "proof", title: "Proof" },
    { name: "cta", title: "Closing CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", group: "hero" }),
    defineField({
      name: "navCtaLabel",
      title: "Nav button label",
      type: "string",
      group: "hero",
      description: "This page uses a stripped-back nav with a single button.",
    }),

    defineField({
      name: "coverHeader",
      title: "Header",
      type: "sectionHeader",
      group: "cover",
    }),
    defineField({
      name: "coverCards",
      title: "Cards",
      type: "array",
      group: "cover",
      of: [defineArrayMember({ type: "titledCard" })],
    }),

    defineField({
      name: "forYouHeader",
      title: "Header",
      type: "sectionHeader",
      group: "forYou",
    }),
    defineField({
      name: "forYouPointers",
      title: "Pointers",
      type: "array",
      group: "forYou",
      of: [defineArrayMember({ type: "text", rows: 2 })],
    }),

    defineField({
      name: "deliverablesHeader",
      title: "Header",
      type: "sectionHeader",
      group: "deliverables",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      group: "deliverables",
      of: [defineArrayMember({ type: "titledCard" })],
    }),

    defineField({
      name: "formEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "formHeadline",
      title: "Headline",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "formIntro",
      title: "Intro",
      type: "text",
      rows: 2,
      group: "form",
    }),
    defineField({
      name: "formSuccessSticker",
      title: "Success sticker",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "formSuccessText",
      title: "Success message",
      type: "text",
      rows: 2,
      group: "form",
    }),

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

    defineField({
      name: "proofHeader",
      title: "Header",
      type: "sectionHeader",
      group: "proof",
    }),
    defineField({
      name: "proofSticker",
      title: "Sticker",
      type: "string",
      group: "proof",
    }),
    defineField({
      name: "proofBody",
      title: "Body",
      type: "text",
      rows: 3,
      group: "proof",
    }),

    defineField({
      name: "ctaHeadline",
      title: "Headline",
      type: "headline",
      group: "cta",
    }),
    defineField({ name: "ctaBody", title: "Body", type: "richText", group: "cta" }),
    defineField({ name: "ctaButton", title: "Button", type: "link", group: "cta" }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Free audit page" }) },
});
