"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogControls } from "@/components/blog/BlogControls";
import { BlogListRow } from "@/components/blog/BlogListRow";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { processPosts } from "@/lib/blog-utils";

type BlogPostItem = {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  category?: {
    name: string;
    slug?: string;
  } | null;
  tags?: string[];
  readTime?: string;
  createdAt?: string | Date;
};

export default function BlogClientPage({ initialPosts }: { initialPosts: BlogPostItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<"newest" | "oldest" | "title-asc" | "title-desc">("newest");
  const [view, setView] = useState<"list" | "card">("list");

  const allCategories = useMemo(
    () =>
      Array.from(
        new Set(
          (initialPosts || [])
            .map((post) => post.category?.name)
            .filter((value): value is string => Boolean(value))
        )
      ),
    [initialPosts]
  );

  const visiblePosts = useMemo(
    () =>
      processPosts({
        posts: initialPosts,
        query,
        tag: category,
        sort,
      }),
    [initialPosts, query, category, sort]
  ) as BlogPostItem[];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_38%),linear-gradient(180deg,rgba(248,250,252,0.92),rgba(255,255,255,1))] dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(180deg,rgba(3,7,18,1),rgba(2,6,23,1))]">
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mb-8 grid gap-4 rounded-[1.75rem] border border-border/70 bg-background/70 p-5 sm:grid-cols-3 sm:p-6">
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Learn And Build
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Articles for business owners, students, and developers.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Use the blog to understand SEO, frontend systems, performance, and practical product decisions.
              If you want full project breakdowns, jump into the case studies next.
            </p>
          </div>
          <div className="flex flex-col gap-3 self-start">
            <Link
              href="/case-studies"
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-500/15 dark:text-emerald-300"
            >
              Explore case studies
            </Link>
            <Link
              href="/freelance-web-developer-patna"
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Need a website or app?
            </Link>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Blog
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{initialPosts.length} posts</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <span>{allCategories.length} categories</span>
          </div>
        </div>

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

        {visiblePosts.length > 0 ? (
          view === "list" ? (
            <div className="space-y-3">
              {visiblePosts.map((p) => (
                <BlogListRow
                  key={p._id.toString()}
                  href={`/blog/${p.slug || p._id}`}
                  title={p.title}
                  excerpt={p.excerpt || "Read the full article..."}
                  category={p.category?.name}
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
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {visiblePosts.map((p) => (
                <BlogPostCard
                  key={p._id.toString()}
                  href={`/blog/${p.slug || p._id}`}
                  title={p.title}
                  excerpt={p.excerpt || "Read the full article..."}
                  image={p.coverImage}
                  category={p.category?.name}
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
          <div className="rounded-3xl border border-dashed border-border/80 py-16 text-center text-sm text-muted-foreground">
            No posts found for this filter.
          </div>
        )}

        <div className="mt-10 border-t border-border/60 pt-8">
          <div className="mb-4 max-w-2xl">
            <h2 className="text-lg font-semibold">Stay in the loop</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fresh articles on search visibility, UI craft, and practical frontend systems.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              For readers improving their frontend basics, explore{" "}
              <a
                href="https://html5andcss3.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 underline decoration-emerald-500/40 underline-offset-4 transition hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
              >
                HTML5 and CSS3 tutorials
              </a>
              .
            </p>
          </div>
          <NewsletterForm variant="default" location="blog" />
        </div>
      </section>
    </main>
  );
}
