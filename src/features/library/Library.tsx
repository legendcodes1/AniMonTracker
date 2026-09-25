import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import MangaModal from "./MangaModal";
import LibraryCard from "./LibraryCard";
import Loading from "../../components/common/Loading";
import { MediaItem } from "../../types/library";
import { fetchMediaCollection } from "../../services/mediaService";
import {
  Sparkles,
  Plus,
  Tv,
  Book,
  CheckCircle2,
  Clock,
  Filter,
  SortAsc,
} from "lucide-react";

export default function Library() {
  const [collection, setCollection] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<"all" | "anime" | "manga">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "title">("recent");
  const [modalItem, setModalItem] = useState<MediaItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchMediaCollection();
      setCollection(data);
    } catch (error) {
      console.error("Error fetching library:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = collection
    .filter((item) => (filter === "all" ? true : item.type === filter))
    .filter((item) => (statusFilter === "all" ? true : item.status === statusFilter));

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      case "title":
        return a.title.localeCompare(b.title);
      case "recent":
      default:
        return new Date(b.addedAt || 0).getTime() - new Date(a.addedAt || 0).getTime();
    }
  });

  const stats = {
    total: collection.length,
    anime: collection.filter((i) => i.type === "anime").length,
    manga: collection.filter((i) => i.type === "manga").length,
    watching: collection.filter((i) => i.status === "watching").length,
    completed: collection.filter((i) => i.status === "completed").length,
    avgRating:
      collection.length > 0
        ? (
            collection.reduce((acc, i) => acc + (Number(i.rating) || 0), 0) /
            collection.length
          ).toFixed(1)
        : "0.0",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        {/* Header Hero */}
        <div className="relative mb-8 p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-slate-900/60 to-pink-900/40 border border-purple-500/20 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Personal Vault
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white">
              My Media Collection
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1">
              {stats.total} titles tracking • {stats.completed} completed
            </p>
          </div>

          <button
            onClick={() => {
              setModalItem(null);
              setModalOpen(true);
            }}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 transform hover:scale-105 shrink-0"
          >
            <Plus className="w-5 h-5" /> Add New Entry
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5">
            <p className="text-xs text-slate-400 font-semibold">Total Entries</p>
            <p className="text-2xl font-black text-white mt-1">{stats.total}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5">
            <p className="text-xs text-blue-400 font-semibold flex items-center gap-1">
              <Tv className="w-3.5 h-3.5" /> Anime
            </p>
            <p className="text-2xl font-black text-white mt-1">{stats.anime}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5">
            <p className="text-xs text-pink-400 font-semibold flex items-center gap-1">
              <Book className="w-3.5 h-3.5" /> Manga
            </p>
            <p className="text-2xl font-black text-white mt-1">{stats.manga}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5">
            <p className="text-xs text-yellow-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Currently In-Progress
            </p>
            <p className="text-2xl font-black text-white mt-1">{stats.watching}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5">
            <p className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </p>
            <p className="text-2xl font-black text-white mt-1">{stats.completed}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5">
            <p className="text-xs text-purple-400 font-semibold">Average Rating</p>
            <p className="text-2xl font-black text-yellow-400 mt-1">★ {stats.avgRating}</p>
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-slate-900/60 border border-white/5">
          {/* Type Tabs */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl">
            {(["all", "anime", "manga"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  filter === t
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Status and Sort Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white outline-none focus:border-purple-500"
            >
              <option value="all">All Statuses</option>
              <option value="watching">Watching / Reading</option>
              <option value="completed">Completed</option>
              <option value="plan_to_watch">Plan to Watch</option>
              <option value="dropped">Dropped</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white outline-none focus:border-purple-500"
            >
              <option value="recent">Sort by: Recently Added</option>
              <option value="rating">Sort by: Top Rated</option>
              <option value="title">Sort by: Title A-Z</option>
            </select>
          </div>
        </div>

        {/* Grid Content */}
        {loading ? (
          <div className="py-20">
            <Loading size="lg" text="Loading your collection..." />
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-slate-900/40 border border-white/5">
            <Book className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No titles found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              You haven't added any titles matching these filters yet.
            </p>
            <button
              onClick={() => {
                setModalItem(null);
                setModalOpen(true);
              }}
              className="mt-4 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
            >
              Add First Entry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
      </main>

      {/* Modal */}
      <MangaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalItem}
        onRefresh={loadData}
      />
    </div>
  );
}
