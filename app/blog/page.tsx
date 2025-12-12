// FILE: app/blog/page.tsx

import Link from "next/link";
import connectMongoose from "@/lib/mongoose";
import Post from "@/models/post";
import { BlogCard } from "@/components/cards/blog-card";
import { normalizeImageUrl } from "@/utils/url-utils";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Blog — Rahul Verma",
  description: "Short posts and notes by Rahul Verma",
};

const PAGE_SIZE = 9;

// --------------------------------------------------------------
// Extract FIRST image from ProseMirror JSON stored in content
// --------------------------------------------------------------
function extractFirstImage(content: any): string | null {
  try {
    const json = typeof content === "string" ? JSON.parse(content) : content;

    const nodes = json?.content ?? [];
    for (const node of nodes) {
      if (node.type === "image" && node.attrs?.src) {
        return node.attrs.src;
      }
    }

    return null;
  } catch {
    return null;
  }
}

// --------------------------------------------------------------
// BLOG PAGE
// --------------------------------------------------------------
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string };
}) {
  // unwrap promise
  const params =
    searchParams instanceof Promise ? await searchParams : searchParams;

  const page = Math.max(1, Number(params.page || 1));
  const skip = (page - 1) * PAGE_SIZE;

  await connectMongoose();

  const [posts, total] = await Promise.all([
    Post.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean(),
    Post.countDocuments(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts on development, design, and real-world learning.
        </p>
      </div>

      {/* BLOG GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p: any) => {
          const idOrSlug = p.slug || String(p._id);

          // -----------------------------
          // EXCERPT (clean)
          // -----------------------------
          let excerpt = "Read the full article…";
          if (typeof p.content === "string") {
            try {
              const parsed = JSON.parse(p.content);
              excerpt =
                parsed?.content?.[1]?.content?.[0]?.text ||
                p.content.slice(0, 120);
            } catch {
              excerpt = p.content.slice(0, 120);
            }
          }

          // -----------------------------
          // IMAGE HANDLING
          // -----------------------------
          const firstImage = extractFirstImage(p.content);
          const safeImage = firstImage
            ? normalizeImageUrl(firstImage)
            : "/default-blog.png";

          return (
            <BlogCard
              key={idOrSlug}
              href={`/blog/${idOrSlug}`}
              title={p.title}
              excerpt={excerpt}
              image={safeImage}
              tags={p.tags || ["Article"]}
              readTime={p.readTime || "5 min read"}
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
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          {/* PREVIOUS */}
          <Link
            href={`/blog?page=${Math.max(1, page - 1)}`}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              page <= 1
                ? "bg-input/30 text-muted-foreground cursor-not-allowed"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            )}
          >
            ← Previous
          </Link>

          {/* NUMBERS */}
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pNum =
                totalPages <= 5
                  ? i + 1
                  : page <= 3
                  ? i + 1
                  : page >= totalPages - 2
                  ? totalPages - 4 + i
                  : page - 2 + i;

              return (
                <Link
                  key={pNum}
                  href={`/blog?page=${pNum}`}
                  className={cn(
                    "w-9 h-9 flex items-center justify-center rounded-lg text-xs font-medium",
                    page === pNum
                      ? "bg-emerald-600 text-white"
                      : "text-muted-foreground hover:bg-input/30"
                  )}
                >
                  {pNum}
                </Link>
              );
            })}
          </div>

          {/* NEXT */}
          <Link
            href={`/blog?page=${Math.min(totalPages, page + 1)}`}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              page >= totalPages
                ? "bg-input/30 text-muted-foreground cursor-not-allowed"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            )}
          >
            Next →
          </Link>
        </div>

        <p className="text-xs text-gray-500">
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
}
