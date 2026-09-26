import { supabase } from "@/lib/supabase";
import type {
  Achievement,
  AchievementRow,
  UserAchievementRow,
  UserStats,
  UserStatsRow,
} from "@/types/gamification";

export const emptyUserStats = (userId = ""): UserStats => ({
  userId,
  xp: 0,
  level: 1,
  streakCount: 0,
  lastActiveOn: null,
  mediaCount: 0,
  clubCount: 0,
  achievementsCount: 0,
  updatedAt: new Date(0).toISOString(),
});

const mapStats = (row: UserStatsRow): UserStats => ({
  userId: row.user_id,
  xp: row.xp,
  level: row.level,
  streakCount: row.streak_count,
  lastActiveOn: row.last_active_on,
  mediaCount: row.media_count,
  clubCount: row.club_count,
  achievementsCount: row.achievements_count,
  updatedAt: row.updated_at,
});

export async function fetchGamification(userId: string): Promise<{
  stats: UserStats;
  achievements: Achievement[];
}> {
  const [statsResult, catalogResult, unlockedResult] = await Promise.all([
    supabase.from("user_stats").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("achievements").select("*").order("sort_order"),
    supabase
      .from("user_achievements")
      .select("achievement_code,unlocked_at")
      .eq("user_id", userId),
  ]);

  if (statsResult.error) throw statsResult.error;
  if (catalogResult.error) throw catalogResult.error;
  if (unlockedResult.error) throw unlockedResult.error;

  const unlocked = new Map(
    ((unlockedResult.data ?? []) as UserAchievementRow[]).map((item) => [
      item.achievement_code,
      item.unlocked_at,
    ]),
  );

  const achievements = ((catalogResult.data ?? []) as AchievementRow[]).map(
    (achievement) => ({
      code: achievement.code,
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon,
      xpReward: achievement.xp_reward,
      sortOrder: achievement.sort_order,
      unlockedAt: unlocked.get(achievement.code) ?? null,
    }),
  );

  return {
    stats: statsResult.data
      ? mapStats(statsResult.data as UserStatsRow)
      : emptyUserStats(userId),
    achievements,
  };
}
