import { createContext, useContext } from "react";

export type NotificationType = "achievement" | "level_up" | "system" | "club";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: string;
  read: boolean;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  icon?: string;
  type?: "success" | "achievement" | "info" | "error";
}

export interface NotificationContextValue {
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

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotifications(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
