import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

type Props = {
  href: string;
  title: string;
  excerpt: string;
  category?: string;
  tags: string[];
  date?: string;
  readTime?: string;
};

export function BlogListRow({
  href,
  title,
  excerpt,
  category,
  tags,
  date,
  readTime,
}: Props) {
  return (
    <Link
      href={href}
      className="group block rounded-[1.2rem] border border-border/70 bg-card/75 px-4 py-3 transition duration-300 hover:border-emerald-300/70 hover:bg-card hover:shadow-[0_18px_42px_-34px_rgba(16,185,129,0.35)] sm:px-4.5"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {category && (
              <span className="rounded-full border border-emerald-200/80 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:border-emerald-500/20 dark:text-emerald-200">
                {category}
              </span>
            )}
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300 sm:text-[17px]">
            {title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">{excerpt}</p>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 lg:min-w-[200px] lg:justify-end">
          <div className="space-y-1.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {date && (
              <p className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                {date}
              </p>
            )}
            {readTime && (
              <p className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                {readTime}
              </p>
            )}
          </div>

          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-emerald-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
