import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Compass, BookOpen } from "lucide-react";

export default function Welcome() {
  return (
    <div className="relative mt-8 mb-8 bg-gradient-to-r from-purple-900/30 via-slate-800/40 to-pink-900/30 rounded-3xl p-8 border border-purple-500/20 backdrop-blur-md overflow-hidden max-w-5xl mx-auto shadow-2xl">
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          AniMon Discovery Hub
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-white bg-clip-text text-transparent">
          Welcome Back, Otaku! 🌸
        </h2>
        <p className="text-slate-300 text-base md:text-lg mb-6 max-w-2xl">
          Ready to track your favorite anime, read manga, join circles, and unlock rare badges?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/search"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
          >
            <Compass className="w-5 h-5" />
            Discover New Titles
          </Link>
          <Link
            to="/mylibrary"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-xl font-bold transition-all duration-300 border border-slate-600/60 hover:border-purple-400"
          >
            <BookOpen className="w-5 h-5 text-pink-400" />
            View My Library
          </Link>
        </div>
      </div>
    </div>
  );
}
