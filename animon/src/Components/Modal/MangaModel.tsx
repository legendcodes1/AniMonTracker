import React, { useEffect, useState } from "react";
import { MediaItem } from "../../types/MediaItem";

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: MediaItem | null;
  onRefresh: () => void;
}

interface FormData {
  title: string;
  chapters: string;
  totalEpisodes: string;     
  totalChapters: string;     
  genre: string;
  image: string;
  rating: string;           
  notes: string;             
  status: "watching" | "completed" | "plan_to_watch" | "dropped";
  type: "manga" | "anime";
  watch: string;
}

export default function LibraryModal({
  isOpen,
  onClose,
  data,
  onRefresh,
}: LibraryModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    chapters: "",
    totalEpisodes: "",
    totalChapters: "",
    genre: "",
    image: "",
    rating: "",
    notes: "",
    status: "watching",
    type: "manga",
    watch: "",
  });

  // Populate form when data changes
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        chapters: data.chapters?.toString() ?? data.episodes?.toString() ?? "",
        totalEpisodes: data.totalEpisodes?.toString() ?? "",
        totalChapters: data.totalChapters?.toString() ?? "",
        genre: data.genre || "",
        image: data.image || "",
        rating: data.rating?.toString() ?? "",
        notes: data.notes || "",
        status: data.status as FormData["status"] || "watching",
        type: data.type || "manga",
        watch: data.watch || "",
      });
    } else {
      setFormData({
        title: "",
        chapters: "",
        totalEpisodes: "",
        totalChapters: "",
        genre: "",
        image: "",
        rating: "",
        notes: "",
        status: "watching",
        type: "manga",
        watch: "",
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) throw new Error("Not authenticated");

      const method = data ? "PUT" : "POST";
      const animeId = data?.id || crypto.randomUUID();
      const endpoint = data
        ? `http://localhost:3000/api/library/${animeId}`
        : `http://localhost:3000/api/library`;

      // Match backend DTO structure
      const requestBody = data
  ? {
      // PUT
      title: formData.title,
      type: formData.type,
      episodes: formData.type === "anime" && formData.chapters ? parseInt(formData.chapters) : null,
      chapters: formData.type === "manga" && formData.chapters ? parseInt(formData.chapters) : null,
      total_chapters: formData.totalChapters ? parseInt(formData.totalChapters) : null,
      total_episodes: formData.totalEpisodes ? parseInt(formData.totalEpisodes) : null,
      genre: formData.genre || null,
      image: formData.image || null,
      status: formData.status,
      notes: formData.notes || null,
      watch: formData.watch || null,
      rating: formData.rating ? parseFloat(formData.rating) : null,
    }
  : {
      // POST
      title: formData.title,
      type: formData.type,
      episodes: formData.type === "anime" && formData.chapters ? parseInt(formData.chapters) : null,
      chapters: formData.type === "manga" && formData.chapters ? parseInt(formData.chapters) : null,
      total_chapters: formData.totalChapters ? parseInt(formData.totalChapters) : null,
      total_episodes: formData.totalEpisodes ? parseInt(formData.totalEpisodes) : null,
      genre: formData.genre || null,
      image: formData.image || null,
      status: formData.status,
      notes: formData.notes || null,
      watch: formData.watch || null,
      rating: formData.rating ? parseFloat(formData.rating) : null,
      user_id: userId,
    };

      console.log("Sending request:", { method, endpoint, body: requestBody }); // ✅ DEBUG

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText); 
        throw new Error(`Submission failed: ${errorText}`);
      }

      const responseData = await res.json();
      console.log("Response received:", responseData); 

      onRefresh();
      onClose();
    } catch (err) {
      console.error("Error submitting:", err);
      alert(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handleDelete = async () => {
    if (!data) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    const endpoint = `http://localhost:3000/api/library/${data.id}`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-purple-400 transition"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {data ? "Edit Item" : "Add New Item"}
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="Enter title"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-white mb-2">
            Image URL
          </label>
          <input
            id="image"
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="https://..."
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-white mb-2">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
          >
            <option value="manga">Manga</option>
            <option value="anime">Anime</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-white mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
          >
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
            <option value="plan_to_watch">Plan to Watch</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>

        {/* Chapters/Episodes Watched */}
        <div className="mb-4">
          <label htmlFor="chapters" className="block text-white mb-2">
            {formData.type === "anime" ? "Episodes Watched" : "Chapters Read"}
          </label>
          <input
            id="chapters"
            type="number"
            name="chapters"
            value={formData.chapters}
            onChange={handleInputChange}
            min="0"
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="0"
          />
        </div>

        {/* Total Episodes/Chapters */}
        <div className="mb-4">
          <label htmlFor={formData.type === "anime" ? "totalEpisodes" : "totalChapters"} className="block text-white mb-2">
            {formData.type === "anime" ? "Total Episodes" : "Total Chapters"}
          </label>
          <input
            id={formData.type === "anime" ? "totalEpisodes" : "totalChapters"}
            type="number"
            name={formData.type === "anime" ? "totalEpisodes" : "totalChapters"}
            value={formData.type === "anime" ? formData.totalEpisodes : formData.totalChapters}
            onChange={handleInputChange}
            min="0"
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="0"
          />
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-white mb-2">
            Rating (0-10)
          </label>
          <input
            id="rating"
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            min="0"
            max="10"
            step="0.1"
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="e.g., 8.5"
          />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-white mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="Your thoughts..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
          >
            {data ? "Update Item" : "Add Item"}
          </button>
          {data && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}