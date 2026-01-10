import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { BlogCard } from "@/components/cards/BlogCard";
import { normalizeImageUrl } from "@/utils/url-utils";
import { cn } from "@/lib/utils";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import type { Metadata } from "next";

/* ---------------------------------------------
   Metadata
--------------------------------------------- */
export const metadata: Metadata = {
  title: "Blog – Rahul Verma",
  description:
    "Articles and notes by Rahul Verma on web development, programming, and technology.",
};

/* ---------------------------------------------
   Constants
--------------------------------------------- */
const PAGE_SIZE = 9;

/* ---------------------------------------------
   Helpers
--------------------------------------------- */
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

/* ---------------------------------------------
   Page
--------------------------------------------- */
export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }> | { page?: string };
}) {
  /* ✅ FIX: normalize searchParams (Next.js 16 safe) */
  const params =
    searchParams instanceof Promise
      ? await searchParams
      : searchParams ?? {};

  const page = Math.max(1, Number(params.page ?? 1));
  const skip = (page - 1) * PAGE_SIZE;

  await connectDB();

  const [posts, total] = await Promise.all([
    Post.find({ published: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean(),
    Post.countDocuments({ published: true }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
            Blog
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Writing about web development, real-world projects, and things I
            learn along the way.
          </p>
        </div>

        {/* Blog Grid – MOBILE FIRST */}
        {posts.length > 0 ? (
          <div
            className="
              grid grid-cols-1
              gap-4
              sm:grid-cols-2 sm:gap-5
              lg:grid-cols-3 lg:gap-6
            "
          >
            {posts.map((p: any, index: number) => {
              let coverImage: string | null = null;

              if (p.image) coverImage = normalizeImageUrl(p.image);
              if (!coverImage) {
                const firstImage = extractFirstImage(p.content);
                if (firstImage) coverImage = normalizeImageUrl(firstImage);
              }

              const safeImage = coverImage || "/default-blog.png";
              const excerpt = extractExcerpt(p.content);

              return (
                <div
                  key={p._id.toString()}
                  className="mx-auto w-full max-w-sm sm:max-w-none"
                >
                  <BlogCard
                    href={`/blog/${p.slug || p._id}`}
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
                    index={index}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-sm text-muted-foreground">
            No posts yet.
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-14">
          <NewsletterForm variant="default" location="blog" />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <Link
              href={`/blog?page=${Math.max(1, page - 1)}`}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs sm:text-sm",
                page <= 1
                  ? "pointer-events-none opacity-40"
                  : "border hover:bg-muted"
              )}
            >
              Previous
            </Link>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pNum = i + 1;
              return (
                <Link
                  key={pNum}
                  href={`/blog?page=${pNum}`}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-md text-xs sm:text-sm",
                    page === pNum
                      ? "bg-primary text-primary-foreground"
                      : "border hover:bg-muted"
                  )}
                >
                  {pNum}
                </Link>
              );
            })}

            <Link
              href={`/blog?page=${Math.min(totalPages, page + 1)}`}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs sm:text-sm",
                page >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "border hover:bg-muted"
              )}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
