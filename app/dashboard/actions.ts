"use server";

import type { FocusTaskKey } from "@/models/focus-day";
import { requireDashboardUserId } from "@/lib/dashboard/auth";
import {
  toggleFocusTask,
  upsertDashboardSettings,
  upsertDsaStats,
} from "@/lib/dashboard/service";
import type { DashboardSettingsShape } from "@/lib/dashboard/types";
import { revalidatePath } from "next/cache";

export async function updateFocusTaskAction(taskKey: FocusTaskKey, value: boolean) {
  const userId = await requireDashboardUserId();
  await toggleFocusTask(userId, taskKey, value);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/focus");
}

export async function updateDsaStatsAction(payload: {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
}) {
  const userId = await requireDashboardUserId();

  const clean = {
    totalSolved: Math.max(0, Number(payload.totalSolved || 0)),
    easy: Math.max(0, Number(payload.easy || 0)),
    medium: Math.max(0, Number(payload.medium || 0)),
    hard: Math.max(0, Number(payload.hard || 0)),
  };

  await upsertDsaStats(userId, clean);
  revalidatePath("/dashboard");
}

export async function updateDashboardSettingsAction(payload: DashboardSettingsShape) {
  const userId = await requireDashboardUserId();

  await upsertDashboardSettings(userId, {
    githubUsername: payload.githubUsername.trim(),
    dsaUsernames: {
      leetcode: payload.dsaUsernames.leetcode.trim(),
      gfg: payload.dsaUsernames.gfg.trim(),
      codechef: payload.dsaUsernames.codechef.trim(),
    },
    focusModeEnabled: payload.focusModeEnabled,
    dailyTaskLabels: {
      dsa: payload.dailyTaskLabels.dsa.trim() || "Solve 1 DSA problem",
      project: payload.dailyTaskLabels.project.trim() || "Work on project",
      exercise: payload.dailyTaskLabels.exercise.trim() || "Exercise",
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/focus");
  revalidatePath("/dashboard/settings");
}
