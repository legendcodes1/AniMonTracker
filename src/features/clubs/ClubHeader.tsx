import React from "react";
import { Sparkles, Users, Heart } from "lucide-react";

interface ClubHeaderProps {
  totalClubs: number;
}

export function ClubHeader({ totalClubs }: ClubHeaderProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-8 border border-purple-500/20 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-slate-900/80 to-pink-900/40" />
      <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Anime Circles & Hubs
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
            Find Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Anime Tribe</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-lg">
            Join circles of passionate fans, discuss weekly theories, and participate in community watch parties.
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2.5 text-slate-400">
            <Users className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-xs text-slate-400">Active Circles</p>
              <p className="font-bold text-white text-base">{totalClubs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClubSearch({
  query,
  onChange,
}: {
  query: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Filter clubs by title or genre..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-3.5 bg-slate-900/80 border border-slate-700/80 focus:border-purple-500 rounded-2xl text-white text-sm outline-none shadow-inner"
      />
    </div>
  );
}

export function DemographicCard({
  title,
  icon,
  active,
  onClick,
}: {
  title: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
        active
          ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30"
          : "bg-slate-900/60 border-white/5 text-slate-300 hover:bg-slate-800 hover:border-purple-500/30"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-bold">{title}</span>
    </button>
  );
}
