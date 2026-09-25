import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { NotificationContext } from "./NotificationContext";
import type { AppNotification, NotificationContextValue, ToastMessage } from "./NotificationContext";

function createId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "welcome-1",
      type: "system",
      title: "Welcome to AniMon!",
      message: "Start building your library and join anime clubs to earn achievements and level up!",
      icon: "🎉",
      read: false,
      createdAt: new Date().toISOString(),
    },
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = createId();
      setToasts((prev) => [...prev, { ...toast, id }]);

      const timer = setTimeout(() => {
        timers.current.delete(timer);
        removeToast(id);
      }, 4500);
      timers.current.add(timer);
    },
    [removeToast],
  );

  const addNotification = useCallback(
    (notification: Omit<AppNotification, "id" | "read" | "createdAt">) => {
      setNotifications((prev) => [
        { ...notification, id: createId(), read: false, createdAt: new Date().toISOString() },
        ...prev,
      ]);
    },
    [],
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const triggerAchievement = useCallback(
    (title: string, description: string, icon = "🏆", xp = 50) => {
      addNotification({
        type: "achievement",
        title: `Achievement Unlocked: ${title}!`,
        message: `${description} (+${xp} XP)`,
        icon,
      });
      showToast({
        title: `🏆 ${title}`,
        message: `${description} • +${xp} XP`,
        icon,
        type: "achievement",
      });
    },
    [addNotification, showToast],
  );

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      toasts,
      unreadCount: notifications.filter((item) => !item.read).length,
      addNotification,
      markAsRead,
      markAllAsRead,
      showToast,
      removeToast,
      triggerAchievement,
    }),
    [
      notifications,
      toasts,
      addNotification,
      markAsRead,
      markAllAsRead,
      showToast,
      removeToast,
      triggerAchievement,
    ],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
