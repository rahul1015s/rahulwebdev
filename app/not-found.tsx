import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Home, Mail, Search, SquarePen } from "lucide-react";

const quickLinks = [
  {
    href: "/",
    title: "Back to homepage",
    description: "See portfolio highlights, services, and recent work.",
    icon: Home,
  },
  {
    href: "/blog",
    title: "Read the blog",
    description: "Explore articles on SEO, frontend engineering, and web performance.",
    icon: SquarePen,
  },
  {
    href: "/case-studies",
    title: "View case studies",
    description: "Check how projects were planned, built, and improved.",
    icon: BriefcaseBusiness,
  },
  {
    href: "/#contact",
    title: "Contact Rahul",
    description: "Reach out for freelance work, collaboration, or questions.",
    icon: Mail,
  },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_34%),linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,1))] py-20 dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,rgba(2,6,23,1),rgba(3,7,18,1))]">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
            <Search className="h-3.5 w-3.5" />
            404 page not found
          </div>

          <h1 className="mt-6 max-w-xl font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            This page drifted away, but the good work is still here.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            You might have hit an old portfolio link, a moved blog URL, or a page that no longer
            exists. Use the shortcuts below to jump back into projects, writing, or contact.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              Go to homepage
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Browse blog articles
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.5rem] border border-border/70 bg-background/75 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.32)] backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-background"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold text-foreground">{item.title}</h2>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-300" />
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
