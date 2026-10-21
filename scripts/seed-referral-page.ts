/**
 * One-time seed: creates the `referralPage` singleton with the launch copy.
 *
 *   npm run seed-referral:dry   # print the document
 *   npm run seed-referral       # create it
 *
 * Uses `createIfNotExists`, so once the document exists this is a no-op — it
 * never overwrites edits made in the Studio. Delete the document first if you
 * really want to reset it.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry");

let keyCount = 0;
const key = () => `k${(++keyCount).toString(36)}`;

type Span = string | { text: string; marks?: string[] };

/** One Portable Text block. Plain strings are unmarked spans. */
function block(spans: Span[], markDefs: { _key: string; _type: string; [k: string]: unknown }[] = []) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs,
    children: spans.map((span) => {
      const { text, marks = [] } = typeof span === "string" ? { text: span } : span;
      return { _type: "span", _key: key(), text, marks };
    }),
  };
}

const plain = (text: string) => [block([text])];
const marker = (text: string) => ({ text, marks: ["marker"] });

/** A paragraph with links: `parts` alternate text and `[label, href, newTab]`. */
function linked(parts: (string | [string, string, boolean])[]) {
  const markDefs: { _key: string; _type: string; href: string; openInNewTab: boolean }[] = [];
  const spans = parts.map((part) => {
    if (typeof part === "string") return part;
    const [label, href, openInNewTab] = part;
    const def = { _key: key(), _type: "link", href, openInNewTab };
    markDefs.push(def);
    return { text: label, marks: [def._key] };
  });
  return [block(spans, markDefs)];
}

const CALENDLY = "https://calendly.com/kanan-keewee/30min";

const doc = {
  _id: "referralPage",
  _type: "referralPage",

  heroEyebrow: "Referral program",
  heroSticker: "Up to $150!",
  heroHeadline: [block(["Refer a SaaS ", marker("founder"), "."])],
  heroIntro:
    "Keewee is a full-funnel B2B SaaS marketing agency. Through our referral program, you earn up to $150 when a SaaS company you refer signs with us.",
  heroNote:
    "Warm introduction or cold lead, every referral that signs earns the same one-time commission.",

  form: {
    stepLabel: "Step {current} of {total}",
    step1Title: "Your details",
    nameLabel: "Full name",
    emailLabel: "Email address",
    phoneLabel: "Phone number",
    linkedinLabel: "LinkedIn profile (optional)",
    step2Title: "Company you’re referring",
    companyLabel: "Company name",
    websiteLabel: "Company website",
    contactNameLabel: "Contact person’s name",
    contactRoleLabel: "Their role",
    contactEmailLabel: "Their email address",
    contactPhoneLabel: "Their phone number (optional)",
    contactLinkedinLabel: "Their LinkedIn profile (optional)",
    step3Title: "About the referral",
    spokeQuestion: "Have you spoken to them about Keewee?",
    spokeYesLabel: "Yes, I've told them about Keewee",
    spokeNoLabel: "No, this is a cold lead",
    mentionQuestion: "Can we mention your name when we reach out?",
    mentionYesLabel: "Yes",
    mentionNoLabel: "No",
    notesLabel: "Anything else we should know before reaching out? (optional)",
    agreeLabel: "I agree to the referral program terms",
    backLabel: "Back",
    nextLabel: "Next",
    submitLabel: "Submit referral",
    submittingLabel: "Sending…",
    requiredError: "This field is required",
    invalidEmailError: "Enter a valid email address",
    pickOneError: "Pick one to continue.",
    agreeError: "You need to agree to the terms to submit.",
    submitError: "Something went wrong sending your referral. Please try again.",
    throttledError:
      "Too many submissions from your network. Please wait a few minutes and try again — your referral was not sent.",
  },

  howItWorksHeadline: plain("How the referral program works"),
  howItWorksSteps: [
    [
      "Submit a referral.",
      "Fill out the form at the top of this page with your details, the company's details, and whether you've already spoken to them about Keewee. It takes about two minutes.",
    ],
    [
      "We reach out.",
      "If you've already told them about us, we'll follow up on that conversation. If it's a cold lead, we'll contact them ourselves and only mention your name if you've said we can.",
    ],
    [
      "Get updates.",
      "We'll let you know after the first call, when we send a proposal, and whether the deal closes.",
    ],
    [
      "Get paid.",
      "Once the client signs and their first payment clears, you receive your commission within 15 days.",
    ],
  ].map(([title, description]) => ({ _type: "titledCard", _key: key(), title, description })),

  earningsHeadline: plain("How much you can earn"),
  earningsFigure: "$50 to $150",
  earningsBody:
    "Each client you bring in earns you a one-time referral commission between $50 and $150. The exact amount depends on the scope of the engagement the client signs up for, and we'll confirm it with you as soon as the deal closes.",
  earningsFootnote: "There's no limit on how many companies you can refer.",
  eligibilityHeadline: plain("Who can refer"),
  eligibilityFigure: "Anyone.",
  eligibilityBody:
    "Clients, freelancers, consultants, investors, former colleagues, or friends of founders and decision makers. You don't need to be a Keewee client to earn a referral commission.",

  termsHeadline: plain("Referral program terms"),
  terms: [
    "The company must be new to Keewee: not already in our pipeline, and not someone we’ve spoken with in the last 6 months. If there’s overlap, we’ll tell you when we review your referral.",
    "If two people refer the same company, the first submission gets credit.",
    "A referral stays valid for 6 months from the date you submit it.",
    "Warm and cold referrals earn the same commission.",
    "Commission is a one-time payment between $50 and $150 per client, based on the scope of the engagement. We’ll confirm the exact amount when the deal closes.",
    "Commission is paid after the client’s first payment clears. If the client cancels before paying, no commission is due.",
    "Referrers in India are paid in INR at the exchange rate on the payout date.",
    "You can’t refer your own company.",
    "We’ll need your payment details and any required tax documents before we send your payout.",
  ],

  faqHeadline: plain("FAQ"),
  faqItems: [
    [
      "What does Keewee do?",
      "Keewee is a B2B SaaS marketing agency offering full-funnel marketing, from brand and demand generation to conversion, retention and marketing analytics, on a monthly retainer. Clients work directly with the founders, and we treat their growth as our own.",
    ],
    ["Do I need to be a Keewee client?", "No. The program is open to anyone."],
    [
      "Can I refer a company that hasn’t heard of Keewee?",
      "Yes. Cold leads are welcome and earn the same commission. Just tell us in the form so we know how to approach them.",
    ],
    ["Do I need to sell Keewee to them?", "No. We handle the conversation from start to finish."],
    [
      "How is my commission amount decided?",
      "It depends on the scope of the engagement the client signs up for. We’ll tell you the exact amount when the deal closes.",
    ],
    [
      "Should I tell them I’m earning a commission?",
      "If you’ve spoken to them about us, we recommend it. It keeps things transparent for everyone involved.",
    ],
    [
      "Is the commission recurring?",
      "No. You’re paid once for each client, regardless of how long they work with Keewee.",
    ],
    [
      "How is the commission paid?",
      "Bank transfer in INR within India, and Wise or PayPal for international referrers.",
    ],
  ].map(([question, answer]) => ({
    _type: "faqItem",
    _key: key(),
    question,
    answer: plain(answer),
  })),

  ctaHeadline: [block(["Know a SaaS founder who needs ", marker("marketing help"), "?"])],
  ctaBody: "Submit a referral and we'll handle the rest.",
  ctaButton: { _type: "link", label: "Submit a referral", href: "#referral-form", openInNewTab: false },
  ctaContact: linked([
    "Have questions about the referral program? Email ",
    ["kanan@keewee.in", "mailto:kanan@keewee.in", false],
    " or book a call with the founder: ",
    ["calendly.com/kanan-keewee/30min", CALENDLY, true],
  ]),

  thankYouSticker: "Got it!",
  thankYouHeadline: [block(["Got it. Thanks for the ", marker("referral"), "."])],
  thankYouBody:
    "We'll check whether {company} is new to us and email you within 48 hours. Once we've spoken to them, you'll hear from us again. If they sign, your commission of $50 to $150 is paid within 15 days of their first payment clearing.",
  thankYouCompanyFallback: "your referral",
  thankYouNote: "A confirmation email is on its way to you now.",
  anotherHeadline: plain("Know another founder?"),
  anotherBody: "Every referral that signs earns its own commission.",
  anotherButton: { _type: "link", label: "Submit another referral", href: "/referral", openInNewTab: false },
  callHeadline: plain("Want to know who you're sending them to?"),
  callBody: linked([
    "Book a 30-minute call with the founder: ",
    ["calendly.com/kanan-keewee/30min", CALENDLY, true],
  ]),

  seo: {
    _type: "seo",
    title: "Referral program",
    description:
      "Refer a B2B SaaS company to Keewee and earn a one-time commission of $50 to $150 when they sign. Warm introductions and cold leads both count.",
  },
  thankYouSeo: { _type: "seo", title: "Referral thank you", noIndex: true },
};

async function main() {
  if (dryRun) {
    console.log(JSON.stringify(doc, null, 2));
    return;
  }

  if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN. Create an Editor token at sanity.io/manage.");
  }

  const client = createClient({ projectId, dataset, apiVersion: "2026-07-27", token, useCdn: false });
  const existing = await client.getDocument(doc._id);
  if (existing) {
    console.log(`"${doc._id}" already exists — left it alone.`);
    return;
  }
  await client.createIfNotExists(doc);
  console.log(`Created "${doc._id}". Open it in the Studio to review and publish edits.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
