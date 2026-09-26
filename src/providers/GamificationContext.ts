import { createContext, useContext } from "react";
import type { Achievement, UserStats } from "@/types/gamification";

export interface GamificationContextValue {
  stats: UserStats;
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const GamificationContext =
  createContext<GamificationContextValue | null>(null);

export function useGamification(): GamificationContextValue {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error(
      "useGamification must be used within a GamificationProvider",
    );
  }
  return context;
}
