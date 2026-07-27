import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PerspectiveGate from "@/components/PerspectiveGate";
import SiteShell from "@/components/SiteShell";
import BlogAuthorBio from "@/components/blog/BlogAuthorBio";
import BlogPostBody from "@/components/blog/BlogPostBody";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogRelatedPosts from "@/components/blog/BlogRelatedPosts";
import { metadataFrom } from "@/lib/metadata";
import {
  getPost,
  getPostSlugs,
  getSiteSettings,
  toStaticParams,
} from "@/sanity/lib/content";
import { PUBLISHED, type FetchOptions } from "@/sanity/lib/live";

export async function generateStaticParams() {
  return toStaticParams(await getPostSlugs());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPost(slug, PUBLISHED),
    getSiteSettings(PUBLISHED),
  ]);
  if (!post) return {};

  return metadataFrom({
    seo: post.seo,
    settings,
    title: `${post.title} — ${settings?.title ?? "keewee.in"} blog`,
    description: post.dek,
  });
}

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PerspectiveGate render={(opts) => <Content slug={slug} opts={opts} />} />;
}

async function Content({ slug, opts }: { slug: string; opts: FetchOptions }) {
  const post = await getPost(slug, opts);
  if (!post) notFound();

  return (
    <SiteShell opts={opts}>
      <BlogPostHeader post={post} />
      <BlogPostBody post={post} />
      <BlogAuthorBio post={post} />
      <BlogRelatedPosts post={post} />
    </SiteShell>
  );
}
