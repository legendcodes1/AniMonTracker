import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselCard from "./CarouselCard";

interface AnimeItem {
  id: number;
  title: string;
  type: "anime" | "manga";
  rating: number;
  image: string;
  status: "ongoing" | "completed" | "upcoming";
  description: string;
}

interface CarouselProps {
  items: AnimeItem[];
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  library: AnimeItem[];
  onSelect: (item: AnimeItem) => void;
  onAddToLibrary: (item: AnimeItem) => void;
  itemsPerSlide?: number; // default 4
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  currentSlide,
  setCurrentSlide,
  library,
  onSelect,
  onAddToLibrary,
  itemsPerSlide = 4,
}) => {
  const totalSlides =
    items.length > 0 ? Math.ceil(items.length / itemsPerSlide) : 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const getCurrentItems = () => {
    const start = currentSlide * itemsPerSlide;
    return items.slice(start, start + itemsPerSlide);
  };

  return (
    <div className="mb-12 mt-10">
      {/* Header + Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            New Releases
          </h2>
          <p className="text-slate-400 text-lg">
            Discover the latest anime and manga
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-slate-400 text-sm">
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={nextSlide}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="relative overflow-hidden">
        <div className="flex gap-8 transition-transform duration-500">
          {getCurrentItems().map((item) => (
            <CarouselCard
              key={item.id}
              item={item}
              library={library}
              onSelect={onSelect}
              onAddToLibrary={onAddToLibrary}
            />
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-purple-400" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
