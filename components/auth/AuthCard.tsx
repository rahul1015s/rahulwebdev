"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <Card className="p-6 shadow-lg backdrop-blur-sm">
        {children}
      </Card>
    </motion.div>
  );
}
