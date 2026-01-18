"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogControls } from "@/components/blog/BlogControls";
import { BlogListRow } from "@/components/blog/BlogListRow";
import { processPosts } from "@/lib/blog-utils";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { generateBreadcrumbStructuredData } from "@/lib/seo";

function extractExcerpt(content: any): string {
  if (typeof content !== "string") return "Read the full article…";

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

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<
    "newest" | "oldest" | "title-asc" | "title-desc"
  >("newest");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const allTags = useMemo(
    () =>
      Array.from(
        new Set((posts || []).flatMap((p) => p.tags || []))
      ),
    [posts]
  );

  const visiblePosts = useMemo(
    () =>
      processPosts({
        posts,
        query,
        tag,
        sort,
      }),
    [posts, query, tag, sort]
  );

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
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
        {loading ? (
          <div className="py-20 text-center text-sm text-muted-foreground">
            Loading posts...
          </div>
        ) : visiblePosts.length > 0 ? (
          <div className="space-y-3">
            {visiblePosts.map((p: any) => (
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
          <div className="py-20 text-center text-sm text-muted-foreground">
            No posts found.
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-14">
          <NewsletterForm variant="default" location="blog" />
        </div>
      </section>
    </main>
  );
}
