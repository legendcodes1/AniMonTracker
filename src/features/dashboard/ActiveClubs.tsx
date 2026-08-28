import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Sparkles, ChevronRight } from "lucide-react";
import { getClubs } from "../../services/clubService";
import { Club } from "../../types/club";

const fallbackClubs: Partial<Club>[] = [
  {
    id: "shonen-elite",
    name: "Shonen Elite",
    description: "For fans of high-octane battles and power systems.",
    member_count: 142,
  },
  {
    id: "slice-of-life",
    name: "Cozy Anime Lounge",
    description: "Relaxing slice of life & romance discussions.",
    member_count: 98,
  },
  {
    id: "manga-readers",
    name: "Manga Theorists",
    description: "Spoilers allowed! Deep dives into latest weekly chapters.",
    member_count: 215,
  },
];

export default function ActiveClubs() {
  const [clubs, setClubs] = useState<Partial<Club>[]>(fallbackClubs);

  useEffect(() => {
    getClubs().then((data) => {
      if (data && data.length > 0) {
        setClubs(data.slice(0, 3));
      }
    }).catch(() => {
      // Use fallback
    });
  }, []);

  return (
    <div className="rounded-3xl bg-slate-900/80 p-6 border border-white/10 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Active Circles
          </h3>
        </div>
        <Link to="/clubs" className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {clubs.map((club) => (
          <Link
            key={club.id}
            to={`/clubs/${club.id}`}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 hover:border-purple-500/30 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md">
                {club.name?.charAt(0)}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                  {club.name}
                </h4>
                <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                  {club.description}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
