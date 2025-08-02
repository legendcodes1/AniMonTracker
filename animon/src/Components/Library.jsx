import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import LibraryModal from "./MangaModel";
import {
  Plus,
  Star,
  Clock,
  CheckCircle,
  PlayCircle,
  Book,
  Tv,
} from "lucide-react";

export default function Library() {
  const [collection, setCollection] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editItem, setEditItem] = useState(null);

  const closeModal = () => {
    setModalIsOpen(false);
    setEditItem(null); // Reset edit state
  };

  const openModal = () => setModalIsOpen(true);

  const fetchCollection = async () => {
    try {
      const token = localStorage.getItem("token"); // get JWT token from localStorage (adjust if stored elsewhere)

      const mangasRes = await fetch("http://localhost:3000/mangas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!mangasRes.ok) {
        throw new Error(`Failed to fetch mangas: ${mangasRes.statusText}`);
      }
      const mangasData = await mangasRes.json();

      // Ensure mangasData is an array before mapping
      const transformedMangas = Array.isArray(mangasData)
        ? mangasData.map((manga) => ({
            id: `manga-${manga.id}`,
            title: manga.Name || "Untitled",
            type: "manga",
            rating: manga.Rating || 8.5,
            image:
              manga.Image ||
              "https://via.placeholder.com/300x400?text=Manga+Cover",
            status: manga.Status || "ongoing",
            description: manga.description || "No description available.",
            chapters: manga.Chapters || 0,
            genre: manga.Genre || "Unknown",
          }))
        : [];

      const animesRes = await fetch("http://localhost:3000/animes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!animesRes.ok) {
        throw new Error(`Failed to fetch animes: ${animesRes.statusText}`);
      }
      const animesData = await animesRes.json();

      const transformedAnimes = Array.isArray(animesData)
        ? animesData.map((anime) => ({
            id: `anime-${anime.id}`,
            title: anime.Name || "Untitled",
            type: "anime",
            rating: anime.Rating || 8.5,
            image:
              anime.Image ||
              "https://via.placeholder.com/300x400?text=Anime+Cover",
            status: anime.Status || "ongoing",
            description: anime.description || "No description available.",
            episodes: anime.Episodes || 0,
            genre: anime.Genre || "Unknown",
          }))
        : [];

      setCollection([...transformedMangas, ...transformedAnimes]);
    } catch (err) {
      console.error("Error fetching collection:", err);
      setCollection([]); // clear collection on error or show a message if you prefer
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "ongoing":
        return <Clock className="w-4 h-4 text-blue-400" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "upcoming":
        return <PlayCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "upcoming":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const filteredItems =
    filter === "all"
      ? collection
      : collection.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Library
          </h1>
          <p className="text-slate-400 text-lg">
            Track your favorite anime and manga
          </p>
        </div>

        {/* Filter & Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg ${
                filter === "all"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              All ({collection.length})
            </button>
            <button
              onClick={() => setFilter("anime")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                filter === "anime"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <Tv className="w-4 h-4" />
              Anime ({collection.filter((item) => item.type === "anime").length}
              )
            </button>
            <button
              onClick={() => setFilter("manga")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                filter === "manga"
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-500/25"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <Book className="w-4 h-4" />
              Manga ({collection.filter((item) => item.type === "manga").length}
              )
            </button>
          </div>

          <button
            onClick={() => {
              setEditItem(null);
              openModal();
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        {/* Collection Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 animate-fadeIn">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No items found
            </h3>
            <p className="text-slate-400 mb-6">
              {filter === "all"
                ? "You currently have no collection, add an anime or your favorite manga"
                : `No ${filter} found in your collection`}
            </p>
            <button
              onClick={openModal}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 border border-slate-700/50 group animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  setEditItem(item);
                  openModal();
                }}
              >
                <div className="flex gap-4 mb-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-28 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-1 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-2 capitalize flex items-center gap-1">
                      {item.type === "anime" ? (
                        <Tv className="w-3 h-3" />
                      ) : (
                        <Book className="w-3 h-3" />
                      )}
                      {item.type}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">
                        {item.rating}
                      </span>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>{item.genre}</span>
                    <span>
                      {item.type === "anime"
                        ? `${item.episodes} episodes`
                        : `${item.chapters} chapters`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <LibraryModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        data={editItem}
        type={editItem?.type} // "anime" or "manga"
        onRefresh={fetchCollection}
      />
    </div>
  );
}
