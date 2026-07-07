"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

/* ---------------------------------------------
   Types
--------------------------------------------- */
export type BlogCardProps = {
  href: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  readTime?: string;
  date?: string;
  index?: number;
};

/* ---------------------------------------------
   SVG Frame
--------------------------------------------- */
function BlogFrame() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        vectorEffect="non-scaling-stroke"
      />
      <line x1="2" y1="22" x2="98" y2="22" stroke="currentColor" strokeOpacity="0.08" />
      <line x1="2" y1="88" x2="98" y2="88" stroke="currentColor" strokeOpacity="0.08" />
    </svg>
  );
}

/* ---------------------------------------------
   Blog Card
--------------------------------------------- */
export function BlogCard({
  href,
  title,
  excerpt,
  image,
  tags,
  readTime,
  date,
  index = 0,
}: BlogCardProps) {
  const [src, setSrc] = useState(image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={href}
        className="
          group relative block h-full
          rounded-xl overflow-hidden
          border border-border/50
          bg-card/85 backdrop-blur
          transition-colors
          hover:border-primary/40
          hover:bg-card
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring
        "
      >
        <BlogFrame />

        <div className="relative z-10 w-full aspect-video bg-muted">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="
              object-contain
              bg-muted
              transition-transform duration-300
              group-hover:scale-[1.02]
            "
            unoptimized={src.startsWith("http")}
            onError={() => {
              setSrc("/default-blog.png");
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col gap-4 p-5">
          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {readTime}
              </span>
            )}
            {date && <span>{date}</span>}
          </div>

          {/* Title */}
          <h3 className="text-sm font-medium leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/60 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Article
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              Read
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
