import { Zap } from "lucide-react";
import { getLevelProgress } from "@/lib/gamification";
import type { UserStats } from "@/types/gamification";

interface LevelProgressProps {
  stats: UserStats;
  compact?: boolean;
}

export default function LevelProgress({
  stats,
  compact = false,
}: LevelProgressProps) {
  const progress = getLevelProgress(stats);

  return (
    <div className={compact ? "rounded-xl bg-white/5 p-3" : "w-full"}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-200">
          <Zap className="h-3.5 w-3.5 fill-purple-400 text-purple-400" />
          Level {stats.level}
        </span>
        <span className="text-[11px] text-slate-500">
          {progress.earned}/{progress.needed} XP
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-[width] duration-500"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}
