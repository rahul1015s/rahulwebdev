"use client";

import { AuthCard } from "./AuthCard";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function TwoFactorSetup() {
  return (
    <AuthCard>
      <div className="space-y-6 text-center">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Two-Factor Authentication</h1>
          <p className="text-sm text-muted-foreground mt-2">
            2FA setup is coming soon!
          </p>
        </div>
        <div className="space-y-2">
          <Link href="/admin" className="block">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}