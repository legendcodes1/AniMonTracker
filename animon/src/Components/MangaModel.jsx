import React, { useEffect, useState } from "react";

export default function LibraryModal({ isOpen, onClose, data, onRefresh }) {
  const [formData, setFormData] = useState({
    title: "",
    chapters: "",
    genre: "",
    image: "",
    status: "ongoing",
    type: "manga",
    rating: "",
    watch: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        chapters: data.chapters || data.episodes || "",
        genre: data.genre || "",
        image: data.image || "",
        status: data.status || "ongoing",
        type: data.type || "manga",
        rating: data.rating || "",
        Watch: data.rating || "",
      });
    } else {
      setFormData({
        title: "",
        chapters: "",
        genre: "",
        image: "",
        status: "ongoing",
        type: "manga",
        rating: "",
        Watch: "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpointBase = formData.type === "anime" ? "animes" : "mangas";
      const id = data?.id?.split("-")[1];
      const method = data ? "PUT" : "POST";
      const endpoint = `http://localhost:3000/${endpointBase}${
        data ? `/${id}` : ""
      }`;

      const mappedData = {
        Name: formData.title,
        Genre: formData.genre,
        Image: formData.image,
        Status: formData.status,
        Rating: formData.rating,
        Watch: formData.Watch,
        ...(formData.type === "anime"
          ? { Episodes: parseInt(formData.chapters) || null }
          : { Chapters: parseInt(formData.chapters) || null }),
      };

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // add token here
        },
        body: JSON.stringify(mappedData),
      });

      if (!res.ok) throw new Error("Submission failed");

      await res.json();

      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!data) return;

    const token = localStorage.getItem("token");
    const endpointBase = data.type === "anime" ? "animes" : "mangas";
    const id = data.id.split("-")[1];
    const endpoint = `http://localhost:3000/${endpointBase}/${id}`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // add token here
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

        {/* Form Inputs */}
        {["title", "chapters", "genre", "image", "rating", "watch"].map(
          (field) => (
            <div key={field} className="mb-4">
              <label
                htmlFor={field}
                className="block text-white mb-2 capitalize"
              >
                {field}
              </label>
              <input
                id={field}
                type={
                  field === "image"
                    ? "url"
                    : field === "rating"
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
                {...(field === "rating" && { min: 0, max: 10, step: 0.1 })}
              />
            </div>
          )
        )}

        {/* Type & Status Select */}
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

        <div className="mb-6">
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
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
            <option value="dropped">Dropped</option>
            <option value="on-hold">On Hold</option>
          </select>
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
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
