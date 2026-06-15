import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Mail, Settings, Users } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getAdminStats } from "@/lib/admin-data";

export const metadata = { title: "Admin — Rahul Verma" };

const sections = [
  {
    href: "/admin/blog",
    title: "Blog",
    description: "Write, edit, and publish posts.",
    icon: FileText,
  },
  {
    href: "/admin/case-studies",
    title: "Case Studies",
    description: "Manage portfolio stories and drafts.",
    icon: Briefcase,
  },
  {
    href: "/admin/newsletter",
    title: "Newsletter",
    description: "Compose and send subscriber emails.",
    icon: Mail,
  },
  {
    href: "/admin/site-settings",
    title: "Site Settings",
    description: "Adjust landing page and site content.",
    icon: Settings,
  },
];

export default async function AdminPage() {
  const stats = await getAdminStats();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Faster content management with a lighter admin workspace.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
          <p className="text-2xl font-semibold">{stats.posts.published}</p>
          <p className="mt-1 text-sm text-muted-foreground">Published posts</p>
          <p className="mt-2 text-xs text-muted-foreground">{stats.posts.drafts} drafts pending</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
          <p className="text-2xl font-semibold">{stats.caseStudies.total}</p>
          <p className="mt-1 text-sm text-muted-foreground">Case studies</p>
          <p className="mt-2 text-xs text-muted-foreground">{stats.caseStudies.drafts} drafts pending</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
          <p className="text-2xl font-semibold">{stats.subscribers.total}</p>
          <p className="mt-1 text-sm text-muted-foreground">Subscribers</p>
          <p className="mt-2 text-xs text-muted-foreground">{stats.subscribers.active} active</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
          <p className="text-2xl font-semibold">{stats.newsletters.sent}</p>
          <p className="mt-1 text-sm text-muted-foreground">Campaigns sent</p>
          <p className="mt-2 text-xs text-muted-foreground">{stats.newsletters.openRate}% avg open rate</p>
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-border/70 bg-card/70 p-5 transition hover:border-emerald-300/70 hover:shadow-[0_18px_40px_-28px_rgba(16,185,129,0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-emerald-700" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-border/70 bg-card/60 p-5">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Subscriber health</h2>
            <p className="text-sm text-muted-foreground">
              {stats.subscribers.active} active and {stats.subscribers.inactive} inactive subscribers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
