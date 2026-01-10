"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ---------------------------------------------
   Types
--------------------------------------------- */
interface NewsletterFormProps {
  variant?: "default" | "inline" | "minimal";
  location?: "blog" | "portfolio" | "footer";
}

/* ---------------------------------------------
   Subtle SVG Grid (Background)
--------------------------------------------- */
function NewsletterGridSVG() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full text-border"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={i * 12.5}
          x2="100"
          y2={i * 12.5}
          stroke="currentColor"
          strokeOpacity="0.06"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={i * 16.6}
          y1="0"
          x2={i * 16.6}
          y2="100"
          stroke="currentColor"
          strokeOpacity="0.06"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/* ---------------------------------------------
   Component
--------------------------------------------- */
export default function NewsletterForm({
  variant = "default",
  location = "portfolio",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /* ---------------------------------------------
     Submit
  --------------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source: location,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setName("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Try again.");
    }
  };

  /* ---------------------------------------------
     Minimal
  --------------------------------------------- */
  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex gap-2">
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          required
        />
        <Button size="icon" disabled={status === "loading"}>
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    );
  }

  /* ---------------------------------------------
     Inline
  --------------------------------------------- */
  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
          />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
          />
        </div>

        <Button className="w-full" disabled={status === "loading"}>
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Mail className="h-4 w-4 mr-2" />
          )}
          Subscribe
        </Button>

        <AnimatePresence>
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-muted-foreground text-center"
            >
              ✓ Subscription confirmed
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    );
  }

  /* ---------------------------------------------
     Default (Centered Card)
  --------------------------------------------- */
  return (
    <div className="relative mx-auto max-w-lg overflow-hidden rounded-xl border bg-card p-5 sm:p-6">
      <NewsletterGridSVG />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted">
            <Mail className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Newsletter</span>
        </div>

        <h3 className="text-lg font-semibold mb-1">
          Engineering notes & updates
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Occasional writing on web development and things I learn while
          building.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
          />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
          />

          <Button className="w-full" disabled={status === "loading"}>
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Subscribe
                <Send className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* States */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center gap-2 text-sm"
            >
              <Check className="h-4 w-4 text-primary" />
              You’re subscribed.
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-destructive"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
