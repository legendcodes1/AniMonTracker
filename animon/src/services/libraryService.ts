export interface AddToLibraryRequest {
  animeId: string;
  animeTitle: string;
  type: 'anime' | 'manga';
  status: 'watching' | 'completed' | 'plan_to_watch' | 'dropped';
  animePoster: string;
  rating?: number;
  episodesWatched?: number;
  totalEpisodes?: number;
  chaptersRead?: number;
  totalChapters?: number;
  notes?: string;
}

export const addToLibrary = async (
  request: AddToLibraryRequest
): Promise<void> => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    const response = await fetch('http://localhost:8080/api/library/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add to library: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding to library:', error);
    throw error;
  }
};