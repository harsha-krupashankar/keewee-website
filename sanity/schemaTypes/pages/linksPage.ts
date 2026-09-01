import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * `/links` — the link-in-bio page.
 *
 * Standalone by design: it renders without the site header and footer, so its
 * own wordmark, bio, social chips and footer all live here. Section labels are
 * editable but their dot colour is not — green means "ours", clay means time
 * pressure, and that mapping is fixed in the components.
 */
export const linksPage = defineType({
  name: "linksPage",
  title: "Links page",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "featured", title: "This week" },
    { name: "banners", title: "Closing soon" },
    { name: "buttons", title: "Start here" },
    { name: "feed", title: "From the feed" },
    { name: "desktop", title: "Desktop" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Profile ---------------------------------------------------------
    // Social profiles are not repeated here: the row reads
    // `siteSettings.socialLinks`, the same list the site footer uses.
    defineField({
      name: "logoMark",
      title: "Logo mark",
      type: "string",
      group: "profile",
      description: "The single glyph before the wordmark, e.g. “✱”.",
      initialValue: "✱",
    }),
    defineField({
      name: "wordmark",
      title: "Wordmark",
      type: "string",
      group: "profile",
      description: "Shown large at the top, e.g. “keewee.in”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      group: "profile",
      description: "Two lines at most. This is the first thing a visitor reads.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stickyCta",
      title: "Sticky bar button",
      type: "link",
      group: "profile",
      description:
        "Rides the condensed bar that appears on phones once the profile scrolls away. Keep the label to two words.",
    }),

    // --- This week -------------------------------------------------------
    defineField({
      name: "featuredLabel",
      title: "Section label",
      type: "string",
      group: "featured",
      initialValue: "This week",
    }),
    defineField({
      name: "featured",
      title: "Featured card",
      type: "featuredCard",
      group: "featured",
    }),

    // --- Closing soon ----------------------------------------------------
    defineField({
      name: "bannersLabel",
      title: "Section label",
      type: "string",
      group: "banners",
      initialValue: "Closing soon",
    }),
    defineField({
      name: "bannersSwipeHint",
      title: "Swipe hint",
      type: "string",
      group: "banners",
      description: "Shown at the end of the label rule on phones only.",
      initialValue: "Swipe",
    }),
    defineField({
      name: "banners",
      title: "Banners",
      type: "array",
      group: "banners",
      of: [defineArrayMember({ type: "bannerCard" })],
      validation: (rule) => rule.max(6),
    }),

    // --- Start here ------------------------------------------------------
    defineField({
      name: "buttonsLabel",
      title: "Section label",
      type: "string",
      group: "buttons",
      initialValue: "Start here",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      group: "buttons",
      of: [defineArrayMember({ type: "linkButton" })],
      description: "The first button renders as the primary — green, with the ink offset.",
      validation: (rule) => rule.max(8),
    }),

    // --- From the feed ---------------------------------------------------
    defineField({
      name: "feedLabel",
      title: "Section label",
      type: "string",
      group: "feed",
      initialValue: "From the feed",
    }),
    defineField({
      name: "feedHandle",
      title: "Handle",
      type: "string",
      group: "feed",
      description: "Sits at the end of the label rule, e.g. “@keewee.in”.",
    }),
    defineField({
      name: "feedTiles",
      title: "Tiles",
      type: "array",
      group: "feed",
      of: [defineArrayMember({ type: "feedTile" })],
    }),
    defineField({
      name: "feedInitialCount",
      title: "Tiles shown first",
      type: "number",
      group: "feed",
      description:
        "How many tiles render before the reveal button. Multiples of three keep the grid square.",
      initialValue: 12,
      validation: (rule) => rule.min(3).integer(),
    }),
    defineField({
      name: "feedMoreLabel",
      title: "Reveal button",
      type: "string",
      group: "feed",
      description:
        "Label on the button that reveals the rest. “{count}” is replaced by the number of tiles. Leave empty to show every tile at once.",
      initialValue: "See all {count} posts",
    }),
    defineField({
      name: "sheetHint",
      title: "Sheet hint",
      type: "string",
      group: "feed",
      description:
        "Quiet line in the sheet footer on desktop, e.g. “Esc or click outside to close”. Leave empty to hide it.",
    }),

    // --- Desktop ---------------------------------------------------------
    defineField({
      name: "railEyebrow",
      title: "Rail eyebrow",
      type: "string",
      group: "desktop",
      description: "Above the headline on the left of wide screens.",
    }),
    defineField({
      name: "railHeadline",
      title: "Rail headline",
      type: "headline",
      group: "desktop",
      description: "Carries the lime marker mark. Only shown on wide screens.",
    }),
    defineField({
      name: "railBody",
      title: "Rail body",
      type: "text",
      rows: 3,
      group: "desktop",
    }),
    defineField({
      name: "railNote",
      title: "Rail note",
      type: "text",
      rows: 2,
      group: "desktop",
      description: "Typewriter note in the bottom-right margin.",
    }),
    defineField({
      name: "sticker",
      title: "Sticker",
      type: "string",
      group: "desktop",
      description: "Comic-lettered lime sticker, e.g. “NO MUSH!”.",
    }),

    // --- Footer ----------------------------------------------------------
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      group: "footer",
      of: [defineArrayMember({ type: "link" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
      group: "footer",
      description: "e.g. “© 2026 Keewee Marketing Pvt Ltd.”",
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Links page" }) },
});
