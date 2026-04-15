import Link from "next/link";
import { Flame, Github, Trophy, CalendarDays, CheckCircle2 } from "lucide-react";
import { requireDashboardUser } from "@/lib/dashboard/auth";
import { getDashboardData } from "@/lib/dashboard/service";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FocusTaskChecklist } from "@/components/dashboard/focus-task-checklist";
import { DsaStatsForm } from "@/components/dashboard/dsa-stats-form";

export const metadata = {
  title: "FocusStack Dashboard",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ beginner?: string }>;
}) {
  const user = await requireDashboardUser();
  const resolvedSearchParams = await searchParams;
  const beginnerOnly = resolvedSearchParams?.beginner === "1";

  const data = await getDashboardData(user.id, beginnerOnly);

  return (
    <DashboardShell
      title="FocusStack"
      subtitle="Private discipline dashboard for daily execution and proof of real work."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-blue-400/20 bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              Daily Focus
            </CardTitle>
            <CardDescription>
              Complete all three tasks before the day ends.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FocusTaskChecklist
              tasks={data.todayFocus.tasks}
              labels={data.settings.dailyTaskLabels}
            />
            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 px-4 py-3">
              <div className="text-sm text-muted-foreground">Today&apos;s status</div>
              <Badge variant={data.todayFocus.completed ? "default" : "secondary"}>
                {data.todayFocus.completed ? "Completed" : "In progress"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-400/20 bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-400" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-300">{data.streak.currentStreak}</div>
            <p className="mt-1 text-sm text-muted-foreground">consecutive active days</p>
            <p className="mt-4 text-xs text-muted-foreground">
              Last completed day: {data.streak.lastCompletedDateKey || "No streak yet"}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-sky-400/20 bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              DSA Tracker
            </CardTitle>
            <CardDescription>Manual entry for now. API sync can be added later.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                <div className="text-xs text-muted-foreground">Total Solved</div>
                <div className="text-2xl font-semibold">{data.dsaStats.totalSolved}</div>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                <div className="text-xs text-muted-foreground">Easy</div>
                <div className="text-2xl font-semibold text-emerald-300">{data.dsaStats.easy}</div>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                <div className="text-xs text-muted-foreground">Medium</div>
                <div className="text-2xl font-semibold text-amber-300">{data.dsaStats.medium}</div>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                <div className="text-xs text-muted-foreground">Hard</div>
                <div className="text-2xl font-semibold text-rose-300">{data.dsaStats.hard}</div>
              </div>
            </div>
            <DsaStatsForm initial={data.dsaStats} />
          </CardContent>
        </Card>

        <Card className="border-violet-400/20 bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" /> GitHub
            </CardTitle>
            <CardDescription>
              {data.settings.githubUsername
                ? `Live snapshot for @${data.settings.githubUsername}`
                : "Set your GitHub username in settings"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.github ? (
              <>
                <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                  <div className="text-xs text-muted-foreground">Contributions (7d)</div>
                  <div className="text-2xl font-semibold">{data.github.contributionsLast7Days}</div>
                </div>
                <div className="space-y-2">
                  {data.github.repos.slice(0, 3).map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-lg border border-border/70 bg-background/60 p-3 text-sm hover:bg-background"
                    >
                      <div className="font-medium">{repo.name}</div>
                      <div className="text-xs text-muted-foreground">{repo.language}</div>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No GitHub data yet. Add your username in Settings.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-emerald-400/20 bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Trophy className="h-5 w-5 text-emerald-300" />
              Upcoming Contests
            </CardTitle>
            <CardDescription>
              Clist API powered schedule with beginner-friendly filter and calendar export.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Link href="/dashboard">
                <Button size="sm" variant={!beginnerOnly ? "default" : "outline"}>
                  All Contests
                </Button>
              </Link>
              <Link href="/dashboard?beginner=1">
                <Button size="sm" variant={beginnerOnly ? "default" : "outline"}>
                  Beginner Friendly
                </Button>
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {data.contests.length > 0 ? (
                data.contests.slice(0, 9).map((contest) => (
                  <div
                    key={`${contest.platform}-${contest.name}-${contest.startTime}`}
                    className="rounded-xl border border-border/70 bg-background/60 p-4"
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <div className="line-clamp-2 text-sm font-semibold">{contest.name}</div>
                        <div className="text-xs text-muted-foreground">{contest.platform}</div>
                      </div>
                      {contest.beginnerFriendly ? (
                        <Badge className="bg-emerald-500/15 text-emerald-300">Beginner</Badge>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(contest.startTime).toLocaleString()}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <a href={contest.url} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline">Open</Button>
                      </a>
                      <a
                        href={`/api/dashboard/contest-ics?name=${encodeURIComponent(contest.name)}&platform=${encodeURIComponent(contest.platform)}&startTime=${encodeURIComponent(contest.startTime)}&duration=${contest.durationMinutes}&url=${encodeURIComponent(contest.url)}`}
                      >
                        <Button size="sm">.ics</Button>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-border/70 bg-background/60 p-4 text-sm text-muted-foreground">
                  No contests available. Add CLIST credentials in `.env.local`.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
