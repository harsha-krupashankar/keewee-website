import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SanityImage from "@/components/sanity/SanityImage";
import type { Post } from "@/sanity/lib/types";

export default function BlogAuthorBio({ post }: { post: Post }) {
  const author = post.author;
  if (!author) return null;

  return (
    <section className="pb-2 pt-9">
      <Container>
        <Reveal className="mx-auto max-w-[720px]">
          <div className="flex items-center gap-4.5 rounded-[18px] border border-border bg-white p-6 shadow-[0_8px_24px_rgba(28,27,25,0.04)]">
            <div className="flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-green-bg font-display font-extrabold text-green-dark shadow-[2px_2px_0_#1C1B19]">
              {author.photo?.asset ? (
                <SanityImage
                  image={author.photo}
                  width={120}
                  sizes="60px"
                  className="h-full w-full object-cover"
                />
              ) : (
                author.initials
              )}
            </div>
            <div>
              <div className="mb-1 font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
                Written by
              </div>
              <div className="font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
                {author.name}, {author.role}
              </div>
              {author.bio && (
                <p className="mt-1.5 font-body text-sm font-medium leading-relaxed text-muted">
                  {author.bio}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
