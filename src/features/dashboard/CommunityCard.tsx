import React from "react";
import { Users, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CommunityCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 to-purple-950/40 p-6 border border-purple-500/20 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Join the Community</h3>
          <p className="text-xs text-slate-400">Discuss episodes & theories</p>
        </div>
      </div>

      <p className="text-xs text-slate-300 mb-5 leading-relaxed">
        Connect with anime clubs, participate in weekly episode discussions, and vote on trending seasonal charts.
      </p>

      <Link
        to="/clubs"
        className="w-full py-2.5 px-4 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
      >
        Explore Circles <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
