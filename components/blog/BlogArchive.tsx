"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import Headline from "@/components/sanity/Headline";
import BlogPostCard from "./BlogPostCard";
import type { Category, PostSummary, SectionHeader } from "@/sanity/lib/types";

const PAGE_SIZE = 6;
const ALL = "all";

export default function BlogArchive({
  header,
  posts,
  categories,
}: {
  header?: SectionHeader | null;
  posts: PostSummary[];
  categories: Category[];
}) {
  const [activeId, setActiveId] = useState<string>(ALL);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      activeId === ALL
        ? posts
        : posts.filter((post) => post.category?._id === activeId),
    [activeId, posts]
  );

  const visiblePosts = filtered.slice(0, visibleCount);
  const showLoadMore = visibleCount < filtered.length;

  function selectCategory(id: string) {
    setActiveId(id);
    setVisibleCount(PAGE_SIZE);
  }

  // A category with zero posts is a dead click — advertising a topic chip
  // that clears the grid with nothing in it. Filtering to categories that
  // actually have a post keeps the chip row honest as posts get added.
  const categoriesWithPosts = useMemo(() => {
    const idsInUse = new Set(posts.map((post) => post.category?._id));
    return categories.filter((category) => idsInUse.has(category._id));
  }, [categories, posts]);

  // "All" is not a document — it's a UI affordance, so it is prepended here
  // rather than living as a real category an editor could delete.
  const pills = [{ _id: ALL, title: "All", slug: ALL }, ...categoriesWithPosts];

  return (
    <section className="pb-14 sm:pb-16">
      <Container>
        {header?.eyebrow && (
          <div className="mb-5 flex items-center gap-3">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-green">
              {header.eyebrow}
            </span>
            <span className="flex-1 border-b border-border-line" />
          </div>
        )}
        <h2 className="mb-6 font-display text-[28px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[44px]">
          <Headline value={header?.headline} />
        </h2>

        <div className="mb-8 flex flex-wrap gap-2.5">
          {pills.map((category) => {
            const on = category._id === activeId;
            return (
              <button
                key={category._id}
                type="button"
                onClick={() => selectCategory(category._id)}
                aria-pressed={on}
                className={`cursor-pointer rounded-full px-4 py-2.5 font-display text-[13px] font-bold tracking-[-0.01em] transition-all duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-2 ${
                  on
                    ? "border-2 border-ink bg-green text-white shadow-[2px_2px_0_#1C1B19]"
                    : "border border-border bg-white text-body hover:border-border-soft"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        {visiblePosts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border-soft bg-surface px-6 py-8 text-center font-body text-[15px] font-medium text-body">
            No posts in this topic yet — check back soon.
          </p>
        )}

        {showLoadMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="cursor-pointer rounded-xl border-2 border-ink bg-transparent px-7.5 py-3.5 font-display text-base font-bold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px]"
            >
              Load more
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
