import { defineField, defineType } from "sanity";

/**
 * Copy for the cookie consent banner rendered site-wide by
 * `components/consent/CookieConsent.tsx`.
 *
 * The site currently sets no analytics or tracking cookies, so `enabled`
 * defaults to off — nothing non-essential is stored and there is nothing to
 * consent to yet. Turn it on in the same change that introduces GA4, Clarity,
 * or any other non-essential cookie: the banner blocks those scripts until the
 * visitor accepts (see `lib/consent.ts`). Essential cookies (draft mode,
 * perspective) are exempt and never gated.
 */
export const cookieConsent = defineType({
  name: "cookieConsent",
  title: "Cookie consent banner",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Show the banner",
      type: "boolean",
      initialValue: false,
      description:
        "Leave off while the site sets only essential cookies. Turn on when analytics or other non-essential cookies are added — the banner gates those until the visitor accepts.",
    }),
    defineField({
      name: "title",
      type: "string",
      description: "Short heading, e.g. “We use cookies”.",
      initialValue: "We use cookies",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "message",
      type: "text",
      rows: 3,
      description:
        "One or two sentences explaining what analytics cookies are for and that essential cookies are always on.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "acceptLabel",
      title: "Accept button label",
      type: "string",
      initialValue: "Accept",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "declineLabel",
      title: "Decline button label",
      type: "string",
      initialValue: "Decline",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "policyLink",
      title: "Policy link",
      type: "link",
      description:
        "Optional. Links to the cookie section of the privacy policy, e.g. /legal/privacy-policy.",
    }),
  ],
  preview: {
    select: { title: "title", enabled: "enabled" },
    prepare: ({ title, enabled }) => ({
      title: title ?? "Cookie consent banner",
      subtitle: enabled ? "Shown" : "Hidden",
    }),
  },
});
