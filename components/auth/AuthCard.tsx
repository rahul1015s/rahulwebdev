"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-sm"
    >
      <Card className="p-4 shadow-md backdrop-blur-sm sm:p-5">
        {children}
      </Card>
    </motion.div>
  );
}
