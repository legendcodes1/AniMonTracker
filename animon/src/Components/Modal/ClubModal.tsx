import { useState } from "react";
import { supabase } from "../../supabaseClient";
interface ClubFormData {
  name: string;
  description: string;
  avatarUrl: string;
}

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export default function ClubModal({ isOpen, onClose, onRefresh }: ClubModalProps) {
  const [formData, setFormData] = useState<ClubFormData>({
    name: "",
    description: "",
    avatarUrl: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("supabase_token");
      const userId = localStorage.getItem("user_id");
  
      if (!token || !userId) throw new Error("Not authenticated");

      const requestBody = {
        name: formData.name,
        description: formData.description,
        group_avatar_url: formData.avatarUrl,
        userId: userId,
        createdBy: userId,
      };

  
      const response = await fetch("http://localhost:3000/api/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create group: ${errorText}`);
      }

      const data = await response.json();
      console.log("Group created:", data);

      setFormData({
        name: "",
        description: "",
        avatarUrl: "",
      });

      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error creating a group:", error);
      alert(error instanceof Error ? error.message : "Failed to create group");
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
          Create New Club
        </h2>

        {/* Club Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-white mb-2">
            Club Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="Enter club name"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="Describe your club..."
            required
          />
        </div>

        {/* Avatar URL */}
        <div className="mb-6">
          <label htmlFor="avatarUrl" className="block text-white mb-2">
            Club Image URL (Optional)
          </label>
          <input
            id="avatarUrl"
            type="url"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:border-purple-500 focus:outline-none transition"
            placeholder="https://..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.description}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Club
          </button>
        </div>
      </div>
    </div>
  );
}