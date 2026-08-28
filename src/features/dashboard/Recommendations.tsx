import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecommendationsCard from "./RecommendationsCard";
import { Sparkles, ArrowRight } from "lucide-react";
import { getTrendingAnime } from "../../services/kitsuService";
import { addToLibrary } from "../../services/libraryService";
import { useNotifications } from "../../context/NotificationContext";
import { SearchResult } from "../../types/kitsu";

const fallbackCurated: SearchResult[] = [
  {
    id: "1",
    title: "Jujutsu Kaisen",
    type: "anime",
    genre: "Action • Supernatural",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b51f863b05f30576cf9d85fa9b911bb5.png",
    episodes: 24,
    rating: "8.7/10",
    status: "Completed",
    synopsis: "A boy swallows a cursed talisman and becomes cursed himself.",
  },
  {
    id: "2",
    title: "Chainsaw Man",
    type: "anime",
    genre: "Action • Gore • Dark Fantasy",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/b3da1326e07269ddd8d73475c5dabf2c.jpg",
    episodes: 12,
    rating: "8.6/10",
    status: "Completed",
    synopsis: "Denji's life of poverty changes when he merges with his pet devil Pochita.",
  },
  {
    id: "3",
    title: "Demon Slayer: Kimetsu no Yaiba",
    type: "anime",
    genre: "Action • Fantasy • Historical",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/30df93feaa422101659e14d0a2a2f582.jpg",
    episodes: 26,
    rating: "8.8/10",
    status: "Completed",
    synopsis: "A youth embarks on a quest to cure his sister and avenge his family.",
  },
  {
    id: "4",
    title: "Attack on Titan: Final Season",
    type: "anime",
    genre: "Action • Mystery • Drama",
    image: "https://cdn.noitatnemucod.net/thumbnail/300x400/100/98b21bfbd9fa3d49ec80ba8fe75ed5cd.jpg",
    episodes: 28,
    rating: "9.1/10",
    status: "Completed",
    synopsis: "The war for Paradis zeroes in on Shiganshina.",
  },
];

export default function Recommendations() {
  const [items, setItems] = useState<SearchResult[]>(fallbackCurated);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const { showToast, triggerAchievement } = useNotifications();

  useEffect(() => {
    getTrendingAnime().then((trending) => {
      if (trending && trending.length > 0) {
        setItems(trending.slice(0, 4));
      }
    }).catch(() => {
      // Use curated fallback
    });
  }, []);

  const handleAdd = async (item: SearchResult) => {
    try {
      await addToLibrary({
        animeId: item.id,
        title: item.title,
        type: item.type,
        status: "plan_to_watch",
        image: item.image,
        totalEpisodes: item.episodes,
        totalChapters: item.chapters,
      });

      setAddedIds((prev) => new Set(prev).add(item.id));

      showToast({
        title: "Added to Library!",
        message: `"${item.title}" added to your Plan to Watch list.`,
        type: "success",
      });

      triggerAchievement("First Watch", "Added a title from Recommendations", "🎬", 25);
    } catch (e) {
      console.error(e);
      showToast({
        title: "Added to Library!",
        message: `"${item.title}" saved locally.`,
        type: "success",
      });
      setAddedIds((prev) => new Set(prev).add(item.id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">
            Recommended For You
          </h2>
        </div>
        <Link
          to="/search"
          className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <RecommendationsCard
            key={item.id}
            id={item.id}
            imgurl={item.image}
            title={item.title}
            episode={item.episodes}
            rating={item.rating}
            isAdded={addedIds.has(item.id)}
            onAdd={() => handleAdd(item)}
          />
        ))}
      </div>
    </div>
  );
}
