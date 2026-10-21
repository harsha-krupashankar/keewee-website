import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * `/referral` and its `/referral/thank-you` confirmation. They share one
 * document because the thank-you page only exists to close the form's loop —
 * an editor changing the commission range should see both places it appears.
 *
 * The step numbers, the "01"–"04" on the how-it-works cards and the `#terms`
 * anchor are derived in code, not stored.
 */
export const referralPage = defineType({
  name: "referralPage",
  title: "Referral page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "form", title: "Referral form" },
    { name: "howItWorks", title: "How it works" },
    { name: "earnings", title: "Earnings & eligibility" },
    { name: "terms", title: "Terms" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "Closing CTA" },
    { name: "thankYou", title: "Thank-you page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "hero",
      description: "Small uppercase label above the headline, e.g. “Referral program”.",
    }),
    defineField({
      name: "heroSticker",
      title: "Sticker",
      type: "string",
      group: "hero",
      description: "The tilted label beside the eyebrow, e.g. “Up to $150!”",
    }),
    defineField({ name: "heroHeadline", title: "Headline", type: "headline", group: "hero" }),
    defineField({ name: "heroIntro", title: "Intro", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroNote",
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
      fieldsets: [
        { name: "step1", title: "Step 1 — referrer" },
        { name: "step2", title: "Step 2 — company" },
        { name: "step3", title: "Step 3 — about the referral" },
        { name: "actions", title: "Buttons" },
        { name: "errors", title: "Error messages" },
      ],
      fields: [
        defineField({
          name: "stepLabel",
          title: "Step label",
          type: "string",
          description: "{current} and {total} are filled in, e.g. “Step {current} of {total}”.",
        }),

        defineField({ name: "step1Title", title: "Title", type: "string", fieldset: "step1" }),
        defineField({ name: "nameLabel", title: "Name label", type: "string", fieldset: "step1" }),
        defineField({ name: "emailLabel", title: "Email label", type: "string", fieldset: "step1" }),
        defineField({ name: "phoneLabel", title: "Phone label", type: "string", fieldset: "step1" }),
        defineField({
          name: "linkedinLabel",
          title: "LinkedIn label",
          type: "string",
          fieldset: "step1",
        }),

        defineField({ name: "step2Title", title: "Title", type: "string", fieldset: "step2" }),
        defineField({
          name: "companyLabel",
          title: "Company name label",
          type: "string",
          fieldset: "step2",
        }),
        defineField({
          name: "websiteLabel",
          title: "Company website label",
          type: "string",
          fieldset: "step2",
        }),
        defineField({
          name: "contactNameLabel",
          title: "Contact name label",
          type: "string",
          fieldset: "step2",
        }),
        defineField({
          name: "contactRoleLabel",
          title: "Contact role label",
          type: "string",
          fieldset: "step2",
        }),
        defineField({
          name: "contactEmailLabel",
          title: "Contact email label",
          type: "string",
          fieldset: "step2",
        }),
        defineField({
          name: "contactPhoneLabel",
          title: "Contact phone label",
          type: "string",
          fieldset: "step2",
        }),
        defineField({
          name: "contactLinkedinLabel",
          title: "Contact LinkedIn label",
          type: "string",
          fieldset: "step2",
        }),

        defineField({ name: "step3Title", title: "Title", type: "string", fieldset: "step3" }),
        defineField({
          name: "spokeQuestion",
          title: "“Have you spoken to them” question",
          type: "string",
          fieldset: "step3",
        }),
        defineField({ name: "spokeYesLabel", title: "Warm option", type: "string", fieldset: "step3" }),
        defineField({ name: "spokeNoLabel", title: "Cold option", type: "string", fieldset: "step3" }),
        defineField({
          name: "mentionQuestion",
          title: "“Can we mention your name” question",
          type: "string",
          fieldset: "step3",
          description: "Only asked for cold leads.",
        }),
        defineField({ name: "mentionYesLabel", title: "Yes option", type: "string", fieldset: "step3" }),
        defineField({ name: "mentionNoLabel", title: "No option", type: "string", fieldset: "step3" }),
        defineField({ name: "notesLabel", title: "Notes label", type: "string", fieldset: "step3" }),
        defineField({ name: "agreeLabel", title: "Terms checkbox", type: "string", fieldset: "step3" }),

        defineField({ name: "backLabel", title: "Back", type: "string", fieldset: "actions" }),
        defineField({ name: "nextLabel", title: "Next", type: "string", fieldset: "actions" }),
        defineField({ name: "submitLabel", title: "Submit", type: "string", fieldset: "actions" }),
        defineField({
          name: "submittingLabel",
          title: "Submitting",
          type: "string",
          fieldset: "actions",
          description: "Shown on the submit button while the referral is sending.",
        }),

        defineField({
          name: "requiredError",
          title: "Required field",
          type: "string",
          fieldset: "errors",
        }),
        defineField({
          name: "invalidEmailError",
          title: "Invalid email",
          type: "string",
          fieldset: "errors",
        }),
        defineField({
          name: "pickOneError",
          title: "Unanswered question",
          type: "string",
          fieldset: "errors",
        }),
        defineField({ name: "agreeError", title: "Terms not agreed", type: "string", fieldset: "errors" }),
        defineField({
          name: "submitError",
          title: "Submission failed",
          type: "string",
          fieldset: "errors",
        }),
        defineField({
          name: "throttledError",
          title: "Too many submissions",
          type: "string",
          fieldset: "errors",
        }),
      ],
    }),

    defineField({
      name: "howItWorksHeadline",
      title: "Headline",
      type: "headline",
      group: "howItWorks",
    }),
    defineField({
      name: "howItWorksSteps",
      title: "Steps",
      type: "array",
      group: "howItWorks",
      description: "Numbered in order. The last step gets the green card.",
      of: [defineArrayMember({ type: "titledCard" })],
    }),

    defineField({
      name: "earningsHeadline",
      title: "Earnings headline",
      type: "headline",
      group: "earnings",
    }),
    defineField({
      name: "earningsFigure",
      title: "Earnings figure",
      type: "string",
      group: "earnings",
      description: "The big lime line, e.g. “$50 to $150”.",
    }),
    defineField({
      name: "earningsBody",
      title: "Earnings body",
      type: "text",
      rows: 4,
      group: "earnings",
    }),
    defineField({
      name: "earningsFootnote",
      title: "Earnings footnote",
      type: "string",
      group: "earnings",
    }),
    defineField({
      name: "eligibilityHeadline",
      title: "Eligibility headline",
      type: "headline",
      group: "earnings",
    }),
    defineField({
      name: "eligibilityFigure",
      title: "Eligibility figure",
      type: "string",
      group: "earnings",
      description: "The big green line, e.g. “Anyone.”",
    }),
    defineField({
      name: "eligibilityBody",
      title: "Eligibility body",
      type: "text",
      rows: 4,
      group: "earnings",
    }),

    defineField({ name: "termsHeadline", title: "Headline", type: "headline", group: "terms" }),
    defineField({
      name: "terms",
      title: "Terms",
      type: "array",
      group: "terms",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),

    defineField({ name: "faqHeadline", title: "Headline", type: "headline", group: "faq" }),
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
      description: "Use #referral-form to jump back up to the form.",
    }),
    defineField({
      name: "ctaContact",
      title: "Contact line",
      type: "richText",
      group: "cta",
      description: "The small line under the rule, with the email and booking links.",
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
      rows: 4,
      group: "thankYou",
      description: "{company} is replaced with the company name the visitor entered.",
    }),
    defineField({
      name: "thankYouCompanyFallback",
      title: "Company fallback",
      type: "string",
      group: "thankYou",
      description: "Stands in for {company} when the name is not known, e.g. “your referral”.",
    }),
    defineField({
      name: "thankYouNote",
      title: "Note",
      type: "string",
      group: "thankYou",
      description: "The green pill with the envelope icon.",
    }),
    defineField({
      name: "anotherHeadline",
      title: "“Refer another” headline",
      type: "headline",
      group: "thankYou",
    }),
    defineField({
      name: "anotherBody",
      title: "“Refer another” body",
      type: "text",
      rows: 2,
      group: "thankYou",
    }),
    defineField({
      name: "anotherButton",
      title: "“Refer another” button",
      type: "link",
      group: "thankYou",
    }),
    defineField({
      name: "callHeadline",
      title: "“Book a call” headline",
      type: "headline",
      group: "thankYou",
    }),
    defineField({
      name: "callBody",
      title: "“Book a call” body",
      type: "richText",
      group: "thankYou",
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
    defineField({
      name: "thankYouSeo",
      title: "Thank-you page SEO",
      type: "seo",
      group: "seo",
      description: "The thank-you page is always hidden from search engines.",
    }),
  ],
  preview: { prepare: () => ({ title: "Referral page" }) },
});
