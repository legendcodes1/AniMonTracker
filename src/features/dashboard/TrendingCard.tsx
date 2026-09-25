import React from "react";
import { Flame, Plus, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function TrendingCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-cover bg-center min-h-[420px] border border-white/10 shadow-2xl group transition-all duration-300 hover:border-purple-500/40"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 w-max">
          <Flame className="w-4 h-4 text-blue-400" />
          Trending Now
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
          Cyberpunk: <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Edgerunners</span>
        </h1>
        
        <p className="text-slate-300 text-sm md:text-base mt-3 max-w-xl line-clamp-3">
          In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw known as an edgerunner.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            to="/search"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" /> Explore Title
          </Link>
          <Link
            to="/mylibrary"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl border border-white/20 backdrop-blur-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add to Library
          </Link>
        </div>
      </div>
    </div>
  );
}
