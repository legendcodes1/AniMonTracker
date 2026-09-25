import React from "react";
import { Item } from "../../types/item";
import { X, Star, Plus, Check } from "lucide-react";

interface ItemModalProps {
  item: Item | null;
  isInLibrary: boolean;
  onClose: () => void;
  onAddToLibrary: (item: Item) => void;
}

export default function ItemModal({
  item,
  isInLibrary,
  onClose,
  onAddToLibrary,
}: ItemModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={item.image}
            alt={item.title}
            className="w-full sm:w-44 h-60 object-cover rounded-2xl shadow-xl shrink-0"
          />

          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {item.type}
                </span>
                {item.rating && (
                  <span className="flex items-center gap-1 text-xs font-bold text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    {item.rating}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
              <p className="text-xs text-slate-300 line-clamp-4 leading-relaxed">
                {item.description || "No description available."}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => onAddToLibrary(item)}
                disabled={isInLibrary}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  isInLibrary
                    ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25"
                }`}
              >
                {isInLibrary ? (
                  <>
                    <Check className="w-4 h-4" /> In Your Library
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to Library
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
