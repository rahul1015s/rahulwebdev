"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogControls } from "@/components/blog/BlogControls";
import { BlogListRow } from "@/components/blog/BlogListRow";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { processPosts } from "@/lib/blog-utils";

type BlogPostItem = {
  _id: string;
  title: string;
  slug?: string;
  content?: string;
  tags?: string[];
  readTime?: string;
  createdAt?: string | Date;
};

function extractExcerpt(content: unknown): string {
  if (typeof content !== "string") return "Read the full article...";

  try {
    const parsed = JSON.parse(content);
    return (
      parsed?.content?.[1]?.content?.[0]?.text ??
      content.replace(/<[^>]+>/g, "").slice(0, 120)
    );
  } catch {
    return content.replace(/<[^>]+>/g, "").slice(0, 120);
  }
}

export default function BlogClientPage({ initialPosts }: { initialPosts: BlogPostItem[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"newest" | "oldest" | "title-asc" | "title-desc">("newest");
  const [view, setView] = useState<"list" | "card">("card");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    setView(desktop ? "card" : "list");
  }, []);

  const allTags = useMemo(
    () => Array.from(new Set((initialPosts || []).flatMap((p) => p.tags || []))),
    [initialPosts]
  );

  const visiblePosts = useMemo(
    () =>
      processPosts({
        posts: initialPosts,
        query,
        tag,
        sort,
      }),
    [initialPosts, query, tag, sort]
  ) as BlogPostItem[];

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-4xl px-3 pb-8 pt-14 sm:px-5 sm:pb-10 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mb-5">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Notes on engineering, product, and practical web development.
          </p>
        </div>

        <BlogControls
          query={query}
          setQuery={setQuery}
          tag={tag}
          setTag={setTag}
          sort={sort}
          setSort={setSort}
          tags={allTags}
          view={view}
          setView={setView}
        />

        {visiblePosts.length > 0 ? (
          view === "list" ? (
            <div className="space-y-2">
              {visiblePosts.map((p) => (
                <BlogListRow
                  key={p._id.toString()}
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
                  key={p._id.toString()}
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
          <div className="py-16 text-center text-sm text-muted-foreground">No posts found.</div>
        )}

        <div className="mt-8">
          <NewsletterForm variant="default" location="blog" />
        </div>
      </section>
    </main>
  );
}
