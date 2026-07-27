<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
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
