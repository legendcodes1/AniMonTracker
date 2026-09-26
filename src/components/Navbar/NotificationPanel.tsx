import { Award, BellRing, Sparkles, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppNotification } from "@/types/notification";

interface NotificationPanelProps {
  id: string;
  notifications: AppNotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  onSelect: (notification: AppNotification) => void;
  onMarkAllRead: () => void;
}

const typeIcons: Record<AppNotification["type"], LucideIcon> = {
  system: Sparkles,
  club: Users,
  achievement: Award,
  level_up: TrendingUp,
};

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function formatRelativeTime(createdAt: string): string {
  const seconds = Math.round(
    (new Date(createdAt).getTime() - Date.now()) / 1000,
  );
  const absoluteSeconds = Math.abs(seconds);

  if (absoluteSeconds < 60) return relativeTime.format(seconds, "second");
  if (absoluteSeconds < 3600)
    return relativeTime.format(Math.round(seconds / 60), "minute");
  if (absoluteSeconds < 86400)
    return relativeTime.format(Math.round(seconds / 3600), "hour");
  return relativeTime.format(Math.round(seconds / 86400), "day");
}

export default function NotificationPanel({
  id,
  notifications,
  unreadCount,
  loading,
  error,
  onSelect,
  onMarkAllRead,
}: NotificationPanelProps) {
  return (
    <section
      id={id}
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h2 className="font-semibold text-white">Notifications</h2>
          <p className="text-xs text-slate-500">Your latest AniMon activity</p>
        </div>
        {unreadCount > 0 ? (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="rounded-lg px-2.5 py-1 text-xs font-medium text-purple-300 transition-colors hover:bg-purple-500/10 hover:text-purple-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Mark all read
          </button>
        ) : (
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400">
            All caught up
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3 p-4" aria-label="Loading notifications">
          {[0, 1, 2].map((item) => (
            <div key={item} className="flex animate-pulse gap-3 rounded-xl p-2">
              <div className="h-10 w-10 rounded-xl bg-slate-800" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 w-2/3 rounded bg-slate-800" />
                <div className="h-3 w-full rounded bg-slate-800/70" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="flex min-h-48 items-center justify-center px-6 text-center">
          <div>
            <p className="font-medium text-red-300">
              Notifications unavailable
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">{error}</p>
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/10">
            <BellRing className="h-5 w-5 text-purple-300" />
          </div>
          <p className="font-medium text-slate-200">Nothing new yet</p>
          <p className="mt-1 max-w-56 text-sm leading-6 text-slate-500">
            Club activity, achievements, and library updates will appear here.
          </p>
        </div>
      ) : (
        <div className="max-h-[28rem] overflow-y-auto p-2" role="feed">
          {notifications.map((notification) => {
            const Icon = typeIcons[notification.type] ?? Sparkles;
            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => onSelect(notification)}
                className={`relative flex w-full gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  notification.readAt ? "opacity-70" : "bg-purple-500/[0.06]"
                }`}
              >
                {!notification.readAt && (
                  <span className="absolute right-3 top-4 h-2 w-2 rounded-full bg-pink-400" />
                )}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-500/10 text-purple-300">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0 flex-1 pr-3">
                  <span className="block truncate text-sm font-semibold text-slate-100">
                    {notification.title}
                  </span>
                  {notification.body && (
                    <span className="mt-0.5 line-clamp-2 block text-xs leading-5 text-slate-400">
                      {notification.body}
                    </span>
                  )}
                  <span className="mt-1.5 block text-[11px] text-slate-600">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
