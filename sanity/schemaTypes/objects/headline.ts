import { defineArrayMember, defineType } from "sanity";

/**
 * A headline with the site's decorative marks baked in.
 *
 * The design puts a lime marker behind a word, or flips one clause to green or
 * rust. Storing that as marks (rather than the old heroA/heroHi/heroB string
 * triplets) lets an editor move the emphasis anywhere in the sentence without a
 * developer changing the component.
 */
export const headline = defineType({
  name: "headline",
  title: "Headline",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // A headline is one line of text — no block styles, no lists.
      styles: [{ title: "Headline", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Lime marker", value: "highlight" },
          { title: "Green text", value: "green" },
          { title: "Lime text", value: "lime" },
          { title: "Rust text", value: "rust" },
        ],
        annotations: [],
      },
    }),
  ],
});
