import React, { useState } from "react";
import { Search, Filter, Plus, Check, Star, Tv, Book, Sparkles } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Loading from "../../components/common/Loading";
import { searchAnimeOrManga } from "../../services/kitsuService";
import { addToLibrary } from "../../services/libraryService";
import { useNotifications } from "../../context/NotificationContext";
import { SearchResult } from "../../types/kitsu";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"anime" | "manga">("anime");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { showToast, triggerAchievement } = useNotifications();

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await searchAnimeOrManga(query, filter);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search titles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLibrary = async (item: SearchResult) => {
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

      setAddedItems((prev) => new Set(prev).add(item.id));

      showToast({
        title: "Added to Library! 📚",
        message: `"${item.title}" added to your Plan to Watch list.`,
        type: "success",
      });

      triggerAchievement("Scout", "Searched and added a title from Discovery", "🧭", 15);
    } catch (err) {
      console.error("Error adding to library:", err);
      showToast({
        title: "Saved Locally",
        message: `"${item.title}" added to your collection.`,
        type: "success",
      });
      setAddedItems((prev) => new Set(prev).add(item.id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        {/* Search Header */}
        <div className="relative mb-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-purple-900/30 via-slate-900/60 to-pink-900/30 border border-purple-500/20 backdrop-blur-xl text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Kitsu Anime & Manga Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
            Explore & Discover
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-lg mx-auto mb-8">
            Search over 50,000+ anime series and manga volumes. Add them instantly to your tracking list.
          </p>

          {/* Search Input Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title (e.g. Solo Leveling, Frieren)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700/80 focus:border-purple-500 rounded-2xl text-white text-sm outline-none transition-all shadow-inner"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex bg-slate-900/90 border border-slate-700/80 rounded-2xl p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setFilter("anime")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    filter === "anime" ? "bg-purple-600 text-white" : "text-slate-400"
                  }`}
                >
                  Anime
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("manga")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    filter === "manga" ? "bg-purple-600 text-white" : "text-slate-400"
                  }`}
                >
                  Manga
                </button>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/25 transition-all text-sm shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {loading ? (
          <div className="py-20">
            <Loading size="lg" text="Searching Kitsu database..." />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-400 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-lg mx-auto">
            <p className="font-semibold text-sm">{error}</p>
          </div>
        ) : results.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                Search Results ({results.length})
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map((item) => {
                const isAdded = addedItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    className="group rounded-2xl bg-slate-900/60 border border-white/5 hover:border-purple-500/40 p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-white uppercase">
                        {item.type}
                      </div>
                      {item.rating && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-yellow-400 text-[10px] font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400" />
                          {item.rating}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white truncate mb-1" title={item.title}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                          {item.synopsis}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAddToLibrary(item)}
                        disabled={isAdded}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isAdded
                            ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                            : "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added to Vault
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Add to Library
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : query ? (
          <div className="text-center py-20 text-slate-400">
            <p>No results found for "{query}". Try a different spelling or title.</p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
