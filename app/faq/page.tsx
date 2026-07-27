import type { Metadata } from "next";
import FaqLayout from "@/components/faq/FaqLayout";

export const metadata: Metadata = {
  title: "FAQ — keewee.in",
  description:
    "We've answered the questions that actually matter about pricing, how we work, our services, who we work with, and privacy. Still not sure? We're one conversation away.",
};

export default function FaqPage() {
  return <FaqLayout />;
}
