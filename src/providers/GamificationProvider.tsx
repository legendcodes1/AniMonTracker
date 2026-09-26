import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthContext";
import {
  emptyUserStats,
  fetchGamification,
} from "@/services/gamificationService";
import type { Achievement, UserStats } from "@/types/gamification";
import { GamificationContext } from "./GamificationContext";

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>(() => emptyUserStats());
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (!user) return;
    const data = await fetchGamification(user.id);
    setStats(data.stats);
    setAchievements(data.achievements);
    setError(null);
  };

  useEffect(() => {
    if (!user) {
      setStats(emptyUserStats());
      setAchievements([]);
      setLoading(false);
      return;
    }

    let active = true;

    const load = async () => {
      try {
        const data = await fetchGamification(user.id);
        if (active) {
          setStats(data.stats);
          setAchievements(data.achievements);
          setError(null);
        }
      } catch (cause) {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Failed to load gamification data",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    const refreshFromRealtime = () => void load();
    const statsChannel = supabase
      .channel(`user-stats:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_stats",
          filter: `user_id=eq.${user.id}`,
        },
        refreshFromRealtime,
      )
      .subscribe();
    const achievementsChannel = supabase
      .channel(`user-achievements:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_achievements",
          filter: `user_id=eq.${user.id}`,
        },
        refreshFromRealtime,
      )
      .subscribe();

    void load();

    return () => {
      active = false;
      void supabase.removeChannel(statsChannel);
      void supabase.removeChannel(achievementsChannel);
    };
  }, [user]);

  return (
    <GamificationContext.Provider
      value={{ stats, achievements, loading, error, refresh }}
    >
      {children}
    </GamificationContext.Provider>
  );
}
