export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  id: string;
  navLabel: string;
  title: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "cat-pricing",
    navLabel: "Pricing",
    title: "Pricing & Contracts",
    items: [
      {
        q: "How much does Keewee cost?",
        a: "It depends entirely on what you need. Pricing varies based on the services you choose, the scope of work, and your stage. Visit our services page to see what fits, or get on a call and tell us what you're working with. We come back within 24 to 48 hours with package and pricing options built around your actual requirements. Annual contracts get an additional 10% discount on top of any package pricing.",
      },
      {
        q: "Do you lock clients into long contracts?",
        a: "Every engagement starts with a 90-day contract, for any service. That's the honest minimum to build the system, execute it, and show you what results actually look like. After the first 90 days, you can continue or exit. We'd rather earn your business on merit than keep you locked in somewhere you don't want to be.",
      },
      {
        q: "What happens if we want to pause or stop?",
        a: "After the 90-day minimum, either side can exit with 7 days written notice. Work completed up to the exit date is delivered in full once all outstanding invoices are cleared. This applies from both sides, so you always know where you stand.",
      },
      {
        q: "Is there a setup fee?",
        a: "No standalone setup fee. Onboarding and setup is part of the service for engagements that include it. What you see in your package is what you pay.",
      },
      {
        q: "When do I pay?",
        a: "Everything is paid in advance. The first three months are invoiced and paid in full before work begins. From month four onwards, each month is invoiced and paid before work for that month starts.",
      },
      {
        q: "What's your refund policy?",
        a: "We don't offer refunds on work already commenced. Because everything is paid in advance and planned accordingly, fees for any active period are non-refundable. This is covered in detail in our Terms of Service.",
      },
    ],
  },
  {
    id: "cat-how-we-work",
    navLabel: "How We Work",
    title: "How We Work",
    items: [
      {
        q: "What does onboarding look like?",
        a: "Week one is discovery. We go deep on your business, ICP, existing funnel, and competitive landscape. Week two we present the positioning foundation and the 90-day execution plan. Week three we start shipping. The first quarter is for building the system, executing it, and generating real signal. Anyone promising results before that is playing you.",
      },
      {
        q: "Do I get a dedicated point of contact?",
        a: "You deal directly with the founders. There's no account manager between you and the people doing the work. One of us also embeds with your team as a fractional marketing lead, joining your meetings and representing marketing from the inside (only if you want that). The rest of us execute behind the scenes.",
      },
      {
        q: "How do you handle feedback and revisions?",
        a: "Every deliverable includes a defined number of revision rounds agreed upfront in the scope of work. Revisions are changes within the original brief. A change in direction or messaging strategy is a new brief and we'll scope it accordingly. We flag this early so nothing surprises you on an invoice.",
      },
      {
        q: "How do you communicate with clients?",
        a: "Async first, which most clients prefer anyway. We use Slack or email for day-to-day communication, with a weekly or biweekly sync call depending on the engagement. For international clients, we maintain a structured async workflow with a daily overlap window.",
      },
      {
        q: "Will you tell us if something isn't working?",
        a: "Yes, and we won't wait for you to ask. If a campaign isn't converting, if your positioning needs work, or if a channel isn't worth the spend, we'll tell you directly. You're paying for judgment, not just execution.",
      },
    ],
  },
  {
    id: "cat-services",
    navLabel: "Services",
    title: "Services & Scope",
    items: [
      {
        q: "Do you handle everything or just one channel?",
        a: "Everything. We cover the full B2B marketing funnel: positioning, SEO, content, demand generation, paid media, website, conversion, retention, and analytics.",
      },
      {
        q: "Can I hire you for just one service?",
        a: "Yes. One-time projects like a CRO audit, a website build, a brand positioning sprint, or a sales deck are scoped individually. The 90-day contract applies to any engagement, but you're not required to take on the full funnel to work with us.",
      },
      {
        q: "Do you do paid media management?",
        a: "Yes. Google Ads is managed at 12 to 15% of ad spend with a monthly minimum. LinkedIn, Meta, and X are managed at 15% of ad spend with a monthly minimum. Creative, copy, and landing pages are all handled in-house so the ad and everything it points to are built to work together.",
      },
      {
        q: "Do you write the content yourselves?",
        a: "Yes. Every piece of content, whether a blog post, a LinkedIn post, a cold email sequence, or a founder ghostwriting piece, is written by our team. We use AI tools to move faster, but everything that reaches you has been written, reviewed, and approved by a person.",
      },
      {
        q: "Can you work with our existing tools and platforms?",
        a: "Yes. We're platform-agnostic. We work in HubSpot, Salesforce, Customer.io, Klaviyo, Mailchimp, Webflow, Framer, GA4, Mixpanel, and most other tools in the standard B2B SaaS stack. If you're using something niche, tell us upfront and we'll let you know where we stand.",
      },
      {
        q: "Do you handle the entire website or just landing pages?",
        a: "Both. Full website redesigns in Webflow or Framer are scoped as project-based engagements. Standalone landing page builds are priced per page. CRO audits are also available if you have traffic but aren't converting it.",
      },
    ],
  },
  {
    id: "cat-who-we-work-with",
    navLabel: "Who We Work With",
    title: "Who We Work With",
    items: [
      {
        q: "Do you work with early-stage or only funded companies?",
        a: "Both. We work with B2B SaaS companies at pre-seed, seed, Series A, and Series B. The scope and services differ by stage but the quality of work doesn't. If you're building your GTM from scratch or fixing a funnel that's leaking, we can help with either.",
      },
      {
        q: "Do you work globally?",
        a: "Yes. If you have a B2B SaaS company, geography is irrelevant. We work with teams across every timezone and have no restrictions on where you're based. Pricing is available in INR and USD.",
      },
      {
        q: "Do you only work with SaaS?",
        a: "Primarily yes. We work with B2B SaaS companies across fintech, devtools, HR tech, vertical SaaS, AI infrastructure, B2B marketplaces, and professional services. If your business sells to other businesses, we're likely a fit.",
      },
      {
        q: "How many clients do you take on at once?",
        a: "We're selective on purpose. We don't scale by taking on every client that comes in. A limited number of active engagements at any time means every account gets the same level of attention, not just the ones paying the most.",
      },
    ],
  },
  {
    id: "cat-privacy",
    navLabel: "Privacy",
    title: "Privacy & Confidentiality",
    items: [
      {
        q: "Is my business information kept confidential?",
        a: "Yes, fully. Everything you share with us, including your strategy, financials, customer data, product roadmap, and internal processes, is treated as confidential. We don't share, sell, or disclose your information to anyone outside of what's needed to deliver your work. This is covered in detail in our Privacy Policy.",
      },
      {
        q: "Do you sign NDAs?",
        a: "Yes. If you need an NDA before sharing sensitive information, we're happy to sign one. Mutual confidentiality is also built into our standard Terms of Service, so you're covered even without a separate NDA.",
      },
      {
        q: "What data do you collect when I visit the website or fill out a form?",
        a: "We collect basic contact information when you fill out a form and standard analytics data when you visit the site. We don't sell your data, use it for unrelated advertising, or share it with third parties outside of the tools we use to operate. Full details are in our Privacy Policy.",
      },
      {
        q: "How do you handle data when you manage our marketing platforms?",
        a: "Any access credentials or platform data you share with us are stored securely and never shared outside our team. We only access what's necessary to deliver the agreed work. When the engagement ends, access is revoked and data is handled per our retention policy.",
      },
      {
        q: "Do you use AI tools with our data?",
        a: "We use AI tools in our workflow for research, drafting, and automation. We do not input your confidential business data, customer personal data, or sensitive financial information into any AI tool without your explicit written consent. Everything that reaches you has been reviewed and approved by a member of our team.",
      },
    ],
  },
];
