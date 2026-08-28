import React from "react";
import { Achievement, UserStats } from "../../types/achievement";
import { Lock, Sparkles, Trophy } from "lucide-react";

export function deriveAchievements(stats: {
  totalAnime: number;
  totalManga: number;
  completed: number;
}): Achievement[] {
  const total = stats.totalAnime + stats.totalManga;

  return [
    {
      id: "first_watch",
      label: "First Watch",
      icon: "🎬",
      unlocked: stats.totalAnime >= 1,
      description: "Add your first anime to the library",
      xpReward: 25,
      progress: Math.min(stats.totalAnime, 1),
      maxProgress: 1,
      category: "library",
    },
    {
      id: "first_manga",
      label: "Page Turner",
      icon: "📖",
      unlocked: stats.totalManga >= 1,
      description: "Add your first manga to the library",
      xpReward: 25,
      progress: Math.min(stats.totalManga, 1),
      maxProgress: 1,
      category: "library",
    },
    {
      id: "binge_watcher",
      label: "Binge Watcher",
      icon: "🔥",
      unlocked: stats.totalAnime >= 10,
      description: "Track 10 or more anime series",
      xpReward: 75,
      progress: Math.min(stats.totalAnime, 10),
      maxProgress: 10,
      category: "library",
    },
    {
      id: "completionist_5",
      label: "Completionist",
      icon: "✅",
      unlocked: stats.completed >= 5,
      description: "Complete 5 different titles",
      xpReward: 100,
      progress: Math.min(stats.completed, 5),
      maxProgress: 5,
      category: "library",
    },
    {
      id: "otaku_veteran",
      label: "Otaku Veteran",
      icon: "⭐",
      unlocked: total >= 25,
      description: "Add 25 total entries to your vault",
      xpReward: 150,
      progress: Math.min(total, 25),
      maxProgress: 25,
      category: "library",
    },
    {
      id: "master_scholar",
      label: "Manga Scholar",
      icon: "📜",
      unlocked: stats.totalManga >= 10,
      description: "Read & track 10 manga volumes",
      xpReward: 100,
      progress: Math.min(stats.totalManga, 10),
      maxProgress: 10,
      category: "library",
    },
  ];
}

export function calculateUserStats(collection: any[]): UserStats {
  const anime = collection.filter((i) => i.type === "anime").length;
  const manga = collection.filter((i) => i.type === "manga").length;
  const completed = collection.filter((i) => i.status === "completed").length;
  const watching = collection.filter((i) => i.status === "watching").length;
  const total = collection.length;

  // Derive XP: 10 XP per title, 25 XP per completed
  const achievements = deriveAchievements({ totalAnime: anime, totalManga: manga, completed });
  const achievementXp = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);
  const totalXp = total * 10 + completed * 25 + achievementXp;

  // Level formula: Level = Math.floor(XP / 100) + 1
  const level = Math.floor(totalXp / 100) + 1;
  const nextLevelXp = level * 100;

  let rankTitle = "Fledgling Scout 🥉";
  if (level >= 15) rankTitle = "Hashira Grandmaster 👑";
  else if (level >= 10) rankTitle = "Special Grade Collector 🥇";
  else if (level >= 5) rankTitle = "Chunin Watcher 🥈";

  return {
    totalAnime: anime,
    totalManga: manga,
    completed,
    watching,
    totalEntries: total,
    xp: totalXp,
    level,
    rankTitle,
    nextLevelXp,
  };
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const percent = achievement.maxProgress
    ? Math.round(((achievement.progress || 0) / achievement.maxProgress) * 100)
    : 0;

  return (
    <div
      className={`group relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
        achievement.unlocked
          ? "bg-gradient-to-br from-purple-900/30 via-slate-900 to-pink-900/20 border-purple-500/40 text-white shadow-lg shadow-purple-500/10 hover:border-purple-400"
          : "bg-slate-900/40 border-white/5 text-slate-500 grayscale opacity-60 hover:opacity-80"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
          achievement.unlocked ? "bg-purple-500/20 shadow-inner" : "bg-slate-800"
        }`}>
          {achievement.icon}
        </div>

        {achievement.unlocked ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
            Unlocked
          </span>
        ) : (
          <Lock className="w-4 h-4 text-slate-600" />
        )}
      </div>

      <div>
        <h4 className="text-sm font-bold text-white mb-1">{achievement.label}</h4>
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {achievement.description}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
          <span>Progress</span>
          <span>
            {achievement.progress}/{achievement.maxProgress} ({percent}%)
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              achievement.unlocked
                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                : "bg-slate-600"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
