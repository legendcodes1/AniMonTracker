export interface KitsuTitles {
  en?: string;
  en_jp?: string;
  ja_jp?: string;
  slug?: string;
}

export interface KitsuPosterImage {
  tiny?: string;
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
}

export interface KitsuAnimeAttributes {
  slug: string;
  synopsis: string;
  description: string;
  titles: KitsuTitles;
  averageRating: string;
  status: string;
  posterImage: KitsuPosterImage;
  episodeCount?: number;
  chapterCount?: number;
  subtype: string;
}

export interface KitsuAnime {
  id: string;
  type: string;
  attributes: KitsuAnimeAttributes;
}

export interface KitsuResponse {
  data: KitsuAnime[];
}

export interface SearchResult {
  id: string;
  title: string;
  type: "anime" | "manga";
  image: string;
  status: string;
  episodes?: number;
  chapters?: number;
  synopsis: string;
  rating?: string;
}