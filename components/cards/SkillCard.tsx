"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon } from "lucide-react";

/* ---------------------------------------------
   Types
--------------------------------------------- */
export type SkillCategory = {
    title: string;
    icon: LucideIcon;
    skills: string[];
};

/* ---------------------------------------------
   SVG: Tile Frame
--------------------------------------------- */
function TileFrame() {
    return (
        <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
        >
            {/* Outer frame */}
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

            {/* Header rail */}
            <line
                x1="2"
                y1="20"
                x2="98"
                y2="21"
                stroke="currentColor"
                strokeOpacity="0.08"
                vectorEffect="non-scaling-stroke"
            />


            {/* Footer rail */}
            <line
                x1="2"
                y1="82"
                x2="98"
                y2="82"
                stroke="currentColor"
                strokeOpacity="0.08"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}

/* ---------------------------------------------
   SVG: Header Dot
--------------------------------------------- */
function HeaderDot() {
    return (
        <svg width="8" height="8" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" fill="currentColor" opacity="0.7" />
        </svg>
    );
}

/* ---------------------------------------------
   Skill Card
--------------------------------------------- */
export function SkillCard({
    category,
    index,
}: {
    category: SkillCategory;
    index: number;
}) {
    const reduceMotion = useReducedMotion();
    const Icon = category.icon;

    return (
        <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="
        relative h-full rounded-xl
        bg-card/85 backdrop-blur
        border border-border/50
      "
        >
            {/* SVG frame */}
            <TileFrame />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col p-5 gap-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <HeaderDot />
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted">
                        <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                        {category.title}
                    </h3>
                </div>

                {/* Skills */}
                <ul className="mt-1 space-y-1.5">
                    {category.skills.map((skill) => (
                        <li
                            key={skill}
                            className="
                text-[13px]
                text-muted-foreground
                leading-relaxed
              "
                        >
                            {skill}
                        </li>
                    ))}
                </ul>

                {/* Footer label */}
                <div className="mt-auto pt-3">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Capability
                    </span>
                </div>
            </div>
        </motion.article>
    );
}
