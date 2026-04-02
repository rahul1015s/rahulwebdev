"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";

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
      const res = await api.post("/api/newsletter/subscribe", {
        email,
        name: name || undefined,
        source: location,
      });

      const data = res.data;

      if (!data?.error) {
        setStatus("success");
        setEmail("");
        setName("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setErrorMessage(data?.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(getApiErrorMessage(error, "Network error. Try again."));
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
    <section className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-border/70 bg-card p-4 sm:p-5">
      <NewsletterGridSVG />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_55%)]" />

      <div className="relative z-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-xs font-medium">
            <Mail className="h-3.5 w-3.5" />
            Newsletter
          </div>
          <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
            Weekly engineering notes
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Practical lessons from real projects, shipped once a week. No spam.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5 rounded-lg border border-border/60 bg-background/60 p-3 sm:p-4">
          <Input
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            className="h-9 text-sm"
          />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            className="h-9 text-sm"
          />

          <Button className="h-9 w-full text-sm" disabled={status === "loading"}>
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Subscribe
                <Send className="ml-1.5 h-4 w-4" />
              </>
            )}
          </Button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1 flex items-center gap-2 text-xs text-primary"
              >
                <Check className="h-3.5 w-3.5" />
                You’re subscribed.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1 text-xs text-destructive"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
