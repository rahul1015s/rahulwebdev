import type { FocusTaskKey } from "@/models/focus-day";

export type FocusTaskState = Record<FocusTaskKey, boolean>;

export interface DashboardSettingsShape {
  githubUsername: string;
  dsaUsernames: {
    leetcode: string;
    gfg: string;
    codechef: string;
  };
  focusModeEnabled: boolean;
  dailyTaskLabels: Record<FocusTaskKey, string>;
}

export interface DashboardFocusDayShape {
  date: string;
  dateKey: string;
  tasks: FocusTaskState;
  completed: boolean;
}

export interface DashboardStreakShape {
  currentStreak: number;
  lastCompletedDateKey: string | null;
}

export interface DashboardDsaShape {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  lastSolvedDate: string | null;
}

export interface GithubSnapshot {
  username: string;
  totalRepos: number;
  contributionsLast7Days: number;
  repos: Array<{
    name: string;
    htmlUrl: string;
    description: string;
    stars: number;
    language: string;
    updatedAt: string;
  }>;
  recentCommits: Array<{
    sha: string;
    message: string;
    repo: string;
    url: string;
    createdAt: string;
  }>;
}

export interface ContestItem {
  name: string;
  platform: string;
  startTime: string;
  durationMinutes: number;
  url: string;
  beginnerFriendly: boolean;
}

export interface DashboardData {
  todayFocus: DashboardFocusDayShape;
  streak: DashboardStreakShape;
  dsaStats: DashboardDsaShape;
  settings: DashboardSettingsShape;
  github: GithubSnapshot | null;
  contests: ContestItem[];
}
