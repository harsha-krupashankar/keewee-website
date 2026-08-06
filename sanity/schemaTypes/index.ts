import type { SchemaTypeDefinition } from "sanity";

import { headline } from "./objects/headline";
import { postBody, richText } from "./objects/richText";
import { pageHero } from "./objects/pageHero";
import { seo } from "./objects/seo";
import {
  checkboxGroup,
  cta,
  faqItem,
  figure,
  funnelStage,
  link,
  navGroup,
  sectionHeader,
  socialLink,
  serviceCategory,
  titledCard,
} from "./objects/primitives";
import {
  legalClause,
  legalContact,
  legalDefinition,
  legalList,
  legalNote,
  legalParagraph,
  legalSection,
  legalSubheading,
} from "./objects/legalBlocks";

import { category } from "./documents/category";
import { faqGroup } from "./documents/faqGroup";
import { legalDoc } from "./documents/legalDoc";
import { person } from "./documents/person";
import { post } from "./documents/post";
import { servicePage } from "./documents/servicePage";
import { siteSettings } from "./documents/siteSettings";

import { aboutPage } from "./pages/aboutPage";
import { blogIndexPage } from "./pages/blogIndexPage";
import { faqPage } from "./pages/faqPage";
import { freeAuditPage } from "./pages/freeAuditPage";
import { homePage } from "./pages/homePage";
import { newsletterPage } from "./pages/newsletterPage";
import { servicesPage } from "./pages/servicesPage";

/**
 * Documents that must never have more than one instance. The Studio structure
 * (see `sanity/structure.ts`) turns these into a single edit link, and
 * `sanity/lib/queries` reads them by `_type` rather than by id.
 */
export const SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "blogIndexPage",
  "faqPage",
  "freeAuditPage",
  "newsletterPage",
  "servicesPage",
] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects — reused across documents.
  headline,
  richText,
  postBody,
  pageHero,
  seo,
  figure,
  link,
  navGroup,
  socialLink,
  cta,
  sectionHeader,
  faqItem,
  titledCard,
  funnelStage,
  serviceCategory,
  checkboxGroup,
  legalParagraph,
  legalClause,
  legalSubheading,
  legalDefinition,
  legalList,
  legalNote,
  legalContact,
  legalSection,

  // Singletons — one document each.
  siteSettings,
  homePage,
  aboutPage,
  blogIndexPage,
  faqPage,
  freeAuditPage,
  newsletterPage,
  servicesPage,

  // Collections.
  post,
  category,
  person,
  servicePage,
  faqGroup,
  legalDoc,
];
