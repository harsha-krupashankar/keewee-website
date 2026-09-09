import { defineField, defineType } from "sanity";

/**
 * Shapes for the link-in-bio page (`/links`).
 *
 * The page is deliberately one idea: the profile, then a grid of Instagram
 * posts, each of which is a single link. There is no featured card, no banner
 * strip, no button stack and no sheet — a visitor arriving from a bio tap wants
 * one destination, and every extra section is a decision between them and it.
 */

/**
 * One post in the grid.
 *
 * Instagram serves no post metadata to an unauthenticated fetch — the post page
 * and the embed endpoint both return a login-walled shell with no `og:image` —
 * so the picture is uploaded rather than scraped. That also means it comes off
 * the Sanity CDN with `lqip` and real dimensions, which the scraped CDN URL
 * never would: those expire.
 */
export const feedTile = defineType({
  name: "feedTile",
  title: "Post",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Post image",
      type: "figure",
      description:
        "The picture from the post. Square crops sit flush in the grid. The alt text is the tile's only accessible name, so write it.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postUrl",
      title: "Instagram post",
      type: "url",
      description: "The post this tile shows, e.g. https://www.instagram.com/p/….",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description:
        "Where a tap goes — e.g. /free-audit, https://…, or mailto:team@keewee.in. Leave empty to send the tap to the post itself.",
    }),
  ],
  preview: {
    select: { media: "image", alt: "image.alt", href: "href", postUrl: "postUrl" },
    prepare: ({ media, alt, href, postUrl }) => ({
      title: (alt as string) || "Post",
      subtitle: (href as string) || (postUrl as string),
      media,
    }),
  },
});
