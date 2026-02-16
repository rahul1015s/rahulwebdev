"use client";

import { motion } from "framer-motion";

/* ---------------------------------------------
   SVG: Circular Profile Frame
--------------------------------------------- */
function ProfileFrame() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="49.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
        vectorEffect="non-scaling-stroke"
      />

      {/* Horizontal rail */}
      <line
        x1="15"
        y1="50"
        x2="85"
        y2="50"
        stroke="currentColor"
        strokeOpacity="0.08"
        vectorEffect="non-scaling-stroke"
      />

      {/* Vertical rail */}
      <line
        x1="50"
        y1="15"
        x2="50"
        y2="85"
        stroke="currentColor"
        strokeOpacity="0.08"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ---------------------------------------------
   SVG: Status Dot
--------------------------------------------- */
function StatusDot() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* ---------------------------------------------
   Profile Card
--------------------------------------------- */
export function ProfileCard({
  image,
  label = "Profile",
}: {
  image: string;
  label?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="relative mx-auto w-64 h-64 md:w-80 md:h-80"
    >
      {/* SVG frame */}
      <ProfileFrame />

      {/* Image */}
      <div className="relative z-10 h-full w-full overflow-hidden rounded-full border border-border bg-muted">
        <img
          src={image}
          alt="Profile"
          className="h-full w-full object-cover"
          onError={(e) => {
            const t = e.currentTarget as HTMLImageElement;
            t.src = "/default-blog.png";
          }}
        />
      </div>

      {/* Label */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-7 text-xs text-muted-foreground">
        <StatusDot />
        {label}
      </div>
    </motion.div>
  );
}
