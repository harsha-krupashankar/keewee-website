export type NewsletterReason = { title: string; desc: string };
export type NewsletterInclude = { title: string; desc: string };

export const whySubscribe: NewsletterReason[] = [
  {
    title: "Written by the founder, not a content team",
    desc: "Every issue comes straight from our founder, based on what we're actually doing in our own campaigns that week.",
  },
  {
    title: "Short on purpose",
    desc: "Five minutes, one scroll. If a paragraph doesn't earn its place, it gets cut before you see it.",
  },
  {
    title: "One tactic, not ten",
    desc: "Each issue gives you one thing to try, not a list you'll never get through.",
  },
];

export const whatYouGet: NewsletterInclude[] = [
  {
    title: "This week's big idea",
    desc: "One shift in B2B SaaS marketing worth knowing about, explained in a few sentences.",
  },
  {
    title: "One thing to try",
    desc: "A tactic, the exact steps we took, and what it'll cost you in time.",
  },
  {
    title: "What's happening in B2B SaaS",
    desc: "Three moves worth knowing about this week. A raise, a launch, a repositioning.",
  },
  {
    title: "Steal this",
    desc: "A template or real example you can copy straight into your own doc.",
  },
];
