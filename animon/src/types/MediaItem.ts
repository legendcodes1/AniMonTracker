export type MediaType = "anime" | "manga";
export type MediaStatus = "ongoing" | "completed" | "upcoming";

export interface MediaItem {
  id: string; // unique, e.g., "anime-1"
  title: string;
  type: MediaType;
  rating: number;
  image: string;
  status: MediaStatus;
  description: string;
  episodes?: number; // for anime
  chapters?: number; // for manga
  genre: string;
  watch: string; // URL or function name
}
