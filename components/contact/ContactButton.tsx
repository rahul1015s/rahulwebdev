"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  href: string;
  label: string;
  icon: LucideIcon;
  variant?: "default" | "outline";
  accent?: string;
};

export function ContactButton({
  href,
  label,
  icon: Icon,
  variant = "outline",
  accent = "emerald",
}: Props) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
      <Button
        asChild
        size="lg"
        variant={variant}
        className={`gap-2 relative overflow-hidden group`}
      >
        <Link href={href} target="_blank">
          {/* Hover glow */}
          <span
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition
              bg-${accent}-500/10`}
          />

          <Icon className="h-5 w-5 relative z-10" />
          <span className="relative z-10">{label}</span>
        </Link>
      </Button>
    </motion.div>
  );
}
