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

    export function BlogListRow({
    href,
    title,
    excerpt,
    tags,
    date,
    readTime,
    }: Props) {
    return (
        <Link
        href={href}
        className="
            group block
            rounded-lg border border-border/70
            px-3 py-2.5 sm:px-4 sm:py-3
            transition-colors
            hover:bg-muted/40
        "
        >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold sm:text-[15px] group-hover:underline">
                {title}
            </h3>

            <p className="mt-0.5 line-clamp-1 text-xs sm:text-sm text-muted-foreground/90">
                {excerpt}
            </p>

            {/* Tags */}
            <div className="mt-1.5 hidden flex-wrap gap-1.5 sm:flex">
                {tags.map((tag) => (
                <span
                    key={tag}
                    className="
                    rounded-md
                    bg-muted px-2 py-0.5
                    text-xs text-muted-foreground
                    "
                >
                    {tag}
                </span>
                ))}
            </div>
            </div>

            {/* Right */}
            <div className="mt-1.5 flex shrink-0 items-center gap-2 text-[11px] text-muted-foreground sm:mt-0 sm:text-xs">
            {date && (
                <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {date}
                </span>
            )}
            {readTime && <span>{readTime}</span>}
            </div>
        </div>
        </Link>
    );
    }
