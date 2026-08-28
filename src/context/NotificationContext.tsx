import React, { createContext, useContext, useState } from "react";

export interface AppNotification {
  id: string;
  type: "achievement" | "level_up" | "system" | "club";
  title: string;
  message: string;
  icon?: string;
  read: boolean;
  createdAt: string;
}

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  icon?: string;
  type?: "success" | "achievement" | "info" | "error";
}

interface NotificationContextType {
  notifications: AppNotification[];
  toasts: ToastMessage[];
  unreadCount: number;
  addNotification: (notification: Omit<AppNotification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
  triggerAchievement: (title: string, description: string, icon?: string, xp?: number) => void;
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "welcome-1",
      type: "system",
      title: "Welcome to AniMon! 🌸",
      message: "Start building your library and join anime clubs to earn achievements and level up!",
      icon: "🎉",
      read: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const showToast = (toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addNotification = (notif: Omit<AppNotification, "id" | "read" | "createdAt">) => {
    const newNotif: AppNotification = {
      ...notif,
      id: Math.random().toString(36).substring(2, 9),
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const triggerAchievement = (title: string, description: string, icon: string = "🏆", xp: number = 50) => {
    // 1. Add notification
    addNotification({
      type: "achievement",
      title: `Achievement Unlocked: ${title}!`,
      message: `${description} (+${xp} XP)`,
      icon,
    });

    // 2. Show floating toast
    showToast({
      title: `🏆 ${title}`,
      message: `${description} • +${xp} XP`,
      icon,
      type: "achievement",
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        toasts,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        showToast,
        removeToast,
        triggerAchievement,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
