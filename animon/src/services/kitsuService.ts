import { KitsuResponse, KitsuAnime, SearchResult } from '../types/kitsu';

const KITSU_BASE_URL = 'https://kitsu.io/api/edge';

// Transform Kitsu data to our format
const transformKitsuData = (item: KitsuAnime): SearchResult => ({
  id: item.id,
  title: item.attributes.titles.en || 
         item.attributes.titles.en_jp || 
         item.attributes.slug,
  type: item.type === 'anime' ? 'anime' : 'manga',
  image: item.attributes.posterImage?.medium || 
         item.attributes.posterImage?.small || 
         'https://via.placeholder.com/300x400',
  status: item.attributes.status,
  episodes: item.attributes.episodeCount,
  chapters: item.attributes.chapterCount,
  synopsis: item.attributes.synopsis,
  rating: item.attributes.averageRating,
});

export const searchAnimeOrManga = async (
  query: string,
  type: 'anime' | 'manga' = 'anime'
): Promise<SearchResult[]> => {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  try {
    const response = await fetch(
      `${KITSU_BASE_URL}/${type}?filter[text]=${encodeURIComponent(query)}&page[limit]=20`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data: KitsuResponse = await response.json();
    
    return data.data.map(transformKitsuData);
  } catch (error) {
    console.error('Error fetching from Kitsu:', error);
    throw error;
  }
};