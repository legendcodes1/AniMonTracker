 import React from "react";

interface Achievement {
  id: string;
  label: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

// Derive achievements from library stats
export function deriveAchievements(stats: {
  totalAnime: number;
  totalManga: number;
  completed: number;
}): Achievement[] {
  return [
    {
      id: "first_anime",
      label: "First Watch",
      icon: "🎬",
      unlocked: stats.totalAnime >= 1,
      description: "Add your first anime",
    },
    {
      id: "first_manga",
      label: "Page Turner",
      icon: "📖",
      unlocked: stats.totalManga >= 1,
      description: "Add your first manga",
    },
    {
      id: "completionist_10",
      label: "Completionist",
      icon: "✅",
      unlocked: stats.completed >= 10,
      description: "Complete 10 titles",
    },
    {
      id: "otaku_50",
      label: "Otaku",
      icon: "⭐",
      unlocked: stats.totalAnime + stats.totalManga >= 50,
      description: "Add 50 titles to your library",
    },
    {
      id: "binge_25",
      label: "Binge Watcher",
      icon: "🔥",
      unlocked: stats.totalAnime >= 25,
      description: "Add 25 anime titles",
    },
  ];
}

interface BadgeProps {
  achievement: Achievement;
  key?: string;
}

export default function AchievementBadge({ achievement }: BadgeProps) {
  return (
    <></>
    // <div
    //   className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
    //     achievement.unlocked
    //       ? "bg-purple-500/20 border-purple-500/40 text-white"
    //       : "bg-slate-800/40 border-slate-700/30 text-slate-600 grayscale opacity-50"
    //   }`}
    //   title={achievement.description}
    // >
    //   <span className="text-2xl">{achievement.icon}</span>
    //   <span className="text-xs font-medium text-center">{achievement.label}</span>
    // </div>
  );
}
