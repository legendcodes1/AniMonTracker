import type {
  DiscoveryAnime,
  DiscoveryFeed,
  KitsuResponse,
  KitsuAnime,
  SearchResult,
} from "@/types/kitsu";

const KITSU_BASE_URL = "https://kitsu.io/api/edge";

async function fetchKitsuAnime(
  params: URLSearchParams,
  signal?: AbortSignal,
): Promise<KitsuAnime[]> {
  const response = await fetch(`${KITSU_BASE_URL}/anime?${params}`, {
    headers: { Accept: "application/vnd.api+json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Kitsu request failed (${response.status})`);
  }

  const data: KitsuResponse = await response.json();
  return data.data;
}

const getTitle = (item: KitsuAnime) =>
  item.attributes.titles.en ||
  item.attributes.titles.en_jp ||
  item.attributes.canonicalTitle ||
  item.attributes.slug;

// Transform Kitsu data to our format
const transformKitsuData = (item: KitsuAnime): SearchResult => ({
  id: item.id,
  title: getTitle(item),
  type: item.type === "anime" ? "anime" : "manga",
  image:
    item.attributes.posterImage?.medium ||
    item.attributes.posterImage?.small ||
    "",
  status: item.attributes.status,
  episodes: item.attributes.episodeCount,
  chapters: item.attributes.chapterCount,
  synopsis: item.attributes.synopsis || "No synopsis is available yet.",
  rating: item.attributes.averageRating,
});

export const searchAnimeOrManga = async (
  query: string,
  type: "anime" | "manga" = "anime",
): Promise<SearchResult[]> => {
  if (!query.trim()) {
    throw new Error("Search query cannot be empty");
  }

  try {
    const response = await fetch(
      `${KITSU_BASE_URL}/${type}?filter[text]=${encodeURIComponent(query)}&page[limit]=20`,
      { headers: { Accept: "application/vnd.api+json" } },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data: KitsuResponse = await response.json();

    return data.data.map(transformKitsuData);
  } catch (error) {
    console.error("Error fetching from Kitsu:", error);
    throw error;
  }
};

export const transformDiscoveryAnime = (item: KitsuAnime): DiscoveryAnime => ({
  id: item.id,
  title: getTitle(item),
  slug: item.attributes.slug,
  synopsis: item.attributes.synopsis || "No synopsis is available yet.",
  posterImage:
    item.attributes.posterImage?.large ||
    item.attributes.posterImage?.medium ||
    item.attributes.posterImage?.small ||
    null,
  coverImage:
    item.attributes.coverImage?.original ||
    item.attributes.coverImage?.large ||
    item.attributes.coverImage?.small ||
    null,
  status: item.attributes.status,
  subtype: item.attributes.subtype || null,
  episodeCount: item.attributes.episodeCount ?? null,
  startDate: item.attributes.startDate || null,
  rating: item.attributes.averageRating
    ? Number(item.attributes.averageRating)
    : null,
});

export async function fetchDiscoveryFeed(
  signal?: AbortSignal,
): Promise<DiscoveryFeed> {
  const trendingParams = new URLSearchParams({
    sort: "-userCount",
    "page[limit]": "10",
  });
  const newReleaseParams = new URLSearchParams({
    "filter[status]": "current",
    sort: "-startDate",
    "page[limit]": "16",
  });

  const [trending, newReleases] = await Promise.all([
    fetchKitsuAnime(trendingParams, signal),
    fetchKitsuAnime(newReleaseParams, signal),
  ]);

  return {
    trending: trending.map(transformDiscoveryAnime),
    newReleases: newReleases.map(transformDiscoveryAnime),
  };
}
