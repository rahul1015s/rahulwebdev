import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";
import PostContent from "@/components/blog/PostContent";
import ActionButtons from "./ActionButtons";
import PostVisitorCount from "@/components/blog/PostVisitorCount";
import {
  extractCoverImage,
  extractExcerpt,
  normalizeCategory,
  normalizeTagNames,
  toIsoString,
} from "@/lib/blog-content";
import { generateBreadcrumbStructuredData, convertReadTimeToISO8601 } from "@/lib/seo";

interface PostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

type PostDocument = {
  title?: string;
  slug?: string;
  content?: unknown;
  image?: string;
  category?: unknown;
  tags?: unknown;
  tagNames?: string[];
  metaTitle?: string;
  metaDescription?: string;
  readTime?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

async function resolveParams(params: PostPageProps["params"]) {
  return params instanceof Promise ? await params : params;
}

async function getPost(slug: string) {
  await connectDB();

  let post = (await Post.findOne({ slug, published: true }).lean()) as PostDocument | null;

  if (!post && /^[0-9a-fA-F]{24}$/.test(slug)) {
    post = (await Post.findOne({ _id: slug, published: true }).lean()) as PostDocument | null;
  }

  return post;
}

function buildSeoData(post: PostDocument, slug: string) {
  const title = post.metaTitle?.trim() || post.title?.trim() || "Blog Post";
  const description =
    post.metaDescription?.trim() ||
    extractExcerpt(
      post.content,
      post.readTime ? 138 : 160
    ) ||
    "Read this article by Rahul Verma on practical web development and modern SEO.";
  const category = normalizeCategory(post.category);
  const tags = normalizeTagNames(post.tags, post.tagNames);
  const image = extractCoverImage(post.image, post.content);
  const publishedTime = toIsoString(post.createdAt);
  const modifiedTime = toIsoString(post.updatedAt) || publishedTime;
  const canonicalPath = `/blog/${post.slug || slug}`;
  const canonicalUrl = `https://rahulwebdev.in${canonicalPath}`;

  return {
    title,
    description: post.readTime ? `${description} (${post.readTime} read)` : description,
    category,
    tags,
    image,
    publishedTime,
    modifiedTime,
    canonicalPath,
    canonicalUrl,
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = buildSeoData(post, slug);

  return {
    title: seo.title,
    description: seo.description,
    keywords:
      seo.tags.length > 0
        ? [...(seo.category?.name ? [seo.category.name] : []), ...seo.tags, "web development", "Next.js", "React", "technical blog"]
        : [...(seo.category?.name ? [seo.category.name] : []), "web development", "Next.js", "React", "technical blog"],
    alternates: {
      canonical: seo.canonicalPath,
    },
    authors: [{ name: "Rahul Verma", url: "https://rahulwebdev.in" }],
    category: seo.category?.name || "Technology",
    openGraph: {
      type: "article",
      locale: "en_US",
      url: seo.canonicalUrl,
      siteName: "Rahul Web Development",
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: seo.image,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      publishedTime: seo.publishedTime,
      modifiedTime: seo.modifiedTime,
      authors: ["Rahul Verma"],
      tags: seo.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
      creator: "@rahul1015s",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "article:author": "Rahul Verma",
      ...(seo.publishedTime && { "article:published_time": seo.publishedTime }),
      ...(seo.modifiedTime && { "article:modified_time": seo.modifiedTime }),
      ...(seo.tags.length > 0 && { "article:tag": seo.tags.join(", ") }),
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await resolveParams(params);
  const post = await getPost(slug);

  if (!post) return notFound();

  const seo = buildSeoData(post, slug);
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: seo.title,
    description: seo.description,
    image: [`https://rahulwebdev.in${seo.image}`.replace("https://rahulwebdev.inhttp", "http")],
    datePublished: seo.publishedTime,
    dateModified: seo.modifiedTime,
    articleSection: seo.category?.name || "Web Development",
    keywords: [...(seo.category?.name ? [seo.category.name] : []), ...seo.tags].join(", "),
    author: {
      "@type": "Person",
      name: "Rahul Verma",
      url: "https://rahulwebdev.in",
    },
    publisher: {
      "@type": "Person",
      name: "Rahul Verma",
      url: "https://rahulwebdev.in",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": seo.canonicalUrl,
    },
    url: seo.canonicalUrl,
    ...(post.readTime && {
      timeRequired: convertReadTimeToISO8601(post.readTime),
    }),
  };

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: seo.title, url: seo.canonicalPath },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <main className="bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.10),_transparent_32%),linear-gradient(180deg,rgba(250,252,255,1),rgba(255,255,255,1))] pb-16 dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_22%),linear-gradient(180deg,rgba(2,6,23,1),rgba(3,7,18,1))]">
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <header className="mt-6 overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <div className="p-6 sm:p-8 lg:p-10">
                {(seo.category?.name || seo.tags.length > 0) && (
                  <div className="mb-5 flex flex-wrap gap-2">
                    {seo.category?.name && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/80 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-500/15 dark:text-emerald-200">
                        {seo.category.name}
                      </span>
                    )}
                    {seo.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.9rem] lg:leading-[1.05]">
                  {post.title}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {seo.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {formattedDate && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3.5 py-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={seo.publishedTime}>{formattedDate}</time>
                    </div>
                  )}

                  {post.readTime && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3.5 py-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  )}

                  <PostVisitorCount slug={slug} />
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border/60 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Rahul Verma</p>
                      <p className="text-sm text-muted-foreground">
                        Full stack developer writing about fast, SEO-focused web experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[280px] bg-muted lg:min-h-full">
                <Image
                  src={seo.image}
                  alt={post.title || seo.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized={seo.image.startsWith("http")}
                  className="object-cover"
                />
              </div>
            </div>
          </header>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <article className="min-w-0 p-1 sm:p-0">
              <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:text-[15px] prose-p:leading-8 prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:text-emerald-800 hover:prose-a:underline prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/60 prose-blockquote:px-4 prose-blockquote:py-3 prose-blockquote:font-medium dark:prose-blockquote:bg-emerald-500/5 prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none prose-img:rounded-2xl prose-img:border prose-img:border-border/60">
                <PostContent content={post.content} />
              </div>
            </article>

            <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="p-1 sm:p-0">
                <p className="text-sm font-semibold text-foreground">Share or save</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  If this article helped, save it for later or share it with someone working on SEO and frontend performance.
                </p>
                <div className="mt-4">
                  <ActionButtons title={post.title || seo.title} slug={post.slug || slug} />
                </div>
              </div>

              <div className="p-1 sm:p-0">
                <p className="text-sm font-semibold text-foreground">Continue reading</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Explore more articles on React, Next.js, search visibility, and better product UX.
                </p>
                <Link
                  href="/blog"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  Browse all posts
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
