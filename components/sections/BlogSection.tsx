import Link from "next/link";
import { BlogCard } from "@/components/cards/blog-card";
import connectMongoose from "@/lib/mongoose";
import Post from "@/models/post";
import { normalizeImageUrl } from "@/utils/url-utils";

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

  try {
    await connectMongoose();

    const docs = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    // If there are no published posts, fall back to returning any posts
    // (helps during development when posts may not be marked `published`).
    let finalDocs = docs
    if (!docs || docs.length === 0) {
      finalDocs = await Post.find({})
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();
    }

    // -----------------------------
    // Transform posts like BlogPage
    // -----------------------------
    posts = finalDocs.map((p: any) => {
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
      };
    });
  } catch (err) {
    console.error("Error fetching posts from BlogSection:", err);
    posts = [];
  }

  return (
    <section id="blog" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Latest <span className="text-emerald-600">Blog</span>
        </h2>

        {posts.length === 0 ? (
          <div className="rounded-lg border p-8 text-center">
            <p className="mb-4">No posts yet.</p>
            <Link href="/blog" className="text-emerald-600 underline">
              View all posts
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.href} {...post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
