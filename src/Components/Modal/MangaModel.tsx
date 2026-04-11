import React, { useEffect, useState } from "react";
import { MediaItem } from "../../types/Library";

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: MediaItem | null;
  onRefresh: () => void;
}

interface FormData {
  title: string;  
  genre: string;
  image: string;
  rating: number;           
  notes: string;             
  status: "watching" | "completed" | "plan_to_watch" | "dropped";
  type: "manga" | "anime";
}
const token = localStorage.getItem("supabase_token");
const userId = localStorage.getItem("user_id");

export default function LibraryModal({ isOpen, onClose,data, onRefresh,}: LibraryModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: data?.title ?? "",
    genre: data?.genre ?? "",
    image: data?.image ?? "",
    rating: data?.rating ?? 0,
    notes: data?.status ?? "",
    status: data?.status ?? "watching",
    type: data?.type ?? "manga",
  });
  console.log(data)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            onClick={data ? handleUpdate : handleSubmit}
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