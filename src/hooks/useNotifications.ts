import { useEffect, useState } from "react";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthContext";
import {
  fetchNotifications,
  mapNotification,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/notificationService";
import type { AppNotification, NotificationRow } from "@/types/notification";

export function useNotifications() {
  const { user } = useAuth();
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    let active = true;

    const applyRealtimeChange = (
      payload: RealtimePostgresChangesPayload<NotificationRow>,
    ) => {
      if (!active) return;

      if (payload.eventType === "INSERT") {
        const notification = mapNotification(payload.new);
        setItems((current) => [
          notification,
          ...current.filter((item) => item.id !== notification.id),
        ]);
      } else if (payload.eventType === "UPDATE") {
        const notification = mapNotification(payload.new);
        setItems((current) =>
          current.map((item) =>
            item.id === notification.id ? notification : item,
          ),
        );
      } else if (payload.eventType === "DELETE") {
        const deletedId = payload.old.id;
        setItems((current) => current.filter((item) => item.id !== deletedId));
      }
    };

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        applyRealtimeChange,
      )
      .subscribe();

    void fetchNotifications(user.id)
      .then((notifications) => {
        if (active) setItems(notifications);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Failed to load notifications",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [user]);

  const markRead = async (id: string) => {
    const readAt = await markNotificationRead(id);
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, readAt } : item)),
    );
  };

  const markAllRead = async () => {
    if (!user) return;
    const readAt = await markAllNotificationsRead(user.id);
    setItems((current) => current.map((item) => ({ ...item, readAt })));
  };

  return {
    items,
    loading,
    error,
    unreadCount: items.filter((item) => !item.readAt).length,
    markRead,
    markAllRead,
  };
}
