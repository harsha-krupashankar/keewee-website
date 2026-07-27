import { defineArrayMember, defineField, defineType } from "sanity";

/** Image with the alt text the design already assumes, plus an optional caption. */
export const figure = defineType({
  name: "figure",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for screen readers and search engines.",
      validation: (rule) => rule.required().warning("Alt text is required for accessibility."),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { media: "asset", title: "alt", subtitle: "caption" },
  },
});

/** A destination: an internal path, an external URL, or a mailto. */
export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL or path",
      type: "string",
      description: "e.g. /free-audit, https://…, or mailto:team@keewee.in",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

/** Primary/secondary button pair used at the bottom of most sections. */
export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "primary", type: "link" }),
    defineField({ name: "secondary", type: "link" }),
  ],
  preview: {
    select: { title: "primary.label", subtitle: "secondary.label" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "Call to action",
      subtitle: subtitle ? `+ ${subtitle}` : undefined,
    }),
  },
});

/** Eyebrow + headline + intro. The header on nearly every section of the site. */
export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section header",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small uppercase label above the headline, e.g. “What we do”.",
    }),
    defineField({ name: "headline", type: "headline" }),
    defineField({
      name: "sticker",
      title: "Sticker text",
      type: "string",
      description: "Optional handwritten-style line next to the headline.",
    }),
    defineField({ name: "intro", title: "Intro", type: "richText" }),
  ],
  preview: {
    select: { eyebrow: "eyebrow", headline: "headline" },
    prepare: ({ eyebrow, headline }) => ({
      title: toPlainText(headline) || eyebrow || "Section header",
      subtitle: eyebrow,
    }),
  },
});

/** Q&A pair. Shared by the homepage FAQ, the FAQ page, and service pages. */
export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      type: "richText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "question", answer: "answer" },
    prepare: ({ title, answer }) => ({
      title: title ?? "Question",
      subtitle: toPlainText(answer),
    }),
  },
});

/** Title + description card. The most repeated shape on the site. */
export const titledCard = defineType({
  name: "titledCard",
  title: "Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Optional pill label above the title, e.g. “Series A+”.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", tag: "tag" },
    prepare: ({ title, subtitle, tag }) => ({
      title: tag ? `${tag} — ${title}` : title,
      subtitle,
    }),
  },
});

/**
 * A funnel stage. Numbering is derived from array position at render time, so
 * reordering in the Studio never leaves stale "03" labels behind.
 */
export const funnelStage = defineType({
  name: "funnelStage",
  title: "Funnel stage",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Sticker line",
      type: "string",
      description: "e.g. “Get remembered.”",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bullets",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "barWidth",
      title: "Bar width (%)",
      type: "number",
      description: "Width of the progress bar, 0–100. Tapers down the funnel.",
      validation: (rule) => rule.required().min(0).max(100),
      initialValue: 100,
    }),
    defineField({
      name: "servicePage",
      title: "Service page",
      type: "reference",
      to: [{ type: "servicePage" }],
      description: "Optional link through to the full service page.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag" },
  },
});

function toPlainText(blocks: unknown): string | undefined {
  if (!Array.isArray(blocks)) return undefined;
  return blocks
    .map((block) => {
      if (
        typeof block !== "object" ||
        block === null ||
        (block as { _type?: string })._type !== "block"
      ) {
        return "";
      }
      const children = (block as { children?: { text?: string }[] }).children ?? [];
      return children.map((child) => child.text ?? "").join("");
    })
    .join(" ")
    .trim();
}
