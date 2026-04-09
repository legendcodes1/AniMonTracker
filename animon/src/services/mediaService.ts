import { MediaItem } from "../types/Library";

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
    const items: MediaItem[] = (Array.isArray(data) ? data : []).map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type, // "anime" or "manga"
      status: item.status, // "watching", "completed", etc.
      image: item.image || "https://via.placeholder.com/300x400?text=No+Image",
      rating: item.rating || 0,
      notes: item.notes || "",
      addedAt: item.addedAt,
    }));

    return items;
  } catch (error) {
    console.error("Error fetching library:", error);
    throw error;
  }
}

