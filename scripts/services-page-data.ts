/**
 * Copy for the `/services` catalogue, transcribed from the design.
 *
 * Unlike `scripts/legacy/`, none of this was ever hardcoded in a component — it
 * is here only so `npm run seed` can create the `servicesPage` singleton. Once
 * the document exists, the Studio is the source of truth and edits here do
 * nothing until the seed is re-run.
 */

export type ServiceItem = { title: string; desc: string };

export type ServiceCategoryData = {
  name: string;
  layout: "feature" | "rows" | "split" | "dark" | "numbered";
  featureSticker?: string;
  intro: string;
  items: ServiceItem[];
};

export const servicesCategories: ServiceCategoryData[] = [
  {
    name: "Awareness & Brand",
    layout: "feature",
    featureSticker: "START HERE",
    intro:
      "Before any channel works, you need to know what you're saying and who you're saying it to. We build the foundation first that includes positioning, messaging, SEO, content, and social, so everything downstream has something solid to stand on.",
    items: [
      {
        title: "Go-to-Market Strategy",
        desc: "Your ICP definition, competitive positioning, messaging framework, channel selection, and a 90-day execution roadmap are all compiled in one strategy document you'll actually use. Delivered in 4 weeks with a full walkthrough call.",
      },
      {
        title: "Brand Positioning & Messaging",
        desc: "The words that go on your homepage, your pitch deck, and your cold email. We build your brand narrative, positioning statement, messaging pillars, voice and tone guidelines, and a full website copy framework. Delivered as a 25-page brand book with Figma-ready copy.",
      },
      {
        title: "Naming & Brand Identity",
        desc: "For companies building from scratch or fixing what the last agency got wrong. 20+ name candidates, trademark and domain checks, logo concepts in 3 directions, color palette, typography system, and a 15-page brand guidelines document.",
      },
      {
        title: "Content & SEO Audits",
        desc: "We audit 5 to 25 existing blog posts or pages for SEO performance, content quality, keyword alignment, internal linking gaps, and conversion potential. Every audit comes with a prioritized fix list ranked by impact. For companies that have content but want to know why it's not working.",
      },
      {
        title: "Long-form Content Production",
        desc: "4 to 12 SEO-optimized articles per month, each 1,200 to 2,500 words, with hero image, custom graphics where relevant, meta description, and social snippets. Subject matter expert interviews available as an add-on. Not a content mill — every piece is written to rank and earn trust.",
      },
      {
        title: "AEO / LLM Visibility Optimization",
        desc: "Your buyers are asking ChatGPT, Claude, and Perplexity what the best tool is for their problem. We make sure you show up in the answer. AI share-of-voice audit across four major LLMs, competitor benchmark, JSON-LD schema implementation, FAQ block deployment, and monthly visibility tracking. Three-month engagement recommended.",
      },
      {
        title: "Ebooks, Whitepapers & Research Reports",
        desc: "Long-form assets that generate leads and build category authority. Research, outline, full draft of 3,000 to 8,000 words, design layout, landing page copy, and a promotion plan. Original research and survey components available as an add-on.",
      },
      {
        title: "Newsletter Strategy & Production",
        desc: "Weekly or biweekly newsletters that people actually open. Strategy, copywriting, design, send setup, and monthly performance reporting. For companies that want a direct line to their buyers without depending on an algorithm.",
      },
      {
        title: "Content Repurposing",
        desc: "One webinar, podcast, or long-form article becomes 8 to 15 pieces of content — LinkedIn posts, X threads, carousels, short videos, newsletter segments, and sales enablement assets. The repurposing engine that makes sure nothing gets wasted.",
      },
      {
        title: "Case Study Production",
        desc: "Customer interview, written case study of 800 to 1,500 words, one-page PDF version, social and email pull quotes, and optional video edit. The proof your sales team keeps asking for, done properly.",
      },
      {
        title: "Company Social Media Management",
        desc: "12 to 20 posts per month per channel across LinkedIn, X, and wherever your ICP actually spends time. Content calendar, copywriting, design (carousels, single-image, video covers), community management with responses within 4 business hours, and a monthly analytics report.",
      },
      {
        title: "Founder & Executive Ghostwriting",
        desc: "One monthly strategy call. 12 to 20 LinkedIn posts per month per founder, written in their actual voice. Voice calibration, ideation system, and monthly performance reporting included. Optional add-on: light engagement management, commenting on relevant posts in their voice. This is not AI-generated thought leadership. These are things they actually think, said the way they'd actually say it.",
      },
      {
        title: "Thought Leadership Articles",
        desc: "Long-form ghostwritten pieces under executive bylines — LinkedIn articles, Substack, and guest columns in publications your buyers actually read. One to two per month standard.",
      },
    ],
  },
  {
    name: "Demand Generation",
    layout: "rows",
    intro:
      "Awareness without pipeline is a vanity metric. We build the outbound infrastructure, paid programs, and nurture systems that create actual revenue conversations. and we measure them against pipeline, not just impressions.",
    items: [
      {
        title: "Cold Email & Outbound Infrastructure",
        desc: "Domain warmup, sender rotation, ICP-matched list building, copy frameworks, 4 to 7 step sequence design, reply handling SOPs, and deliverability monitoring. Setup and ongoing management scoped separately because deliverability is a minefield and most agencies get it wrong.",
      },
      {
        title: "Paid Search — Google Ads",
        desc: "Keyword strategy, ad copy in 3 to 5 variants per ad group, landing page recommendations, conversion tracking setup, weekly optimisation, and monthly reporting. Managed at 12 to 18% of ad spend with a minimum monthly fee.",
      },
      {
        title: "Paid Social — LinkedIn, Meta, X",
        desc: "Channel strategy, audience builds, creative briefs, ad copy in 5 to 10 variants per campaign, creative production in static and video, A/B testing plan, weekly optimisation, and monthly reporting. Managed at 15% of ad spend with a minimum monthly fee.",
      },
      {
        title: "Account-Based Marketing (ABM)",
        desc: "Target account lists of 50, 100, or 250 accounts. Enrichment, account research dossiers, multichannel sequences across LinkedIn, email, and ads, personalised landing pages, sales enablement assets, and attribution reporting. For companies that know exactly who they want and need a program that goes after them properly.",
      },
      {
        title: "Webinar & Event Production",
        desc: "Topic strategy, speaker prep, slide deck design, registration page, promotion plan across email and social and ads, live moderation script, post-event email sequence, and recording repurposing. Per-event pricing.",
      },
    ],
  },
  {
    name: "Conversion",
    layout: "split",
    intro:
      "Most B2B marketing budgets are lost post-click. The ad works. The landing page doesn't. The website buries the product. The email nurture is half-built. We fix what happens after someone shows interest and make sure the traffic you're paying for actually converts.",
    items: [
      {
        title: "Website Redesign & Development",
        desc: "Discovery to launch. ICP-first information architecture, wireframes, design, and development in Webflow or Framer. Built for the buyer you have now, not the one from two years ago. Per-project pricing scoped individually.",
      },
      {
        title: "Landing Page Design & Build",
        desc: "Brief to live in two weeks. Copywriting, Figma design, Webflow or Framer development, conversion tracking, A/B test setup, mobile responsive, and accessibility check. Per-page pricing. For companies running paid campaigns that need landing pages that actually convert.",
      },
      {
        title: "CRO Audits",
        desc: "Heatmap analysis, session recording review, funnel drop-off mapping, and a prioritised list of 40 to 60 specific changes ranked by likely impact. Comes with an implementation roadmap so you know what to fix first. For companies with traffic that isn't converting.",
      },
      {
        title: "Pricing & Packaging Strategy",
        desc: "Competitive pricing audit, willingness-to-pay analysis, packaging recommendations, pricing page copy, and a discount and contract framework. Your pricing page might be why your CAC is high. Delivered in 2 to 3 weeks.",
      },
      {
        title: "Email Marketing & Automation",
        desc: "Lifecycle email audit, sequence design across welcome, nurture, onboarding, reactivation, win-back, and post-purchase flows, copy, design, platform setup in HubSpot, Customer.io, Klaviyo, or Mailchimp, automation builds, and monthly reporting.",
      },
      {
        title: "Sales Enablement Assets",
        desc: "Pitch decks, one-pagers, battle cards, ROI calculators, comparison sheets, and proposal templates. Built for how your buyer buys, not how your internal wiki is organised. For sales teams that keep losing deals they should have won.",
      },
    ],
  },
  {
    name: "Retention & Expansion",
    layout: "dark",
    intro:
      "Acquiring a customer is expensive. Losing them quietly is worse. We build the programs that protect your existing revenue, reduce churn before it shows up in your numbers, and turn your best accounts into your best growth channel.",
    items: [
      {
        title: "Lifecycle Marketing",
        desc: "Customer journey mapping, lifecycle email programs, in-app messaging strategy, onboarding optimisation, churn-risk trigger campaigns, and NPS programs. The system that turns new customers into long-term ones.",
      },
      {
        title: "Customer Marketing & Advocacy",
        desc: "Referral programs, customer advocacy programs, community strategy, customer event planning, and advisory board structure. Your best customers are your best salespeople. We help them act like it.",
      },
      {
        title: "Expansion & Upsell Programs",
        desc: "Upsell trigger mapping, expansion email sequences, account-based upsell campaigns, and pricing page CRO. The revenue you already have, grown without spending more on acquisition.",
      },
    ],
  },
  {
    name: "Analytics & Operations",
    layout: "numbered",
    intro:
      "Most B2B marketing teams have data and no clarity. We set up the infrastructure that connects activity to revenue, so every review starts with what moved the number, not how many posts went out.",
    items: [
      {
        title: "Marketing Analytics Setup",
        desc: "GA4 configuration, Mixpanel or Amplitude setup, attribution modelling, dashboard builds in Looker Studio or HubSpot, conversion tracking, and UTM governance. For companies flying blind on what's actually driving pipeline.",
      },
      {
        title: "RevOps & Marketing Operations",
        desc: "HubSpot or Salesforce setup, lead scoring, lifecycle stage automation, MQL and SQL definitions, and sales-marketing handoff workflows. For companies where leads fall into a black hole between marketing and sales.",
      },
      {
        title: "Design Retainer",
        desc: "Ongoing brand design work on demand, social graphics, ad creatives, presentation design, and ebook layouts. Tiered by monthly request volume. For companies that need consistent, on-brand creative without hiring a full-time designer.",
      },
      {
        title: "Fractional CMO & Marketing Advisory",
        desc: "4 to 8 hours of senior strategic time per month. Monthly leadership team meeting, quarterly planning, hiring support, and vendor selection guidance. For companies that need a marketing leader in the room but aren't ready to hire one full-time. Billed separately from retainer packages.",
      },
    ],
  },
];

export const quoteGoals = [
  "Get more pipeline",
  "Fix our positioning",
  "Improve conversion rates",
  "Build content and SEO",
  "Launch a new product or market",
  "Reduce churn and grow existing accounts",
  "Set up our marketing from scratch",
  "Something else",
];

export const quoteServiceGroups: { title: string; options: string[] }[] = [
  {
    title: "Awareness & Brand",
    options: [
      "Go-to-Market Strategy",
      "Brand Positioning & Messaging",
      "SEO & Content Marketing",
      "AEO / LLM Visibility",
      "Founder Ghostwriting",
      "Social Media Management",
    ],
  },
  {
    title: "Demand Generation",
    options: [
      "Cold Email & Outbound",
      "Google Ads",
      "LinkedIn / Meta Ads",
      "Account-Based Marketing (ABM)",
      "Webinar Production",
    ],
  },
  {
    title: "Conversion",
    options: [
      "Website Redesign",
      "Landing Page Design & Build",
      "CRO Audit",
      "Email Automation & Lifecycle",
      "Sales Enablement Assets",
    ],
  },
  {
    title: "Retention & Expansion",
    options: [
      "Lifecycle Marketing",
      "Customer Advocacy Programs",
      "Upsell & Expansion Campaigns",
    ],
  },
  {
    title: "Analytics & Operations",
    options: [
      "Marketing Analytics Setup",
      "RevOps & HubSpot/Salesforce",
      "Fractional CMO",
    ],
  },
];
