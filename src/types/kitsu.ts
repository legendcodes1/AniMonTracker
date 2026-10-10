// Kitsu API Response Types
export interface KitsuAnime {
  id: string;
  type: string;
  attributes: {
    titles: {
      en?: string;
      en_jp?: string;
      ja_jp?: string;
    };
    canonicalTitle?: string;
    slug: string;
    synopsis?: string | null;
    posterImage?: {
      tiny?: string;
      small?: string;
      medium?: string;
      large?: string;
      original?: string;
    } | null;
    coverImage?: {
      small?: string;
      large?: string;
      original?: string;
    } | null;
    status: string;
    subtype?: string;
    episodeCount?: number;
    chapterCount?: number;
    startDate?: string;
    endDate?: string;
    averageRating?: string;
    userCount?: number;
  };
}

export interface KitsuResponse {
  data: KitsuAnime[];
  meta: {
    count: number;
  };
  links: {
    first: string;
    next?: string;
    last: string;
  };
}

// Our internal types
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

export interface DiscoveryAnime {
  id: string;
  title: string;
  slug: string;
  synopsis: string;
  posterImage: string | null;
  coverImage: string | null;
  status: string;
  subtype: string | null;
  episodeCount: number | null;
  startDate: string | null;
  rating: number | null;
}

export interface DiscoveryFeed {
  trending: DiscoveryAnime[];
  newReleases: DiscoveryAnime[];
}
