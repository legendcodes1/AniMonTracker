export interface LibraryItem {
  id: string; 
  title: string; 
  type: "anime" | "manga";
  status: "watching" | "completed" | "plan_to_watch" | "dropped";
  image: string; 
  rating?: number;
  notes?: string;
  addedAt?: string;
  genre?: string; 
}

export interface CreateLibraryItemRequest {
    user_id: string,
    title: string,
    type: 'anime' | 'manga';
    genre: string,
    image?: string,
    status?: 'watching' | 'completed' | 'plan_to_watch' | 'dropped';
    notes?: string,
    rating?: number,
}

export interface UpdateLibraryItemRequest {
  title?: string;
  type?: 'anime' | 'manga';
  genre?: string;
  image?: string;
  status?: 'watching' | 'completed' | 'plan_to_watch' | 'dropped';
  notes?: string;
  rating?: number;
}