export type BlogAuthor = {
  name: string;
  role: string;
  avatarId: string;
  bio: string;
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; imageId: string; caption: string }
  | { type: "callout"; text: string };

export type RelatedPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  imageId: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  date: string;
  readTime: string;
  heroImageId: string;
  author: BlogAuthor;
  blocks: BlogBlock[];
  related: RelatedPost[];
};

export const blogPostPlaceholder: BlogPost = {
  slug: "sample-post",
  category: "Category",
  title: "Post title goes here",
  dek: "A one or two sentence summary of the post goes here — this is the dek that appears under the headline.",
  date: "Month Year",
  readTime: "X min read",
  heroImageId: "post-hero",
  author: {
    name: "Author name",
    role: "Role",
    avatarId: "post-author",
    bio: "A short author bio goes here.",
  },
  blocks: [
    { type: "paragraph", text: "Placeholder body paragraph." },
    { type: "heading", text: "Placeholder section heading" },
    { type: "paragraph", text: "Placeholder body paragraph." },
    { type: "quote", text: "Placeholder pull quote." },
    {
      type: "list",
      items: [
        "Placeholder list item",
        "Placeholder list item",
        "Placeholder list item",
      ],
    },
    { type: "paragraph", text: "Placeholder body paragraph." },
    { type: "image", imageId: "post-inline-1", caption: "Placeholder image caption" },
    { type: "callout", text: "Placeholder key takeaway." },
    { type: "paragraph", text: "Placeholder closing paragraph." },
  ],
  related: [
    {
      slug: "related-post-1",
      title: "Related post title placeholder",
      category: "Category",
      readTime: "X min read",
      imageId: "related-1",
    },
    {
      slug: "related-post-2",
      title: "Related post title placeholder",
      category: "Category",
      readTime: "X min read",
      imageId: "related-2",
    },
    {
      slug: "related-post-3",
      title: "Related post title placeholder",
      category: "Category",
      readTime: "X min read",
      imageId: "related-3",
    },
  ],
};

export const blogPosts: BlogPost[] = [blogPostPlaceholder];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// --- Blog index / listing page ---
// Lightweight summaries for the blog homepage grid. Real posts (and the
// mapping to full BlogPost detail pages) land once the CMS integration is
// in place — for now these are the same seed titles the design shipped with.

export type BlogCategory =
  | "All"
  | "Positioning & Messaging"
  | "SEO & AI Search"
  | "Content Marketing"
  | "Demand Generation"
  | "Conversion & CRO"
  | "Founder Brand"
  | "Retention & Expansion"
  | "GTM Strategy"
  | "Analytics & RevOps"
  | "Agency & Hiring"
  | "Inside Keewee";

export const blogCategories: BlogCategory[] = [
  "All",
  "Positioning & Messaging",
  "SEO & AI Search",
  "Content Marketing",
  "Demand Generation",
  "Conversion & CRO",
  "Founder Brand",
  "Retention & Expansion",
  "GTM Strategy",
  "Analytics & RevOps",
  "Agency & Hiring",
  "Inside Keewee",
];

export type BlogSummary = {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readTime: string;
};

export const blogSummaries: BlogSummary[] = [
  {
    id: "domain-before-plan",
    title: "Why we bought a domain before we had a business plan.",
    excerpt:
      "Three friends, one call, and the impulsive decision that turned into an agency.",
    category: "Inside Keewee",
    date: "Jul 2026",
    readTime: "5 min read",
  },
  {
    id: "homepage-says-nothing",
    title: "Your homepage says nothing. Here's how we'd fix it in a week.",
    excerpt:
      "Positioning isn't a workshop exercise. It's the sentence everything else has to agree with.",
    category: "Positioning & Messaging",
    date: "Jul 2026",
    readTime: "7 min read",
  },
  {
    id: "gtm-costume",
    title: "Most go-to-market plans are a content calendar wearing a costume.",
    excerpt:
      "A channel list isn't a strategy. Here's the order we actually work in.",
    category: "GTM Strategy",
    date: "Jun 2026",
    readTime: "8 min read",
  },
  {
    id: "chatgpt-doesnt-know",
    title: "ChatGPT doesn't know your product exists. That's a content problem.",
    excerpt:
      "AI search is already sending buyers your competitors' way. Here's what actually moves the needle.",
    category: "SEO & AI Search",
    date: "Jun 2026",
    readTime: "6 min read",
  },
  {
    id: "stop-publishing",
    title: "Stop publishing content nobody asked you to write.",
    excerpt: "The content calendar isn't the strategy. The point of view is.",
    category: "Content Marketing",
    date: "Jun 2026",
    readTime: "5 min read",
  },
  {
    id: "cold-email-still-works",
    title: "Cold email still works. Your deliverability is just broken.",
    excerpt:
      "Most outbound programs die in the inbox, not the copy. Fix the plumbing first.",
    category: "Demand Generation",
    date: "May 2026",
    readTime: "6 min read",
  },
  {
    id: "ad-worked-page-ruined",
    title: "The ad worked. Then your landing page ruined it.",
    excerpt:
      "Where B2B SaaS budgets actually die, and the specific fixes that bring them back.",
    category: "Conversion & CRO",
    date: "May 2026",
    readTime: "7 min read",
  },
  {
    id: "ghostwriting-not-a-ghost",
    title: "Ghostwriting that doesn't sound like a ghostwriter.",
    excerpt:
      "Founder brand only works if it sounds like the founder. Here's how we calibrate voice.",
    category: "Founder Brand",
    date: "May 2026",
    readTime: "5 min read",
  },
  {
    id: "churn-shows-up-late",
    title: "Churn doesn't show up in your dashboard until it's too late.",
    excerpt: "The early warning signals most B2B teams never bother to watch.",
    category: "Retention & Expansion",
    date: "Apr 2026",
    readTime: "6 min read",
  },
  {
    id: "dashboard-lying",
    title: "Your dashboard is lying to you. Here's why.",
    excerpt:
      "Bad tracking makes every other marketing decision wrong. Start with the plumbing.",
    category: "Analytics & RevOps",
    date: "Apr 2026",
    readTime: "7 min read",
  },
  {
    id: "fire-your-agency",
    title: "How to fire your marketing agency without blowing up Q3.",
    excerpt:
      "A practical transition plan for founders stuck with an underperforming vendor.",
    category: "Agency & Hiring",
    date: "Apr 2026",
    readTime: "6 min read",
  },
  {
    id: "positioning-vs-tagline",
    title: "Positioning is not a tagline. Most teams confuse the two.",
    excerpt:
      "A tagline is what positioning sounds like once you've actually done the work.",
    category: "Positioning & Messaging",
    date: "Mar 2026",
    readTime: "6 min read",
  },
  {
    id: "one-post-fifteen-pieces",
    title: "One webinar, fifteen pieces of content, zero extra work.",
    excerpt:
      "The repurposing system that keeps your best ideas from getting used once.",
    category: "Content Marketing",
    date: "Mar 2026",
    readTime: "5 min read",
  },
  {
    id: "pricing-page-cac",
    title: "Your pricing page might be the reason your CAC is high.",
    excerpt:
      "Packaging problems disguise themselves as acquisition problems. Here's how to tell.",
    category: "Conversion & CRO",
    date: "Mar 2026",
    readTime: "6 min read",
  },
  {
    id: "hiring-first-marketer",
    title: "What to look for when you hire your first in-house marketer.",
    excerpt:
      "The role most founders write wrong, and the profile that actually works at seed stage.",
    category: "Agency & Hiring",
    date: "Feb 2026",
    readTime: "7 min read",
  },
];

const topReadIds = ["domain-before-plan", "homepage-says-nothing", "gtm-costume"];

export const topReads = topReadIds
  .map((id) => blogSummaries.find((p) => p.id === id))
  .filter((p): p is BlogSummary => Boolean(p));
