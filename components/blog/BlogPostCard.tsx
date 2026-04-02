import Link from "next/link";
import { Calendar } from "lucide-react";

type Props = {
  href: string;
  title: string;
  excerpt: string;
  tags: string[];
  date?: string;
  readTime?: string;
};

export function BlogPostCard({ href, title, excerpt, tags, date, readTime }: Props) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-border/70 p-3.5 transition-colors hover:bg-muted/40"
    >
      <h3 className="line-clamp-2 text-base font-semibold leading-snug group-hover:underline">
        {title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground">
        {date && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        )}
        {readTime && <span>{readTime}</span>}
      </div>
    </Link>
  );
}
