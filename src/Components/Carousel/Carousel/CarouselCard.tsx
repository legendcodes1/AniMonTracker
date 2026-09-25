// components/MainPage/Carousel/CarouselCard.tsx
import React from "react";
import { Plus, Star, Heart } from "lucide-react";

interface AnimeItem {
  id: number;
  title: string;
  type: "anime" | "manga";
  rating: number;
  image: string;
  status: "ongoing" | "completed" | "upcoming";
  description: string;
}

interface CarouselCardProps {
  item: AnimeItem;
  library: AnimeItem[];
  onSelect: (item: AnimeItem) => void;
  onAddToLibrary: (item: AnimeItem) => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  library,
  onSelect,
  onAddToLibrary,
}) => {
  const isInLibrary = library.some((libItem) => libItem.id === item.id);

  return (
    <div
      className="relative w-80 h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/20 cursor-pointer"
      onClick={() => onSelect(item)}
      style={{
        background:
          "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute top-4 right-4 z-20">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === "ongoing"
              ? "bg-green-500/20 text-green-300"
              : item.status === "upcoming"
              ? "bg-blue-500/20 text-blue-300"
              : "bg-gray-500/20 text-gray-300"
          }`}
        >
          {item.status.toUpperCase()}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              item.type === "anime"
                ? "bg-purple-500/20 text-purple-300"
                : "bg-pink-500/20 text-pink-300"
            }`}
          >
            {item.type.toUpperCase()}
          </span>
          <span className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4" fill="currentColor" />
            {item.rating}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToLibrary(item);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isInLibrary
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            {isInLibrary ? "Added" : "Add to List"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            <Heart className="w-4 h-4" />
            <span>234</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
