import { requireDashboardUser } from "@/lib/dashboard/auth";
import { getDashboardData } from "@/lib/dashboard/service";
import { FocusTaskChecklist } from "@/components/dashboard/focus-task-checklist";
import { Flame } from "lucide-react";

export const metadata = {
  title: "Focus Mode",
};

export default async function FocusModePage() {
  const user = await requireDashboardUser();
  const data = await getDashboardData(user.id);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-20">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Focus Mode</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Do the hard thing first</h1>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-300">
            <Flame className="h-4 w-4" />
            {data.streak.currentStreak} day streak
          </div>
        </div>

        <FocusTaskChecklist
          tasks={data.todayFocus.tasks}
          labels={data.settings.dailyTaskLabels}
          compact
        />
      </div>
    </div>
  );
}
