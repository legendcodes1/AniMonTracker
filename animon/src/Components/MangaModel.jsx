import React, { useEffect } from "react";
import { useState } from "react";
export default function MangaModal({ isOpen, handleClose, onAddItem }) {
  const [formData, setFormData] = useState({
    title: "",
    chapters: "",
    genre: "",
    image: "",
    status: "ongoing",
    type: "manga",
    rating: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = () => {
  //   if (formData.title.trim()) {
  //     const newItem = {
  //       id: Date.now(),
  //       ...formData,
  //       rating: parseFloat(formData.rating) || 0,
  //     };
  //     onAddItem(newItem);
  //     setFormData({
  //       title: "",
  //       chapters: "",
  //       genre: "",
  //       image: "",
  //       status: "ongoing",
  //       type: "manga",
  //       rating: "",
  //     });
  //     handleClose();
  //   }
  // };

  const handleSubmit = async () => {
    try {
      let endpoint = "";
      let mappedData = {};

      if (formData.type === "anime") {
        endpoint = "http://localhost:3000/animes";
        mappedData = {
          Name: formData.title,
          Episodes: parseInt(formData.chapters) || null, // using chapters input for anime episodes here
          Genre: formData.genre,
          Image: formData.image,
          Status: formData.status,
        };
      } else if (formData.type === "manga") {
        endpoint = "http://localhost:3000/mangas";
        mappedData = {
          Name: formData.title,
          Chapters: parseInt(formData.chapters) || null,
          Genre: formData.genre,
          Image: formData.image,
          Status: formData.status,
        };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mappedData),
      });

      if (!res.ok) throw new Error("Failed to add item");

      const data = await res.json();
      console.log("Successfully added:", data);

      // reset form
      setFormData({
        title: "",
        chapters: "",
        genre: "",
        image: "",
        status: "ongoing",
        type: "manga",
        rating: "",
      });

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add New Item
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="manga">Manga</option>
              <option value="anime">Anime</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">
              {formData.type === "manga" ? "Chapters" : "Episodes"}
            </label>
            <input
              type="text"
              name="chapters"
              value={formData.chapters}
              onChange={handleInputChange}
              placeholder={
                formData.type === "manga" ? "e.g., 45/200" : "e.g., 12/24"
              }
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              placeholder="e.g., Action, Romance, Thriller"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
              <option value="dropped">Dropped</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Rating (0-10)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="0"
              max="10"
              step="0.1"
              className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => handleSubmit(formData, formData.type)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors"
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
