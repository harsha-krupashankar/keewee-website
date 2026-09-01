/**
 * One-time migration: lifts the pre-CMS hardcoded copy into Sanity.
 *
 *   npm run seed
 *
 * Every document gets a deterministic `_id`, and everything is written with
 * `createOrReplace` inside a single transaction. That makes the script
 * idempotent — re-running it restores the seeded content exactly, which is what
 * you want while iterating on the schema, and destructive once real editing has
 * started. Pass `--dry` to print what would be written instead.
 *
 * Source of truth for the copy is `scripts/legacy/`, recovered verbatim from the
 * commit before this migration. Delete both once the seed has run everywhere.
 */
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

import { headline, richText, type Block } from "./portable-text";

import {
  aboutStory,
  aboutTeam,
  callItems,
  faqs,
  funnel,
  lookalikes,
  marqueeText,
  reasons,
  segments,
} from "./legacy/data";
import { blogSummaries } from "./legacy/blog-data";
import { faqCategories } from "./legacy/faq-data";
import {
  coverCards,
  deliverables,
  forYouPointers,
  freeAuditFaqs,
} from "./legacy/free-audit-data";
import { legalDocs } from "./legacy/legal-data";
import { whatYouGet, whySubscribe } from "./legacy/newsletter-data";
import { serviceDocs } from "./legacy/service-data";
import { linksButtons } from "./links-page-data";
import { promptCategories } from "./prompt-library-data";
import {
  quoteGoals,
  quoteServiceGroups,
  servicesCategories,
} from "./services-page-data";

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry");

/**
 * `--only <type>` narrows the write to one document type. Re-running the whole
 * seed restores every page to its migrated state, which destroys real editing;
 * this is how you land a newly added page without touching the rest.
 */
const onlyIndex = process.argv.indexOf("--only");
const only = onlyIndex === -1 ? null : process.argv[onlyIndex + 1];
if (onlyIndex !== -1 && !only) throw new Error("--only needs a document type");

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token && !dryRun) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage."
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-07-27",
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CONTACT = "team@keewee.in";
const mailto = (subject?: string) =>
  subject ? `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}` : `mailto:${CONTACT}`;

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

/** Adds the `_key` every Sanity array member needs. */
function keyed<T extends object>(items: T[]): (T & { _key: string })[] {
  return items.map((item) => ({ ...item, _key: key() }));
}

function link(label: string, href: string) {
  return { _type: "link", label, href };
}

function card(title: string, description: string, tag?: string) {
  return { _type: "titledCard", title, description, ...(tag ? { tag } : {}) };
}

function faqItem(question: string, answer: string) {
  return { _type: "faqItem", question, answer: richText(answer) };
}

function slugOf(current: string) {
  return { _type: "slug", current };
}

function sectionHeader(opts: {
  eyebrow?: string;
  headline?: Block[];
  sticker?: string;
  intro?: Block[];
}) {
  return { _type: "sectionHeader", ...opts };
}

/**
 * The old blog data stored dates as "Jul 2026". Anchor them to the first of the
 * month at midday UTC so no timezone can push them into the previous month.
 */
function monthToIso(value: string): string {
  const parsed = new Date(`${value.replace(/^(\w{3})\s/, "$1 1, ")} 12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

function minutesFrom(readTime: string): number | undefined {
  const n = Number.parseInt(readTime, 10);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Never use a dot as the separator here. Sanity reads a dot in a document ID as
 * a path separator, and path-prefixed documents are hidden from unauthenticated
 * reads even in a `public` dataset — the same mechanism that keeps `drafts.*`
 * private. The website fetches the published perspective without a token, so a
 * dotted ID makes the document invisible everywhere except the Studio.
 * See `scripts/fix-dotted-ids.ts`.
 */
function idFor(prefix: string, value: string) {
  return `${prefix}-${value}`;
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

const docs: Record<string, unknown>[] = [];

// --- People ----------------------------------------------------------------

const peopleIds = aboutTeam.map((member) =>
  idFor("person", member.name.toLowerCase().replace(/\s+/g, "-"))
);

aboutTeam.forEach((member, i) => {
  docs.push({
    _id: peopleIds[i],
    _type: "person",
    name: member.name,
    slug: slugOf(member.name.toLowerCase().replace(/\s+/g, "-")),
    role: member.role,
    initials: member.initials,
    bio: member.bio,
    funFact: { label: member.factLabel, text: member.fact },
    onTeamPage: true,
    order: i,
  });
});

// --- Service pages ---------------------------------------------------------

const serviceIds: Record<string, string> = {};

serviceDocs.forEach((doc, i) => {
  const id = idFor("service", doc.id);
  serviceIds[doc.id] = id;

  docs.push({
    _id: id,
    _type: "servicePage",
    category: doc.category,
    slug: slugOf(doc.slug),
    order: i + 1,
    // The old heroA/heroHi/heroB triplet becomes one headline with the
    // highlighted run marked in place.
    heroHeadline: headline(doc.heroA, [doc.heroHi, "highlight"], doc.heroB),
    heroSub: doc.heroSub,
    problemHeadline: doc.problemHeadline,
    problemBody: richText(...doc.problemBody),
    offerings: keyed(doc.services.map((s) => card(s.title, s.desc))),
    differently: doc.differently,
    testimonial: doc.testimonial,
    faq: keyed(doc.faq.map((f) => faqItem(f.q, f.a))),
    quoteHeadline: doc.quoteHeadline,
    serviceScope: doc.serviceScope,
    serviceCheckboxes: doc.serviceCheckboxes,
    talkHeadline: doc.talkHeadline,
    talkBody: doc.talkBody,
  });
});

// --- Site settings ---------------------------------------------------------

docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  title: "keewee.in",
  tagline: "B2B marketing with a spine.",
  contactEmail: CONTACT,
  marqueeText,
  cookieConsent: {
    _type: "cookieConsent",
    // Off until non-essential tracking is added; the site sets only essential
    // cookies today, so there is nothing to consent to yet.
    enabled: false,
    title: "We use cookies",
    message:
      "Essential cookies keep the site working and are always on. We'd also like to set analytics cookies to understand how the site is used — only with your consent.",
    acceptLabel: "Accept",
    declineLabel: "Decline",
    policyLink: {
      ...link("Cookie policy", "/legal/privacy-policy"),
      openInNewTab: false,
    },
  },
  headerNav: keyed([
    link("Blog", "/blog"),
    link("About", "/about"),
    link("FAQs", "/faq"),
    link("Newsletter", "/newsletter"),
  ]),
  headerCta: link("Talk to us", mailto()),
  footerGroups: keyed([
    {
      _type: "footerGroup",
      title: "What we offer",
      links: keyed(serviceDocs.map((doc) => link(doc.category, `/services/${doc.slug}`))),
    },
    {
      _type: "footerGroup",
      title: "Company",
      links: keyed([
        link("About", "/about"),
        link("Blog", "/blog"),
        link("FAQs", "/faq"),
        link("Free Audit", "/free-audit"),
        link("Privacy Policy", "/legal/privacy-policy"),
        link("Terms of Service", "/legal/terms-of-service"),
      ]),
    },
  ]),
  footerNote: "© 2026 Keewee Marketing Pvt Ltd.",
  defaultSeo: {
    _type: "seo",
    title: "keewee.in — B2B marketing with a spine.",
    description:
      "Most B2B marketing is AI-generated mush in a slide template. We're the agency that fixes it — sharp positioning and a full-funnel system that moves pipeline.",
  },
});

// --- Home page -------------------------------------------------------------

docs.push({
  _id: "homePage",
  _type: "homePage",
  heroBadge: "Meanwhile, in most B2B companies…",
  heroHeadline: headline(
    "B2B marketing with a ",
    ["spine.", "highlight"],
    ["*", "green"]
  ),
  heroIntro: richText([
    "Most B2B marketing is AI-generated mush in a slide template. ",
    ["We're the agency that fixes it", "strong"],
    " — sharp positioning and a full-funnel system that moves pipeline.",
  ]),
  heroCta: {
    _type: "cta",
    primary: link("Talk to us", mailto()),
    secondary: link("Explore services", "#full-funnel"),
  },
  heroFootnote: "*spine (n.) — a point of view",
  heroStickerA: "NO MUSH!",
  heroStickerB: "SAME • SAME • SAME",

  problemHeader: sectionHeader({
    eyebrow: "The problem",
    headline: headline("Your marketing looks like everyone else's. ", [
      "And it's hurting your brand.",
      "rust",
    ]),
  }),
  problemBody: richText(
    [
      "Every B2B company today has the same AI tools, the same playbooks, the same homepage structure. The hero banner says something like ",
      ["“the intelligent platform for modern teams.”", "em"],
    ],
    [
      "The problem isn't execution. It's that nobody knows what to actually say, who to say it to, and why anyone should care. ",
      [
        "That's the part that gets skipped — and that's where we start.",
        "highlight",
      ],
    ]
  ),
  lookalikes,
  problemSticker: "SAME • SAME • SAME",
  problemCaption: "every B2B homepage, same as the last",

  funnelHeader: sectionHeader({
    eyebrow: "What we do",
    headline: headline(
      "Full-funnel marketing. We run the whole show ",
      ["with", "highlight"],
      " you."
    ),
    intro: richText([
      "We don't do marketing ",
      ["for", "em"],
      " you. We do it ",
      ["with", "strong"],
      " you.",
    ]),
  }),
  funnelStages: keyed(
    funnel.map((stage, i) => ({
      _type: "funnelStage",
      title: stage.title,
      tag: stage.tag,
      description: stage.long,
      bullets: stage.bullets,
      barWidth: Number.parseFloat(stage.barWidth),
      servicePage: {
        _type: "reference",
        _ref: serviceIds[serviceDocs[i]?.id ?? ""],
      },
    }))
  ),
  funnelOutcomeSticker: "Real pipeline.",
  funnelOutcomeText:
    "Every stage feeds the same goal — qualified pipeline that actually moves.",
  funnelOutcomeCta: link("Explore all services →", "/services"),

  whyHeader: sectionHeader({
    eyebrow: "The difference",
    headline: headline("Why Keewee?"),
    sticker: "Why not just hire someone bigger?",
    intro: richText(
      "Not to brag — we're not another hollow marketing agency. We hate false promises. Here's why you can trust us:"
    ),
  }),
  whyReasons: keyed(reasons.map((r) => card(r.title, r.desc))),

  whoHeader: sectionHeader({
    eyebrow: "Who we work with",
    headline: headline("We work with B2B SaaS that has a real product ", [
      "and is serious about growth.",
      "green",
    ]),
    intro: richText(
      "Founder still running marketing, VP at Series A, or growth lead on a PLG product — you care about numbers, not just deliverables. So do we."
    ),
  }),
  whoSegments: keyed(segments.map((s) => card(s.title, s.desc, s.tag))),

  proofHeader: sectionHeader({
    eyebrow: "Proof & case studies",
    headline: headline("We could fake the case studies. ", [
      "We won't.",
      "green",
    ]),
  }),
  proofBody: richText([
    "The real ones drop Q4 2026 — we're in our first engagements right now. Until then we'll prove it live: book a free audit and we'll walk your funnel on the call, showing exactly what we'd change. ",
    ["No deck. No borrowed metrics.", "strong"],
  ]),
  proofCta: link("See what we'd fix →", mailto()),
  proofSticker: "SOON!",

  auditHeader: sectionHeader({
    eyebrow: "Free for qualifying B2B SaaS",
    headline: headline("30 minutes. We'll tell you exactly what's broken."),
  }),
  auditBody: richText(
    "Your messaging, website, content and funnel — pulled apart and handed back as specific, prioritized fixes you can act on. Whether you hire us or not."
  ),
  auditCta: link("Book the free audit", mailto()),
  auditSticker: "ONLY 5 / MONTH",
  auditListTitle: "On the call you get",
  auditItems: callItems,

  faqHeader: sectionHeader({
    eyebrow: "FAQ",
    headline: headline("Got questions?"),
    sticker: "We have the answers.",
  }),
  faqItems: keyed(faqs.map((f) => faqItem(f.q, f.a))),

  ctaHeadline: headline(
    "Most B2B budgets are being ",
    ["wasted", "rust"],
    " right now."
  ),
  ctaBody: richText(
    "Let's find out if yours is one of them. Free 30-minute audit — we look at your positioning, funnel and content, and tell you exactly what's broken."
  ),
  ctaButtons: {
    _type: "cta",
    primary: link("Book your free audit", mailto()),
    secondary: link("See what we do", "#full-funnel"),
  },
});

// --- About page ------------------------------------------------------------

docs.push({
  _id: "aboutPage",
  _type: "aboutPage",
  hero: {
    _type: "pageHero",
    badge: "About us",
    headline: headline("Three friends. One phone call. ", [
      "One very deliberate decision.",
      "highlight",
    ]),
    intro: richText(
      "We got on a call to catch up. We stayed on it because we'd all noticed the same thing: B2B marketing was full of people executing and short on people with an actual opinion."
    ),
    sticker: "NO MUSH!",
  },
  whatWeAreEyebrow: "// What we are",
  whatWeAreBody: richText(
    "Keewee is a B2B marketing agency for SaaS companies that are tired of sounding like every other SaaS company. Positioning, content, demand gen, conversion, the whole funnel — run by people who've actually sat inside marketing teams and gotten annoyed at the same things you have.",
    [
      "Every B2B company in 2026 has access to the same AI tools, the same templates, the same “10 frameworks” carousels. What most of them don't have is an opinion. That's the actual gap. Not another content calendar — ",
      [
        "a point of view about what to say, who to say it to, and why anyone should care.",
        "highlight",
      ],
    ]
  ),
  missionEyebrow: "// our mission, if we have to call it that",
  missionStatement:
    "Make B2B marketing that doesn't read like it was written by a company trying very hard not to offend anyone. Fewer decks. More receipts. If a campaign works, we tell you why. If it doesn't, we tell you that too — before you find out from your pipeline.",
  storyEyebrow: "// The founding story",
  storyHeadline: headline(
    "How three friends turned a catch-up call into a business."
  ),
  storyBeats: aboutStory,
  teamEyebrow: "// The team",
  teamHeadline: "The founder trio!",
  teamSticker: "Say hi.",
  ctaEyebrow: "Talk to the team",
  ctaHeadline: headline(
    "Want to talk to the actual people who'll do the work?"
  ),
  ctaBody: richText(
    "No sales rep standing between you and us. Book a free 30-minute audit and you'll get on a call with one of the three of us, not someone reading from a script. If you're not ready for that yet, just say hi — we read every email ourselves too."
  ),
  ctaButtons: {
    _type: "cta",
    primary: link("Book your free audit", mailto("Free audit")),
    secondary: link("Say hi instead", mailto("Hi")),
  },
  seo: {
    _type: "seo",
    title: "About — keewee.in",
    description:
      "Three friends, one phone call, one very deliberate decision. Meet the founder trio behind Keewee and why we started a B2B marketing agency with an actual opinion.",
  },
});

// --- FAQ page + groups -----------------------------------------------------

faqCategories.forEach((group, i) => {
  const slug = group.navLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  docs.push({
    _id: idFor("faqGroup", group.id),
    _type: "faqGroup",
    title: group.title,
    navLabel: group.navLabel,
    slug: slugOf(slug),
    order: i,
    items: keyed(group.items.map((item) => faqItem(item.q, item.a))),
  });
});

docs.push({
  _id: "faqPage",
  _type: "faqPage",
  hero: {
    _type: "pageHero",
    badge: "Frequently Asked Questions",
    headline: headline("Got questions about ", ["Keewee?", "highlight"]),
    intro: richText(
      "We've answered the ones that actually matter. Still not sure? We're one conversation away."
    ),
    cta: link("Get on a call with us", mailto("Let's talk")),
  },
  ctaHeadline: headline(
    "Still have questions? That's great because it means you're thinking seriously about this."
  ),
  ctaBody: richText(
    "Book a free 30-minute audit call. We'll look at your current setup, tell you what's broken, and recommend exactly what makes sense for your stage and budget. No pitch, no deck, just a straight conversation."
  ),
  ctaButtons: {
    _type: "cta",
    primary: link("Book your free audit", mailto("Free audit")),
  },
  seo: {
    _type: "seo",
    title: "FAQ — keewee.in",
    description:
      "We've answered the questions that actually matter about pricing, how we work, our services, who we work with, and privacy. Still not sure? We're one conversation away.",
  },
});

// --- Free audit page -------------------------------------------------------

docs.push({
  _id: "freeAuditPage",
  _type: "freeAuditPage",
  hero: {
    _type: "pageHero",
    badge: "Free audit call",
    headline: headline(
      "Find out exactly what's ",
      ["broken", "highlight"],
      " in your marketing in just 30 minutes."
    ),
    intro: richText(
      "We go through your positioning, your funnel, and your content. You walk away knowing what to fix, what to cut, and what to double down on."
    ),
    cta: link("Book your free audit", mailto("Free audit call")),
  },
  navCtaLabel: "Book your free audit",
  coverHeader: sectionHeader({
    eyebrow: "// What happens on the call",
    headline: headline("What we cover."),
    intro: richText(
      "Before the call, we look at your website, and whatever else is publicly available. We come prepared so the 30 minutes are spent on insights, not introductions."
    ),
  }),
  coverCards: keyed(coverCards.map((c) => card(c.title, c.desc))),
  forYouHeader: sectionHeader({
    eyebrow: "// Is this for you?",
    headline: headline(
      "This call is worth your time if any of these sound familiar."
    ),
  }),
  forYouPointers,
  deliverablesHeader: sectionHeader({
    eyebrow: "// What you walk away with",
    headline: headline("Definitely not a stupid sales pitch!"),
  }),
  deliverables: keyed(deliverables.map((d) => card(d.title, d.desc))),
  faqHeader: sectionHeader({
    eyebrow: "// Since you're wondering",
    headline: headline("Questions we already know you have."),
  }),
  faqItems: keyed(freeAuditFaqs.map((f) => faqItem(f.q, f.a))),
  proofHeader: sectionHeader({
    eyebrow: "// What people say",
    headline: headline("Don't take our word for it."),
  }),
  proofSticker: "Proof, coming soon",
  proofBody:
    "We're currently working with our first cohort of clients. This section will have real words from real people soon.",
  ctaHeadline: headline(
    "Thirty minutes from now, you could know exactly what's holding your marketing back."
  ),
  ctaBody: richText(
    "Book the call. We've done the prep before you even show up. All you need to do is pick a time."
  ),
  ctaButton: link("Book your free audit", mailto("Free audit call")),
  seo: {
    _type: "seo",
    title: "Free 30-Minute Marketing Audit — keewee.in",
    description:
      "We go through your positioning, your funnel, and your content. You walk away knowing what to fix, what to cut, and what to double down on.",
  },
});

// --- Newsletter page -------------------------------------------------------

docs.push({
  _id: "newsletterPage",
  _type: "newsletterPage",
  hero: {
    _type: "pageHero",
    badge: "Newsletter",
    headline: headline(
      "Subscribe to Keewee Club, marketing tips for B2B SaaS, every ",
      ["Thursday", "highlight"],
      "."
    ),
    intro: richText(
      "One tactic we used this quarter, what's happening in B2B SaaS this week, and one thing worth stealing before your competitors find it. Five minutes, once a week."
    ),
  },
  formTitle: "Get the next issue",
  formButtonLabel: "Subscribe now",
  formDisclaimer: "Free. One email a week. Leave whenever you want.",
  formSuccessSticker: "You're in!",
  formSuccessText: "First issue lands this Thursday. Check your inbox.",
  whyHeader: sectionHeader({
    eyebrow: "// Why subscribe",
    headline: headline("Why people stick around."),
  }),
  whyReasons: keyed(whySubscribe.map((w) => card(w.title, w.desc))),
  insideHeader: sectionHeader({
    eyebrow: "// What you'll get",
    headline: headline("What's inside every issue."),
  }),
  insideItems: keyed(whatYouGet.map((w) => card(w.title, w.desc))),
  afterHoursHeader: sectionHeader({
    eyebrow: "// Subscriber exclusive",
    headline: headline("Keewee After Hours."),
  }),
  afterHoursBody: richText(
    "A few times a year, we send something that never touches the regular Thursday schedule. Keewee After Hours carries the conversations we usually keep off the record. What a founder told us right after a board meeting. Why a launch actually failed. Numbers a competitor would rather you not see.",
    "It goes out once, only to subscribers, and it's never archived anywhere public. Unsubscribe before one lands and you won't see it again."
  ),
  ctaEyebrow: "// Free for B2B SaaS companies",
  ctaHeadline: headline(
    "30 minutes. We'll show you exactly what's broken and how to fix it."
  ),
  ctaBody: richText(
    "Book a free positioning and funnel audit with one of Keewee's founders. We go through your messaging, your website, your content, and your funnel in 30 minutes and come back with specific, prioritized recommendations you can act on whether you work with us or not. Don't worry about the follow-up harassment. If we're a fit, it'll be obvious. If we're not, you still leave with a real diagnosis."
  ),
  ctaButton: link("Book the free audit", mailto("Free audit call")),
  ctaSecondaryLabel: "Not ready for a call? Subscribe to Keewee Club instead.",
  seo: {
    _type: "seo",
    title: "Keewee Club — the B2B SaaS marketing newsletter — keewee.in",
    description:
      "One tactic we used this quarter, what's happening in B2B SaaS this week, and one thing worth stealing before your competitors find it. Five minutes, every Thursday.",
  },
});

// --- Services index page ---------------------------------------------------

/**
 * The five bands differ in shape, so `layout` travels with the copy. Everything
 * else on the page — the `01 /` prefixes, the `#kw-cat1` anchors — is derived
 * from array position at render time.
 */
const categoryHeadlines: Block[][] = [
  headline("Get found. Get known. Get ", ["remembered.", "highlight"]),
  headline("Turn attention into ", ["pipeline.", "highlight"]),
  headline("Stop losing ", ["buyers", "highlight"], " after they click."),
  headline("Keep what you ", ["worked hard", "lime"], " to get."),
  headline(
    "Know what's working. Build the system that ",
    ["keeps it working.", "highlight"]
  ),
];

docs.push({
  _id: "servicesPage",
  _type: "servicesPage",
  hero: {
    _type: "pageHero",
    badge: "Services",
    headline: headline(
      "Most agencies own one channel. We own your ",
      ["entire pipeline.", "highlight"]
    ),
    intro: richText(
      "Full-funnel B2B SaaS marketing across every stage — from making your positioning sharp to filling your pipeline to converting the traffic you're already paying for."
    ),
    cta: link("Book a free audit call", "#kw-audit"),
  },
  heroSecondaryCta: link("Get a custom quote →", "#kw-quote"),
  categories: keyed(
    servicesCategories.map((category, i) => ({
      _type: "serviceCategory",
      name: category.name,
      headline: categoryHeadlines[i],
      intro: richText(category.intro),
      layout: category.layout,
      ...(category.featureSticker ? { featureSticker: category.featureSticker } : {}),
      items: keyed(category.items.map((item) => card(item.title, item.desc))),
    }))
  ),
  auditHeadline: headline(
    "Not sure which services you need? ",
    ["That's what the audit call is for.", "lime"]
  ),
  auditBody: richText(
    "Most companies come to us knowing something is broken but not exactly what. Book a free 30-minute audit call and we'll tell you where the gaps are and which services make sense for your stage and budget. No pressure, no pitch deck."
  ),
  auditButton: link("Book a free audit call", mailto()),
  quoteEyebrow: "Get a custom quote",
  quoteHeadline: headline(
    "Tell us what you're working with. We'll come back with a plan."
  ),
  quoteIntro: richText(
    "Fill this in and we'll send a custom scope and pricing within 48 hours."
  ),
  quoteGoalsLabel: "What's your primary marketing goal right now?",
  quoteGoals,
  quoteServicesLabel: "Which services are you interested in?",
  quoteServiceGroups: keyed(
    quoteServiceGroups.map((group) => ({
      _type: "checkboxGroup",
      title: group.title,
      options: group.options,
    }))
  ),
  quoteMessagePlaceholder:
    "Tell us about your current setup, what's broken, what you've tried before, or anything that helps us understand your situation better. The more context you give, the more useful our response will be.",
  quoteButtonLabel: "Send my details",
  quoteNote:
    "We respond within 48 hours. No automated reply, no generic brochure. A real person reads every submission before responding.",
  quoteSuccessSticker: "Got it — thank you!",
  quoteSuccessText:
    "We respond within 48 hours. No automated reply, no generic brochure. A real person reads every submission before responding.",
  seo: {
    _type: "seo",
    title: "B2B SaaS Marketing Services — keewee.in",
    description:
      "Full-funnel B2B SaaS marketing across every stage — from making your positioning sharp to filling your pipeline to converting the traffic you're already paying for.",
  },
});

// --- Prompt library page ----------------------------------------------------

docs.push({
  _id: "promptLibraryPage",
  _type: "promptLibraryPage",
  heroBadge: "Resources / Prompt Library",
  heroStickerA: "30+ PROMPTS!",
  heroStickerB: "GENERIC OUTPUT",
  heroHeadline: headline(
    "The prompt library that gets you a first draft worth ",
    ["keeping.", "highlight"]
  ),
  heroIntro: richText(
    "\"Write me a LinkedIn post\" gets you something that reads like every other LinkedIn post. These are the prompts we actually use, for every stage of B2B marketing, built to produce output you can edit and ship."
  ),
  heroCta: link("Jump to a category ↓", "#kw-categories"),
  heroBadges: ["30+ prompts", "9 categories", "Free, no email wall"],

  whyLabel: "// Why this exists",
  whyHeadline: "Why most AI marketing output sounds the same.",
  whyBody: richText(
    "It's not the model. It's the prompt. \"Write a blog post about X\" gives the model zero context, so it writes the most average version of that blog post it can assemble. Give it your ICP, your voice, your competitors, and one example of what good looks like. The output changes.",
    "Every prompt below follows the same structure: role, context, constraints, and a format that forces a specific answer instead of a vague one. We wrote these running campaigns for ourselves and our clients. Copy the one you need, fill in the brackets, and go."
  ),

  aiLabel: "// Which AI to use where",
  aiHeadline: "Which AI to use where.",
  aiIntro:
    "Every prompt is tagged with the platform we'd default to. That's a preference, not a rule. Use whatever you have.",
  aiPlatforms: keyed([
    card(
      "ChatGPT",
      "The generalist. Quick drafts, brainstorming, ad copy, outbound sequences. If you've built a custom GPT on your brand voice, run the prompts there."
    ),
    card(
      "Claude",
      "Long context work where brand voice matters. Upload your brand guide, ICP doc, and reference content into a Project and reuse that context across prompts."
    ),
    card(
      "Perplexity",
      "Anything that needs to be current. Competitor research, recent news. It cites sources, which matters for AEO work and content research."
    ),
    card(
      "Gemini",
      "Strongest when connected to Google Workspace. Good for prompts that pull from Docs, Sheets, or Gmail. Solid for structured data tasks like content audits."
    ),
  ]),

  warningHeadline: "What not to feed these prompts.",
  warningBody:
    "None of these need your customers' personal data, financial details, or anything confidential. Your ICP description, your voice guidelines, and your public positioning are enough. If a prompt tempts you to paste real customer records or contracts, don't. Anonymize or leave it out.",

  categories: keyed(
    promptCategories.map((category) => ({
      _type: "promptCategory",
      name: category.name,
      tagline: category.tagline,
      prompts: keyed(
        category.prompts.map((p) => ({
          _type: "promptEntry",
          title: p.title,
          bestTool: p.best,
          useCase: p.useCase,
          promptText: p.prompt,
          ...(p.tip ? { tip: p.tip } : {}),
        }))
      ),
    }))
  ),

  ctaLabel: "// Or skip the prompts entirely",
  ctaHeadline: headline("Want us to just run this for you?"),
  ctaBody: richText(
    "These are the prompts we use ourselves. But they work best in the hands of someone who already knows what good positioning or a good landing page looks like. If you'd rather have that judgment applied to your business directly, that's what the audit call is for."
  ),
  ctaButton: link("Book your free audit", mailto("Free audit call")),

  seo: {
    _type: "seo",
    title: "AI Prompt Library — keewee.in",
    description:
      "30+ prompts we actually use for positioning, content, SEO, social, email, outbound, ads, conversion, and reporting. Free, no email wall.",
  },
});

// --- Blog: categories, posts, index ---------------------------------------

const categoryTitles = [...new Set(blogSummaries.map((p) => p.category))];
const categoryIds: Record<string, string> = {};

categoryTitles.forEach((title, i) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const id = idFor("category", slug);
  categoryIds[title] = id;
  docs.push({
    _id: id,
    _type: "category",
    title,
    slug: slugOf(slug),
    order: i,
  });
});

// The pre-CMS blog had summaries but no article bodies, so posts are seeded
// without one. They will not render an article until someone writes it.
const featuredIds = new Set([
  "domain-before-plan",
  "homepage-says-nothing",
  "gtm-costume",
]);

blogSummaries.forEach((post) => {
  docs.push({
    _id: idFor("post", post.id),
    _type: "post",
    title: post.title,
    slug: slugOf(post.id),
    dek: post.excerpt,
    category: { _type: "reference", _ref: categoryIds[post.category] },
    // No per-post author existed before the migration; everything is attributed
    // to the first team member until an editor reassigns it.
    author: { _type: "reference", _ref: peopleIds[0] },
    publishedAt: monthToIso(post.date),
    readTime: minutesFrom(post.readTime),
    featured: featuredIds.has(post.id),
  });
});

docs.push({
  _id: "blogIndexPage",
  _type: "blogIndexPage",
  hero: {
    _type: "pageHero",
    badge: "The Keewee blog",
    headline: headline("Marketing blog ", ["goldmine!", "highlight"]),
    intro: richText(
      "Literally the best content on B2B SaaS marketing. Positioning, SEO, demand gen, paid media, conversion, and everything in between. Written by the people doing the work, not summarizing someone else's newsletter."
    ),
  },
  topReadsHeader: sectionHeader({
    eyebrow: "Start here",
    headline: headline("Our most-loved blogs"),
    intro: richText(
      "New here? These give you the clearest picture of how we think and what we believe about B2B marketing."
    ),
  }),
  archiveHeader: sectionHeader({
    eyebrow: "Browse by topic",
    headline: headline("Find exactly what you're looking for."),
  }),
  newsletterHeadline: headline("No roundups and recycled takes."),
  newsletterBody: richText(
    "What's actually working in B2B SaaS marketing right now, frameworks we're using with clients, and the occasional unpopular opinion. No filler, no sponsored content, no AI-generated summaries of things you already know."
  ),
  newsletterCta: link("Subscribe", "/newsletter"),
  ctaHeadline: headline(
    "Your marketing should be doing more than it is right now."
  ),
  ctaBody: richText(
    "Book a free 30-minute audit call. We look at your positioning, your funnel, and your content and tell you exactly what's broken and what to fix first."
  ),
  ctaButtons: {
    _type: "cta",
    primary: link("Book a free audit call", mailto("Free audit")),
  },
  seo: {
    _type: "seo",
    title: "Blog — keewee.in",
    description:
      "Literally the best content on B2B SaaS marketing. Positioning, SEO, demand gen, paid media, conversion, and everything in between.",
  },
});

// --- Legal documents -------------------------------------------------------

/** Maps the old tuple-based block union onto the named Sanity objects. */
function legalBlock(block: (typeof legalDocs)[number]["sections"][number]["blocks"][number]) {
  if ("p" in block) return { _type: "legalParagraph", _key: key(), text: block.p };
  if ("c" in block) {
    const [number, heading, text] = block.c;
    return { _type: "legalClause", _key: key(), number, heading, text };
  }
  if ("sub" in block) {
    const [number, heading] = block.sub;
    return { _type: "legalSubheading", _key: key(), number, heading };
  }
  if ("d" in block) {
    const [term, text] = block.d;
    return { _type: "legalDefinition", _key: key(), term, text };
  }
  if ("ul" in block) return { _type: "legalList", _key: key(), items: block.ul };
  if ("note" in block) return { _type: "legalNote", _key: key(), text: block.note };
  const [name, city, email] = block.contact;
  return { _type: "legalContact", _key: key(), name, city, email };
}

legalDocs.forEach((doc, i) => {
  const slug = doc.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  docs.push({
    _id: idFor("legal", doc.key),
    _type: "legalDoc",
    title: doc.title,
    slug: slugOf(slug),
    label: doc.label,
    eyebrow: doc.eyebrow,
    entity: doc.entity,
    // "Last updated: June 2026" → a real date field.
    updatedAt: monthToIso(doc.updated.replace(/^Last updated:\s*/, "")).slice(0, 10),
    intro: doc.intro,
    order: i,
    sections: keyed(
      doc.sections.map((section) => ({
        _type: "legalSection",
        title: section.title,
        blocks: section.blocks.map(legalBlock),
      }))
    ),
  });
});

// --- Links page ------------------------------------------------------------

docs.push({
  _id: "linksPage",
  _type: "linksPage",
  logoMark: "\u2731",
  wordmark: "keewee.in",
  bio: "B2B marketing with a spine. We fix the part everyone skips: what to actually say.",
  stickyCta: link("Free audit", "/free-audit"),

  // The featured card, the banners and the feed ship empty on purpose — see
  // the note in `links-page-data.ts`. Each section renders nothing until it
  // has real content, so the page is coherent while they are unset.
  featuredLabel: "This week",

  bannersLabel: "Closing soon",
  bannersSwipeHint: "Swipe",

  buttonsLabel: "Start here",
  buttons: keyed(linksButtons.map((b) => ({ _type: "linkButton", ...b }))),

  feedLabel: "From the feed",
  feedHandle: "@keewee.in",
  feedInitialCount: 12,
  feedMoreLabel: "See all {count} posts",
  sheetHint: "Esc or click outside to close",

  railEyebrow: "Everything we make",
  railHeadline: headline("One link, the whole ", ["feed", "highlight"], "."),
  railBody: "Built for the tap that comes from a bio. Same page on desktop, just calmer.",
  sticker: "NO MUSH!",

  footerLinks: keyed([
    link("keewee.in", "/"),
    link("Privacy", "/legal/privacy-policy"),
  ]),
  footerNote: "\u00a9 2026 Keewee Marketing Pvt Ltd.",
});

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

async function main() {
  const selected = only ? docs.filter((doc) => doc._type === only) : docs;
  if (only && selected.length === 0) {
    throw new Error(`No seeded documents of type "${only}"`);
  }

  const byType = selected.reduce<Record<string, number>>((acc, doc) => {
    const type = String(doc._type);
    acc[type] = (acc[type] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`\nSeeding ${selected.length} documents into ${projectId}/${dataset}:`);
  for (const [type, count] of Object.entries(byType).sort()) {
    console.log(`  ${String(count).padStart(3)}  ${type}`);
  }

  if (dryRun) {
    console.log("\n--dry: nothing written.\n");
    return;
  }

  // One transaction: either the whole content model lands or none of it does,
  // so a network blip can't leave half-populated references behind.
  const tx = client.transaction();
  for (const doc of selected) {
    tx.createOrReplace(doc as never);
  }
  await tx.commit();

  console.log("\nDone. Open /studio to review.\n");
}

main().catch((error) => {
  console.error("\nSeed failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
