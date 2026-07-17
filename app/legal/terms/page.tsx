import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { legalDocs } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Terms of Service — keewee.in",
  description:
    "The ground rules for working with Keewee — written plainly, because contracts you can't read protect no one.",
};

const doc = legalDocs.find((d) => d.key === "terms")!;

export default function TermsPage() {
  return <LegalLayout doc={doc} />;
}
