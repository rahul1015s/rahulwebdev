"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, Copy, ExternalLink, Share2 } from "lucide-react";

interface ActionButtonsProps {
  title: string;
  slug: string;
}

type ShareLink = {
  label: string;
  href: string;
};

const BOOKMARK_EVENT = "blog-bookmarks-updated";

const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/.test(navigator.platform);

function readSavedState(slug: string) {
  if (typeof window === "undefined") return false;

  try {
    const stored = JSON.parse(localStorage.getItem("blog-bookmarks") || "[]");
    return Array.isArray(stored) && stored.includes(slug);
  } catch {
    return false;
  }
}

export default function ActionButtons({ title, slug }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showBookmarkHint, setShowBookmarkHint] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const bookmarkShortcut = isMac ? "Cmd+D" : "Ctrl+D";
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";
  const saved = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const handleChange = () => onStoreChange();

      window.addEventListener("storage", handleChange);
      window.addEventListener(BOOKMARK_EVENT, handleChange);

      return () => {
        window.removeEventListener("storage", handleChange);
        window.removeEventListener(BOOKMARK_EVENT, handleChange);
      };
    },
    () => readSavedState(slug),
    () => false
  );

  useEffect(() => {
    if (!showShareMenu) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showShareMenu]);

  const shareLinks = useMemo<ShareLink[]>(() => {
    if (!url) return [];

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return [
      {
        label: "WhatsApp",
        href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      },
      {
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      },
      {
        label: "X / Twitter",
        href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      },
      {
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      },
      {
        label: "Telegram",
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      },
      {
        label: "Email",
        href: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`,
      },
    ];
  }, [title, url]);

  const copyUrl = async () => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const openNativeShare = async () => {
    if (!canNativeShare || !url) return;

    try {
      await navigator.share({ title, url });
      setShowShareMenu(false);
    } catch {}
  };

  const toggleBookmark = () => {
    if (typeof window === "undefined") return;

    const stored = JSON.parse(localStorage.getItem("blog-bookmarks") || "[]");
    const updated = saved
      ? stored.filter((item: string) => item !== slug)
      : [...stored, slug];

    localStorage.setItem("blog-bookmarks", JSON.stringify(updated));
    window.dispatchEvent(new Event(BOOKMARK_EVENT));
    setShowBookmarkHint(true);

    window.setTimeout(() => {
      setShowBookmarkHint(false);
    }, 2200);
  };

  return (
    <div ref={wrapperRef} className="relative flex items-center gap-2 text-muted-foreground">
      <motion.button
        type="button"
        onClick={() => setShowShareMenu((open) => !open)}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/70 bg-background px-3 text-sm font-medium transition hover:bg-muted"
        aria-label="Share article"
        aria-expanded={showShareMenu}
      >
        <Share2 className="h-4 w-4" />
        Share
      </motion.button>

      <motion.button
        type="button"
        onClick={toggleBookmark}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/70 bg-background px-3 text-sm font-medium transition hover:bg-muted"
        aria-label="Save article"
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-amber-400 text-amber-500" : ""}`} />
        Save
      </motion.button>

      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="absolute right-0 top-12 z-30 w-72 rounded-2xl border border-border/70 bg-background p-3 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)]"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Share this article</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Choose an app or copy the direct link.
                </p>
              </div>
            </div>

            {canNativeShare && (
              <button
                type="button"
                onClick={openNativeShare}
                className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200"
              >
                <ExternalLink className="h-4 w-4" />
                Open device share options
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              {shareLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-border/70 px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={copyUrl}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/70 px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied ? "Link copied" : "Copy article link"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBookmarkHint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute right-0 top-12 z-20 w-72 rounded-xl border border-border/70 bg-background px-3 py-2.5 text-xs text-muted-foreground shadow-[0_20px_46px_-34px_rgba(15,23,42,0.35)]"
          >
            {saved ? "Saved in this browser for your site experience." : "Removed from saved items on this browser."}{" "}
            To add a real browser bookmark, press {bookmarkShortcut}.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
