import { describe, expect, it } from "vitest";
import type { KitsuAnime } from "@/types/kitsu";
import { transformDiscoveryAnime } from "./kitsuService";

describe("transformDiscoveryAnime", () => {
  it("normalizes a Kitsu anime for discovery cards", () => {
    const anime = {
      id: "42",
      type: "anime",
      attributes: {
        titles: { en: "English title", en_jp: "Romanized title" },
        canonicalTitle: "Canonical title",
        slug: "english-title",
        synopsis: "A synopsis",
        posterImage: { medium: "poster-medium.jpg", large: "poster-large.jpg" },
        coverImage: { large: "cover-large.jpg" },
        status: "current",
        subtype: "TV",
        episodeCount: 12,
        startDate: "2026-10-01",
        averageRating: "82.45",
      },
    } satisfies KitsuAnime;

    expect(transformDiscoveryAnime(anime)).toEqual({
      id: "42",
      title: "English title",
      slug: "english-title",
      synopsis: "A synopsis",
      posterImage: "poster-large.jpg",
      coverImage: "cover-large.jpg",
      status: "current",
      subtype: "TV",
      episodeCount: 12,
      startDate: "2026-10-01",
      rating: 82.45,
    });
  });

  it("provides safe fallbacks for incomplete records", () => {
    const anime = {
      id: "7",
      type: "anime",
      attributes: {
        titles: {},
        slug: "untitled-anime",
        synopsis: null,
        posterImage: null,
        coverImage: null,
        status: "upcoming",
      },
    } satisfies KitsuAnime;

    expect(transformDiscoveryAnime(anime)).toMatchObject({
      title: "untitled-anime",
      synopsis: "No synopsis is available yet.",
      posterImage: null,
      coverImage: null,
      subtype: null,
      episodeCount: null,
      startDate: null,
      rating: null,
    });
  });
});
