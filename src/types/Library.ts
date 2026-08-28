export type MediaType = "anime" | "manga";
export type MediaStatus = "watching" | "completed" | "plan_to_watch" | "dropped" | "on_hold";

export interface LibraryItem {
  id: string;
  title: string;
  type: MediaType;
  status: MediaStatus;
  image: string;
  rating?: number;
  notes?: string;
  addedAt?: string;
  genre?: string;
  episodes?: number;
  chapters?: number;
  currentEpisode?: number;
  currentChapter?: number;
}

export type MediaItem = LibraryItem;

export interface CreateLibraryItemRequest {
  animeId?: string;
  title: string;
  type: MediaType;
  genre?: string;
  image?: string;
  status?: MediaStatus;
  notes?: string;
  rating?: number;
  totalEpisodes?: number;
  totalChapters?: number;
  currentEpisode?: number;
  currentChapter?: number;
}

export interface UpdateLibraryItemRequest {
  title?: string;
  type?: MediaType;
  genre?: string;
  image?: string;
  status?: MediaStatus;
  notes?: string;
  rating?: number;
  currentEpisode?: number;
  currentChapter?: number;
}