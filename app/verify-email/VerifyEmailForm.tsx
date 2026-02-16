"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";

export default function VerifyEmailForm() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/sign-in/email-otp", {
          email: email || "",
          otp: otp.trim(),
      });

      const result = response.data;

      if (result?.error) {
        toast.error(result.error?.message || "Verification failed");
      } else {
        toast.success("Email verified successfully!");
        router.push("/login?verified=true");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Verification failed. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    toast.info("Please sign up again to receive a new OTP code.");
    router.push("/signup");
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Invalid Link</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">Invalid verification link. Email parameter is missing.</p>
            <Link href="/signup">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Signup
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" />
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">
              We've sent a 6-digit OTP code to:
            </p>
            <p className="font-semibold text-gray-800">{email}</p>
            <p className="text-sm text-gray-500 mt-2">
              Enter the code below to verify your account
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-3">
              Didn't receive the code?
            </p>
            <Button
              variant="outline"
              onClick={handleResendOTP}
              disabled={isResending}
              className="w-full"
            >
              {isResending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend OTP"
              )}
            </Button>
          </div>

          <div className="text-center mt-4">
            <Link href="/signup" className="text-sm text-blue-600 hover:underline">
              Wrong email? Go back to signup
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
