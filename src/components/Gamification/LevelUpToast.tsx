import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Zap } from "lucide-react";
import { useGamification } from "@/providers/GamificationContext";

export default function LevelUpToast() {
  const { stats, loading } = useGamification();
  const previousLevel = useRef<number | null>(null);
  const [visibleLevel, setVisibleLevel] = useState<number | null>(null);

  useEffect(() => {
    if (loading) return;

    if (previousLevel.current === null) {
      previousLevel.current = stats.level;
      return;
    }

    if (stats.level <= previousLevel.current) return;

    previousLevel.current = stats.level;
    setVisibleLevel(stats.level);
    const timer = window.setTimeout(() => setVisibleLevel(null), 5000);
    return () => window.clearTimeout(timer);
  }, [loading, stats.level]);

  if (visibleLevel === null) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[70] w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-purple-300/30 bg-slate-950/95 p-5 shadow-2xl shadow-purple-950/60 backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-500" />
      <button
        type="button"
        aria-label="Dismiss level up message"
        onClick={() => setVisibleLevel(null)}
        className="absolute right-3 top-3 rounded-lg p-1 text-slate-500 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex gap-4 pr-5">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25">
          <Zap className="h-6 w-6 fill-white" />
          <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-yellow-300" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-300">
            Level up
          </p>
          <p className="mt-1 text-lg font-black text-white">
            You reached level {visibleLevel}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Keep building your library and community streak.
          </p>
        </div>
      </div>
    </div>
  );
}
