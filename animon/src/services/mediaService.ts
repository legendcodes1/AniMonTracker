import { MediaItem } from "../types/MediaItem";

export async function fetchMediaCollection(token: string): Promise<MediaItem[]> {
    const userId = localStorage.getItem("user_id");
  
  if (!userId) {
    throw new Error("User ID not found");
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/library?user_id=${userId}`,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch library: ${res.statusText}`);
    }

    const data = await res.json();

    // Map Spring Boot response to your frontend MediaItem type
    const items: MediaItem[] = (Array.isArray(data) ? data : []).map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type, // "anime" or "manga"
      status: item.status, // "watching", "completed", etc.
      image: item.image || "https://via.placeholder.com/300x400?text=No+Image",
      rating: item.rating || 0,
      episodes: item.episodesWatched || 0,
      chapters: item.chaptersRead || 0,
      totalEpisodes: item.totalEpisodes,
      totalChapters: item.totalChapters,
      notes: item.notes || "",
      addedAt: item.addedAt,
    }));

    return items;
  } catch (error) {
    console.error("Error fetching library:", error);
    throw error;
  }
}

// Add new function for filtering
export async function fetchLibraryByType(
  token: string,
  type: "anime" | "manga"
): Promise<MediaItem[]> {
  const userId = localStorage.getItem("user_id");
  
  if (!userId) {
    throw new Error("User ID not found");
  }

  const res = await fetch(
    `http://localhost:8080/api/library/type/${type}`,
    {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${type}: ${res.statusText}`);
  }

  const data = await res.json();
  return (Array.isArray(data) ? data : []).map((item) => ({
    id: item.id,
    title: item.title,
    type: item.type,
    status: item.status,
    image: item.image || "https://via.placeholder.com/300x400",
    rating: item.rating || 0,
    episodes: item.episodesWatched || 0,
    chapters: item.chaptersRead || 0,
    totalEpisodes: item.totalEpisodes,
    totalChapters: item.totalChapters,
    notes: item.notes || "",
    addedAt: item.addedAt,
  }));
}

// Get library stats
export async function fetchLibraryStats(token: string) {
  const userId = localStorage.getItem("user_id");
  
  if (!userId) {
    throw new Error("User ID not found");
  }

  const res = await fetch(
    `http://localhost:3000/api/library/stats`,
    {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stats");
  }

  return await res.json();
}