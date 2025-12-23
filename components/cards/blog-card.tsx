"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, Eye, BookOpen } from "lucide-react";

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
  const [src, setSrc] = useState<string>(image && image.length > 0 ? image : '/default-blog.png');
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute -inset-1 bg-linear-to-r from-emerald-500/10 via-transparent to-transparent rounded-xl blur-lg -z-10"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="rounded-xl border bg-card/80 dark:bg-card/20 backdrop-blur-sm 
                   shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden
                   hover:border-emerald-300/50 relative z-10"
        animate={{ 
          y: isHovered ? -5 : 0,
          borderColor: isHovered ? "hsl(var(--emerald-300)/0.5)" : "hsl(var(--border)/0.5)"
        }}
      >
        <Link href={href} className="block relative">

          {/* Image Section with enhanced effects */}
          <div className="relative w-full h-40 sm:h-48 overflow-hidden">
            {/* Loading shimmer */}
            {!isImageLoaded && (
              <motion.div 
                className="absolute inset-0 bg-linear-to-r from-emerald-100/20 via-gray-200/30 to-emerald-100/20 z-10"
                animate={{ 
                  x: ["-100%", "100%"],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  backgroundSize: "200% 100%",
                  backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                }}
              />
            )}

            {/* Image with parallax effect */}
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <img
                src={src}
                alt={title}
                className="w-full h-full object-contain"
                onError={() => setSrc('/default-blog.png')}
                onLoad={() => setIsImageLoaded(true)}
              />
            </motion.div>

            {/* Gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
              animate={{ opacity: isHovered ? 0.3 : 0.1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Hover overlay */}
            <motion.div 
              className="absolute inset-0 bg-linear-to-r from-emerald-900/20 via-transparent to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.8 }}
            />

            {/* Read overlay button */}
            <motion.div 
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-700" />
              </motion.div>
            </motion.div>

            {/* Quick view button */}
            <motion.div 
              className="absolute bottom-4 left-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="px-2 py-1 text-xs font-medium bg-black/80 text-white rounded backdrop-blur-sm">
                <Eye className="w-3 h-3 inline mr-1" />
                Read
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 space-y-3">
            {/* Tags with micro-interactions */}
            {tags && tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {tags.slice(0, 2).map((tag) => (
                  <motion.span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 
                               text-emerald-700 dark:text-emerald-300 cursor-default relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "rgb(220 252 231)",
                      boxShadow: "0 4px 12px -4px rgba(34, 197, 94, 0.3)"
                    }}
                    onHoverStart={() => setHoveredTag(tag)}
                    onHoverEnd={() => setHoveredTag(null)}
                    transition={{ duration: 0.2 }}
                  >
                    {tag}
                    
                    {/* Tag shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ 
                        x: hoveredTag === tag ? "100%" : "-100%"
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.span>
                ))}
                
                {/* +more indicator */}
                {tags.length > 2 && (
                  <motion.span 
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    whileHover={{ scale: 1.05 }}
                  >
                    +{tags.length - 2}
                  </motion.span>
                )}
              </div>
            )}

            {/* Title with animated underline */}
            <div className="relative">
              <motion.h3 
                className="text-base sm:text-lg font-semibold group-hover:text-emerald-600 transition-colors duration-300"
                animate={{ color: isHovered ? "hsl(var(--emerald-600))" : "hsl(var(--foreground))" }}
              >
                {title}
              </motion.h3>
              
              {/* Animated underline */}
              <motion.div 
                className="h-0.5 bg-linear-to-r from-emerald-500 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Excerpt with subtle animation */}
            <motion.p 
              className="text-xs sm:text-sm text-muted-foreground line-clamp-2"
              animate={{ 
                color: isHovered ? "hsl(var(--foreground)/0.8)" : "hsl(var(--muted-foreground))"
              }}
              transition={{ duration: 0.3 }}
            >
              {excerpt}
            </motion.p>

            {/* Footer with animated icons */}
            <div className="pt-3 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50">
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Calendar className="w-3 h-3" />
                </motion.div>
                <span>{date}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ 
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    rotate: isHovered ? 360 : 0
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Clock className="w-3 h-3" />
                </motion.div>
                <span>{readTime}</span>
              </motion.div>
            </div>
          </div>

          {/* Corner accent */}
          <motion.div 
            className="absolute top-0 right-0"
            animate={{ 
              rotate: isHovered ? 180 : 0,
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full m-2 shadow-lg" />
          </motion.div>

          {/* Bottom accent */}
          {/* <motion.div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.5, 1, 0.5] : 0.5
            }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          >
            <BookOpen className="w-4 h-4 text-emerald-400/50" />
          </motion.div> */}
        </Link>
      </motion.div>
    </motion.div>
  );
}