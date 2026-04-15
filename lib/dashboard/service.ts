import { connectDB } from "@/lib/mongodb";
import { getTodayDateKey, getPreviousDateKey } from "@/lib/dashboard/date";
import type { DashboardData, DashboardSettingsShape } from "@/lib/dashboard/types";
import FocusDay, { type FocusTaskKey } from "@/models/focus-day";
import Streak from "@/models/streak";
import DsaStats from "@/models/dsa-stats";
import DashboardSettings from "@/models/dashboard-settings";
import { getGithubSnapshot } from "@/lib/dashboard/github";
import { getUpcomingContests } from "@/lib/dashboard/contests";

const DEFAULT_TASKS: Record<FocusTaskKey, boolean> = {
  dsa: false,
  project: false,
  exercise: false,
};

const DEFAULT_TASK_LABELS: DashboardSettingsShape["dailyTaskLabels"] = {
  dsa: "Solve 1 DSA problem",
  project: "Work on project",
  exercise: "Exercise",
};

async function ensureSettings(userId: string) {
  const doc = await DashboardSettings.findOneAndUpdate(
    { userId },
    {
      $setOnInsert: {
        userId,
        githubUsername: "",
        dsaUsernames: {
          leetcode: "",
          gfg: "",
          codechef: "",
        },
        focusModeEnabled: true,
        dailyTaskLabels: DEFAULT_TASK_LABELS,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  return {
    githubUsername: doc?.githubUsername || "",
    dsaUsernames: {
      leetcode: doc?.dsaUsernames?.leetcode || "",
      gfg: doc?.dsaUsernames?.gfg || "",
      codechef: doc?.dsaUsernames?.codechef || "",
    },
    focusModeEnabled: doc?.focusModeEnabled ?? true,
    dailyTaskLabels: {
      dsa: doc?.dailyTaskLabels?.dsa || DEFAULT_TASK_LABELS.dsa,
      project: doc?.dailyTaskLabels?.project || DEFAULT_TASK_LABELS.project,
      exercise: doc?.dailyTaskLabels?.exercise || DEFAULT_TASK_LABELS.exercise,
    },
  } satisfies DashboardSettingsShape;
}

async function ensureTodayFocusDay(userId: string, dateKey: string) {
  const today = await FocusDay.findOneAndUpdate(
    { userId, dateKey },
    {
      $setOnInsert: {
        userId,
        date: new Date(),
        dateKey,
        tasks: DEFAULT_TASKS,
        completed: false,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return today;
}

async function syncStreak(userId: string) {
  const todayKey = getTodayDateKey();
  const yesterdayKey = getPreviousDateKey(todayKey);

  const completedDays = await FocusDay.find({ userId, completed: true })
    .sort({ dateKey: -1 })
    .select("dateKey date")
    .lean();

  let currentStreak = 0;
  let lastCompletedDateKey: string | null = null;
  let lastCompletedDate: Date | null = null;

  if (completedDays.length > 0) {
    const recent = completedDays[0];
    lastCompletedDateKey = recent.dateKey;
    lastCompletedDate = recent.date;

    if (recent.dateKey === todayKey || recent.dateKey === yesterdayKey) {
      currentStreak = 1;
      let expected = getPreviousDateKey(recent.dateKey);

      for (let i = 1; i < completedDays.length; i += 1) {
        if (completedDays[i].dateKey === expected) {
          currentStreak += 1;
          expected = getPreviousDateKey(expected);
        } else {
          break;
        }
      }
    }
  }

  const streak = await Streak.findOneAndUpdate(
    { userId },
    {
      userId,
      currentStreak,
      lastCompletedDate,
      lastCompletedDateKey,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  return {
    currentStreak: streak?.currentStreak ?? 0,
    lastCompletedDateKey: streak?.lastCompletedDateKey ?? null,
  };
}

async function ensureDsaStats(userId: string) {
  const doc = await DsaStats.findOneAndUpdate(
    { userId },
    {
      $setOnInsert: {
        userId,
        totalSolved: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        lastSolvedDate: null,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  return {
    totalSolved: doc?.totalSolved ?? 0,
    easy: doc?.easy ?? 0,
    medium: doc?.medium ?? 0,
    hard: doc?.hard ?? 0,
    lastSolvedDate: doc?.lastSolvedDate ? new Date(doc.lastSolvedDate).toISOString() : null,
  };
}

export async function getDashboardData(userId: string, beginnerOnly = false) {
  await connectDB();

  const todayKey = getTodayDateKey();
  const [settings, todayFocusDoc, dsaStats] = await Promise.all([
    ensureSettings(userId),
    ensureTodayFocusDay(userId, todayKey),
    ensureDsaStats(userId),
  ]);

  const tasks = {
    dsa: todayFocusDoc.tasks.dsa,
    project: todayFocusDoc.tasks.project,
    exercise: todayFocusDoc.tasks.exercise,
  };

  const completed = tasks.dsa && tasks.project && tasks.exercise;
  if (completed !== todayFocusDoc.completed) {
    todayFocusDoc.completed = completed;
    await todayFocusDoc.save();
  }

  const streak = await syncStreak(userId);

  const [github, contests] = await Promise.all([
    settings.githubUsername
      ? getGithubSnapshot(settings.githubUsername)
      : Promise.resolve(null),
    getUpcomingContests(beginnerOnly),
  ]);

  return {
    todayFocus: {
      date: new Date(todayFocusDoc.date).toISOString(),
      dateKey: todayFocusDoc.dateKey,
      tasks,
      completed,
    },
    streak,
    dsaStats,
    settings,
    github,
    contests,
  } satisfies DashboardData;
}

export async function toggleFocusTask(userId: string, taskKey: FocusTaskKey, value: boolean) {
  await connectDB();

  const todayKey = getTodayDateKey();
  const today = await ensureTodayFocusDay(userId, todayKey);

  today.tasks[taskKey] = value;
  today.completed = today.tasks.dsa && today.tasks.project && today.tasks.exercise;
  await today.save();

  await syncStreak(userId);

  return {
    tasks: today.tasks,
    completed: today.completed,
  };
}

export async function upsertDsaStats(userId: string, payload: {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
}) {
  await connectDB();

  const doc = await DsaStats.findOneAndUpdate(
    { userId },
    {
      userId,
      totalSolved: payload.totalSolved,
      easy: payload.easy,
      medium: payload.medium,
      hard: payload.hard,
      lastSolvedDate: new Date(),
    },
    { upsert: true, new: true }
  ).lean();

  return doc;
}

export async function upsertDashboardSettings(
  userId: string,
  payload: DashboardSettingsShape
) {
  await connectDB();

  const settings = await DashboardSettings.findOneAndUpdate(
    { userId },
    {
      userId,
      githubUsername: payload.githubUsername,
      dsaUsernames: payload.dsaUsernames,
      focusModeEnabled: payload.focusModeEnabled,
      dailyTaskLabels: payload.dailyTaskLabels,
    },
    { upsert: true, new: true }
  ).lean();

  return settings;
}
