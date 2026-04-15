import { requireDashboardUser } from "@/lib/dashboard/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireDashboardUser();

  return (
    <div className="dark min-h-screen bg-[radial-gradient(circle_at_top,_rgba(29,78,216,0.18),_transparent_35%),linear-gradient(180deg,#070b12_0%,#0a0f17_100%)] text-foreground">
      {children}
    </div>
  );
}
