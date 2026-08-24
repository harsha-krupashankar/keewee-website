const SAFE_HREF = /^(\/|https?:\/\/|mailto:|tel:|#)/i;

/**
 * Guards against a `javascript:` (or other unexpected-scheme) URL entered
 * into a Sanity link field from rendering as-is. Only reachable by an
 * authenticated editor, so this is defence-in-depth for a compromised editor
 * account rather than a public attack surface.
 */
export function safeHref(href: string | null | undefined): string {
  return href && SAFE_HREF.test(href) ? href : "#";
}
