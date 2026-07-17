import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { legalDocs } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Privacy Policy — keewee.in",
  description:
    "How we collect, use, store, and protect your personal data. No dark patterns, no data brokers.",
};

const doc = legalDocs.find((d) => d.key === "privacy")!;

export default function PrivacyPage() {
  return <LegalLayout doc={doc} />;
}
