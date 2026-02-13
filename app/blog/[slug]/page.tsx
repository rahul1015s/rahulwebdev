import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import PostContent from "@/components/blog/PostContent";
import Link from "next/link";
import Image from "next/image";
import { normalizeImageUrl } from "@/utils/url-utils";
import { Calendar, Clock, ArrowLeft, Eye, Tag, User } from "lucide-react";
import ActionButtons from "./ActionButtons";
import { Metadata } from 'next';
import { Types } from "mongoose";

interface PostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

type RichTextNode = {
  type?: string;
  text?: string;
  attrs?: { src?: string; alt?: string };
  content?: RichTextNode[];
};

const getNodeText = (content?: RichTextNode[]) =>
  (content ?? []).map((c) => c.text || "").join("").trim();

const normalizeTagStrings = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((tag) => {
      if (typeof tag === "string") return tag;
      if (tag instanceof Types.ObjectId) return tag.toString();
      if (tag && typeof tag === "object" && "_id" in tag) {
        const maybeId = (tag as { _id?: unknown })._id;
        if (maybeId instanceof Types.ObjectId) return maybeId.toString();
        if (typeof maybeId === "string") return maybeId;
      }
      return "";
    })
    .filter(Boolean);
};

// Generate metadata for each blog post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const unwrapped = params instanceof Promise ? await params : params;
  const { slug } = unwrapped;

  await connectDB();

  let post = await Post.findOne({ slug }).lean();

  if (!post && /^[0-9a-fA-F]{24}$/.test(slug)) {
    post = await Post.findById(slug).lean();
  }

  if (!post) {
    return {
      title: "Post Not Found - Rahul Verma",
      description: "The requested blog post could not be found.",
    };
  }

  // Extract description from content (first paragraph or summary)
  let description = "Read this insightful post by Rahul Verma on web development and technology.";
  let excerpt = "";

  try {
    if (typeof post.content === "string") {
      const json = JSON.parse(post.content);
      const nodes: RichTextNode[] = json?.content || [];

      // Find first meaningful text content
      for (const node of nodes) {
        if (node.type === "paragraph" && (node.content?.length ?? 0) > 0) {
          const text = getNodeText(node.content);
          if (text.length > 20) { // Only use substantial paragraphs
            excerpt = text;
            break;
          }
        } else if (node.type === "heading" && (node.content?.length ?? 0) > 0 && !excerpt) {
          // Fallback to heading if no good paragraph found
          excerpt = getNodeText(node.content);
        }
      }

      if (excerpt) {
        description = excerpt.length > 160 ? excerpt.substring(0, 157) + "..." : excerpt;
      }
    }
  } catch (error) {
    console.error("Error parsing post content for metadata:", error);
  }

  // OG Image Priority (highest to lowest):
  // 1. Blog post's cover image (post.image)
  // 2. First image found in blog content
  // 3. Dynamic SVG with post title (fallback)
  let ogImage = `/api/og/blog/${slug}?title=${encodeURIComponent(post.title)}&author=Rahul+Verma`; // Fallback dynamic OG image
  let imageAlt = `${post.title} - Rahul Verma Blog`;

  // Priority 1: Use the blog post's cover image if available
  if (post.image && typeof post.image === 'string' && post.image.trim()) {
    const normalizedImage = normalizeImageUrl(post.image);
    if (normalizedImage && normalizedImage !== post.image) { // Check if normalization worked
      ogImage = normalizedImage;
      imageAlt = `${post.title} - Blog post cover image`;
    } else if (post.image.startsWith('http') || post.image.startsWith('/')) {
      ogImage = post.image;
      imageAlt = `${post.title} - Blog post cover image`;
    }
  }

  // Priority 2: Look for first image in blog content (only if no cover image)
  if (ogImage.startsWith('/api/og/') && typeof post.content === "string") {
    try {
      const json = JSON.parse(post.content);
      const nodes: RichTextNode[] = json?.content || [];

      // Look for first image in content
      for (const node of nodes) {
        if (node.type === "image" && node.attrs?.src) {
          const contentImage = normalizeImageUrl(node.attrs.src);
          if (contentImage) {
            ogImage = contentImage;
            imageAlt = node.attrs?.alt || `${post.title} - Blog post image`;
            break; // Use first image found
          }
        }
      }
    } catch (error) {
      console.error("Error parsing blog content for OG image:", error);
    }
  }

  // Create keywords from tags for better SEO
  const normalizedTags = normalizeTagStrings(post.tags);
  const keywords = (normalizedTags.length > 0)
    ? normalizedTags.join(", ")
    : "web development, programming, technology, React, Next.js";

  // Enhanced description with read time if available
  let enhancedDescription = description;
  if (post.readTime && typeof post.readTime === 'string') {
    enhancedDescription = `${description} (${post.readTime} read)`;
  }

  return {
    title: `${post.title} - Rahul Verma`,
    description: enhancedDescription,
    keywords,
    authors: [{ name: "Rahul Verma" }],
    openGraph: {
      title: post.title,
      description: enhancedDescription,
      url: `https://rahulwebdev.in/blog/${slug}`,
      siteName: "Rahul Verma Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ["Rahul Verma"],
      tags: normalizedTags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: enhancedDescription,
      images: [ogImage],
      creator: "@rahulwebdev", // Add if you have a Twitter handle
    },
    other: {
      "article:author": "Rahul Verma" as string,
      ...(post.createdAt && { "article:published_time": post.createdAt.toISOString() as string }),
      ...(post.updatedAt && { "article:modified_time": post.updatedAt.toISOString() as string }),
      ...(normalizedTags.length > 0 && { "article:tag": normalizedTags.join(",") as string }),
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const unwrapped = params instanceof Promise ? await params : params;
  const { slug } = unwrapped;

  await connectDB();

  let post = await Post.findOne({ slug }).lean();

  if (!post && /^[0-9a-fA-F]{24}$/.test(slug)) {
    post = await Post.findById(slug).lean();
  }

  if (!post) return notFound();
  const normalizedTags = normalizeTagStrings(post.tags);

  /** COVER IMAGE LOGIC */
  let coverImage: string | null = null;

  if (post.image) coverImage = normalizeImageUrl(post.image);

  if (!coverImage && typeof post.content === "string") {
    try {
      const json = JSON.parse(post.content);
      const firstImage = (json?.content as RichTextNode[] | undefined)?.find((n) => n.type === "image");
      if (firstImage?.attrs?.src) {
        coverImage = normalizeImageUrl(firstImage.attrs.src);
      }
    } catch {}
  }

  // SERVER-SAFE FALLBACK
  if (!coverImage || typeof coverImage !== "string") {
    coverImage = "/default-blog.png";
  }

  // Format date
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Create description for structured data
  let description = "Read this insightful post by Rahul Verma on web development and technology.";
  let excerpt = "";

  try {
    if (typeof post.content === "string") {
      const json = JSON.parse(post.content);
      const nodes: RichTextNode[] = json?.content || [];

      // Find first meaningful text content
      for (const node of nodes) {
        if (node.type === "paragraph" && (node.content?.length ?? 0) > 0) {
          const text = getNodeText(node.content);
          if (text.length > 20) { // Only use substantial paragraphs
            excerpt = text;
            break;
          }
        } else if (node.type === "heading" && (node.content?.length ?? 0) > 0 && !excerpt) {
          // Fallback to heading if no good paragraph found
          excerpt = getNodeText(node.content);
        }
      }

      if (excerpt) {
        description = excerpt.length > 160 ? excerpt.substring(0, 157) + "..." : excerpt;
      }
    }
  } catch (error) {
    console.error("Error parsing post content for structured data:", error);
  }

  // Enhanced description with read time if available
  let enhancedDescription = description;
  if (post.readTime && typeof post.readTime === 'string') {
    enhancedDescription = `${description} (${post.readTime} read)`;
  }

  // OG Image Priority (highest to lowest):
  // 1. Blog post's cover image (post.image)
  // 2. First image found in blog content
  // 3. Dynamic SVG with post title (fallback)
  let ogImage = `/api/og/blog/${slug}?title=${encodeURIComponent(post.title)}&author=Rahul+Verma`; // Fallback dynamic OG image

  // Priority 1: Use the blog post's cover image if available
  if (post.image && typeof post.image === 'string' && post.image.trim()) {
    const normalizedImage = normalizeImageUrl(post.image);
    if (normalizedImage && normalizedImage !== post.image) { // Check if normalization worked
      ogImage = normalizedImage;
    } else if (post.image.startsWith('http') || post.image.startsWith('/')) {
      ogImage = post.image;
    }
  }

  // Priority 2: Look for first image in blog content (only if no cover image)
  if (ogImage.startsWith('/api/og/') && typeof post.content === "string") {
    try {
      const json = JSON.parse(post.content);
      const nodes = json?.content || [];

      // Look for first image in content
      for (const node of nodes) {
        if (node.type === "image" && node.attrs?.src) {
          const contentImage = normalizeImageUrl(node.attrs.src);
          if (contentImage) {
            ogImage = contentImage;
            break; // Use first image found
          }
        }
      }
    } catch (error) {
      console.error("Error parsing blog content for OG image:", error);
    }
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": enhancedDescription,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": "Rahul Verma",
      "url": "https://rahulwebdev.in"
    },
    "publisher": {
      "@type": "Person",
      "name": "Rahul Verma"
    },
    "datePublished": post.createdAt?.toISOString(),
    "dateModified": post.updatedAt?.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rahulwebdev.in/blog/${slug}`
    },
    "keywords": normalizedTags.join(", "),
    "articleSection": "Technology",
    "url": `https://rahulwebdev.in/blog/${slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Back Button with animation */}
      <div className="mb-6 sm:mb-7">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-all duration-300 pl-1"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">
            <ArrowLeft size={18} />
          </span>
          Back to blog
          <span className="h-px w-0 group-hover:w-16 bg-emerald-600 transition-all duration-300 ml-2" />
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8 sm:mb-10 lg:mb-12">
        {/* Title with gradient text effect */}
        <div className="relative mb-4 sm:mb-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
            {post.title}
          </h1>
          {/* Gradient overlay for text effect */}
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        </div>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200">
            <Calendar size={14} className="group-hover:text-emerald-600 transition-colors duration-200" />
            <time className="group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-200">
              {formattedDate}
            </time>
          </div>

          {post.readTime && (
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200">
              <Clock size={14} className="group-hover:text-emerald-600 transition-colors duration-200" />
              <span className="group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-200">
                {post.readTime}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200">
            <Eye size={14} className="group-hover:text-emerald-600 transition-colors duration-200" />
            <span className="group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-200">
              Read
            </span>
          </div>
        </div>

        {/* Cover Image with hover effect */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group mb-6">
          {/* Loading gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-emerald-100/20 to-cyan-100/20 animate-pulse" />
          
          <Image
            src={coverImage}
            alt={post.title}
            fill
            priority
            unoptimized={coverImage.startsWith("http")}
            className="object-contain group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Image corner accent */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <span className="text-xs font-medium text-emerald-700">📸</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {normalizedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {normalizedTags.slice(0, 5).map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors duration-200 group"
              >
                <Tag size={12} className="group-hover:rotate-12 transition-transform duration-200" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content with enhanced styling */}
      <article className="prose prose-gray dark:prose-invert max-w-none mb-10 sm:mb-12 lg:mb-16 
        prose-headings:scroll-mt-20
        prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-5 prose-h2:mb-2.5
        prose-h3:text-base sm:prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-2
        prose-p:text-base prose-p:leading-relaxed prose-p:my-2.5
        prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:text-emerald-700 hover:prose-a:underline
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
        prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto
        prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic
        prose-ul:my-2.5 prose-li:my-0.5">
        <PostContent content={post.content} />
      </article>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-gray-200 dark:border-gray-800 mb-8">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium shadow-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Articles
        </Link>

        {/* Interactive Action Buttons */}
        <ActionButtons title={post.title} slug={slug} />
      </div>

      {/* Author info */}
      <div className="bg-linear-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-8 border border-emerald-200/50 dark:border-emerald-800/50">
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-col sm:flex-row">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            <User className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Rahul Verma</h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-3">
              Full Stack Developer passionate about building modern web applications. 
              Sharing insights on React, Next.js, and web development.
            </p>
            <Link
              href="/#about"
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors duration-200 group"
            >
              Learn more about me
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Related posts suggestion */}
      <div className="text-center py-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-3">Enjoyed this article?</h3>
        <p className="text-muted-foreground mb-5 max-w-md mx-auto">
          Check out more articles on similar topics in the blog section.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 group"
        >
          Explore More Articles
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>
    </div>
  </>
  );
}
