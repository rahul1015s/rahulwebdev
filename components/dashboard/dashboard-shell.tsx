import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <DashboardNav />
            <LogoutButton />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
