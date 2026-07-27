import type { Metadata } from "next";
import NewsletterLayout from "@/components/newsletter/NewsletterLayout";

export const metadata: Metadata = {
  title: "Keewee Club — the B2B SaaS marketing newsletter — keewee.in",
  description:
    "One tactic we used this quarter, what's happening in B2B SaaS this week, and one thing worth stealing before your competitors find it. Five minutes, every Thursday.",
};

export default function NewsletterPage() {
  return <NewsletterLayout />;
}
