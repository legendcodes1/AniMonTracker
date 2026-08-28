import React from "react";
import { Plus, Check, Star } from "lucide-react";

interface RecommendationsCardProps {
  id?: string;
  imgurl: string;
  title: string;
  genre?: string;
  episode?: number | string;
  rating?: string | number;
  onAdd?: () => void;
  isAdded?: boolean;
}

export default function RecommendationsCard({
  imgurl,
  title,
  genre = "Anime",
  episode,
  rating,
  onAdd,
  isAdded = false,
}: RecommendationsCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-slate-800/40 border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={imgurl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        
        {rating && (
          <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-yellow-400 text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400" />
            {rating}
          </div>
        )}

        {episode && (
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-purple-600/80 backdrop-blur-sm text-white text-[11px] font-semibold">
            {episode} Ep
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate" title={title}>
            {title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 truncate">{genre}</p>
        </div>

        {onAdd && (
          <button
            onClick={onAdd}
            disabled={isAdded}
            className={`mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              isAdded
                ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                : "bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> In Library
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
