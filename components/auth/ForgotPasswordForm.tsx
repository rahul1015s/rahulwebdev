"use client";

import { AuthCard } from "./AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ForgotPasswordForm() {
  return (
    <AuthCard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Reset password</h1>
          <p className="text-sm text-muted-foreground">
            We’ll send you a reset link
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="you@email.com" />
            </div>
          </div>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button className="w-full">Send reset link</Button>
          </motion.div>
        </div>

        <Link
          href="/login"
          className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
        </Link>
      </div>
    </AuthCard>
  );
}
