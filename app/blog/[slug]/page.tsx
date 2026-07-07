import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

export const dynamic = "force-dynamic";

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
    extractExcerpt(post.content, post.readTime ? 138 : 160) ||
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
        ? [
            ...(seo.category?.name ? [seo.category.name] : []),
            ...seo.tags,
            "web development",
            "Next.js",
            "React",
            "technical blog",
          ]
        : [
            ...(seo.category?.name ? [seo.category.name] : []),
            "web development",
            "Next.js",
            "React",
            "technical blog",
          ],
    alternates: {
      canonical: seo.canonicalPath,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
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
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await resolveParams(params);
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

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

      <main className="case-files-shell min-h-screen pt-24 pb-10">
        <section className="case-stage pb-24">
          <Link href="/blog" className="case-back-link">
            Back to blog
          </Link>

          <div className="case-detail-header">
            <div>
              <div className="case-detail-id">
                {seo.category?.name || "Blog note"}
              </div>
              <h1 className="case-detail-title">{post.title}</h1>
              <p className="case-detail-tagline">
                {seo.description}
              </p>
            </div>

            <div className="case-index-card">
              {formattedDate ? (
                <div className="case-index-row">
                  <span className="case-index-label">Published</span>
                  <span className="case-index-value">{formattedDate}</span>
                </div>
              ) : null}
              {post.readTime ? (
                <div className="case-index-row">
                  <span className="case-index-label">Read time</span>
                  <span className="case-index-value">{post.readTime}</span>
                </div>
              ) : null}
              <div className="case-index-row">
                <span className="case-index-label">Author</span>
                <span className="case-index-value">Rahul Verma</span>
              </div>
              <div className="case-index-row">
                <span className="case-index-label">Readers</span>
                <span className="case-index-value">
                  <PostVisitorCount slug={slug} />
                </span>
              </div>
            </div>
          </div>

          {(seo.category?.name || seo.tags.length > 0) && (
            <div className="mt-6 case-tag-list">
              {seo.category?.name ? (
                <span className="case-tag">{seo.category.name}</span>
              ) : null}
              {seo.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="case-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="case-exhibits mt-8">
            <div className="case-exhibit">
              <div className="case-exhibit-tape" />
              <div className="case-exhibit-frame case-exhibit-frame-1">
                <Image
                  src={seo.image}
                  alt={post.title || seo.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  unoptimized={seo.image.startsWith("http")}
                  className="object-cover"
                />
              </div>
              <div className="case-exhibit-caption">Article cover</div>
            </div>

            <div className="case-index-card self-center">
              <div className="case-index-label mb-3">Share or save</div>
              <p className="case-file-copy mb-4">
                Save this post for later or send it to someone working on SEO,
                frontend, or product UX.
              </p>
              <ActionButtons title={post.title || seo.title} slug={post.slug || slug} />
            </div>
          </div>

          <hr className="case-divider case-divider-thin" />

          <section>
            <div className="case-section-label">Article</div>
            <div className="case-section-body max-w-none [&_h1]:font-[family-name:var(--font-special-elite)] [&_h2]:font-[family-name:var(--font-special-elite)] [&_h3]:font-[family-name:var(--font-special-elite)] [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_img]:rounded-none [&_img]:border [&_img]:border-[#211e1a] [&_img]:shadow-[5px_5px_0_rgba(33,30,26,0.18)] [&_li]:text-[15.5px] [&_li]:leading-8 [&_p]:text-[15.5px] [&_p]:leading-8">
              <PostContent content={post.content} />
            </div>
          </section>

          <div className="case-footer-nav">
            <Link href="/blog" className="case-back-link">
              All posts
            </Link>
            <Link href="/case-studies" className="case-next-link">
              View case studies
            </Link>
            <Link href="/services-patna" className="case-next-link">
              Explore Patna services
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
