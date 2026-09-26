import type { UserStats } from "@/types/gamification";

export const xpForLevel = (level: number): number => {
  const normalizedLevel = Math.max(1, Math.floor(level));
  return 50 * (normalizedLevel - 1) ** 2;
};

export const levelForXp = (xp: number): number =>
  Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1;

export const getLevelProgress = (stats: Pick<UserStats, "xp" | "level">) => {
  const currentLevelXp = xpForLevel(stats.level);
  const nextLevelXp = xpForLevel(stats.level + 1);
  const earned = Math.max(0, stats.xp - currentLevelXp);
  const needed = Math.max(1, nextLevelXp - currentLevelXp);

  return {
    earned,
    needed,
    percent: Math.min(100, Math.max(0, (earned / needed) * 100)),
    nextLevelXp,
  };
};
