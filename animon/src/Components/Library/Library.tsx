import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import LibraryModal from "../Modal/MangaModel";
import LibraryCard from "./LibraryCard";
import { MediaItem } from "../../types/MediaItem";
import { fetchMediaCollection } from "../../services/mediaService";

const Library: React.FC = () => {
  const [collection, setCollection] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<"all" | "anime" | "manga">("all");
  const [modalItem, setModalItem] = useState<MediaItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const token = localStorage.getItem("token")!;

  useEffect(() => {
    fetchMediaCollection(token).then(setCollection).catch(console.error);
  }, [token]);

  const filteredItems =
    filter === "all" ? collection : collection.filter((i) => i.type === filter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Library
          </h1>
          <p className="text-slate-400 text-lg">
            Track your favorite anime and manga
          </p>
        </div>

        {/* Filters + Add Button */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          {/* Filters */}
          <div className="flex gap-2">
            {["all", "anime", "manga"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as typeof filter)}
                className={`px-4 py-2 rounded-lg ${
                  filter === f
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
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

          {/* Add New Button */}
          <button
            onClick={() => {
              setModalItem(null); // ensures modal opens in "create new" mode
              setModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 shadow-lg"
          >
            + Add New
          </button>
        </div>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-slate-400">No items found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
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

      {/* Modal */}
      {modalOpen && (
        <LibraryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={modalItem}
          type={modalItem?.type}
          onRefresh={() => fetchMediaCollection(token).then(setCollection)}
        />
      )}
    </div>
  );
};

export default Library;
