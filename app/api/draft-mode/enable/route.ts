/**
 * Entry point for the Presentation tool's preview mode.
 *
 * `defineEnableDraftMode` validates the short-lived secret Sanity mints for the
 * session, then sets the `__prerender_bypass` cookie. Once set, every `use cache`
 * boundary re-executes per request and `getFetchOptions()` starts resolving the
 * drafts perspective — see `sanity/lib/live.ts`.
 */
import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { readToken } from "@/sanity/env";
import { client } from "@/sanity/lib/client";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
