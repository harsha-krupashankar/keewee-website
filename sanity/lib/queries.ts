import { defineQuery } from "next-sanity";

/**
 * Every GROQ query in the app.
 *
 * `defineQuery` is a no-op tag at runtime — it exists so `sanity typegen` can
 * find these strings and generate result types. Keep queries here rather than
 * inline in pages so typegen only has one place to scan.
 */

// --- Fragments ------------------------------------------------------------

const LINK = /* groq */ `{ label, href, openInNewTab }`;
const CTA = /* groq */ `{ primary ${LINK}, secondary ${LINK} }`;

/**
 * Pulls LQIP and intrinsic dimensions alongside the image so `next/image` can
 * reserve space and blur up without a second round trip.
 */
const IMAGE = /* groq */ `{
  ...,
  "lqip": asset->metadata.lqip,
  "dimensions": asset->metadata.dimensions
}`;

const SEO = /* groq */ `{ title, description, noIndex, image ${IMAGE} }`;
const SECTION_HEADER = /* groq */ `{ eyebrow, headline, sticker, intro }`;
const HERO = /* groq */ `{ badge, headline, intro, cta ${LINK}, sticker }`;
const CARD = /* groq */ `{ title, description, tag }`;
const FAQ_ITEM = /* groq */ `{ question, answer }`;

const CATEGORY = /* groq */ `{ _id, title, "slug": slug.current }`;

const PERSON = /* groq */ `{
  _id,
  name,
  role,
  initials,
  photo ${IMAGE},
  bio,
  funFact
}`;

/**
 * Read time falls back to a 220 words-per-minute estimate over the body text
 * when an editor has not set one, so cards never render "undefined min read".
 */
const POST_SUMMARY = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  dek,
  publishedAt,
  "readTime": coalesce(
    readTime,
    math::max([1, round(length(pt::text(body)) / 5 / 220)])
  ),
  heroImage ${IMAGE},
  category-> ${CATEGORY}
}`;

// --- Global ---------------------------------------------------------------

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    title,
    logoMark,
    tagline,
    contactEmail,
    marqueeText,
    cookieConsent {
      enabled,
      title,
      message,
      acceptLabel,
      declineLabel,
      policyLink ${LINK}
    },
    headerNav[] {
      _type,
      _type == "link" => ${LINK},
      _type == "navGroup" => { label, links[] ${LINK} }
    },
    headerCta ${LINK},
    footerGroups[] {
      title,
      links[] ${LINK},
      cta ${LINK}
    },
    footerNote,
    socialLinks[] { platform, href },
    defaultSeo ${SEO}
  }
`);

// --- Home -----------------------------------------------------------------

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homePage"][0]{
    heroBadge,
    heroHeadline,
    heroIntro,
    heroCta ${CTA},
    heroFootnote,
    heroStickerA,
    heroStickerB,

    problemHeader ${SECTION_HEADER},
    problemBody,
    lookalikes,
    problemSticker,
    problemCaption,

    funnelHeader ${SECTION_HEADER},
    funnelStages[] {
      title,
      tag,
      description,
      bullets,
      barWidth,
      "href": servicePage->slug.current
    },
    funnelOutcomeSticker,
    funnelOutcomeText,

    whyHeader ${SECTION_HEADER},
    whyReasons[] ${CARD},

    whoHeader ${SECTION_HEADER},
    whoSegments[] ${CARD},

    proofHeader ${SECTION_HEADER},
    proofBody,
    proofCta ${LINK},
    proofSticker,

    auditHeader ${SECTION_HEADER},
    auditBody,
    auditCta ${LINK},
    auditSticker,
    auditListTitle,
    auditItems,

    faqHeader ${SECTION_HEADER},
    faqItems[] ${FAQ_ITEM},

    ctaHeadline,
    ctaBody,
    ctaButtons ${CTA},

    seo ${SEO}
  }
`);

// --- About ----------------------------------------------------------------

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutPage"][0]{
    hero ${HERO},
    whatWeAreEyebrow,
    whatWeAreBody,
    missionEyebrow,
    missionStatement,
    storyEyebrow,
    storyHeadline,
    storyBeats,
    teamEyebrow,
    teamHeadline,
    teamSticker,
    teamIntro,
    ctaEyebrow,
    ctaHeadline,
    ctaBody,
    ctaButtons ${CTA},
    seo ${SEO},
    "team": *[_type == "person" && onTeamPage == true] | order(order asc, name asc) ${PERSON}
  }
`);

// --- FAQ ------------------------------------------------------------------

export const FAQ_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "faqPage"][0]{
    hero ${HERO},
    ctaHeadline,
    ctaBody,
    ctaButtons ${CTA},
    seo ${SEO},
    "groups": *[_type == "faqGroup"] | order(order asc, title asc) {
      _id,
      title,
      navLabel,
      "slug": slug.current,
      items[] ${FAQ_ITEM}
    }
  }
`);

// --- Free audit -----------------------------------------------------------

export const FREE_AUDIT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "freeAuditPage"][0]{
    hero ${HERO},
    navCtaLabel,
    coverHeader ${SECTION_HEADER},
    coverCards[] ${CARD},
    forYouHeader ${SECTION_HEADER},
    forYouPointers,
    deliverablesHeader ${SECTION_HEADER},
    deliverables[] ${CARD},
    formEyebrow,
    formHeadline,
    formIntro,
    formSuccessSticker,
    formSuccessText,
    faqHeader ${SECTION_HEADER},
    faqItems[] ${FAQ_ITEM},
    proofHeader ${SECTION_HEADER},
    proofSticker,
    proofBody,
    ctaHeadline,
    ctaBody,
    ctaButton ${LINK},
    seo ${SEO}
  }
`);

// --- Newsletter -----------------------------------------------------------

export const NEWSLETTER_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "newsletterPage"][0]{
    hero ${HERO},
    formTitle,
    formButtonLabel,
    formDisclaimer,
    formSuccessSticker,
    formSuccessText,
    whyHeader ${SECTION_HEADER},
    whyReasons[] ${CARD},
    insideHeader ${SECTION_HEADER},
    insideItems[] ${CARD},
    afterHoursHeader ${SECTION_HEADER},
    afterHoursBody,
    ctaEyebrow,
    ctaHeadline,
    ctaBody,
    ctaButton ${LINK},
    ctaSecondaryLabel,
    seo ${SEO}
  }
`);

// --- Services index -------------------------------------------------------

export const SERVICES_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "servicesPage"][0]{
    hero ${HERO},
    heroSecondaryCta ${LINK},
    categories[] {
      name,
      headline,
      intro,
      layout,
      featureSticker,
      items[] ${CARD}
    },
    auditHeadline,
    auditBody,
    auditButton ${LINK},
    quoteEyebrow,
    quoteHeadline,
    quoteIntro,
    quoteGoalsLabel,
    quoteGoals,
    quoteServicesLabel,
    quoteServiceGroups[] { title, options },
    quoteMessagePlaceholder,
    quoteButtonLabel,
    quoteNote,
    quoteSuccessSticker,
    quoteSuccessText,
    seo ${SEO}
  }
`);

// --- Prompt library ---------------------------------------------------------

export const PROMPT_LIBRARY_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "promptLibraryPage"][0]{
    heroBadge,
    heroStickerA,
    heroStickerB,
    heroHeadline,
    heroIntro,
    heroCta ${LINK},
    heroBadges,

    whyLabel,
    whyHeadline,
    whyBody,

    aiLabel,
    aiHeadline,
    aiIntro,
    aiPlatforms[] ${CARD},

    warningHeadline,
    warningBody,

    categories[] {
      name,
      tagline,
      prompts[] {
        title,
        bestTool,
        useCase,
        promptText,
        tip
      }
    },

    ctaLabel,
    ctaHeadline,
    ctaBody,
    ctaButton ${LINK},

    seo ${SEO}
  }
`);

// --- Blog -----------------------------------------------------------------

export const BLOG_INDEX_QUERY = defineQuery(/* groq */ `
  *[_type == "blogIndexPage"][0]{
    hero ${HERO},
    topReadsHeader ${SECTION_HEADER},
    archiveHeader ${SECTION_HEADER},
    newsletterHeadline,
    newsletterBody,
    newsletterCta ${LINK},
    ctaHeadline,
    ctaBody,
    ctaButtons ${CTA},
    seo ${SEO},
    "topReads": *[_type == "post" && featured == true && defined(slug.current)]
      | order(publishedAt desc)[0...3] ${POST_SUMMARY},
    "posts": *[_type == "post" && defined(slug.current)]
      | order(publishedAt desc) ${POST_SUMMARY},
    "categories": *[_type == "category"] | order(order asc, title asc) ${CATEGORY}
  }
`);

export const POST_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }
`);

/**
 * `related` falls back to the newest posts in the same category when an editor
 * has not curated any, so the bottom of a post is never empty.
 */
export const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    dek,
    publishedAt,
    "readTime": coalesce(
      readTime,
      math::max([1, round(length(pt::text(body)) / 5 / 220)])
    ),
    heroImage ${IMAGE},
    category-> ${CATEGORY},
    author-> ${PERSON},
    body[]{
      ...,
      _type == "figure" => { ..., "lqip": asset->metadata.lqip, "dimensions": asset->metadata.dimensions }
    },
    seo ${SEO},
    "related": select(
      count(related) > 0 => related[]-> ${POST_SUMMARY},
      *[_type == "post" && slug.current != $slug && category._ref == ^.category._ref]
        | order(publishedAt desc)[0...3] ${POST_SUMMARY}
    )
  }
`);

// --- Service pages --------------------------------------------------------

export const SERVICE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "servicePage" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }
`);

export const SERVICE_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "servicePage" && slug.current == $slug][0]{
    _id,
    category,
    "slug": slug.current,
    heroHeadline,
    heroSub,
    problemHeadline,
    problemBody,
    offerings[] ${CARD},
    differently,
    testimonial,
    faq[] ${FAQ_ITEM},
    quoteHeadline,
    serviceScope,
    serviceCheckboxes,
    talkHeadline,
    talkBody,
    seo ${SEO}
  }
`);

// --- Legal ----------------------------------------------------------------

export const LEGAL_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "legalDoc" && defined(slug.current)] | order(order asc){ "slug": slug.current, "updatedAt": _updatedAt }
`);

export const LEGAL_DOCS_QUERY = defineQuery(/* groq */ `
  *[_type == "legalDoc" && defined(slug.current)] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    label,
    intro,
    updatedAt
  }
`);

export const LEGAL_DOC_QUERY = defineQuery(/* groq */ `
  *[_type == "legalDoc" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    label,
    eyebrow,
    entity,
    updatedAt,
    intro,
    sections[]{
      _key,
      title,
      blocks[]{ ... }
    },
    seo ${SEO}
  }
`);
