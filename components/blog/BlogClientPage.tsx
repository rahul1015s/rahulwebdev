"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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

export default function BlogClientPage({
  initialPosts,
}: {
  initialPosts: BlogPostItem[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<"newest" | "oldest" | "title-asc" | "title-desc">(
    "newest",
  );

  const allCategories = useMemo(
    () =>
      Array.from(
        new Set(
          (initialPosts || [])
            .map((post) => post.category?.name)
            .filter((value): value is string => Boolean(value)),
        ),
      ),
    [initialPosts],
  );

  const visiblePosts = useMemo(
    () =>
      processPosts({
        posts: initialPosts,
        query,
        tag: category,
        sort,
      }),
    [initialPosts, query, category, sort],
  ) as BlogPostItem[];

  return (
    <main className="case-files-shell min-h-screen pt-24 pb-10">
      <section className="case-stage pb-24">
        <div className="case-masthead">
          <div>
            <span className="case-kicker">Rahul Verma · Blog</span>
            <h1 className="case-title">Field Notes</h1>
          </div>

          <div className="case-masthead-meta">
            <div>Short technical writing</div>
            <div>SEO, frontend, product work</div>
          </div>
        </div>

        <div className="case-subrule">
          <span>{initialPosts.length} published posts</span>
          <span>{allCategories.length} categories</span>
        </div>

        <p className="case-intro">
          Short notes on web development, SEO, frontend systems, and product
          decisions. For full project walkthroughs, use the case studies.
        </p>

        <div className="grid gap-4 border border-[#b7a888] bg-[#f6f0e2] p-4 md:grid-cols-[minmax(0,1fr)_180px_180px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts"
            className="border border-[#b7a888] bg-transparent px-3 py-2 text-sm text-[#211e1a] outline-none placeholder:text-[#55503f]"
          />

          <select
            value={category ?? ""}
            onChange={(event) => setCategory(event.target.value || null)}
            className="border border-[#b7a888] bg-transparent px-3 py-2 text-sm text-[#211e1a] outline-none"
          >
            <option value="">All categories</option>
            {allCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value as "newest" | "oldest" | "title-asc" | "title-desc",
              )
            }
            className="border border-[#b7a888] bg-transparent px-3 py-2 text-sm text-[#211e1a] outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/case-studies" className="case-nav-link">
            View case studies
          </Link>
          <a href="https://wa.me/919135271562" target="_blank" rel="noopener noreferrer" className="case-nav-link">
            WhatsApp
          </a>
        </div>

        <div className="mt-8">
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post, index) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug || post._id}`}
                className="case-file-row"
              >
                <div className="case-file-number">
                  No.{String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h2 className="case-file-heading">{post.title}</h2>
                  <p className="case-file-copy">
                    {post.excerpt || "Read the full article."}
                  </p>

                  <div className="case-tag-list">
                    {post.category?.name ? (
                      <span className="case-tag">{post.category.name}</span>
                    ) : null}
                    {(post.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="case-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="case-file-meta">
                  <span className="case-stamp case-stamp-building">
                    {post.readTime || "Article"}
                  </span>
                  <span className="case-file-year">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="border border-dashed border-[#b7a888] px-6 py-16 text-center text-sm uppercase tracking-[0.12em] text-[#55503f]">
              No posts found for this filter.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
