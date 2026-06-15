"use client";

import { useMemo, useState } from "react";
import { BlogControls } from "@/components/blog/BlogControls";
import { BlogListRow } from "@/components/blog/BlogListRow";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { processPosts } from "@/lib/blog-utils";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

type LegacyBlogPost = {
  _id?: string;
  title: string;
  slug?: string;
  content?: unknown;
  tags?: string[];
  readTime?: string;
  createdAt?: string | Date;
  category?: {
    name: string;
    slug?: string;
  } | null;
};

function extractExcerpt(content: unknown): string {
  if (!content) return "Read the full article…";

  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    return (
      parsed?.content?.[1]?.content?.[0]?.text ??
      String(content).replace(/<[^>]+>/g, "").slice(0, 120)
    );
  } catch {
    return String(content).replace(/<[^>]+>/g, "").slice(0, 120);
  }
}

type Props = {
  posts?: LegacyBlogPost[];
};

export default function BlogClient({ posts = [] }: Props) {
  /* ---------------- STATE ---------------- */
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<
    "newest" | "oldest" | "title-asc" | "title-desc"
  >("newest");
  const [view, setView] = useState<"list" | "card">("list");

  /* ---------------- CATEGORIES ---------------- */
  const allCategories = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    return Array.from(
      new Set(
        posts
          .map((p) => p?.category?.name)
          .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      )
    );
  }, [posts]);

  /* ---------------- FILTER PIPELINE ---------------- */
  const visiblePosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    return processPosts({
      posts,
      query,
      tag: category,
      sort,
    });
  }, [posts, query, category, sort]);

  return (
    <>
      {/* Controls */}
      <BlogControls
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={allCategories}
        view={view}
        setView={setView}
      />

      {/* List */}
      {visiblePosts.length > 0 ? (
        view === "list" ? (
          <div className="space-y-3">
            {visiblePosts.map((p) => (
              <BlogListRow
                key={p._id?.toString()}
                href={`/blog/${p.slug || p._id}`}
                title={p.title}
                excerpt={extractExcerpt(p.content)}
                tags={p.tags || ["Article"]}
                readTime={p.readTime || "5 min"}
                date={
                  p.createdAt
                    ? new Date(p.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {visiblePosts.map((p) => (
              <BlogPostCard
                key={p._id?.toString()}
                href={`/blog/${p.slug || p._id}`}
                title={p.title}
                excerpt={extractExcerpt(p.content)}
                tags={p.tags || ["Article"]}
                readTime={p.readTime || "5 min"}
                date={
                  p.createdAt
                    ? new Date(p.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : undefined
                }
              />
            ))}
          </div>
        )
      ) : (
        <div className="py-20 text-center text-sm text-muted-foreground">
          No posts found.
        </div>
      )}

      {/* Newsletter */}
      <div className="mt-14">
        <NewsletterForm variant="default" location="blog" />
      </div>
    </>
  );
}
