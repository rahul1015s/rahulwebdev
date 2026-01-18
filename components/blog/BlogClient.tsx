"use client";

import { useMemo, useState } from "react";
import { BlogControls } from "@/components/blog/BlogControls";
import { BlogListRow } from "@/components/blog/BlogListRow";
import { processPosts } from "@/lib/blog-utils";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

function extractExcerpt(content: any): string {
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
  posts?: any[];
};

export default function BlogClient({ posts = [] }: Props) {
  /* ---------------- STATE ---------------- */
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<
    "newest" | "oldest" | "title-asc" | "title-desc"
  >("newest");

  /* ---------------- TAGS ---------------- */
  const allTags = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    return Array.from(
      new Set(
        posts.flatMap((p) =>
          Array.isArray(p?.tags) ? p.tags : []
        )
      )
    );
  }, [posts]);

  /* ---------------- FILTER PIPELINE ---------------- */
  const visiblePosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    return processPosts({
      posts,
      query,
      tag,
      sort,
    });
  }, [posts, query, tag, sort]);

  return (
    <>
      {/* Controls */}
      <BlogControls
        query={query}
        setQuery={setQuery}
        tag={tag}
        setTag={setTag}
        sort={sort}
        setSort={setSort}
        tags={allTags}
      />

      {/* List */}
      {visiblePosts.length > 0 ? (
        <div className="space-y-3">
          {visiblePosts.map((p: any) => (
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
