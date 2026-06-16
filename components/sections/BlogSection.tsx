import Link from "next/link";
import { BlogCard } from "@/components/cards/BlogCard";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { normalizeImageUrl } from "@/utils/url-utils";
import { unstable_cache } from "next/cache";

type ContentNode = {
  type?: string;
  attrs?: {
    src?: string;
  };
  content?: Array<{
    text?: string;
  }>;
};

type BlogDoc = {
  _id: unknown;
  slug?: string;
  title?: string;
  image?: string;
  content?: string | { content?: ContentNode[] };
  tags?: string[];
  readTime?: string;
  createdAt?: string | Date;
};

/* ---------------------------------------------
   Helpers
--------------------------------------------- */
function extractFirstImage(content: string | { content?: ContentNode[] } | undefined): string | null {
  try {
    const json = typeof content === "string" ? JSON.parse(content) : content;
    for (const node of json?.content ?? []) {
      if (node.type === "image" && node.attrs?.src) {
        return node.attrs.src;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/* Cache blog posts for 30 seconds with revalidation tag */
const getCachedBlogPosts = unstable_cache(
  async () => {
    await connectDB();

    // Use fetch with cache headers for automatic ISR
    const docs = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean()
      .exec();

    return { docs };
  },
  ["blog-posts"],
  { 
    tags: ["blog-posts"],
    revalidate: 30 // Auto-revalidate every 30 seconds for fast updates
  }
);

/* Transform posts to display format */
function transformPosts(docs: BlogDoc[]) {
  return docs.map((p, index: number) => {
    const coverImage = p.image
      ? normalizeImageUrl(p.image)
      : extractFirstImage(p.content);

    const safeImage = coverImage || "/default-blog.png";

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
      index,
    };
  });
}

/* Blog Section Component */
export default async function BlogSection() {
  const { docs } = await getCachedBlogPosts();
  const posts = transformPosts(docs as BlogDoc[]);

  return (
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-wider text-primary">
            Writing
          </span>
          <h2 className="mt-2 text-3xl font-semibold">
            Latest Articles
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Thoughts, tutorials, and insights on modern web development for business owners, students, and working developers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.href} {...post} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
