import React from "react";
import { Item } from "../../types/item";
import { Star, Plus, Check } from "lucide-react";

interface CarouselCardProps {
  item: Item;
  onSelect: (item: Item) => void;
  onAddToLibrary: (item: Item) => void;
  isInLibrary: boolean;
}

export default function CarouselCard({
  item,
  onSelect,
  onAddToLibrary,
  isInLibrary,
}: CarouselCardProps) {
  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative rounded-2xl overflow-hidden bg-slate-800/40 border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        
        {item.rating && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-yellow-400 text-[11px] font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400" />
            {item.rating}
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate" title={item.title}>
            {item.title}
          </h4>
          <p className="text-xs text-slate-400 truncate mt-0.5 capitalize">{item.type}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToLibrary(item);
          }}
          disabled={isInLibrary}
          className={`mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            isInLibrary
              ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
              : "bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40"
          }`}
        >
          {isInLibrary ? (
            <>
              <Check className="w-3.5 h-3.5" /> In Library
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" /> Add
            </>
          )}
        </button>
      </div>
    </div>
  );
}
