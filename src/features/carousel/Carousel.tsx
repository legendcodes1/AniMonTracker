import React from "react";
import { Item } from "../../types/item";
import CarouselCard from "./CarouselCard";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface CarouselProps {
  items: Item[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  library: Item[];
  onSelect: (item: Item) => void;
  onAddToLibrary: (item: Item) => void;
}

export default function Carousel({
  items,
  currentSlide,
  setCurrentSlide,
  library,
  onSelect,
  onAddToLibrary,
}: CarouselProps) {
  const visibleCount = 4;
  const maxSlide = Math.max(0, items.length - visibleCount);

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
  };

  return (
    <div className="relative mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">
            Seasonal Highlights & Releases
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlide}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.slice(currentSlide, currentSlide + visibleCount).map((item) => (
          <CarouselCard
            key={item.id}
            item={item}
            onSelect={onSelect}
            onAddToLibrary={onAddToLibrary}
            isInLibrary={library.some((l) => l.id === item.id)}
          />
        ))}
      </div>
    </div>
  );
}
