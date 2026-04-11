import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="relative mt-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl p-8 border border-purple-500/20 overflow-hidden max-w-5xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse" />
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
          Welcome Back, Otaku! 🌸
        </h2>
        <p className=" text-lg mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Ready to discover amazing new anime and manga? Your journey continues
          here!
        </p>
        <div className="flex gap-4">
          <Link
            to="/search"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
          >
            Discover New Titles
          </Link>
          <Link
            to="/mylibrary"
            className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-xl font-medium transition-all duration-300 border border-slate-600 hover:border-purple-500"
          >
            View My Library
          </Link>
        </div>
      </div>
    </div>
  );
}
