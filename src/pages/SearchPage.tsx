import { useState } from "react";
import { Search, Filter, X, Plus, Check } from "lucide-react";
import Navbar from "../Components/Navbar/Navbar";
import { searchAnimeOrManga } from "../services/kitsuService";
import { addToLibrary } from "../services/libraryService";
import { SearchResult } from "../types/kitsu";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<'anime' | 'manga'>("anime");
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      const data = await searchAnimeOrManga(query, filter);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLibrary = async (item: SearchResult) => {
    try {
      await addToLibrary({
        animeId: item.id,
        animeTitle: item.title,
        type: item.type,
        status: 'plan_to_watch',
        animePoster: item.image,
        totalEpisodes: item.episodes,
        totalChapters: item.chapters,
      });

      // Mark as added
      setAddedItems(prev => new Set(prev).add(item.id));
      
      // Show success message (you can use a toast library here)
      alert(`Added "${item.title}" to your library!`);
    } catch (err) {
      console.error('Error adding to library:', err);
      alert('Failed to add to library. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError(null);
  };

  return (
    <>
      <Navbar />

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

                <button
                  onClick={handleSearch}
                  disabled={!query.trim() || loading}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="mt-4 p-4 bg-slate-700/50 rounded-xl border-t border-slate-600/50">
                  <div className="flex flex-wrap gap-3">
                    {(['anime', 'manga'] as const).map((option) => (
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

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl text-white mb-4">
                Search Results ({results.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group relative"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                      />
                      
                      {/* Add to Library Button */}
                      <button
                        onClick={() => handleAddToLibrary(item)}
                        disabled={addedItems.has(item.id)}
                        className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                          addedItems.has(item.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-black/60 hover:bg-purple-600 text-white opacity-0 group-hover:opacity-100'
                        }`}
                        title={addedItems.has(item.id) ? 'Added to library' : 'Add to library'}
                      >
                        {addedItems.has(item.id) ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    <div className="p-3">
                      <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs capitalize mb-1">
                        {item.type} | {item.status}
                      </p>
                      {item.rating && (
                        <p className="text-yellow-400 text-xs">
                          ⭐ {item.rating}
                        </p>
                      )}
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