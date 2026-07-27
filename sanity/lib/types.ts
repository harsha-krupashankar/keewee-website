import type { PortableTextBlock } from "@portabletext/types";

/**
 * Shapes returned by the projections in `sanity/lib/queries.ts`.
 *
 * Written by hand so the app is type-safe without anyone having to run typegen
 * first, and so component props read as `HomePage` rather than
 * `HOME_PAGE_QUERY_RESULT`.
 *
 * KEEPING THESE HONEST: `npm run typegen` derives `sanity/sanity.types.ts` from
 * the real schema and the real GROQ. After changing either, run it and diff the
 * corresponding `*_QUERY_RESULT` against the type here. The two agree today,
 * apart from Portable Text: typegen emits the block shape from the schema, while
 * `@portabletext/react` needs its own nominal `PortableTextBlock`, so
 * `Headline` / `RichText` below are declared in the renderer's terms.
 *
 * Absent fields are `null`, not `undefined` — that is what the Content Lake
 * returns. Optional-and-nullable (`?: T | null`) is used throughout so both
 * spellings are accepted and every consumer just tests for falsiness.
 */

export type SanityImage = {
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string | null;
  caption?: string | null;
  lqip?: string | null;
  dimensions?: { width: number; height: number; aspectRatio: number } | null;
};

export type Link = {
  label: string;
  href: string;
  openInNewTab?: boolean | null;
};

export type Cta = {
  primary?: Link | null;
  secondary?: Link | null;
};

export type Seo = {
  title?: string | null;
  description?: string | null;
  image?: SanityImage | null;
  noIndex?: boolean | null;
};

/** Portable text restricted to one line, carrying the highlight/green/rust marks. */
export type Headline = PortableTextBlock[];

export type RichText = PortableTextBlock[];

export type SectionHeader = {
  eyebrow?: string | null;
  headline?: Headline | null;
  sticker?: string | null;
  intro?: RichText | null;
};

export type PageHero = {
  badge?: string | null;
  headline?: Headline | null;
  intro?: RichText | null;
  cta?: Link | null;
  sticker?: string | null;
};

export type TitledCard = {
  title: string;
  description: string;
  tag?: string | null;
};

export type FaqItem = {
  question: string;
  answer: RichText;
};

export type FunnelStage = {
  title: string;
  tag?: string | null;
  description: string;
  bullets?: string[] | null;
  barWidth: number;
  href?: string | null;
};

// --- Global ---------------------------------------------------------------

export type FooterGroup = {
  title: string;
  links?: Link[] | null;
};

export type SiteSettings = {
  title: string;
  tagline?: string | null;
  contactEmail: string;
  marqueeText: string;
  headerNav?: Link[] | null;
  headerCta?: Link | null;
  footerGroups?: FooterGroup[] | null;
  footerNote?: string | null;
  socialLinks?: Link[] | null;
  defaultSeo?: Seo | null;
};

// --- Pages ----------------------------------------------------------------

export type HomePage = {
  heroBadge?: string | null;
  heroHeadline?: Headline | null;
  heroIntro?: RichText | null;
  heroCta?: Cta | null;
  heroFootnote?: string | null;
  heroStickerA?: string | null;
  heroStickerB?: string | null;

  problemHeader?: SectionHeader | null;
  problemBody?: RichText | null;
  lookalikes?: string[] | null;
  problemSticker?: string | null;
  problemCaption?: string | null;

  funnelHeader?: SectionHeader | null;
  funnelStages?: FunnelStage[] | null;
  funnelOutcomeSticker?: string | null;
  funnelOutcomeText?: string | null;

  whyHeader?: SectionHeader | null;
  whyReasons?: TitledCard[] | null;

  howHeader?: SectionHeader | null;
  howPhases?: TitledCard[] | null;
  howBanner?: string | null;

  whoHeader?: SectionHeader | null;
  whoSegments?: TitledCard[] | null;

  proofHeader?: SectionHeader | null;
  proofBody?: RichText | null;
  proofCta?: Link | null;
  proofSticker?: string | null;

  auditHeader?: SectionHeader | null;
  auditBody?: RichText | null;
  auditCta?: Link | null;
  auditSticker?: string | null;
  auditListTitle?: string | null;
  auditItems?: string[] | null;

  faqHeader?: SectionHeader | null;
  faqItems?: FaqItem[] | null;

  ctaHeadline?: Headline | null;
  ctaBody?: RichText | null;
  ctaButtons?: Cta | null;

  seo?: Seo | null;
};

export type Person = {
  _id: string;
  name: string;
  role: string;
  initials?: string | null;
  photo?: SanityImage | null;
  bio?: string | null;
  funFact?: { label?: string | null; text?: string | null } | null;
};

export type AboutPage = {
  hero?: PageHero | null;
  whatWeAreEyebrow?: string | null;
  whatWeAreBody?: RichText | null;
  missionEyebrow?: string | null;
  missionStatement?: string | null;
  storyEyebrow?: string | null;
  storyHeadline?: Headline | null;
  storyBeats?: string[] | null;
  teamEyebrow?: string | null;
  teamHeadline?: string | null;
  teamSticker?: string | null;
  teamIntro?: RichText | null;
  ctaEyebrow?: string | null;
  ctaHeadline?: Headline | null;
  ctaBody?: RichText | null;
  ctaButtons?: Cta | null;
  seo?: Seo | null;
  team: Person[];
};

export type FaqGroup = {
  _id: string;
  title: string;
  navLabel: string;
  slug: string;
  items: FaqItem[];
};

export type FaqPage = {
  hero?: PageHero | null;
  ctaHeadline?: Headline | null;
  ctaBody?: RichText | null;
  ctaButtons?: Cta | null;
  seo?: Seo | null;
  groups: FaqGroup[];
};

export type FreeAuditPage = {
  hero?: PageHero | null;
  navCtaLabel?: string | null;
  coverHeader?: SectionHeader | null;
  coverCards?: TitledCard[] | null;
  forYouHeader?: SectionHeader | null;
  forYouPointers?: string[] | null;
  deliverablesHeader?: SectionHeader | null;
  deliverables?: TitledCard[] | null;
  faqHeader?: SectionHeader | null;
  faqItems?: FaqItem[] | null;
  proofHeader?: SectionHeader | null;
  proofSticker?: string | null;
  proofBody?: string | null;
  ctaHeadline?: Headline | null;
  ctaBody?: RichText | null;
  ctaButton?: Link | null;
  seo?: Seo | null;
};

export type NewsletterPage = {
  hero?: PageHero | null;
  formTitle?: string | null;
  formButtonLabel?: string | null;
  formDisclaimer?: string | null;
  formSuccessSticker?: string | null;
  formSuccessText?: string | null;
  whyHeader?: SectionHeader | null;
  whyReasons?: TitledCard[] | null;
  insideHeader?: SectionHeader | null;
  insideItems?: TitledCard[] | null;
  afterHoursHeader?: SectionHeader | null;
  afterHoursBody?: RichText | null;
  ctaEyebrow?: string | null;
  ctaHeadline?: Headline | null;
  ctaBody?: RichText | null;
  ctaButton?: Link | null;
  ctaSecondaryLabel?: string | null;
  seo?: Seo | null;
};

// --- Collections ----------------------------------------------------------

export type Category = {
  _id: string;
  title: string;
  slug: string;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  dek: string;
  publishedAt: string;
  readTime: number;
  heroImage?: SanityImage | null;
  category?: Category | null;
};

export type Post = PostSummary & {
  body?: RichText | null;
  author?: Person | null;
  seo?: Seo | null;
  related?: PostSummary[] | null;
};

export type BlogIndexPage = {
  hero?: PageHero | null;
  topReadsHeader?: SectionHeader | null;
  archiveHeader?: SectionHeader | null;
  newsletterHeadline?: Headline | null;
  newsletterBody?: RichText | null;
  newsletterCta?: Link | null;
  ctaHeadline?: Headline | null;
  ctaBody?: RichText | null;
  ctaButtons?: Cta | null;
  seo?: Seo | null;
  topReads: PostSummary[];
  posts: PostSummary[];
  categories: Category[];
};

export type ServicePage = {
  _id: string;
  category: string;
  slug: string;
  heroHeadline?: Headline | null;
  heroSub: string;
  problemHeadline: string;
  problemBody?: RichText | null;
  offerings: TitledCard[];
  differently?: string[] | null;
  testimonial?: string | null;
  faq?: FaqItem[] | null;
  quoteHeadline: string;
  serviceScope?: string | null;
  serviceCheckboxes?: string[] | null;
  talkHeadline?: string | null;
  talkBody?: string | null;
  seo?: Seo | null;
};

// --- Legal ----------------------------------------------------------------

export type LegalBlock =
  | { _type: "legalParagraph"; _key: string; text: string }
  | { _type: "legalClause"; _key: string; number: string; heading: string; text: string }
  | { _type: "legalSubheading"; _key: string; number: string; heading: string }
  | { _type: "legalDefinition"; _key: string; term: string; text: string }
  | { _type: "legalList"; _key: string; items: string[] }
  | { _type: "legalNote"; _key: string; text: string }
  | {
      _type: "legalContact";
      _key: string;
      name: string;
      city?: string | null;
      email: string;
    };

export type LegalSection = {
  _key: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  _id: string;
  title: string;
  slug: string;
  label?: string | null;
  eyebrow?: string | null;
  entity?: string | null;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
  seo?: Seo | null;
};
