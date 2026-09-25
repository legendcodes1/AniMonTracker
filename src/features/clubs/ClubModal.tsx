import React, { useState } from "react";
import { createClub } from "../../services/clubService";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { X, Users, Sparkles, Loader2 } from "lucide-react";

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export default function ClubModal({ isOpen, onClose, onRefresh }: ClubModalProps) {
  const { user } = useAuth();
  const { showToast, triggerAchievement } = useNotifications();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatarUrl: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSubmitting(true);
      await createClub({
        name: formData.name,
        description: formData.description,
        group_avatar_url: formData.avatarUrl,
        created_by: user.id,
      });

      showToast({
        title: "Club Created! 🎉",
        message: `"${formData.name}" is now active!`,
        type: "success",
      });

      triggerAchievement("Founder", "Created a new anime circle", "👑", 50);

      onRefresh();
      onClose();
    } catch (error) {
      console.error("Failed to create club:", error);
      showToast({
        title: "Error",
        message: "Failed to create club. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-400" />
          Create a New Circle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Circle / Club Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Jujutsu Kaisen Theorists"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Description & Purpose
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="What series will this circle discuss? What are the rules?"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Avatar / Icon URL
            </label>
            <input
              type="url"
              name="avatarUrl"
              placeholder="https://..."
              value={formData.avatarUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Circle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
