import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { topReads } from "@/lib/blog-data";
import BlogPostCard from "./BlogPostCard";

export default function BlogTopReads() {
  return (
    <section className="py-12 sm:py-14">
      <Container>
        <div className="mb-5 flex items-center gap-3">
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
            Start here
          </span>
          <span className="flex-1 border-b border-border-line" />
        </div>
        <h2 className="mb-2.5 font-display text-[28px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[44px]">
          Our most-loved blogs
        </h2>
        <p className="mb-7 max-w-[680px] font-body text-base font-medium leading-relaxed text-body">
          New here? These give you the clearest picture of how we think and
          what we believe about B2B marketing.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topReads.map((post, i) => (
            <Reveal key={post.id} delay={i * 80}>
              <BlogPostCard post={post} size="lg" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
