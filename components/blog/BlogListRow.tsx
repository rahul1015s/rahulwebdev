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
            rounded-lg border border-border
            px-4 py-3
            transition-colors
            hover:bg-muted/50
        "
        >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div className="min-w-0">
            <h3 className="truncate font-medium group-hover:underline">
                {title}
            </h3>

            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                {excerpt}
            </p>

            {/* Tags */}
            <div className="mt-2 flex flex-wrap gap-1.5">
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
            <div className="mt-2 flex shrink-0 items-center gap-3 text-xs text-muted-foreground sm:mt-0">
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
