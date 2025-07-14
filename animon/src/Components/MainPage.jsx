import React, { useState } from "react";
import {
  Plus,
  Star,
  BookOpen,
  Play,
  MessageCircle,
  Search,
  Filter,
  Heart,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
export default function MainPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [library, setLibrary] = useState([]);

  // Sample data for new releases
  const newReleases = [
    {
      id: 1,
      title: "Demon Slayer: Infinity Castle",
      type: "anime",
      rating: 9.2,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      status: "ongoing",
      description: "The most anticipated arc of Demon Slayer finally animated.",
    },
    {
      id: 2,
      title: "Chainsaw Man: Part 2",
      type: "manga",
      rating: 8.9,
      image:
        "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=400&fit=crop",
      status: "ongoing",
      description: "Denji returns in this highly anticipated sequel.",
    },
    {
      id: 3,
      title: "Jujutsu Kaisen: Season 3",
      type: "anime",
      rating: 9.1,
      image:
        "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=300&h=400&fit=crop",
      status: "upcoming",
      description: "The Culling Game arc brings new challenges.",
    },
    {
      id: 4,
      title: "Attack on Titan: Final Season",
      type: "anime",
      rating: 9.5,
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop",
      status: "completed",
      description: "The epic conclusion to the legendary series.",
    },
    {
      id: 5,
      title: "One Piece: Gear 5",
      type: "manga",
      rating: 9.8,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      status: "ongoing",
      description: "Luffy's most powerful transformation yet.",
    },
    {
      id: 6,
      title: "My Hero Academia: Final War",
      type: "anime",
      rating: 8.7,
      image:
        "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=300&h=400&fit=crop",
      status: "ongoing",
      description: "Heroes face their greatest challenge.",
    },
  ];

  const addToLibrary = (item) => {
    if (!library.find((libItem) => libItem.id === item.id)) {
      setLibrary([...library, item]);
    }
  };

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(newReleases.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentItems = () => {
    const start = currentSlide * itemsPerSlide;
    return newReleases.slice(start, start + itemsPerSlide);
  };

  const CarouselCard = ({ item }) => (
    <div
      className="relative w-80 h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/20 cursor-pointer"
      onClick={() => setSelectedItem(item)}
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

      {/* Status indicator */}
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
              addToLibrary(item);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              library.find((libItem) => libItem.id === item.id)
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            {library.find((libItem) => libItem.id === item.id)
              ? "Added"
              : "Add to List"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            <Heart className="w-4 h-4" />
            <span>234</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Modal for item details
  const ItemModal = ({ item, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
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

          <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
          <p className="text-slate-300 mb-6">{item.description}</p>

          <div className="flex gap-3">
            <button
              onClick={() => addToLibrary(item)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                library.find((libItem) => libItem.id === item.id)
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              <Plus className="w-5 h-5" />
              {library.find((libItem) => libItem.id === item.id)
                ? "Added to Library"
                : "Add to Library"}
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
              <Play className="w-5 h-5" />
              {item.type === "anime" ? "Watch Now" : "Read Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <Welcome />

        <div className="mb-12 mt-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                New Releases
              </h2>
              <p className="text-slate-400">
                Discover the latest anime and manga
              </p>
            </div>

            {/* Carousel Navigation */}
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

          {/* Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex gap-8 transition-transform duration-500">
              {getCurrentItems().map((item) => (
                <CarouselCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Slide indicators */}
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

        {/* Library Preview */}
        {library.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              My Library ({library.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {library.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 rounded-lg p-4 flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
