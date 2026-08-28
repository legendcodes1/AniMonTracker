import { KitsuResponse, KitsuAnime, SearchResult } from "../types/kitsu";

const KITSU_BASE_URL = "https://kitsu.io/api/edge";

const transformKitsuData = (item: KitsuAnime): SearchResult => ({
  id: item.id,
  title:
    item.attributes.titles.en ||
    item.attributes.titles.en_jp ||
    item.attributes.titles.slug ||
    item.attributes.slug,
  type: item.type === "anime" ? "anime" : "manga",
  image:
    item.attributes.posterImage?.medium ||
    item.attributes.posterImage?.large ||
    item.attributes.posterImage?.small ||
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400",
  status: item.attributes.status,
  episodes: item.attributes.episodeCount,
  chapters: item.attributes.chapterCount,
  synopsis: item.attributes.synopsis || "No synopsis available.",
  rating: item.attributes.averageRating ? `${(Number(item.attributes.averageRating) / 10).toFixed(1)}/10` : undefined,
});

export const searchAnimeOrManga = async (
  query: string,
  type: "anime" | "manga" = "anime"
): Promise<SearchResult[]> => {
  if (!query.trim()) {
    throw new Error("Search query cannot be empty");
  }

  try {
    const response = await fetch(
      `${KITSU_BASE_URL}/${type}?filter[text]=${encodeURIComponent(query)}&page[limit]=20`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch from Kitsu: ${response.statusText}`);
    }

    const data: KitsuResponse = await response.json();
    return data.data.map(transformKitsuData);
  } catch (error) {
    console.error("Error fetching from Kitsu:", error);
    throw error;
  }
};

export const getTrendingAnime = async (): Promise<SearchResult[]> => {
  try {
    const response = await fetch(`${KITSU_BASE_URL}/trending/anime?page[limit]=10`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trending anime`);
    }
    const data: KitsuResponse = await response.json();
    return data.data.map(transformKitsuData);
  } catch (error) {
    console.error("Error fetching trending anime:", error);
    return [];
  }
};