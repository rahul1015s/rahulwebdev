import { notFound } from "next/navigation";
import connectMongoose from "@/lib/mongoose";
import Post from "@/models/post";
import PostContent from "@/components/blog/PostContent";
import Link from "next/link";
import Image from "next/image";
import { normalizeImageUrl } from "@/utils/url-utils";

interface PostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const unwrapped = params instanceof Promise ? await params : params;
  const { slug } = unwrapped;

  await connectMongoose();

  let post = await Post.findOne({ slug }).lean();

  if (!post && /^[0-9a-fA-F]{24}$/.test(slug)) {
    post = await Post.findById(slug).lean();
  }

  if (!post) return notFound();

  /** COVER IMAGE LOGIC */
  let coverImage: string | null = null;

  if (post.image) coverImage = normalizeImageUrl(post.image);

  if (!coverImage && typeof post.content === "string") {
    try {
      const json = JSON.parse(post.content);
      const firstImage = json?.content?.find((n: any) => n.type === "image");
      if (firstImage?.attrs?.src) {
        coverImage = normalizeImageUrl(firstImage.attrs.src);
      }
    } catch {}
  }

  // SERVER-SAFE FALLBACK
  if (!coverImage || typeof coverImage !== "string") {
    coverImage = "/default-blog.png";
  }

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 py-16">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900 transition-colors mb-10"
      >
        ← Back to blog
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-foreground tracking-tight">
          {post.title}
        </h1>

        <div className="relative w-full h-56 sm:h-64 md:h-80 rounded-xl overflow-hidden shadow-md mb-10">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            priority
            unoptimized={coverImage.startsWith("http")}
            className="object-cover"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
          <time>
            {post.createdAt &&
              new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </time>

          {post.readTime && <span>• {post.readTime}</span>}
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-gray max-w-none mb-16 prose-img:rounded-xl prose-img:shadow">
        <PostContent content={post.content} />
      </article>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all text-sm font-medium shadow-sm"
        >
          ← Back to blog
        </Link>
      </footer>
    </div>
  );
}
