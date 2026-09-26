import { apiRequest, ApiError, getCurrentUserId } from "@/lib/apiClient";
import type { MediaItem } from "@/types/library";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300x400?text=No+Image";

export async function fetchMediaCollection(): Promise<MediaItem[]> {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("User ID not found");
  }

  try {
    const data = await apiRequest<unknown[]>("/library", { params: { user_id: userId } });

    return (Array.isArray(data) ? data : []).map((item) => {
      const entry = item as Record<string, unknown>;
      return {
        id: String(entry.id ?? ""),
        title: String(entry.title ?? ""),
        type: entry.type as MediaItem["type"],
        status: entry.status as MediaItem["status"],
        image: (entry.image as string) || PLACEHOLDER_IMAGE,
        rating: (entry.rating as number) || 0,
        notes: (entry.notes as string) || "",
        addedAt: entry.addedAt as string | undefined,
        episodes: (entry.episodes as number) || 0,
        chapters: (entry.chapters as number) || 0,
        currentEpisode: (entry.currentEpisode as number) || 0,
        currentChapter: (entry.currentChapter as number) || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching library:", error);
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch library: ${error.statusText}`);
    }
    throw error;
  }
}
