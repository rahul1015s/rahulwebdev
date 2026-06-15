import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BarChart3, Briefcase, FileText, Mail, Settings } from "lucide-react";
import { auth } from "@/lib/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/site-settings", label: "Settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session || session.user.role !== "admin") {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(248,250,252,0.9),rgba(255,255,255,1))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,1),rgba(3,7,18,1))]">
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-border/70 bg-card/70 p-2 backdrop-blur">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}
