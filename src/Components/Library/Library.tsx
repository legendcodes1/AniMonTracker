import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import LibraryModal from "../Modal/MangaModel";
import LibraryCard from "./LibraryCard";
import type { MediaItem } from "../../types/Library";
import { fetchMediaCollection} from "../../services/mediaService";
import { SortAsc, Filter, Play, BookOpen, Clock, Award, Flame, TrendingUp, Plus, Sparkles } from "lucide-react";

const Library: React.FC = () => {
   const [collection, setCollection] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<"all" | "anime" | "manga">("all");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "title">("recent");
  const [modalItem, setModalItem] = useState<MediaItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("supabase_token")!;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          const data = await fetchMediaCollection(token);
          setCollection(data);
      } catch (error) {
        console.error("Error fetching library:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const filteredItems = collection.filter((item) => filter === "all"  ? true : item.type === filter)

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "title":
        return a.title.localeCompare(b.title);
      case "recent":
      default:
        return new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime();
    }
  });

  const stats = {
    total: collection.length,
    anime: collection.filter(i => i.type === 'anime').length,
    manga: collection.filter(i => i.type === 'manga').length,
    watching: collection.filter(i => i.status === 'watching').length,
    completed: collection.filter(i => i.status === 'completed').length,
    planToWatch: collection.filter(i => i.status === 'plan_to_watch').length,
    avgRating: collection.length > 0 
      ? (collection.reduce((acc, i) => acc + (i.rating || 0), 0) / collection.length).toFixed(1)
      : "0.0"
  };

  const continueWatching = collection.filter(i => i.status === 'watching').slice(0, 4);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-pink-900/20" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <Navbar />
      <div className="container mx-auto px-4 py-8 relative z-10">
        
        {/* Hero Section */}
        <div className="relative mb-10 p-8 rounded-3xl bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-blue-600/20 border border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black text-white mb-2 flex items-center justify-center md:justify-start gap-3">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                Your Collection
              </h1>
              <p className="text-slate-300 text-lg">
                {stats.total} titles in your library
              </p>
            </div>
            <button
              onClick={() => { setModalItem(null); setModalOpen(true); }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Title
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:border-purple-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Play className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-slate-400 text-sm">Anime</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.anime}</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:border-pink-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-slate-400 text-sm">Manga</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.manga}</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:border-yellow-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-slate-400 text-sm">Watching</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.watching}</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:border-green-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-slate-400 text-sm">Completed</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.completed}</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:border-purple-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-slate-400 text-sm">Plan to Watch</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.planToWatch}</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:border-cyan-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-slate-400 text-sm">Avg Rating</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
          </div>
        </div>

        {/* Continue Watching Section */}
        {continueWatching.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-pink-500" />
              Continue Watching
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {continueWatching.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => { setModalItem(item); setModalOpen(true); }}
                  className="shrink-0 w-40 cursor-pointer group"
                >
                  <div className="relative rounded-xl overflow-hidden mb-2 aspect-[2/3]">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="w-full bg-slate-700 rounded-full h-1 mb-1">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                          style={{ width: `${item.episodes && item.currentEpisode ? (item.currentEpisode / item.episodes) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-300">
                        Ep {item.currentEpisode || 0}/{item.episodes || '?'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-white font-medium truncate">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters + Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-2">
            {["all", "anime", "manga"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-white/5"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} (
                {f === "all"
                  ? collection.length
                  : collection.filter((i) => i.type === f).length}
                )
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2 border border-white/5">
              <SortAsc className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent text-slate-300 text-sm focus:outline-none cursor-pointer"
              >
                <option value="recent">Recently Added</option>
                <option value="rating">Rating</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-16 text-slate-400">Loading your library...</div>
        ) : sortedItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-4">
              <Sparkles className="w-10 h-10 text-slate-500" />
            </div>
            <p className="text-slate-300 text-xl font-medium">Your library is empty</p>
            <p className="text-slate-500 text-sm mt-2 mb-6">Start adding anime and manga to build your collection</p>
            <button
              onClick={() => { setModalItem(null); setModalOpen(true); }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
            >
              Add Your First Title
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sortedItems.map((item) => (
              <LibraryCard
                key={item.id}
                item={item}
                onClick={() => {
                  setModalItem(item);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <LibraryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={modalItem}
          onRefresh={() => fetchMediaCollection(token).then(setCollection)}
        />
      )}
    </div>
  );
};

export default Library;
