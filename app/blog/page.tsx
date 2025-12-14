import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { BlogCard } from "@/components/cards/blog-card";
import { normalizeImageUrl } from "@/utils/url-utils";
import { cn } from "@/lib/utils";
import { BookOpen, TrendingUp, Zap, MessageSquare, Rocket, Star, PenTool, FileText, Hash } from "lucide-react";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

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

  await connectDB();

  const [posts, total] = await Promise.all([
    Post.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean(),
    Post.countDocuments(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const totalPosts = total;

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(posts.flatMap((p: any) => p.tags || ["Article"]))
  ).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* HEADER WITH MICRO-INTERACTIONS */}
      <div className="mb-12 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-linear-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-lg relative group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-transparent to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <BookOpen className="w-6 h-6 text-emerald-600 relative z-10 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
            📚 Articles & Thoughts
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-3 flex items-center gap-3">
              Blog
              <div className="relative group">
                {/* Rocket animation */}
                <div className="absolute -inset-1 bg-emerald-500/10 blur-sm rounded-full group-hover:scale-110 transition-transform duration-300" />
                <Rocket className="w-6 h-6 text-emerald-500 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                {/* Floating star */}
                <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
              </div>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Thoughts on development, design, and real-world learning.
              Explore {totalPosts}+ articles on modern web development. 
              <span className="inline-block ml-2 text-emerald-600 animate-pulse">⚡</span>
            </p>
          </div>

          {/* Stats with hover effects */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl border hover:border-emerald-300 transition-all duration-300 group hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <FileText className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-medium group-hover:text-emerald-700 transition-colors duration-200">
                  {totalPosts} posts
                </span>
              </div>
            </div>
            <div className="p-3 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border hover:border-amber-300 transition-all duration-300 group hover:shadow-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg group-hover:rotate-12 transition-transform duration-200">
                  <Zap className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-medium group-hover:text-amber-700 transition-colors duration-200">
                  Latest Tech
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tags with micro-interactions */}
        {allTags.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded">
                <Hash className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="text-sm text-muted-foreground">Browse by Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag, index) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="group relative"
                >
                  <div className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-linear-to-r hover:from-emerald-100 hover:to-cyan-100 dark:hover:from-emerald-900/30 dark:hover:to-cyan-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                    <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-200">
                      {tag}
                    </span>
                    {/* Animated dot */}
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-ping" />
                    {/* Hover indicator */}
                    <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">
                      🔼
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BLOG GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p: any, index: number) => {
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
            <div key={idOrSlug} className="relative group">
              {/* Floating number indicator with animation */}
              <div className="absolute -top-3 -left-3 z-20">
                <div className="w-7 h-7 bg-linear-to-br from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1 + skip}
                </div>
                {/* Small star decoration */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs">⚡</span>
                </div>
              </div>
              
              {/* Blog card with stagger effect */}
              <div style={{ animationDelay: `${index * 0.1}s` }} className="animate-in fade-in slide-in-from-bottom-5">
                <BlogCard
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
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center relative group">
            {/* Floating pens */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PenTool className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FileText className="w-5 h-5 text-cyan-600" />
            </div>
            <BookOpen className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-xl font-semibold mb-3">📭 No posts yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Working on some awesome content! Check back soon for fresh articles. 
            <span className="inline-block ml-2">👨‍💻</span>
          </p>
        </div>
      )}

      {/* SUBSCRIBE NEWSLETTER SECTION */}
     
      <NewsletterForm variant="default" location="blog" />


      {/* PAGINATION WITH ENHANCED INTERACTIONS */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          {/* PREVIOUS - Enhanced */}
          <Link
            href={`/blog?page=${Math.max(1, page - 1)}`}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 group",
              page <= 1
                ? "bg-input/30 text-muted-foreground cursor-not-allowed"
                : "bg-linear-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 text-emerald-700 dark:text-emerald-300 hover:from-emerald-100 hover:to-cyan-100 dark:hover:from-emerald-900/30 dark:hover:to-cyan-900/30 hover:shadow-lg hover:-translate-y-0.5"
            )}
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Previous
          </Link>

          {/* NUMBERS - Enhanced */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pNum =
                totalPages <= 5
                  ? i + 1
                  : page <= 3
                  ? i + 1
                  : page >= totalPages - 2
                  ? totalPages - 4 + i
                  : page - 2 + i;

              const isActive = page === pNum;
              
              return (
                <Link
                  key={pNum}
                  href={`/blog?page=${pNum}`}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium relative transition-all duration-300 hover:scale-110",
                    isActive
                      ? "bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-emerald-500/30"
                      : "bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-emerald-100 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300"
                  )}
                >
                  {pNum}
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full animate-pulse" />
                  )}
                  {/* Hover indicator */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 text-xs">
                    {pNum === page ? "●" : "↑"}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* NEXT - Enhanced */}
          <Link
            href={`/blog?page=${Math.min(totalPages, page + 1)}`}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 group",
              page >= totalPages
                ? "bg-input/30 text-muted-foreground cursor-not-allowed"
                : "bg-linear-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 text-emerald-700 dark:text-emerald-300 hover:from-emerald-100 hover:to-cyan-100 dark:hover:from-emerald-900/30 dark:hover:to-cyan-900/30 hover:shadow-lg hover:-translate-y-0.5"
            )}
          >
            Next
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Page indicator */}
        {/* <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-linear-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/20 dark:to-cyan-900/20 text-emerald-700 dark:text-emerald-300 rounded-full font-medium">
            📄 Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>{totalPosts} articles total</span>
          </div>
        </div> */}
        

      </div>
    </div>
  );
}