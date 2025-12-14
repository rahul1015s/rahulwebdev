import Link from "next/link";
import { BlogCard } from "@/components/cards/blog-card";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { normalizeImageUrl } from "@/utils/url-utils";
import { ArrowRight, FileText, TrendingUp, Sparkles, Clock } from "lucide-react";

// -----------------------------------------
// Extract FIRST image from ProseMirror JSON
// -----------------------------------------
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

export default async function BlogSection() {
  let posts: any[] = [];
  let totalPosts = 0;

  try {
    await connectDB();

    const docs = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    // Get total post count
    totalPosts = await Post.countDocuments({ published: true });

    // If there are no published posts, fall back to returning any posts
    // (helps during development when posts may not be marked `published`).
    let finalDocs = docs
    if (!docs || docs.length === 0) {
      finalDocs = await Post.find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();
      totalPosts = await Post.countDocuments();
    }

    // -----------------------------
    // Transform posts like BlogPage
    // -----------------------------
    posts = finalDocs.map((p: any, index: number) => {
      const firstImage = extractFirstImage(p.content);
      const safeImage = firstImage
        ? normalizeImageUrl(firstImage)
        : "/default-blog.png";

      // EXCERPT CLEANING
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

      return {
        href: `/blog/${p.slug || p._id}`,
        title: p.title,
        excerpt,
        image: safeImage,
        tags: p.tags || ["Article"],
        readTime: p.readTime || "5 min read",
        date: p.createdAt
          ? new Date(p.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : undefined,
        index, // For staggered animations
      };
    });
  } catch (err) {
    console.error("Error fetching posts from BlogSection:", err);
    posts = [];
  }

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header with micro-interactions */}
        <div className="mb-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-linear-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-lg relative group">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-transparent to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FileText className="w-6 h-6 text-emerald-600 relative z-10 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
              Latest Articles
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                Latest{" "}
                <span className="text-emerald-600 inline-block relative group">
                  Blog
                  <span className="absolute -bottom-2 left-0 h-0.5 bg-emerald-600 rounded-full w-0 group-hover:w-full transition-all duration-300" />
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Insights, tutorials, and thoughts on web development, design, and technology.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 bg-linear-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 px-4 py-2.5 rounded-xl border">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-300">{totalPosts}</div>
                  <div className="text-muted-foreground">Articles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          /* Empty State with animation */
          <div className="relative rounded-2xl border-2 border-dashed border-emerald-200/50 dark:border-emerald-800/50 p-12 text-center group hover:border-emerald-300/70 dark:hover:border-emerald-700/50 transition-colors duration-300">
            {/* Floating elements */}
            <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full blur-lg" />
            </div>
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full blur-lg" />
            </div>
            
            <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Coming Soon! </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Exciting articles on web development are in the works. Check back soon for fresh content!
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 group/btn"
            >
              Explore Blog Archive
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        ) : (
          <>
            {/* Blog Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {posts.map((post, index) => (
                <div 
                  key={post.href} 
                  className="relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Number indicator */}
                  <div className="absolute -top-3 -left-3 z-20">
                    <div className="w-7 h-7 bg-linear-to-br from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <BlogCard {...post} />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-emerald-50/50 via-white to-cyan-50/50 dark:from-emerald-900/20 dark:via-gray-900/20 dark:to-cyan-900/20 rounded-2xl p-8 md:p-10 border border-emerald-200/50 dark:border-emerald-800/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-linear-to-br from-emerald-500/10 to-cyan-500/10 rounded-lg">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                      More to Explore
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">
                    Dive Deeper into Tech Insights
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl">
                    Discover {totalPosts - 3}+ more articles on React, Next.js, web performance, 
                    and modern development practices in the full blog archive.
                  </p>
                  
                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span>Latest tutorials</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                      <span>Project deep dives</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                      <span>Career insights</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center gap-3 w-full px-8 py-3.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl shadow-lg hover:shadow-emerald-500/25 group/cta"
                  >
                    <span>View All Articles</span>
                    {/* <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-300" /> */}
                    {/* Arrow animation */}
                    <svg 
                      className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Updated weekly with fresh content
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Newsletter prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group cursor-default">
            <span>Never miss an update</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            <Link 
              href="/#contact" 
              className="text-emerald-600 hover:text-emerald-700 font-medium ml-2"
            >
              Subscribe to newsletter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}