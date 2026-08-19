import { defineField } from "sanity";

/**
 * A leading/trailing space in `slug.current` looks identical to a clean slug
 * in the Studio, but every route does an exact match against the URL segment
 * (`slug.current == $slug`), so a stray space silently 404s the page. The
 * custom `slugify` strips it when the field is auto-generated from its
 * source; the validation rule catches it when someone types the slug by hand.
 */
export function slugField(options: {
  source: string;
  maxLength?: number;
  group?: string;
  description?: string;
}) {
  const maxLength = options.maxLength ?? 96;

  return defineField({
    name: "slug",
    type: "slug",
    group: options.group,
    description: options.description,
    options: {
      source: options.source,
      maxLength,
      slugify: (input: string) =>
        input
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .slice(0, maxLength),
    },
    validation: (rule) =>
      rule.required().custom((value) => {
        if (!value?.current) return true;
        return value.current === value.current.trim()
          ? true
          : "Slug can't start or end with a space — remove it before publishing.";
      }),
  });
}
