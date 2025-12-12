"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function BlogCard({
  href,
  title,
  excerpt,
  image,
  date,
  readTime,
  tags,
}: {
  href: string;
  title: string;
  excerpt: string;
  image?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
}) {
  // Use the DB image value directly; fallback to the public default
  const [src, setSrc] = useState<string>(image && image.length > 0 ? image : '/default-blog.png');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group rounded-xl border bg-card/60 dark:bg-card/10 backdrop-blur-lg 
                 shadow-sm hover:shadow-xl transition-all overflow-hidden"
    >
      <Link href={href} className="block">

        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={src}
            alt={title}
            fill
            unoptimized={true}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setSrc('/default-blog.png')}
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">

          {tags && tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-lg font-semibold group-hover:text-emerald-600 transition">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>

          <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{date}</span>
            <span>{readTime}</span>
          </div>
        </div>

      </Link>
    </motion.div>
  );
}