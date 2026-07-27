import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/FinalCta";
import type { BlogPost } from "@/lib/blog-data";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostBody from "./BlogPostBody";
import BlogAuthorBio from "./BlogAuthorBio";
import BlogRelatedPosts from "./BlogRelatedPosts";
import BlogNewsletter from "./BlogNewsletter";

export default function BlogPostLayout({ post }: { post: BlogPost }) {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <BlogPostHeader post={post} />
        <BlogPostBody post={post} />
        <BlogAuthorBio post={post} />
        <BlogRelatedPosts post={post} />
        <BlogNewsletter />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
