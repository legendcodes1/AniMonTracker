import { supabase } from "@/lib/supabase";
import type { AppNotification, NotificationRow } from "@/types/notification";

const notificationFields =
  "id,user_id,type,title,body,icon,link,metadata,read_at,created_at";

export function mapNotification(row: NotificationRow): AppNotification {
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type,
    title: row.title,
    body: row.body,
    icon: row.icon,
    link: row.link,
    metadata: row.metadata ?? {},
    readAt: row.read_at,
    createdAt: row.created_at,
  };
}

export async function fetchNotifications(
  userId: string,
): Promise<AppNotification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select(notificationFields)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  return ((data ?? []) as NotificationRow[]).map(mapNotification);
}

export async function markNotificationRead(id: string): Promise<string> {
  const readAt = new Date().toISOString();
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: readAt })
    .eq("id", id);

  if (error) throw error;
  return readAt;
}

export async function markAllNotificationsRead(
  userId: string,
): Promise<string> {
  const readAt = new Date().toISOString();
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: readAt })
    .eq("user_id", userId)
    .is("read_at", null);

  if (error) throw error;
  return readAt;
}
