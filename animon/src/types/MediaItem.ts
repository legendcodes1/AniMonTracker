export interface MediaItem {
  id: string; // animeId from backend
  title: string; // animeTitle
  type: "anime" | "manga";
  status: "watching" | "completed" | "plan_to_watch" | "dropped";
  image: string; // animePoster
  rating?: number;
  episodes?: number; // episodesWatched
  chapters?: number; // chaptersRead
  totalEpisodes?: number;
  totalChapters?: number;
  notes?: string;
  addedAt?: string;
  genre?: string; // if you want to keep this
  watch?: string; // if you want to keep this
}