"use client";

import { useState, useEffect } from "react";
import { Share2, Bookmark, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ActionButtonsProps {
  title: string;
  slug: string;
}

export default function ActionButtons({ title, slug }: ActionButtonsProps) {
  const [isShared, setIsShared] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this article: ${title}`,
          url: currentUrl,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (error) {
        console.log('Error sharing:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    });
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      // Remove from bookmarks
      const bookmarks = JSON.parse(localStorage.getItem('blog-bookmarks') || '[]');
      const updatedBookmarks = bookmarks.filter((bookmark: string) => bookmark !== slug);
      localStorage.setItem('blog-bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      // Add to bookmarks
      const bookmarks = JSON.parse(localStorage.getItem('blog-bookmarks') || '[]');
      if (!bookmarks.includes(slug)) {
        bookmarks.push(slug);
        localStorage.setItem('blog-bookmarks', JSON.stringify(bookmarks));
      }
    }
    setIsBookmarked(!isBookmarked);
  };

  // Check if already bookmarked on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('blog-bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(slug));
  }, [slug]);

  return (
    <div className="flex items-center gap-2">
      {/* Share Button */}
      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-all duration-200 relative group"
      >
        <AnimatePresence mode="wait">
          {isShared ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="text-emerald-600"
            >
              <Check size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              className="group-hover:scale-110 transition-transform duration-200"
            >
              <Share2 size={18} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {isShared ? "Copied!" : "Share article"}
        </div>
      </motion.button>

      {/* Bookmark Button */}
      <motion.button
        onClick={handleBookmark}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-amber-900/20 text-gray-700 dark:text-gray-300 hover:text-amber-600 transition-all duration-200 relative group"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isBookmarked ? "bookmarked" : "bookmark"}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={isBookmarked ? "text-amber-600" : ""}
          >
            <Bookmark 
              size={18} 
              fill={isBookmarked ? "currentColor" : "none"}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {isBookmarked ? "Remove bookmark" : "Save for later"}
        </div>
        
        {/* Bookmark indicator */}
        {isBookmarked && (
          <motion.div 
            className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        )}
      </motion.button>
    </div>
  );
}