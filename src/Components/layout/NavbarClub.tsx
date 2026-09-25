import React from "react";
import Navbar from "./Navbar";
import { Plus } from "lucide-react";

interface NavbarClubProps {
  onOpenModal?: () => void;
}

export default function NavbarClub({ onOpenModal }: NavbarClubProps) {
  return (
    <div>
      <Navbar />
      {onOpenModal && (
        <div className="bg-slate-900/40 border-b border-slate-800/40 py-2.5 px-6">
          <div className="max-w-6xl mx-auto flex justify-end">
            <button
              onClick={onOpenModal}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-purple-500/25"
            >
              <Plus className="w-4 h-4" />
              Create Circle / Club
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
