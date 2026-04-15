import { requireDashboardUser } from "@/lib/dashboard/auth";
import { getDashboardData } from "@/lib/dashboard/service";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardSettingsForm } from "@/components/dashboard/settings-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard Settings",
};

export default async function DashboardSettingsPage() {
  const user = await requireDashboardUser();
  const data = await getDashboardData(user.id);

  return (
    <DashboardShell
      title="Settings"
      subtitle="Configure integrations, focus defaults, and daily task wording."
    >
      <Card className="border-blue-400/20 bg-card/90">
        <CardHeader>
          <CardTitle>Dashboard Configuration</CardTitle>
          <CardDescription>
            GitHub and coding profile usernames are used for your private dashboard only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardSettingsForm initial={data.settings} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
