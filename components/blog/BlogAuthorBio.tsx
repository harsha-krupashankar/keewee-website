import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import BlogImagePlaceholder from "./BlogImagePlaceholder";
import type { BlogPost } from "@/lib/blog-data";

export default function BlogAuthorBio({ post }: { post: BlogPost }) {
  return (
    <section className="pb-2 pt-9">
      <Container>
        <Reveal className="mx-auto max-w-[720px]">
          <div className="flex items-center gap-4.5 rounded-[18px] border border-border bg-white p-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)]">
            <div className="h-15 w-15 shrink-0 overflow-hidden rounded-full border-2 border-ink shadow-[2px_2px_0_#1C1B19]">
              <BlogImagePlaceholder label="Photo" shape="circle" />
            </div>
            <div>
              <div className="mb-1 font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
                Written by
              </div>
              <div className="font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
                {post.author.name}, {post.author.role}
              </div>
              <p className="mt-1.5 font-body text-sm font-medium leading-relaxed text-muted">
                {post.author.bio}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
