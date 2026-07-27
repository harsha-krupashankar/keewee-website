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
