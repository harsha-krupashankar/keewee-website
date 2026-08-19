import type { RichText } from "@/sanity/lib/types";

/**
 * Display formatting for CMS values.
 *
 * Dates are formatted with an explicit `UTC` timezone: `publishedAt` is stored
 * as an instant, and letting the server's local zone decide would render a
 * different month than the editor picked for posts published near midnight.
 */

export function formatPostDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatFullDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatReadTime(minutes?: number): string {
  if (!minutes) return "";
  return `${minutes} min read`;
}

/**
 * Flattens Portable Text down to plain text — for contexts that can't render
 * blocks at all, like JSON-LD `answer` strings, where the field is only ever
 * read by a crawler, not a person.
 */
export function richTextToPlainText(blocks?: RichText | null): string {
  if (!blocks?.length) return "";
  return blocks
    .filter((block) => block._type === "block")
    .map((block) =>
      block.children
        ?.map((child) => ("text" in child ? (child.text ?? "") : ""))
        .join("") ?? ""
    )
    .join(" ")
    .trim();
}
