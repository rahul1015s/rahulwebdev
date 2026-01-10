"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ActionButtonsProps {
  title: string;
  slug: string;
}

export default function ActionButtons({ title, slug }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [url, setUrl] = useState("");

  /* ---------------------------------------------
     Safe client-only URL
  --------------------------------------------- */
  useEffect(() => {
    setUrl(window.location.href);

    const stored = JSON.parse(
      localStorage.getItem("blog-bookmarks") || "[]"
    );
    setSaved(stored.includes(slug));
  }, [slug]);

  /* ---------------------------------------------
     Share
  --------------------------------------------- */
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  /* ---------------------------------------------
     Bookmark
  --------------------------------------------- */
  const toggleBookmark = () => {
    const stored = JSON.parse(
      localStorage.getItem("blog-bookmarks") || "[]"
    );

    const updated = saved
      ? stored.filter((s: string) => s !== slug)
      : [...stored, slug];

    localStorage.setItem("blog-bookmarks", JSON.stringify(updated));
    setSaved(!saved);
  };

  return (
    <div className="flex items-center gap-2">
      {/* SHARE */}
      <motion.button
        onClick={share}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="relative h-9 w-9 rounded-md border bg-background hover:bg-muted transition"
        aria-label="Share article"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.svg
              key="done"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-emerald-600 mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <path
                fill="currentColor"
                d="M9.5 16.2 4.8 11.5l1.4-1.4 3.3 3.3 7.1-7.1 1.4 1.4z"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="share"
              viewBox="0 0 24 24"
              className="h-4 w-4 mx-auto"
            >
              <path
                fill="currentColor"
                d="M18 16a3 3 0 0 0-2.4 1.2L8.9 13a3.3 3.3 0 0 0 0-2l6.7-4.2A3 3 0 1 0 14 5a3 3 0 0 0 .1.7L7.4 10A3 3 0 1 0 7 14l6.7 4.3a3 3 0 1 0 4.3-2.3Z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* BOOKMARK */}
      <motion.button
        onClick={toggleBookmark}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="relative h-9 w-9 rounded-md border bg-background hover:bg-muted transition"
        aria-label="Save article"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 mx-auto transition ${
            saved ? "text-amber-500" : ""
          }`}
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M6 3h12v18l-6-4-6 4z" />
        </svg>
      </motion.button>
    </div>
  );
}
