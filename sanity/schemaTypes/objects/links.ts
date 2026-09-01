import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Shapes for the link-in-bio page (`/links`).
 *
 * This page is its own layout — no site header, no site footer — so everything
 * it shows is defined here rather than borrowed from `siteSettings`. The
 * profile block, the social chips and the footer are deliberately duplicated
 * fields, not references: the bio a visitor arriving from an Instagram tap
 * should read is not the same sentence as the site-wide tagline.
 */

/** One row inside a tile's sheet. The first in the array renders as primary. */
export const linkDestination = defineType({
  name: "linkDestination",
  title: "Destination",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source line",
      type: "string",
      description:
        "Plain-language line under the label, e.g. “keewee.in/blog · 7 min” or “PDF · 4 pages · no email wall”.",
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
    defineField({
      name: "urgent",
      title: "Urgent source line",
      type: "boolean",
      description:
        "Prints the source line in clay, for time pressure — “3 slots left in August”.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "source" },
  },
});

/**
 * A tile in the feed grid.
 *
 * A tile with one destination is a plain link and navigates on tap. A tile with
 * more than one shows a count badge and opens the sheet — the count itself is
 * read from the array, never stored.
 */
export const feedTile = defineType({
  name: "feedTile",
  title: "Post tile",
  type: "object",
  groups: [
    { name: "tile", title: "Tile", default: true },
    { name: "sheet", title: "Sheet" },
  ],
  fields: [
    defineField({
      name: "style",
      title: "Ground",
      type: "string",
      group: "tile",
      options: {
        list: [
          { title: "Dark", value: "dark" },
          { title: "Green", value: "green" },
          { title: "Mint", value: "mint" },
          { title: "Surface", value: "surface" },
          { title: "Paper", value: "paper" },
          { title: "Image", value: "image" },
        ],
      },
      initialValue: "surface",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      description: "The tile's headline. Also titles the sheet.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "tile",
      description: "Small uppercase label, e.g. “REPORT”, “CAROUSEL”, “HIRING”.",
    }),
    defineField({
      name: "eyebrowTone",
      title: "Accent eyebrow",
      type: "boolean",
      group: "tile",
      description: "Lime on a dark ground, clay on a light one.",
      initialValue: false,
    }),
    defineField({
      name: "footnote",
      title: "Footnote",
      type: "string",
      group: "tile",
      description: "Bottom-left line, e.g. “Remote · India · full-time”.",
    }),
    defineField({
      name: "stat",
      title: "Big number",
      type: "string",
      group: "tile",
      description: "Set on a stat tile, e.g. “60%”. Replaces the eyebrow slot.",
    }),
    defineField({
      name: "sticker",
      title: "Sticker",
      type: "string",
      group: "tile",
      description: "Comic-lettered lime sticker above the title, e.g. “SYNERGY”.",
    }),
    defineField({
      name: "quote",
      title: "Quote mark",
      type: "boolean",
      group: "tile",
      description: "Prints an oversized lime “ above the title.",
      initialValue: false,
    }),
    defineField({
      name: "accentBar",
      title: "Accent bar",
      type: "boolean",
      group: "tile",
      description: "Short lime rule pinned to the bottom-left corner.",
      initialValue: false,
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "object",
      group: "tile",
      description: "Names the speaker on a testimonial tile.",
      fields: [
        defineField({ name: "initials", type: "string" }),
        defineField({ name: "name", type: "string" }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "figure",
      group: "tile",
      description: "Fills the tile when the ground is “Image”.",
    }),
    defineField({
      name: "hideCaption",
      title: "Bare photo",
      type: "boolean",
      group: "tile",
      description:
        "Drops the caption off an image tile. The title still names the tile for screen readers.",
      initialValue: false,
    }),
    defineField({
      name: "meta",
      title: "Sheet meta line",
      type: "string",
      group: "sheet",
      description: "Typewriter line under the sheet title, e.g. “carousel · 5 slides · 22 Aug”.",
    }),
    defineField({
      name: "destinationsLabel",
      title: "Sheet list label",
      type: "string",
      group: "sheet",
      description:
        "Uppercase label above the rows. “{count}” is replaced by the number of destinations.",
      initialValue: "{count} links in this post",
    }),
    defineField({
      name: "postHref",
      title: "Original post",
      type: "url",
      group: "sheet",
      description: "Optional link out to the post itself, shown in the sheet footer.",
    }),
    defineField({
      name: "postLabel",
      title: "Original post label",
      type: "string",
      group: "sheet",
      description: "e.g. “See the post on Instagram”.",
    }),
    defineField({
      name: "destinations",
      title: "Destinations",
      type: "array",
      group: "sheet",
      of: [defineArrayMember({ type: "linkDestination" })],
      description:
        "One destination navigates straight through. More than one opens the sheet; the first is the primary row. Five is the cap the design sets.",
      validation: (rule) => rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
      style: "style",
      eyebrow: "eyebrow",
      media: "image",
      destinations: "destinations",
    },
    prepare: ({ title, style, eyebrow, media, destinations }) => {
      const count = Array.isArray(destinations) ? destinations.length : 0;
      return {
        title: title ?? "Post tile",
        subtitle: [eyebrow, style, `${count} ${count === 1 ? "link" : "links"}`]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});

/** A card in the horizontally-scrolling strip under "Closing soon". */
export const bannerCard = defineType({
  name: "bannerCard",
  title: "Banner",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Dark — time-boxed or live", value: "dark" },
          { title: "Paper — deadlines", value: "paper" },
        ],
      },
      initialValue: "dark",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "e.g. “LIVE WEBINAR”, “3 SLOTS LEFT”.",
    }),
    defineField({
      name: "meta",
      title: "Badge meta",
      type: "string",
      description: "Sits beside the badge, e.g. “45 min · free”.",
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "e.g. “Thu 4 Sept · 4pm IST”.",
    }),
    defineField({
      name: "linkLabel",
      title: "Link label",
      type: "string",
      description: "e.g. “Save my seat”. The arrow is drawn for you.",
    }),
    defineField({
      name: "footnote",
      title: "Footnote",
      type: "string",
      description: "Quiet line opposite the link label, e.g. “62 registered”.",
    }),
    defineField({
      name: "href",
      title: "URL or path",
      type: "string",
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
    select: { title: "title", badge: "badge", tone: "tone" },
    prepare: ({ title, badge, tone }) => ({
      title: title ?? "Banner",
      subtitle: [badge, tone].filter(Boolean).join(" · "),
    }),
  },
});

/** The one large card under "This week". */
export const featuredCard = defineType({
  name: "featuredCard",
  title: "Featured card",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Lime pill, top-left, e.g. “NEW VIDEO · 6 MIN”.",
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source line",
      type: "string",
      description: "e.g. “youtube.com/@keewee”. The arrow is drawn for you.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "figure",
      description: "16:9 works best. The caption always sits on a full scrim.",
    }),
    defineField({
      name: "showPlayIcon",
      title: "Show play button",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "href",
      title: "URL or path",
      type: "string",
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
    select: { title: "title", subtitle: "source", media: "image" },
  },
});

/** A row in the "Start here" stack. The first in the array renders as primary. */
export const linkButton = defineType({
  name: "linkButton",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sublabel",
      title: "Sublabel",
      type: "string",
      description: "Second line inside the button, e.g. “30 min · no deck, no pitch”.",
    }),
    defineField({
      name: "meta",
      title: "Meta",
      type: "string",
      description: "Quiet value on the right, e.g. “weekly”, “48”, “2.4k”.",
    }),
    defineField({
      name: "href",
      title: "URL or path",
      type: "string",
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
