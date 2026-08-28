import { MediaItem } from "../types/library";
import { getLibraryItems } from "./libraryService";

export async function fetchMediaCollection(token?: string): Promise<MediaItem[]> {
  const userId = localStorage.getItem("user_id") || undefined;
  const items = await getLibraryItems(userId);

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    type: item.type || "anime",
    status: item.status || "watching",
    image: item.image || "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
    rating: item.rating || 0,
    notes: item.notes || "",
    addedAt: item.addedAt || new Date().toISOString(),
    genre: item.genre || "General",
    episodes: item.episodes || 0,
    chapters: item.chapters || 0,
    currentEpisode: item.currentEpisode || 0,
    currentChapter: item.currentChapter || 0,
  }));
}
