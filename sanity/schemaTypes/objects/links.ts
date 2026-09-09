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
 * Two fields, because a tile is a picture and a destination and nothing else.
 *
 * There is no separate "Instagram post" field. It only ever served as a
 * fallback destination, which is the same job `href` already does — a tile that
 * should send people to the post takes the post's URL as its link. One field
 * covers both cases; two just asked an editor to fill in a value that usually
 * went unused.
 *
 * The picture is uploaded rather than pulled: Instagram serves no post metadata
 * to an unauthenticated fetch — the post page and the embed endpoint both
 * return a login-walled shell with no `og:image`. Uploading is also what puts
 * the image on the Sanity CDN with `lqip` and real dimensions; a scraped CDN
 * URL has neither, and expires.
 */
export const feedTile = defineType({
  name: "feedTile",
  title: "Post",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Post image",
      type: "image",
      options: { hotspot: true },
      description: "The picture from the post. Square crops sit flush in the grid.",
      // Not the shared `figure` type: that carries a caption, and this grid
      // draws none — the picture fills the tile edge to edge.
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "What the post shows, in a few words. The tile is a bare picture, so this is the only name a screen reader can announce for the link.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description:
        "Where a tap goes: /free-audit, https://…, mailto:…, or the Instagram post's own URL to send people back to the post.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { media: "image", alt: "image.alt", href: "href" },
    prepare: ({ media, alt, href }) => ({
      title: (alt as string) || "Post",
      subtitle: href as string,
      media,
    }),
  },
});
