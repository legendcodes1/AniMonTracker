import {
  Award,
  BookOpen,
  Crown,
  Flame,
  Library,
  Lock,
  PenLine,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Achievement } from "@/types/gamification";

const achievementIcons: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  library: Library,
  star: Star,
  "pen-line": PenLine,
  users: Users,
  crown: Crown,
  flame: Flame,
  "trending-up": TrendingUp,
};

export default function AchievementBadge({
  achievement,
}: {
  achievement: Achievement;
}) {
  const unlocked = Boolean(achievement.unlockedAt);
  const Icon = achievementIcons[achievement.icon] ?? Award;

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-4 transition-colors ${
        unlocked
          ? "border-purple-400/25 bg-gradient-to-br from-purple-500/15 to-pink-500/10"
          : "border-white/5 bg-slate-900/45 opacity-65"
      }`}
    >
      <div
        className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${
          unlocked
            ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20"
            : "bg-slate-800 text-slate-500"
        }`}
      >
        {unlocked ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
      </div>
      <h3 className="font-semibold text-white">{achievement.title}</h3>
      <p className="mt-1 text-xs leading-5 text-slate-400">
        {achievement.description}
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-purple-300">
        {unlocked ? "Unlocked" : `+${achievement.xpReward} XP`}
      </p>
    </article>
  );
}
