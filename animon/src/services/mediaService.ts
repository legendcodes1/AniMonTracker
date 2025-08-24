import { Item } from "../types/item";

export async function fetchMediaCollection(token: string): Promise<Item[]> {
  const [mangasRes, animesRes] = await Promise.all([
    fetch("http://localhost:3000/mangas", {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch("http://localhost:3000/animes", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  if (!mangasRes.ok)
    throw new Error(`Failed to fetch mangas: ${mangasRes.statusText}`);
  if (!animesRes.ok)
    throw new Error(`Failed to fetch animes: ${animesRes.statusText}`);

  const mangasData = await mangasRes.json();
  const animesData = await animesRes.json();

  const mangas: Item[] = (Array.isArray(mangasData) ? mangasData : []).map(
    (m) => ({
      id: `manga-${m.id}`,
      title: m.Name ?? "Untitled",
      type: "manga",
      rating: m.Rating ?? 8.5,
      image: m.Image ?? "https://via.placeholder.com/300x400?text=Manga+Cover",
      status: m.Status ?? "ongoing",
      description: m.description ?? "No description available.",
      chapters: m.Chapters ?? 0,
      genre: m.Genre ?? "Unknown",
      watch: m.Watch ?? "#",
    })
  );

  const animes: Item[] = (Array.isArray(animesData) ? animesData : []).map(
    (a) => ({
      id: `anime-${a.id}`,
      title: a.Name ?? "Untitled",
      type: "anime",
      rating: a.Rating ?? 8.5,
      image: a.Image ?? "https://via.placeholder.com/300x400?text=Anime+Cover",
      status: a.Status ?? "ongoing",
      description: a.description ?? "No description available.",
      episodes: a.Episodes ?? 0,
      genre: a.Genre ?? "Unknown",
      watch: a.Watch ?? "#",
    })
  );

  return [...mangas, ...animes];
}
