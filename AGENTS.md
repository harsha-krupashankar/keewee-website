<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Content comes from Sanity

There is no hardcoded copy in `app/` or `components/`. If you are about to type a
sentence of user-facing text into a component, add a field to the schema instead.

## Cache Components rules

`cacheComponents: true` is on. Two constraints follow, and violating either one
is a build error rather than a runtime bug:

1. **`sanityFetch` may only be called inside a `'use cache'` scope.** It calls
   `cacheTag()` and `cacheLife()` internally. Every call site already lives in
   `sanity/lib/content.ts` — add new reads there, not in components.
2. **`cookies()` / `headers()` may not be read inside a `'use cache'` scope.**
   The content perspective is resolved by `components/PerspectiveGate.tsx` above
   the cache boundary and threaded down as a `FetchOptions` argument. New routes
   should follow the same shape:

   ```tsx
   export default function Route() {
     return <PerspectiveGate render={(opts) => <Content opts={opts} />} />;
   }

   async function Content({ opts }: { opts: FetchOptions }) {
     const page = await getSomething(opts);
     ...
   }
   ```

   `generateMetadata` uses `PUBLISHED` directly — reading cookies there would
   pull the document head out of the static shell.

## Where things go

| Adding…                     | Goes in                                       |
| --------------------------- | --------------------------------------------- |
| A content field             | `sanity/schemaTypes/`                         |
| A GROQ query                | `sanity/lib/queries.ts` (wrapped in `defineQuery`) |
| A cached read               | `sanity/lib/content.ts`                       |
| A query result type         | `sanity/lib/types.ts`                         |
| A cache tag                 | `sanity/lib/tags.ts`                          |
| A document ⇄ URL mapping    | `sanity/presentation/resolve.ts`              |

After changing the schema or a query, run `npm run typegen`.

## Conventions

- **Never put a dot in a document `_id`.** Sanity reads it as a path separator,
  and path-prefixed documents are hidden from unauthenticated reads even in a
  `public` dataset — the same mechanism that keeps `drafts.*` private. The site
  fetches the published perspective *without a token*, so a dotted ID makes the
  document render fine in the Studio and 404 for every visitor. Use `-`.
- **Cache tags must cover dereferenced types.** A read tagged only with its own
  document type goes stale when a `->` target changes: the webhook in
  `app/api/revalidate/route.ts` invalidates by `_type` and knows nothing about
  references. If a query dereferences `author->`, tag it with `person` too.
- **Headlines are Portable Text.** The lime marker / green / rust accents are
  marks, rendered by `components/sanity/Headline.tsx`. Never split a headline
  into `partA` + `highlight` + `partB` string fields.
- **Numbering is derived from array position**, never stored. Same for anchors on
  legal sections and FAQ groups.
- **Images** go through `components/sanity/SanityImage.tsx`, which reads
  dimensions from the asset ref so `next/image` reserves space without a round
  trip. Queries must project `lqip` and `dimensions` — use the `IMAGE` fragment.
- **Singletons** (`siteSettings`, `homePage`, …) are listed in
  `sanity/schemaTypes/index.ts`. Adding one means updating that list, the Studio
  structure, and the presentation resolver.
