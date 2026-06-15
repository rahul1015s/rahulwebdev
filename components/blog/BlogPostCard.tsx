import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";

type Props = {
  href: string;
  title: string;
  excerpt: string;
  category?: string;
  tags: string[];
  image?: string;
  date?: string;
  readTime?: string;
};

export function BlogPostCard({ href, title, excerpt, category, tags, image, date, readTime }: Props) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[1.35rem] border border-border/70 bg-card/80 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/70 hover:shadow-[0_20px_46px_-34px_rgba(16,185,129,0.35)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60 bg-muted">
        <Image
          src={image || "/default-blog.png"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized={Boolean(image?.startsWith("http"))}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <div className="flex items-center gap-2">
            {category && <span>{category}</span>}
            {date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {date}
              </span>
            )}
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{excerpt}</p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3 text-sm text-muted-foreground">
          <span>{readTime || "5 min read"}</span>
          <span className="font-medium text-foreground">Read article</span>
        </div>
      </div>
    </Link>
  );
}
