import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import "@/models/tag";
import BlogClientPage from "@/components/blog/BlogClientPage";
import { extractCoverImage, normalizeCategory, normalizeTagNames } from "@/lib/blog-content";

export const dynamic = "force-dynamic";
export const revalidate = 300;

type LeanTag = string | { name?: string | null } | null | undefined;
type LeanCategory = string | { name?: string | null; slug?: string | null } | null | undefined;

type LeanPost = {
  _id: unknown;
  title?: string;
  slug?: string;
  image?: string;
  category?: LeanCategory;
  tags?: LeanTag[];
  tagNames?: string[];
  metaDescription?: string;
  readTime?: string;
  createdAt?: Date | string;
};

export default async function BlogPage() {
  let posts: unknown[] = [];

  try {
    await connectDB();
    posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .select("title slug image category tags tagNames metaDescription readTime createdAt")
      .setOptions({ _recursed: true })
      .populate({ path: "category", select: "name slug" })
      .populate({ path: "tags", select: "name" })
      .lean();
  } catch (error) {
    console.error("Blog index: database unavailable, rendering empty list.", error);
  }

  const normalizedPosts = (posts as LeanPost[]).map((post) => ({
    _id: String(post._id),
    title: post.title ?? "",
    slug: post.slug ?? "",
    excerpt: post.metaDescription?.trim() || `Read ${post.title ?? "this article"}.`,
    coverImage: extractCoverImage(post.image, null),
    category: normalizeCategory(post.category),
    tags: normalizeTagNames(post.tags, post.tagNames),
    readTime: post.readTime ?? "",
    createdAt: post.createdAt,
  }));

  const safePosts = JSON.parse(JSON.stringify(normalizedPosts));
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Rahul Verma Blog",
    description:
      "Articles on web development, SEO, React, Next.js, and building polished product experiences.",
    url: "https://rahulwebdev.in/blog",
    blogPost: normalizedPosts.slice(0, 12).map((post, index) => ({
      "@type": "BlogPosting",
      position: index + 1,
      headline: post.title,
      description: post.excerpt,
      url: `https://rahulwebdev.in/blog/${post.slug}`,
      image: post.coverImage.startsWith("http")
        ? post.coverImage
        : `https://rahulwebdev.in${post.coverImage}`,
      datePublished: post.createdAt,
      articleSection: post.category?.name || "Blog",
      keywords: [...(post.category?.name ? [post.category.name] : []), ...post.tags].join(", "),
      author: {
        "@type": "Person",
        name: "Rahul Verma",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
      />
      <BlogClientPage initialPosts={safePosts} />
    </>
  );
}
