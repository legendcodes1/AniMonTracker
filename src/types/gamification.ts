export interface UserStats {
  userId: string;
  xp: number;
  level: number;
  streakCount: number;
  lastActiveOn: string | null;
  mediaCount: number;
  clubCount: number;
  achievementsCount: number;
  updatedAt: string;
}

export interface UserStatsRow {
  user_id: string;
  xp: number;
  level: number;
  streak_count: number;
  last_active_on: string | null;
  media_count: number;
  club_count: number;
  achievements_count: number;
  updated_at: string;
}

export interface Achievement {
  code: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  sortOrder: number;
  unlockedAt: string | null;
}

export interface AchievementRow {
  code: string;
  title: string;
  description: string;
  icon: string;
  xp_reward: number;
  sort_order: number;
}

export interface UserAchievementRow {
  achievement_code: string;
  unlocked_at: string;
}
