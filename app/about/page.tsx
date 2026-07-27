import type { Metadata } from "next";
import AboutLayout from "@/components/about/AboutLayout";

export const metadata: Metadata = {
  title: "About — keewee.in",
  description:
    "Three friends, one phone call, one very deliberate decision. Meet the founder trio behind Keewee and why we started a B2B marketing agency with an actual opinion.",
};

export default function AboutPage() {
  return <AboutLayout />;
}
