# Graph Report - keewee-website  (2026-09-10)

## Corpus Check
- 173 files · ~56,945 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 799 nodes · 1974 edges · 46 communities (37 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 282,674 input · 0 output

## Community Hubs (Navigation)
- Page Section Components
- Sanity Generated Types
- Sanity Schema Types
- Footer & Links Page UI
- Project Conventions & Docs
- Forms API Route
- NPM Scripts
- Blog Post Components
- Dynamic Slug Routes
- Package Manifest
- Root Layout & Fonts
- Legal & Services Routes
- TypeScript Config
- Free Audit & Newsletter Routes
- Dev Dependencies
- GROQ Queries
- Consent & Tag Manager
- Sanity Env & Draft Mode
- Home Page Route
- Services Category Layout
- Runtime Dependencies
- Perspective Gate & Fetching
- Service Detail Route
- About Page
- FAQ Page
- OpenGraph Image
- Sanity Studio Config
- Blog Index Route
- Fix Dotted IDs Script
- Prompt Library Route
- Apple Touch Icon Brand
- Favicon Brand Mark
- Next.js Boilerplate Wordmark
- Vercel Boilerplate Logo
- Services Quote Form
- Service Quote Form
- File Icon Boilerplate
- Globe Icon Boilerplate
- Window Icon Boilerplate
- Blog Archive Filter
- ESLint Config
- PostCSS Config
- Vitest Config

## God Nodes (most connected - your core abstractions)
1. `Container()` - 54 edges
2. `Reveal()` - 48 edges
3. `getSiteSettings()` - 38 edges
4. `Headline()` - 30 edges
5. `metadataFrom()` - 30 edges
6. `Copy()` - 29 edges
7. `sanity` - 29 edges
8. `scripts` - 28 edges
9. `react` - 21 edges
10. `next` - 19 edges

## Surprising Connections (you probably didn't know these)
- `keewee.in website (Next.js 16 + Sanity)` --semantically_similar_to--> `Content comes from Sanity (no hardcoded copy)`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `Content model (singletons, collections, objects)` --semantically_similar_to--> `Numbering derived from array position`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `Rendering and caching (cacheComponents)` --semantically_similar_to--> `Cache Components rules (cacheComponents: true)`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `Never put a dot in a document _id (fix-dotted-ids)` --semantically_similar_to--> `Never put a dot in a document _id`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `Content model (singletons, collections, objects)` --semantically_similar_to--> `Headlines are Portable Text with accent marks`  [INFERRED] [semantically similar]
  README.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cache Components constraint flow: PerspectiveGate -> content.ts -> tags -> revalidate webhook** — agents_cache_components_rules, agents_sanityfetch_use_cache_rule, agents_perspectivegate_pattern, components_perspectivegate, sanity_lib_content, agents_cache_tags_cover_dereferenced_types, app_api_revalidate_route, readme_on_demand_invalidation, next_config [EXTRACTED 1.00]
- **Form submission pipeline: submit-form -> /api/forms -> Apps Script doPost -> Sheets** — lib_submit_form, app_api_forms_route, docs_google_sheets_forms_google_sheets_webhook_url, docs_google_sheets_forms_dopost, docs_google_sheets_forms_safe, docs_google_sheets_forms_appendrow, docs_google_sheets_forms_form_types, docs_google_sheets_forms_rate_limiting, docs_google_sheets_forms_submissionthrottlederror [EXTRACTED 1.00]
- **Sanity content conventions (no dotted IDs, Portable Text headlines, positional numbering, SanityImage, singletons)** — agents_content_from_sanity, agents_no_dot_in_document_id, agents_headlines_are_portable_text, agents_positional_numbering, agents_sanityimage_pipeline, agents_singletons, readme_never_dot_in_id, readme_content_model, scripts_fix_dotted_ids [INFERRED 0.85]

## Communities (46 total, 6 thin omitted)

### Community 0 - "Page Section Components"
Cohesion: 0.08
Nodes (59): BlogNewsletterBanner(), handleSubmit(), Button(), ButtonProps, SHADOW, Container(), FaqAccordion(), FreeAuditForm() (+51 more)

### Community 1 - "Sanity Generated Types"
Cohesion: 0.02
Nodes (80): ABOUT_PAGE_QUERY_RESULT, AboutPage, AllSanitySchemaTypes, BLOG_INDEX_QUERY_RESULT, BlogIndexPage, Category, CategoryReference, CheckboxGroup (+72 more)

### Community 2 - "Sanity Schema Types"
Cohesion: 0.06
Nodes (49): sanity, category, faqGroup, legalDoc, person, post, servicePage, siteSettings (+41 more)

### Community 3 - "Footer & Links Page UI"
Cohesion: 0.09
Nodes (33): Footer(), SocialIcon(), FeedGrid(), LinksFooter(), LinksProfile(), SocialChip(), Arrow(), outbound() (+25 more)

### Community 4 - "Project Conventions & Docs"
Cohesion: 0.09
Nodes (29): Serena project config (keewee-website, typescript LSP), AGENTS.md project instructions, Cache Components rules (cacheComponents: true), Cache tags must cover dereferenced types, Content comes from Sanity (no hardcoded copy), Headlines are Portable Text with accent marks, Never put a dot in a document _id, PerspectiveGate route pattern (cookies above cache boundary) (+21 more)

### Community 5 - "Forms API Route"
Cohesion: 0.10
Nodes (27): AuditPayload, isAllowedOrigin(), isEmail(), Payload, POST(), QuotePayload, Rejection, sanitize() (+19 more)

### Community 6 - "NPM Scripts"
Cohesion: 0.07
Nodes (28): scripts, blog-label, blog-label:dry, blog-to-blogs, blog-to-blogs:dry, build, dev, fix-ids (+20 more)

### Community 7 - "Blog Post Components"
Cohesion: 0.15
Nodes (18): BlogAuthorBio(), BlogPostBody(), components, BlogPostCard(), BlogPostHeader(), BlogRelatedPosts(), LegalBlocks(), LegalDocument() (+10 more)

### Community 8 - "Dynamic Slug Routes"
Cohesion: 0.16
Nodes (17): Content(), generateMetadata(), generateStaticParams(), Content(), generateMetadata(), generateStaticParams(), generateStaticParams(), sitemap() (+9 more)

### Community 9 - "Package Manifest"
Cohesion: 0.09
Nodes (22): name, private, version, eslint, eslint-config-next, jsdom, @next/third-parties, playwright (+14 more)

### Community 10 - "Root Layout & Fonts"
Cohesion: 0.16
Nodes (12): archivo, bangers, bricolage, generateMetadata(), RootLayout(), DraftModeBanner(), metadataFrom(), CANONICAL_HOSTS (+4 more)

### Community 11 - "Legal & Services Routes"
Cohesion: 0.19
Nodes (12): Content(), generateMetadata(), Content(), Content(), generateMetadata(), PerspectiveGate(), ServicesAudit(), ServicesHero() (+4 more)

### Community 12 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 13 - "Free Audit & Newsletter Routes"
Cohesion: 0.16
Nodes (13): Content(), generateMetadata(), Content(), generateMetadata(), CenteredSectionHeader(), FreeAuditCover(), FreeAuditFaq(), FreeAuditForYou() (+5 more)

### Community 14 - "Dev Dependencies"
Cohesion: 0.11
Nodes (18): devDependencies, eslint, eslint-config-next, jsdom, playwright, tailwindcss, @tailwindcss/postcss, @testing-library/dom (+10 more)

### Community 15 - "GROQ Queries"
Cohesion: 0.11
Nodes (17): ABOUT_PAGE_QUERY, BLOG_INDEX_QUERY, FAQ_PAGE_QUERY, FREE_AUDIT_PAGE_QUERY, HOME_PAGE_QUERY, LEGAL_DOC_QUERY, LEGAL_DOCS_QUERY, LEGAL_SLUGS_QUERY (+9 more)

### Community 16 - "Consent & Tag Manager"
Cohesion: 0.23
Nodes (12): GoogleTagManager(), subscribe(), CookieConsent(), subscribe(), CONSENT_COOKIE, CONSENT_EVENT, ConsentValue, getStoredConsent() (+4 more)

### Community 17 - "Sanity Env & Draft Mode"
Cohesion: 0.22
Nodes (10): { GET }, next-sanity, @sanity/image-url, apiVersion, dataset, projectId, readToken, studioUrl (+2 more)

### Community 18 - "Home Page Route"
Cohesion: 0.16
Nodes (12): Content(), generateMetadata(), Faq(), FinalCta(), FreeAuditBanner(), Hero(), Marquee(), Problem() (+4 more)

### Community 19 - "Services Category Layout"
Cohesion: 0.19
Nodes (10): DOTS_DARK, DOTS_LIGHT, FeatureLayout(), GHOST_STROKE, Items(), SECTION, ServicesCategory(), two() (+2 more)

### Community 20 - "Runtime Dependencies"
Cohesion: 0.15
Nodes (13): dependencies, next, next-sanity, @next/third-parties, @portabletext/react, react, react-dom, sanity (+5 more)

### Community 21 - "Perspective Gate & Fetching"
Cohesion: 0.30
Nodes (8): Content(), generateMetadata(), DraftBranch(), getLinksPage(), FetchOptions, getFetchOptions(), PUBLISHED, { sanityFetch, SanityLive }

### Community 22 - "Service Detail Route"
Cohesion: 0.20
Nodes (10): Content(), generateMetadata(), ServiceDifferently(), ServiceFaq(), ServiceHero(), ServiceOfferings(), ServiceProblem(), ServiceTalkToUs() (+2 more)

### Community 23 - "About Page"
Cohesion: 0.28
Nodes (7): Content(), generateMetadata(), AboutFoundingStory(), AboutHero(), AboutTeam(), AboutWhatWeAre(), getAboutPage()

### Community 24 - "FAQ Page"
Cohesion: 0.31
Nodes (7): Content(), generateMetadata(), FaqGroups(), PageHeroCentered(), richTextToPlainText(), getFaqPage(), run()

### Community 25 - "OpenGraph Image"
Cohesion: 0.31
Nodes (8): alt, contentType, fontsPromise, Image(), plainText(), renderHeadline(), size, truncate()

### Community 26 - "Sanity Studio Config"
Cohesion: 0.25
Nodes (5): @sanity/vision, singletons, schemaTypes, SINGLETON_TYPES, structure()

### Community 27 - "Blog Index Route"
Cohesion: 0.32
Nodes (6): Content(), generateMetadata(), BlogHero(), BlogTopReads(), DarkCtaSection(), getBlogIndex()

### Community 28 - "Fix Dotted IDs Script"
Cohesion: 0.32
Nodes (7): @sanity/client, client, dryRun, isReserved(), main(), remapRefs(), RESERVED

### Community 29 - "Prompt Library Route"
Cohesion: 0.38
Nodes (5): Content(), generateMetadata(), PromptLibraryHero(), PromptLibraryPrimer(), getPromptLibraryPage()

### Community 30 - "Apple Touch Icon Brand"
Cohesion: 0.40
Nodes (6): Green Accent Palette, Green Asterisk Brand Mark, Keewee Apple Touch Icon, Keewee Brand Identity, Next.js App Router Icon File Convention, Off-White Rounded Square Background

### Community 31 - "Favicon Brand Mark"
Cohesion: 0.50
Nodes (5): Brand Palette: Off-White #f6f4ef and Green #4e7d2e, Keewee Favicon (app/icon.svg), Next.js App Router icon.svg Favicon Convention, Rounded Square Tile Background (32x32, rx 6), Six-Armed Green Asterisk Brand Mark

### Community 32 - "Next.js Boilerplate Wordmark"
Cohesion: 0.50
Nodes (4): create-next-app Starter Template Asset, Leftover Boilerplate Asset (likely unused by site), Next.js Framework, Next.js Wordmark (NEXT.JS logo SVG)

### Community 33 - "Vercel Boilerplate Logo"
Cohesion: 0.50
Nodes (4): Likely unused leftover boilerplate, safe to delete if unreferenced, Next.js create-next-app starter template asset, Vercel Logo (white triangle logomark), Vercel (hosting platform, maintainer of Next.js)

### Community 36 - "File Icon Boilerplate"
Cohesion: 0.67
Nodes (3): Document Page Glyph (folded corner, three text lines), File Icon (Next.js starter template asset), Next.js Starter Template Default Assets

### Community 37 - "Globe Icon Boilerplate"
Cohesion: 1.00
Nodes (3): Globe Icon (16x16 SVG), Next.js Starter Template Asset, Public Static Assets Directory

### Community 38 - "Window Icon Boilerplate"
Cohesion: 0.67
Nodes (3): Browser Window Glyph (16x16, three traffic-light dots), Next.js Starter Template Asset, Window Icon (window.svg)

## Ambiguous Edges - Review These
- `Keewee Brand Identity` → `Green Accent Palette`  [AMBIGUOUS]
  app/apple-icon.png · relation: conceptually_related_to
- `Next.js Starter Template Asset` → `Public Static Assets Directory`  [AMBIGUOUS]
  public/globe.svg · relation: conceptually_related_to
- `Next.js Wordmark (NEXT.JS logo SVG)` → `Leftover Boilerplate Asset (likely unused by site)`  [AMBIGUOUS]
  public/next.svg · relation: rationale_for
- `Vercel Logo (white triangle logomark)` → `Likely unused leftover boilerplate, safe to delete if unreferenced`  [AMBIGUOUS]
  public/vercel.svg · relation: rationale_for

## Knowledge Gaps
- **271 isolated node(s):** `{ GET }`, `SubscribePayload`, `QuotePayload`, `AuditPayload`, `Payload` (+266 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 311 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Keewee Brand Identity` and `Green Accent Palette`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Next.js Starter Template Asset` and `Public Static Assets Directory`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Next.js Wordmark (NEXT.JS logo SVG)` and `Leftover Boilerplate Asset (likely unused by site)`?**
  _Edge tagged AMBIGUOUS (relation: rationale_for) - confidence is low._
- **What is the exact relationship between `Vercel Logo (white triangle logomark)` and `Likely unused leftover boilerplate, safe to delete if unreferenced`?**
  _Edge tagged AMBIGUOUS (relation: rationale_for) - confidence is low._
- **Why does `sanity` connect `Sanity Schema Types` to `Package Manifest`, `Sanity Studio Config`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `react` connect `Page Section Components` to `Footer & Links Page UI`, `Blog Post Components`, `Package Manifest`, `Consent & Tag Manager`, `Perspective Gate & Fetching`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `next` connect `Root Layout & Fonts` to `Project Conventions & Docs`, `Dynamic Slug Routes`, `Package Manifest`, `Legal & Services Routes`, `Free Audit & Newsletter Routes`, `Home Page Route`, `Perspective Gate & Fetching`, `Service Detail Route`, `About Page`, `FAQ Page`, `Blog Index Route`, `Prompt Library Route`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._