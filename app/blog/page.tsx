import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import BlogTopReads from "@/components/blog/BlogTopReads";
import BlogNewsletterBanner from "@/components/blog/BlogNewsletterBanner";
import BlogArchive from "@/components/blog/BlogArchive";
import BlogCtaBanner from "@/components/blog/BlogCtaBanner";

export const metadata: Metadata = {
  title: "Blog — keewee.in",
  description:
    "Literally the best content on B2B SaaS marketing. Positioning, SEO, demand gen, paid media, conversion, and everything in between.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <BlogHero />
        <BlogTopReads />
        <BlogNewsletterBanner />
        <BlogArchive />
        <BlogCtaBanner />
      </main>
      <Footer />
    </>
  );
}
