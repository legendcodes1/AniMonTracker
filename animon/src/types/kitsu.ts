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
    slug: string;
    synopsis: string;
    posterImage: {
      tiny?: string;
      small?: string;
      medium?: string;
      large?: string;
      original?: string;
    };
    status: string;
    episodeCount?: number;
    chapterCount?: number;
    startDate?: string;
    endDate?: string;
    averageRating?: string;
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
  type: 'anime' | 'manga';
  image: string;
  status: string;
  episodes?: number;
  chapters?: number;
  synopsis: string;
  rating?: string;
}