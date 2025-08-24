import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import Navbar from "../Components/Navbar/Navbar.jsx";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([]);

  const popularSearches = [
    "Attack on Titan",
    "Demon Slayer",
    "One Piece",
    "Naruto",
    "My Hero Academia",
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      let type = "anime";
      if (filter === "manga") type = "manga";

      // Kitsu search API call
      const res = await fetch(
        `https://kitsu.io/api/edge/${type}?filter[text]=${query}`
      );

      if (!res.ok) throw new Error("Failed to fetch results");

      const data = await res.json();
      console.log("Kitsu Results:", data.data);

      setResults(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="mt-10">
        <div className="relative max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discover Anime & Manga
          </h1>
          <p className="text-xl text-slate-300 text-center mb-12">
            Search through thousands of titles and track your favorites
          </p>

          {/* Enhanced Search Bar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-2 border border-slate-600/50">
              <div className="flex items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search anime and manga..."
                    className="w-full bg-transparent text-white pl-12 pr-10 py-4 rounded-xl focus:outline-none text-lg placeholder-slate-400"
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`mx-2 px-4 py-4 rounded-xl transition-all duration-200 ${
                    showFilters
                      ? "bg-purple-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  <Filter className="w-5 h-5" />
                </button>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!query.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed"
                >
                  Search
                </button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 p-4 bg-slate-700/50 rounded-xl border-t border-slate-600/50">
                  <div className="flex flex-wrap gap-3">
                    {["all", "anime", "manga"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFilter(option)}
                        className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                          filter === option
                            ? "bg-purple-600 text-white"
                            : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl text-white mb-4">Search Results</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-800 rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={
                        item.attributes.posterImage?.small ||
                        "https://via.placeholder.com/150"
                      }
                      alt={
                        item.attributes.titles.en ||
                        item.attributes.slug ||
                        "No title"
                      }
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="text-white font-semibold text-sm">
                        {item.attributes.titles.en ||
                          item.attributes.slug ||
                          "No title"}
                      </h3>
                      <p className="text-slate-400 text-xs capitalize">
                        {item.type} | {item.attributes.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
