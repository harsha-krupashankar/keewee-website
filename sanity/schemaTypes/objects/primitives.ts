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

/**
 * The networks the footer has a mark for. Adding one here also needs its path
 * adding to `SOCIAL_ICONS` in `components/Footer.tsx` — until then it renders
 * as the platform's first two letters rather than a blank square.
 */
export const SOCIAL_PLATFORMS = [
  { title: "LinkedIn", value: "linkedin" },
  { title: "X (Twitter)", value: "x" },
  { title: "Instagram", value: "instagram" },
  { title: "YouTube", value: "youtube" },
] as const;

/** A social profile: which network, and where it points. */
export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      type: "string",
      options: { list: SOCIAL_PLATFORMS.map(({ title, value }) => ({ title, value })) },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Profile URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "href" },
    prepare: ({ title, subtitle }) => ({
      title:
        SOCIAL_PLATFORMS.find((p) => p.value === title)?.title ?? (title as string),
      subtitle: subtitle as string,
    }),
  },
});

/**
 * A header nav item that opens a menu instead of navigating. Sits alongside
 * plain `link`s in `siteSettings.headerNav`; the label itself is not a
 * destination, so there is no `href`.
 */
export const navGroup = defineType({
  name: "navGroup",
  title: "Dropdown",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "label", links: "links" },
    prepare: ({ title, links }) => ({
      title,
      subtitle: `Dropdown · ${(links as unknown[] | undefined)?.length ?? 0} links`,
    }),
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

/**
 * One of the five bands on the services index page.
 *
 * The design gives every category a different shape — a lead feature card, plain
 * rows, a two-column grid, a dark band, big-number cards — so `layout` is stored
 * rather than inferred. The `01 /` prefix and the `#kw-cat1` anchor are derived
 * from array position, so reordering renumbers and re-anchors on its own.
 */
export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Service category",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Follows the number in the eyebrow, e.g. “Awareness & Brand”.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "headline", type: "headline", validation: (rule) => rule.required() }),
    defineField({ name: "intro", title: "Intro", type: "richText" }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Lead feature + card grid", value: "feature" },
          { title: "Full-width rows", value: "rows" },
          { title: "Two-column cards", value: "split" },
          { title: "Dark band", value: "dark" },
          { title: "Big-number cards", value: "numbered" },
        ],
      },
      initialValue: "split",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featureSticker",
      title: "Feature sticker",
      type: "string",
      description:
        "Vertical label beside the lead card, e.g. “START HERE”. Only the lead feature layout shows it.",
    }),
    defineField({
      name: "items",
      title: "Services",
      type: "array",
      of: [defineArrayMember({ type: "titledCard" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "name", layout: "layout", items: "items" },
    prepare: ({ title, layout, items }) => ({
      title: title ?? "Service category",
      subtitle: `${layout ?? "—"} · ${Array.isArray(items) ? items.length : 0} services`,
    }),
  },
});

/** A titled block of checkbox labels. Used by the services page quote form. */
export const checkboxGroup = defineType({
  name: "checkboxGroup",
  title: "Checkbox group",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "options",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", options: "options" },
    prepare: ({ title, options }) => ({
      title: title ?? "Checkbox group",
      subtitle: Array.isArray(options) ? options.join(" · ") : undefined,
    }),
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
