"use client";

import { useMemo, useState, useTransition } from "react";
import { updateDsaStatsAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export function DsaStatsForm({
  initial,
}: {
  initial: {
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
  };
}) {
  const [form, setForm] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const solvedBreakdown = useMemo(() => {
    const total = Math.max(1, form.easy + form.medium + form.hard);
    return {
      easyPct: Math.round((form.easy / total) * 100),
      mediumPct: Math.round((form.medium / total) * 100),
      hardPct: Math.round((form.hard / total) * 100),
    };
  }, [form.easy, form.medium, form.hard]);

  const save = () => {
    startTransition(async () => {
      await updateDsaStatsAction(form);
      toast.success("DSA stats updated");
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="totalSolved">Total Solved</Label>
          <Input
            id="totalSolved"
            type="number"
            min={0}
            value={form.totalSolved}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, totalSolved: Number(event.target.value || 0) }))
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="easy">Easy</Label>
          <Input
            id="easy"
            type="number"
            min={0}
            value={form.easy}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, easy: Number(event.target.value || 0) }))
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="medium">Medium</Label>
          <Input
            id="medium"
            type="number"
            min={0}
            value={form.medium}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, medium: Number(event.target.value || 0) }))
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="hard">Hard</Label>
          <Input
            id="hard"
            type="number"
            min={0}
            value={form.hard}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, hard: Number(event.target.value || 0) }))
            }
          />
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-border/70 bg-background/60 p-4">
        <div className="text-xs text-muted-foreground">Difficulty distribution</div>
        <div className="space-y-2">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span>Easy</span>
              <span>{solvedBreakdown.easyPct}%</span>
            </div>
            <Progress value={solvedBreakdown.easyPct} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span>Medium</span>
              <span>{solvedBreakdown.mediumPct}%</span>
            </div>
            <Progress value={solvedBreakdown.mediumPct} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span>Hard</span>
              <span>{solvedBreakdown.hardPct}%</span>
            </div>
            <Progress value={solvedBreakdown.hardPct} />
          </div>
        </div>
      </div>

      <Button onClick={save} disabled={isPending}>
        {isPending ? "Saving..." : "Save DSA Stats"}
      </Button>
    </div>
  );
}
