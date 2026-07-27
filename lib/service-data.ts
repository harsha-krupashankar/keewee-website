export type ServiceOffering = { title: string; desc: string };
export type ServiceFaqItem = { q: string; a: string };

export type ServiceDoc = {
  id: string;
  slug: string;
  category: string;
  heroA: string;
  heroHi: string;
  heroB: string;
  heroSub: string;
  problemHeadline: string;
  problemBody: string[];
  services: ServiceOffering[];
  differently: string[];
  testimonial: string;
  faq: ServiceFaqItem[];
  quoteHeadline: string;
  serviceScope: string;
  serviceCheckboxes: string[];
  talkHeadline: string;
  talkBody: string;
};

export const serviceDocs: ServiceDoc[] = [
  {
    id: "awareness",
    category: "Awareness & Brand",
    slug: "b2b-saas-awareness-brand-agency",
    heroA: "Your product is ",
    heroHi: "different",
    heroB: ". Your marketing doesn't say so.",
    heroSub:
      "Positioning, content, SEO, and brand work for B2B SaaS companies tired of sounding like a template with a different logo.",
    problemHeadline: "Every homepage says the same thing. Nobody remembers any of them.",
    problemBody: [
      "Most B2B SaaS marketing starts with the wrong question. Founders ask what the content calendar should look like before anyone has answered what they actually believe about this market. That order gets you a content calendar full of posts nobody reads and a homepage that reads exactly like the competitor's.",
      "The pattern repeats everywhere. The hero says “the smart platform for growing teams.” The blog reads like it was assigned by committee. The LinkedIn page posts once a month and calls it consistent.",
      "Getting this right starts with picking a point of view, not producing more content. We define who you're for, what you believe that your category doesn't, and the exact words that prove it. Everything downstream, content, SEO, social, ghostwriting, gets built on that foundation instead of guessed at separately.",
    ],
    services: [
      { title: "Go to Market Strategy", desc: "ICP definition, positioning, messaging framework, competitive matrix, channel selection, and a 90 day execution roadmap in one document you'll actually use." },
      { title: "Brand Positioning and Messaging", desc: "Brand narrative, positioning statement, messaging pillars, voice and tone guidelines, and a website copy framework, delivered as a brand book with Figma ready copy." },
      { title: "Naming and Brand Identity", desc: "Name candidates, trademark and domain checks, logo concepts, color palette, typography, and a full brand guidelines document. For companies starting fresh or fixing what the last agency built." },
      { title: "Content and SEO Audits", desc: "A review of your existing pages for SEO performance, content quality, keyword alignment, and conversion potential, with a fix list ranked by impact." },
      { title: "Long-form Content Production", desc: "SEO optimized articles every month, each with a hero image, custom graphics, meta description, and social snippets. Written to rank and earn trust, not fill a quota." },
      { title: "AEO and LLM Visibility Optimization", desc: "An audit of where you show up when buyers ask ChatGPT, Claude, or Perplexity for the best tool in your category, plus the schema, FAQ blocks, and content plan to fix it." },
      { title: "Ebooks, Whitepapers, and Research Reports", desc: "Long-form assets that generate leads and build category authority, from research through design and a promotion plan." },
      { title: "Newsletter Strategy and Production", desc: "A newsletter people actually open, with strategy, copy, design, and performance reporting handled end to end." },
      { title: "Content Repurposing", desc: "One webinar or article becomes eight to fifteen pieces across LinkedIn, X, carousels, and email, so nothing you create gets used once and forgotten." },
      { title: "Case Study Production", desc: "Customer interview, written case study, one-page PDF, and pull quotes for social and sales." },
      { title: "Company Social Media Management", desc: "Posts, content calendar, design, and community management across LinkedIn and X, with a monthly report showing what actually moved." },
      { title: "Founder and Executive Ghostwriting", desc: "LinkedIn posts written in your actual voice, based on what you actually think." },
      { title: "Thought Leadership Articles", desc: "Long-form ghostwritten pieces under your byline for LinkedIn, Substack, and industry publications your buyers already read." },
    ],
    differently: [
      "We build the point of view first. Everyone else starts with the content calendar.",
      "Every piece ties back to one positioning document, so your blog, your LinkedIn, and your homepage all sound like the same company said them.",
      "You work directly with the people doing the strategy. No account manager translating your business to a junior writer who has never spoken to you.",
      "We tell you when something isn't working before you have to ask, including our own work.",
      "AI helps us move faster. It doesn't write your voice for you. Every piece that reaches you has been reviewed and edited by a person who understands your business.",
    ],
    testimonial: "We're currently working with our first cohort of clients. This section will have real names and real results soon.",
    faq: [
      { q: "Do you write everything yourselves?", a: "Yes. Every piece of content is written, reviewed, and approved by our team. We use AI to move faster, never to replace the thinking." },
      { q: "How long before we see results?", a: "Positioning and messaging land in weeks. Content and SEO compound over the full 90 day engagement and beyond. Anyone promising SEO results in two weeks isn't being straight with you." },
      { q: "Do we need a full rebrand or can we start smaller?", a: "You can start with a single service like a content and SEO audit or a positioning sprint. The full brand build is there if you need it, not a requirement to work with us." },
      { q: "What's the minimum commitment?", a: "90 days for any retainer engagement. That's the honest minimum needed to build the system, run it, and show you real signal." },
      { q: "Can you match our existing brand voice?", a: "Yes. We spend the first weeks calibrating to how you actually sound before we write anything that reaches your audience." },
    ],
    quoteHeadline: "Tell us where your brand feels unclear. We'll tell you what we'd fix first.",
    serviceScope: "awareness and brand",
    serviceCheckboxes: ["Go to Market Strategy", "Brand Positioning and Messaging", "Naming and Brand Identity", "Content and SEO Audits", "Long-form Content", "AEO and LLM Visibility", "Newsletter", "Social Media Management", "Founder Ghostwriting"],
    talkHeadline: "Not ready to fill the form? Just talk to us.",
    talkBody: "Book a free 30 minute call. We'll look at your positioning and content and tell you what's working, what isn't, and what to fix first.",
  },
  {
    id: "demand",
    category: "Demand Generation",
    slug: "b2b-saas-demand-generation-agency",
    heroA: "Attention is not ",
    heroHi: "pipeline",
    heroB: ". We build what turns one into the other.",
    heroSub:
      "Cold email, paid search, paid social, ABM, and events for B2B SaaS companies that check whether it closed, not whether it shipped.",
    problemHeadline: "Spend goes up. Pipeline doesn't.",
    problemBody: [
      "Most B2B demand gen is a content treadmill bolted to a paid ads account. Agencies report on volume because volume is easy to report. More emails sent. More impressions served. More posts published. None of that tells you if a single deal moved.",
      "The usual mistakes repeat across every company we look at. Channels get picked because they're trending, not because that's where the buyer actually shops. Ad copy and landing pages get built by different people who never talk to each other. Cold email gets sent from a domain that was never warmed up, so it lands in spam before anyone reads it.",
      "Getting results here means fixing the order. Positioning first, because a CAC problem is usually a clarity problem no amount of spend will fix. Then the channels that match how your buyer actually shops. Then we ship, measure, and kill whatever isn't working, faster than most teams are used to.",
    ],
    services: [
      { title: "Cold Email and Outbound Infrastructure", desc: "Domain warmup, sender rotation, ICP matched list building, sequence design, reply handling, and deliverability monitoring. Setup and ongoing management are scoped separately because deliverability breaks more outbound programs than bad copy does." },
      { title: "Paid Search, Google Ads", desc: "Keyword strategy, ad copy in several variants per ad group, landing page recommendations, conversion tracking, weekly optimization, and monthly reporting." },
      { title: "Paid Social, LinkedIn, Meta, and X", desc: "Channel strategy, audience builds, creative briefs, ad copy and creative production, A/B testing, weekly optimization, and monthly reporting." },
      { title: "Account Based Marketing", desc: "Target account lists, enrichment, account research, multichannel sequences across LinkedIn, email, and ads, personalized landing pages, and attribution reporting." },
      { title: "Webinar and Event Production", desc: "Topic strategy, speaker prep, slide design, registration page, a promotion plan, live moderation, and post-event repurposing." },
    ],
    differently: [
      "We report on pipeline. Most agencies report on activity.",
      "The same team that writes your ad copy builds your landing pages, so the click and the page it lands on are built to work together.",
      "We flag what isn't working before you ask. If a channel isn't converting, you hear it from us first, not from your own dashboard three months later.",
      "No juniors quietly running your account after a senior team pitched you.",
      "Every channel connects back to the same positioning, so your outbound, your ads, and your landing pages all say the same thing to the same buyer.",
    ],
    testimonial: "We're currently working with our first cohort of clients. This section will have real numbers and real names soon.",
    faq: [
      { q: "Do you manage the ad spend or just the strategy?", a: "Both. We build the strategy and run the account, including creative, copy, bidding, and weekly optimization." },
      { q: "What's the minimum commitment?", a: "90 days, same as every Keewee engagement. That's the honest minimum to build the system and generate real signal." },
      { q: "Can we start with just one channel?", a: "Yes. Most clients start with one or two channels and expand once the first is proving out." },
      { q: "How fast until we see pipeline?", a: "Cold email and paid search usually show signal within a few weeks. ABM and webinars take longer to compound. We'll tell you honestly what to expect from your specific mix before you sign anything." },
      { q: "Do you write the ad copy and creative yourselves?", a: "Yes, in house, so the ad and everything it points to are built together." },
    ],
    quoteHeadline: "Tell us what's not converting. We'll tell you what we'd build.",
    serviceScope: "demand gen",
    serviceCheckboxes: ["Cold Email and Outbound", "Google Ads", "LinkedIn/Meta/X Ads", "ABM", "Webinar Production"],
    talkHeadline: "Not ready for a form? Just talk to us.",
    talkBody: "Book a free 30 minute call. We'll look at your current channels and tell you what's working, what's wasted spend, and what to fix first.",
  },
  {
    id: "conversion",
    category: "Conversion",
    slug: "b2b-saas-conversion-agency",
    heroA: "The ad worked. ",
    heroHi: "The page didn't",
    heroB: ".",
    heroSub:
      "Website redesign, landing pages, CRO audits, pricing strategy, and email automation for B2B SaaS companies losing buyers after the click.",
    problemHeadline: "Most B2B marketing spend dies on the page after the click.",
    problemBody: [
      "The ad gets clicked. The traffic arrives. Then the page buries the product under a hero animation nobody waited for, a testimonial carousel nobody reads, and a form that asks for twelve fields before anyone has decided to trust you. The budget was spent getting someone to show up. Nobody spent any effort making sure they stayed.",
      "The usual fixes are the wrong ones. Teams add more traffic to a leaking funnel instead of fixing the leak. They redesign the whole site when the actual problem is one page or one form. They guess at what's broken instead of watching a session recording and finding out.",
      "Getting results here starts with finding the actual leak, not assuming you know where it is. Heatmaps, session recordings, and funnel data show where buyers drop off. Fix that specific point first. A faster, plainer page usually outperforms a fancier one.",
    ],
    services: [
      { title: "Website Redesign and Development", desc: "Discovery through launch. Information architecture, wireframes, design, and development in Webflow or Framer, built for the buyer you have now." },
      { title: "Landing Page Design and Build", desc: "Copywriting, design, development, conversion tracking, A/B test setup, and mobile responsiveness, from brief to live." },
      { title: "CRO Audits", desc: "Heatmap analysis, session recording review, funnel drop-off mapping, and a prioritized list of specific changes ranked by impact, with an implementation roadmap." },
      { title: "Pricing and Packaging Strategy", desc: "Competitive pricing audit, willingness to pay analysis, packaging recommendations, and pricing page copy. Your pricing page might be the reason your CAC is high." },
      { title: "Email Marketing and Automation", desc: "Lifecycle email audit, sequence design across welcome, nurture, onboarding, reactivation, and win-back flows, copy, design, and platform setup." },
      { title: "Sales Enablement Assets", desc: "Pitch decks, one-pagers, battle cards, ROI calculators, and comparison sheets built for how your buyer actually buys." },
    ],
    differently: [
      "We find the leak before we redesign anything.",
      "We look at the data first, session recordings and funnel drop-off, not our own opinion about what looks nice.",
      "Simple usually wins. If cutting eight hundred words and removing an animation lifts conversion more than a full redesign, we'll tell you that and charge you less.",
      "The same team that builds the page also handles pricing and messaging, so what the page says and what it charges never contradict each other.",
      "We show you the before and after data, not just the finished design.",
    ],
    testimonial: "We're currently working with our first cohort of clients. This section will have real numbers and real names soon.",
    faq: [
      { q: "Do we need a full website redesign or can we start with an audit?", a: "Most companies should start with a CRO audit. It tells you exactly where the leak is before you spend on a full rebuild you might not need." },
      { q: "How long does a website redesign take?", a: "Full redesigns typically run six to ten weeks depending on scope. Standalone landing pages can go live in about two weeks." },
      { q: "Do you handle the copy or just the design?", a: "Both. Copywriting, design, and development are handled by the same team so the words and the layout are built together." },
      { q: "What platforms do you build on?", a: "Webflow and Framer, and we can work inside your existing HubSpot, Salesforce, Customer.io, Klaviyo, or Mailchimp setup for email automation." },
      { q: "What's the minimum commitment?", a: "Project based work like a CRO audit or landing page build doesn't carry a retainer minimum. Ongoing conversion retainers follow the standard 90 day minimum." },
    ],
    quoteHeadline: "Tell us where buyers are dropping off. We'll tell you what we'd fix first.",
    serviceScope: "conversion",
    serviceCheckboxes: ["Website Redesign", "Landing Page Design and Build", "CRO Audit", "Pricing and Packaging Strategy", "Email Automation", "Sales Enablement Assets"],
    talkHeadline: "Not ready for a form? Just talk to us.",
    talkBody: "Book a free 30 minute call. We'll look at your site and your funnel and tell you exactly where buyers are dropping off.",
  },
  {
    id: "retention",
    category: "Retention & Expansion",
    slug: "b2b-saas-retention-expansion-agency",
    heroA: "Acquiring a customer is expensive. ",
    heroHi: "Losing them quietly",
    heroB: " is worse.",
    heroSub:
      "Lifecycle marketing, customer advocacy, and expansion programs for B2B SaaS companies that want to grow the revenue they already have.",
    problemHeadline: "Most marketing budgets stop the day a deal closes.",
    problemBody: [
      "Acquisition gets all the attention and most of the budget. Retention gets an onboarding email and a birthday message from the CRM. Then churn shows up in the board deck three months later and nobody can point to what caused it, because nobody was watching for it.",
      "The pattern repeats. Companies find out a customer is unhappy from a cancellation email instead of a churn risk signal weeks earlier. Happy customers never get asked to refer anyone, so the best growth channel a company has goes completely unused. Expansion revenue gets left on the table because nobody mapped which accounts were ready to buy more.",
      "Getting this right means building the system before the churn shows up, not reacting after. Map the customer journey, flag the accounts showing risk early, and build the advocacy and expansion programs that turn your best customers into your best growth channel.",
    ],
    services: [
      { title: "Lifecycle Marketing", desc: "Customer journey mapping, lifecycle email programs, in-app messaging strategy, onboarding optimization, churn risk trigger campaigns, and NPS programs." },
      { title: "Customer Marketing and Advocacy", desc: "Referral programs, customer advocacy programs, community strategy, customer event planning, and advisory board structure." },
      { title: "Expansion and Upsell Programs", desc: "Upsell trigger mapping, expansion email sequences, account based upsell campaigns, and pricing page CRO focused on existing customers." },
    ],
    differently: [
      "We build the early warning system, not just the win-back email.",
      "We flag churn risk before it shows up in your numbers, using behavior signals, not just a support ticket count.",
      "Referral and advocacy programs are built into the system from day one, not added on after retention becomes a problem.",
      "Expansion campaigns target specific accounts showing specific signals, not a blast email to your entire customer base.",
      "Every program ties back to your CRM and lifecycle data, so retention work is measured the same way your acquisition work is.",
    ],
    testimonial: "We're currently working with our first cohort of clients. This section will have real numbers and real names soon.",
    faq: [
      { q: "Do we need a large customer base for this to work?", a: "No. Even a small base benefits from a proper lifecycle program, and the earlier you build it, the less churn you fix reactively later." },
      { q: "Can this work alongside our existing CRM?", a: "Yes. We work inside HubSpot, Salesforce, Customer.io, Klaviyo, and most standard B2B SaaS tools." },
      { q: "How is this different from just running an email campaign?", a: "Lifecycle and expansion work depends on behavior data and account signals, not a generic send to your whole list. We build the segmentation and triggers, not just the copy." },
      { q: "What's the minimum commitment?", a: "90 days, same as every Keewee engagement. Retention systems need time to show whether they're actually reducing churn." },
      { q: "Do you help set up referral or advocacy programs from scratch?", a: "Yes, including the structure, the incentive design, and the outreach to your best customers." },
    ],
    quoteHeadline: "Tell us where customers are quietly slipping away. We'll tell you what we'd build.",
    serviceScope: "retention and expansion",
    serviceCheckboxes: ["Lifecycle Marketing", "Customer Marketing and Advocacy", "Expansion and Upsell Programs"],
    talkHeadline: "Not ready for a form? Just talk to us.",
    talkBody: "Book a free 30 minute call. We'll look at your churn and expansion data and tell you where the biggest gap is.",
  },
  {
    id: "analytics",
    category: "Analytics & Operations",
    slug: "b2b-saas-marketing-analytics-ops-agency",
    heroA: "You have the data. You still can't say ",
    heroHi: "what's working",
    heroB: ".",
    heroSub:
      "Marketing analytics, RevOps, design support, and fractional CMO time for B2B SaaS companies that need clarity, not more dashboards.",
    problemHeadline: "More dashboards. Same confusion.",
    problemBody: [
      "Most B2B SaaS teams aren't short on data. They have GA4, a CRM, a few spreadsheets, and a dashboard nobody opens after the first week. What they're missing is a system that connects marketing activity to actual revenue, so every review starts with what moved the number instead of how many posts went out.",
      "The usual mistakes are structural. Tracking gets set up once at launch and never revisited, so half the conversions being reported aren't real. Leads fall into a gap between marketing and sales because nobody defined what actually counts as qualified. Reports measure activity because activity is easy to count, not because it's what the board actually wants to know.",
      "Getting this right means building the connective tissue first. Clean tracking, clear lead definitions, and a dashboard that shows pipeline, not just traffic. Once that exists, every other decision gets easier because everyone is arguing about the same numbers.",
    ],
    services: [
      { title: "Marketing Analytics Setup", desc: "GA4 configuration, Mixpanel or Amplitude setup, attribution modeling, dashboard builds in Looker Studio or HubSpot, conversion tracking, and UTM governance." },
      { title: "RevOps and Marketing Operations", desc: "HubSpot or Salesforce setup, lead scoring, lifecycle stage automation, MQL and SQL definitions, and sales-to-marketing handoff workflows." },
      { title: "Design Retainer", desc: "Ongoing brand design work on demand, social graphics, ad creatives, presentation design, and ebook layouts, without hiring a full-time designer." },
      { title: "Fractional CMO and Marketing Advisory", desc: "Senior strategic time each month, a monthly leadership meeting, quarterly planning, hiring support, and vendor selection guidance, for companies that need a marketing leader in the room without hiring one full time." },
    ],
    differently: [
      "We fix the tracking before we tell you what to do with it.",
      "We audit what's actually being measured before recommending a single change, because bad tracking makes every other decision wrong.",
      "Reports are built around pipeline and revenue, not vanity metrics like impressions or post counts.",
      "The same senior operators who set up your analytics also sit in your leadership meetings, so strategy and measurement never get disconnected.",
      "No dashboard gets handed over without a walkthrough of exactly what it means and what to do when a number moves.",
    ],
    testimonial: "We're currently working with our first cohort of clients. This section will have real numbers and real names soon.",
    faq: [
      { q: "Do you work with our existing tools or do we need to switch platforms?", a: "We work inside your existing stack wherever possible, including HubSpot, Salesforce, GA4, and Mixpanel." },
      { q: "Do we need a full-time marketing leader or does fractional actually work?", a: "Fractional works well for companies that need senior judgment in the room without the cost of a full-time hire. Most clients start fractional and revisit the decision as they grow." },
      { q: "How long does an analytics setup take?", a: "A full GA4 and dashboard setup typically takes two to three weeks, depending on how clean your existing tracking is." },
      { q: "Can you fix a broken lead handoff between marketing and sales?", a: "Yes. This is one of the most common issues we find, and it's usually a definitions problem, not a tools problem." },
      { q: "What's the minimum commitment?", a: "Analytics setup can be a one-time project. RevOps and fractional CMO work follow the standard 90 day retainer minimum." },
    ],
    quoteHeadline: "Tell us what your dashboards aren't telling you. We'll tell you what we'd fix.",
    serviceScope: "analytics and operations",
    serviceCheckboxes: ["Marketing Analytics Setup", "RevOps and Marketing Operations", "Design Retainer", "Fractional CMO and Marketing Advisory"],
    talkHeadline: "Not ready for a form? Just talk to us.",
    talkBody: "Book a free 30 minute call. We'll look at your current tracking and reporting and tell you what's missing.",
  },
];
