import { useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDismissable } from "@/hooks/useDismissable";
import { useNotifications } from "@/hooks/useNotifications";
import type { AppNotification } from "@/types/notification";
import NotificationPanel from "./NotificationPanel";

const panelId = "notification-panel";

export default function NotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { items, unreadCount, loading, error, markRead, markAllRead } =
    useNotifications();
  const containerRef = useDismissable<HTMLDivElement>(
    open,
    () => setOpen(false),
    triggerRef,
  );

  const handleSelect = async (notification: AppNotification) => {
    try {
      setActionError(null);
      if (!notification.readAt) await markRead(notification.id);
      if (notification.link) {
        setOpen(false);
        navigate(notification.link);
      }
    } catch (cause) {
      setActionError(
        cause instanceof Error
          ? cause.message
          : "Failed to update notification",
      );
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setActionError(null);
      await markAllRead();
    } catch (cause) {
      setActionError(
        cause instanceof Error
          ? cause.message
          : "Failed to update notifications",
      );
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
          open
            ? "border-purple-400/40 bg-purple-500/15 text-purple-200"
            : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-slate-950 bg-gradient-to-r from-pink-500 to-red-500 px-1 text-[10px] font-bold leading-none text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationPanel
          id={panelId}
          notifications={items}
          unreadCount={unreadCount}
          loading={loading}
          error={actionError || error}
          onSelect={(notification) => void handleSelect(notification)}
          onMarkAllRead={() => void handleMarkAllRead()}
        />
      )}
    </div>
  );
}
