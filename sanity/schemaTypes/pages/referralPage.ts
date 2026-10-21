import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Copy for `/referral-program` and its `/referral-program/thank-you` page.
 *
 * Which inputs the form asks for, and which are required, is code
 * (`components/referral/ReferralForm.tsx`) — the labels, step titles and
 * messages are here. "Step 2 of 3" and the 01–04 numbering are derived.
 */
const formLabel = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "string", description });

export const referralPage = defineType({
  name: "referralPage",
  title: "Referral program page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "form", title: "Form" },
    { name: "steps", title: "How it works" },
    { name: "earn", title: "Earn / who can refer" },
    { name: "terms", title: "Terms" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Closing CTA" },
    { name: "thankYou", title: "Thank-you page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", group: "hero" }),
    defineField({
      name: "sticker",
      title: "Sticker",
      type: "string",
      group: "hero",
      description: "The tilted label beside the eyebrow, e.g. “Up to $150!”",
    }),
    defineField({ name: "headline", type: "headline", group: "hero" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "note",
      title: "Note",
      type: "text",
      rows: 2,
      group: "hero",
      description: "The green panel under the intro.",
    }),

    defineField({
      name: "form",
      title: "Form copy",
      type: "object",
      group: "form",
      options: { collapsible: false },
      fields: [
        formLabel("stepLabel", "Step label", "Use {step} and {total}, e.g. “Step {step} of {total}”."),
        formLabel("step1Title", "Step 1 title"),
        formLabel("step2Title", "Step 2 title"),
        formLabel("step3Title", "Step 3 title"),

        formLabel("nameLabel", "Your name"),
        formLabel("emailLabel", "Your email"),
        formLabel("phoneLabel", "Your phone"),
        formLabel("linkedinLabel", "Your LinkedIn"),

        formLabel("companyLabel", "Company name"),
        formLabel("websiteLabel", "Company website"),
        formLabel("contactNameLabel", "Contact's name"),
        formLabel("contactRoleLabel", "Contact's role"),
        formLabel("contactEmailLabel", "Contact's email"),
        formLabel("contactPhoneLabel", "Contact's phone"),
        formLabel("contactLinkedinLabel", "Contact's LinkedIn"),

        formLabel("spokeQuestion", "“Have you spoken to them” question"),
        formLabel("spokeYesLabel", "…yes option"),
        formLabel("spokeNoLabel", "…no option"),
        formLabel(
          "mentionQuestion",
          "“Can we mention your name” question",
          "Only shown for cold leads."
        ),
        formLabel("mentionYesLabel", "…yes option"),
        formLabel("mentionNoLabel", "…no option"),
        formLabel("notesLabel", "Notes label"),
        formLabel("agreeLabel", "Terms checkbox"),

        formLabel("requiredError", "Required-field error"),
        formLabel("emailError", "Invalid-email error"),
        formLabel("linkedinError", "Invalid-LinkedIn error"),
        formLabel("pickOneError", "Unanswered-question error"),
        formLabel("agreeError", "Terms-not-ticked error"),
        formLabel("genericError", "Submission failed"),
        formLabel("throttledError", "Submission throttled"),

        formLabel("backLabel", "Back button"),
        formLabel("nextLabel", "Next button"),
        formLabel("submitLabel", "Submit button"),
        formLabel("submittingLabel", "Submit button while sending"),
      ],
    }),

    defineField({
      name: "stepsHeadline",
      title: "Headline",
      type: "headline",
      group: "steps",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "steps",
      description: "Numbered 01, 02… in order. The last one is highlighted.",
      of: [defineArrayMember({ type: "titledCard" })],
    }),

    defineField({ name: "earnHeadline", title: "Earn: headline", type: "string", group: "earn" }),
    defineField({
      name: "earnAmount",
      title: "Earn: big figure",
      type: "string",
      group: "earn",
      description: "e.g. “$50 to $150”",
    }),
    defineField({ name: "earnBody", title: "Earn: body", type: "text", rows: 3, group: "earn" }),
    defineField({
      name: "earnNote",
      title: "Earn: closing line",
      type: "string",
      group: "earn",
    }),
    defineField({ name: "whoHeadline", title: "Who: headline", type: "string", group: "earn" }),
    defineField({ name: "whoAmount", title: "Who: big word", type: "string", group: "earn" }),
    defineField({ name: "whoBody", title: "Who: body", type: "text", rows: 3, group: "earn" }),

    defineField({ name: "termsHeadline", title: "Headline", type: "string", group: "terms" }),
    defineField({
      name: "terms",
      title: "Terms",
      type: "array",
      group: "terms",
      of: [defineArrayMember({ type: "text", rows: 2 })],
    }),

    defineField({ name: "faqHeadline", title: "Headline", type: "string", group: "faq" }),
    defineField({
      name: "faqItems",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "faqItem" })],
    }),

    defineField({ name: "ctaHeadline", title: "Headline", type: "headline", group: "cta" }),
    defineField({ name: "ctaBody", title: "Body", type: "text", rows: 2, group: "cta" }),
    defineField({
      name: "ctaButton",
      title: "Button",
      type: "link",
      group: "cta",
      description: "Use #referral-form to jump back to the form.",
    }),
    defineField({
      name: "ctaContact",
      title: "Contact line",
      type: "richText",
      group: "cta",
      description: "The small print under the button.",
    }),

    defineField({
      name: "thankYouSticker",
      title: "Sticker",
      type: "string",
      group: "thankYou",
    }),
    defineField({
      name: "thankYouHeadline",
      title: "Headline",
      type: "headline",
      group: "thankYou",
    }),
    defineField({
      name: "thankYouBody",
      title: "Body",
      type: "text",
      rows: 3,
      group: "thankYou",
      description: "{company} is replaced with the company they just referred.",
    }),
    defineField({
      name: "thankYouCompanyFallback",
      title: "Company fallback",
      type: "string",
      group: "thankYou",
      description: "Used for {company} when the page is opened directly.",
    }),
    defineField({
      name: "thankYouNote",
      title: "Note pill",
      type: "string",
      group: "thankYou",
      description:
        "The pill under the body. Leave empty unless a confirmation email really is sent.",
    }),
    defineField({
      name: "anotherHeadline",
      title: "“Refer another” card: headline",
      type: "string",
      group: "thankYou",
    }),
    defineField({
      name: "anotherBody",
      title: "“Refer another” card: body",
      type: "text",
      rows: 2,
      group: "thankYou",
    }),
    defineField({
      name: "anotherButton",
      title: "“Refer another” card: button",
      type: "link",
      group: "thankYou",
    }),
    defineField({
      name: "callHeadline",
      title: "Call card: headline",
      type: "string",
      group: "thankYou",
    }),
    defineField({ name: "callBody", title: "Call card: body", type: "richText", group: "thankYou" }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Referral program page" }) },
});
