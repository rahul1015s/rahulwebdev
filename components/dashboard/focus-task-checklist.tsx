"use client";

import { useTransition } from "react";
import type { FocusTaskKey } from "@/models/focus-day";
import { updateFocusTaskAction } from "@/app/dashboard/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TASK_ORDER: FocusTaskKey[] = ["dsa", "project", "exercise"];

export function FocusTaskChecklist({
  tasks,
  labels,
  compact = false,
}: {
  tasks: Record<FocusTaskKey, boolean>;
  labels: Record<FocusTaskKey, string>;
  compact?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (taskKey: FocusTaskKey, checked: boolean) => {
    startTransition(async () => {
      await updateFocusTaskAction(taskKey, checked);
    });
  };

  return (
    <div className="space-y-3">
      {TASK_ORDER.map((taskKey, index) => (
        <motion.div
          key={taskKey}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "flex items-center justify-between rounded-xl border border-border/70 bg-background/60 px-4 py-3",
            compact ? "py-2" : "py-3"
          )}
        >
          <Label
            htmlFor={`task-${taskKey}`}
            className={cn(
              "text-sm font-medium",
              tasks[taskKey] ? "text-muted-foreground line-through" : "text-foreground"
            )}
          >
            {labels[taskKey]}
          </Label>

          <Checkbox
            id={`task-${taskKey}`}
            checked={tasks[taskKey]}
            onCheckedChange={(next) => handleToggle(taskKey, Boolean(next))}
            disabled={isPending}
          />
        </motion.div>
      ))}

      {isPending ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Syncing today&apos;s progress...
        </div>
      ) : null}
    </div>
  );
}
