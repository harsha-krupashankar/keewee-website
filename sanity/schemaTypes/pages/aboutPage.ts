import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "whatWeAre", title: "What we are" },
    { name: "story", title: "Founding story" },
    { name: "team", title: "Team" },
    { name: "cta", title: "Talk to the team" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", group: "hero" }),

    defineField({
      name: "whatWeAreEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "whatWeAre",
    }),
    defineField({
      name: "whatWeAreBody",
      title: "Body",
      type: "richText",
      group: "whatWeAre",
    }),
    defineField({
      name: "missionEyebrow",
      title: "Mission eyebrow",
      type: "string",
      group: "whatWeAre",
    }),
    defineField({
      name: "missionStatement",
      title: "Mission statement",
      type: "text",
      rows: 5,
      group: "whatWeAre",
      description: "The large quote in the dark card.",
    }),

    defineField({
      name: "storyEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyHeadline",
      title: "Headline",
      type: "headline",
      group: "story",
    }),
    defineField({
      name: "storyBeats",
      title: "Story beats",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "text", rows: 4 })],
      description: "Each beat becomes one node on the vertical timeline.",
    }),

    defineField({
      name: "teamEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "teamHeadline",
      title: "Headline",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "teamSticker",
      title: "Sticker",
      type: "string",
      group: "team",
    }),
    defineField({
      name: "teamIntro",
      title: "Intro",
      type: "richText",
      group: "team",
      description:
        "Optional. The cards themselves are pulled from People with “Show on the About page” enabled.",
    }),

    defineField({
      name: "ctaEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaHeadline",
      title: "Headline",
      type: "headline",
      group: "cta",
    }),
    defineField({ name: "ctaBody", title: "Body", type: "richText", group: "cta" }),
    defineField({ name: "ctaButtons", title: "Buttons", type: "cta", group: "cta" }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
