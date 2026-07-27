import type { Metadata } from "next";
import FreeAuditLayout from "@/components/free-audit/FreeAuditLayout";

export const metadata: Metadata = {
  title: "Free 30-Minute Marketing Audit — keewee.in",
  description:
    "We go through your positioning, your funnel, and your content. You walk away knowing what to fix, what to cut, and what to double down on.",
};

export default function FreeAuditPage() {
  return <FreeAuditLayout />;
}
