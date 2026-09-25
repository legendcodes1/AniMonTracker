export interface Achievement {
  id: string;
  label: string;
  icon: string;
  unlocked: boolean;
  description: string;
  xpReward: number;
  progress?: number;
  maxProgress?: number;
  category?: "library" | "social" | "streak" | "special";
}

export interface UserStats {
  totalAnime: number;
  totalManga: number;
  completed: number;
  watching: number;
  totalEntries: number;
  xp: number;
  level: number;
  rankTitle: string;
  nextLevelXp: number;
}
