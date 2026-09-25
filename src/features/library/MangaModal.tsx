import React, { useState, useEffect } from "react";
import { MediaItem, MediaStatus, MediaType } from "../../types/library";
import { updateLibraryItem, deleteLibraryItem, addToLibrary } from "../../services/libraryService";
import { useNotifications } from "../../context/NotificationContext";
import { X, Star, Trash2, Save, Tv, Book, Sparkles } from "lucide-react";

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: MediaItem | null;
  onRefresh: () => void;
}

export default function MangaModal({ isOpen, onClose, data, onRefresh }: LibraryModalProps) {
  const { showToast, triggerAchievement } = useNotifications();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    image: "",
    rating: 0,
    notes: "",
    status: "watching" as MediaStatus,
    type: "anime" as MediaType,
    currentEpisode: 0,
    episodes: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        genre: data.genre || "",
        image: data.image || "",
        rating: data.rating || 0,
        notes: data.notes || "",
        status: data.status || "watching",
        type: data.type || "anime",
        currentEpisode: data.currentEpisode || 0,
        episodes: data.episodes || 0,
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" || name === "currentEpisode" || name === "episodes" ? Number(value) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (data?.id) {
        await updateLibraryItem(data.id, formData);
        showToast({
          title: "Library Updated! ✅",
          message: `Saved changes for "${formData.title}"`,
          type: "success",
        });

        if (formData.status === "completed" && data.status !== "completed") {
          triggerAchievement("Completionist", `Finished ${formData.title}!`, "🏆", 50);
        }
      } else {
        await addToLibrary({
          title: formData.title,
          type: formData.type,
          status: formData.status,
          image: formData.image,
          genre: formData.genre,
          rating: formData.rating,
          notes: formData.notes,
        });

        showToast({
          title: "Added to Library! 🌟",
          message: `"${formData.title}" added to your collection.`,
          type: "success",
        });
      }

      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        message: "Failed to save library item.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!data?.id) return;
    if (!confirm(`Are you sure you want to remove "${data.title}" from your library?`)) return;

    setLoading(true);
    try {
      await deleteLibraryItem(data.id);
      showToast({
        title: "Item Removed",
        message: `"${data.title}" was removed from your library.`,
        type: "info",
      });
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        message: "Failed to delete item.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          {data ? "Edit Library Entry" : "Add to Library"}
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
              >
                <option value="anime">Anime</option>
                <option value="manga">Manga</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
              >
                <option value="watching">Watching</option>
                <option value="completed">Completed</option>
                <option value="plan_to_watch">Plan to Watch</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Rating (0 - 10)
              </label>
              <input
                type="number"
                name="rating"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Genre
              </label>
              <input
                type="text"
                name="genre"
                placeholder="Action, Shonen..."
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Poster Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Personal Notes / Review
            </label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Your thoughts, favorite episode, or notes..."
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
            {data?.id ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-sm border border-red-500/30 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            ) : <div />}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Entry
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
