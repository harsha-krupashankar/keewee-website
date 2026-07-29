# keewee.in

Next.js 16 (App Router, Cache Components) with Sanity as the CMS. All site copy
lives in Sanity — there is no hardcoded content left in `app/` or `components/`.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill it in
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio

### First-time setup

1. **Project ID** — from [sanity.io/manage](https://sanity.io/manage). Put it in
   `NEXT_PUBLIC_SANITY_PROJECT_ID`.
2. **Tokens** — under API → Tokens, create a **Viewer** token for
   `SANITY_API_READ_TOKEN` (drafts + live preview) and an **Editor** token for
   `SANITY_API_WRITE_TOKEN` (seeding only — delete it afterwards).
3. **CORS** — under API → CORS origins, add `http://localhost:3000` and your
   production domain, both with credentials allowed. Without this the Studio
   cannot talk to the Content Lake.
4. **Seed** — `npm run seed:dry` to preview, then `npm run seed` to write the
   pre-migration copy into Sanity. See [Seeding](#seeding).
5. **Webhook** — under API → Webhooks, add a webhook to
   `https://<your-domain>/api/revalidate`, method `POST`, dataset `production`,
   trigger on create/update/delete, with the secret set to
   `SANITY_REVALIDATE_SECRET`.

## Content model

Everything lives in `sanity/schemaTypes/`.

| Group          | Types                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Singletons** | `siteSettings`, `homePage`, `aboutPage`, `blogIndexPage`, `faqPage`, `freeAuditPage`, `newsletterPage` |
| **Collections**| `post`, `category`, `person`, `servicePage`, `faqGroup`, `legalDoc`                          |
| **Objects**    | `headline`, `richText`, `postBody`, `pageHero`, `sectionHeader`, `titledCard`, `funnelStage`, `faqItem`, `link`, `cta`, `figure`, `seo`, the `legal*` blocks |

Singletons are pinned in the Studio sidebar (`sanity/structure.ts`) and their
create/delete/duplicate actions are stripped in `sanity.config.ts`, so a second
"Home page" can't appear.

A few conventions worth knowing:

- **Headlines are Portable Text, not strings.** The lime marker, the green
  clause, the rust clause are *marks*, so an editor can move the emphasis
  anywhere in a sentence without a code change. See `components/sanity/Headline.tsx`.
- **Numbering is positional.** Funnel stages, phases, FAQ groups and legal
  sections derive their `01`, `02`, `03` from array order at render time.
  Reordering in the Studio renumbers automatically.
- **Adding a service page is a Studio action.** Create a `servicePage`, give it
  a slug, and it appears at `/<slug>` and in the footer.
- **Adding a legal document is a Studio action.** It appears at `/legal/<slug>`.

## Rendering and caching

The app runs with `cacheComponents: true`. The rules that follow from that:

- Every Sanity read goes through `sanity/lib/content.ts`, and every function
  there is a `'use cache'` boundary. `sanityFetch` calls `cacheTag()` and
  `cacheLife()` internally, so calling it outside a cache scope throws.
- `cookies()` cannot be read inside a cache scope. `components/PerspectiveGate.tsx`
  resolves the perspective *above* the boundary and passes it down as an
  argument, which also makes it part of the cache key. Published visitors take a
  synchronous path and get a fully prerendered page; only draft-mode requests
  pay for the cookie read.
- Invalidation is on-demand, not time-based. `cacheLife` is set to Sanity's
  one-year profile in `next.config.ts` because two things already push updates:
  `<SanityLive />` for anyone with the site open, and `/api/revalidate` for
  everyone else.

## Preview and visual editing

Open the **Presentation** tool in the Studio. It loads the real site in an iframe
with click-to-edit overlays, and edits stream in live.

- `/api/draft-mode/enable` — entered by Presentation, validates Sanity's secret
- `/api/draft-mode/disable` — exits; also wired to the on-page "Draft mode" pill
- `sanity/presentation/resolve.ts` — maps documents ⇄ URLs in both directions

Requires `SANITY_API_READ_TOKEN`.

## Seeding

`scripts/seed.ts` migrates the pre-CMS copy (kept verbatim in `scripts/legacy/`)
into Sanity. Documents get deterministic `_id`s and are written with
`createOrReplace` in a single transaction, so the script is **idempotent — and
therefore destructive once real editing has started.** It is a one-time tool.

```bash
npm run seed:dry   # print what would be written
npm run seed       # write it
```

Two things the seed cannot recover, because they never existed:

- **Post bodies.** The old blog had card summaries only. All 15 posts are seeded
  with title, dek, category and date, but no article body.
- **Images.** Everything was a dashed placeholder box. Upload hero images,
  author photos and OG images in the Studio.

Delete `scripts/legacy/` and `scripts/seed.ts` once the seed has run everywhere.

### Never put a dot in a document `_id`

Sanity reads a dot as a **path separator**, and documents under a path prefix are
excluded from unauthenticated reads even when the dataset ACL is `public` — the
same mechanism that keeps `drafts.*` private. The website fetches the published
perspective **without a token** (see [Rendering and caching](#rendering-and-caching)), so a
document with an ID like `service.analytics` is visible in the Studio and
invisible to every visitor: the query returns nothing and the route 404s.

Use `-`. `scripts/fix-dotted-ids.ts` repairs a dataset that already has dotted
IDs — it recreates the documents under clean IDs and rewrites every `_ref` in the
same transaction.

```bash
npm run fix-ids:dry   # print the renames
npm run fix-ids       # apply them
```

## Type generation

Two type sources, deliberately:

- **`sanity/lib/types.ts`** — hand-written, and what components actually import.
  Keeps prop types readable (`page: HomePage`, not `page: HOME_PAGE_QUERY_RESULT`)
  and means the app compiles without anyone having to run a generator first.
- **`sanity/sanity.types.ts`** — generated by `npm run typegen` from the real
  schema and the real GROQ. This is the authority on what a query returns.

```bash
npm run typegen
```

**After changing a schema type or a query, run typegen and reconcile
`types.ts` against the regenerated `*_QUERY_RESULT`.** This is a manual step —
there is no automated guard, because the one structural difference between the
two (Portable Text is nominal in `@portabletext/react`, structural in typegen)
makes a mechanical assertion report a false positive on every type that carries
rich text. The two agree today.

## Scripts

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Dev server + Studio                              |
| `npm run build`     | Production build                                 |
| `npm run typecheck` | `tsc --noEmit`                                   |
| `npm run lint`      | ESLint                                           |
| `npm run seed`      | One-time content migration                       |
| `npm run fix-ids`   | Rename documents whose `_id` contains a dot      |
| `npm run typegen`   | Extract schema, generate GROQ result types       |
