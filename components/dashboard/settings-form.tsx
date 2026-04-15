"use client";

import { useState, useTransition } from "react";
import type { DashboardSettingsShape } from "@/lib/dashboard/types";
import { updateDashboardSettingsAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function DashboardSettingsForm({
  initial,
}: {
  initial: DashboardSettingsShape;
}) {
  const [form, setForm] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      await updateDashboardSettingsAction(form);
      toast.success("Dashboard settings updated");
    });
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-base font-semibold">Profiles</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="githubUsername">GitHub Username</Label>
            <Input
              id="githubUsername"
              value={form.githubUsername}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, githubUsername: event.target.value }))
              }
              placeholder="rahul1015s"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="leetcode">LeetCode Username</Label>
            <Input
              id="leetcode"
              value={form.dsaUsernames.leetcode}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dsaUsernames: { ...prev.dsaUsernames, leetcode: event.target.value },
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="gfg">GFG Username</Label>
            <Input
              id="gfg"
              value={form.dsaUsernames.gfg}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dsaUsernames: { ...prev.dsaUsernames, gfg: event.target.value },
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="codechef">CodeChef Username</Label>
            <Input
              id="codechef"
              value={form.dsaUsernames.codechef}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dsaUsernames: { ...prev.dsaUsernames, codechef: event.target.value },
                }))
              }
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold">Daily Tasks</h2>
        <div className="grid gap-3">
          <div className="space-y-1">
            <Label htmlFor="dsaTask">DSA Task Label</Label>
            <Input
              id="dsaTask"
              value={form.dailyTaskLabels.dsa}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dailyTaskLabels: { ...prev.dailyTaskLabels, dsa: event.target.value },
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="projectTask">Project Task Label</Label>
            <Input
              id="projectTask"
              value={form.dailyTaskLabels.project}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dailyTaskLabels: { ...prev.dailyTaskLabels, project: event.target.value },
                }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="exerciseTask">Exercise Task Label</Label>
            <Input
              id="exerciseTask"
              value={form.dailyTaskLabels.exercise}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  dailyTaskLabels: { ...prev.dailyTaskLabels, exercise: event.target.value },
                }))
              }
            />
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-border/70 bg-background/60 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Default Focus Mode</h3>
            <p className="text-xs text-muted-foreground">
              Keep your startup screen in distraction-free mode.
            </p>
          </div>
          <Switch
            checked={form.focusModeEnabled}
            onCheckedChange={(value) =>
              setForm((prev) => ({ ...prev, focusModeEnabled: value }))
            }
          />
        </div>
      </section>

      <Button onClick={save} disabled={isPending}>
        {isPending ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}
