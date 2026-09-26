import { LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import { useGamification } from "@/providers/GamificationContext";
import LevelProgress from "@/components/Gamification/LevelProgress";
import NavLinks from "./NavLinks";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const navigate = useNavigate();
  const { profile, user, signOut } = useAuth();
  const { stats } = useGamification();
  const username = profile?.username || user?.email?.split("@")[0] || "Otaku";

  if (!open) return null;

  const handleSignOut = async () => {
    onClose();
    await signOut();
    navigate("/");
  };

  return (
    <div
      id="mobile-navigation"
      className="border-t border-white/10 px-4 pb-4 pt-3 md:hidden"
    >
      <NavLinks mobile onNavigate={onClose} />
      <div className="mt-3 border-t border-white/10 pt-3">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
            {username.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-white">
              {username}
            </span>
            <span className="block truncate text-xs text-slate-500">
              {profile?.email || user?.email}
            </span>
          </span>
          <UserRound className="h-4 w-4 text-slate-500" />
        </Link>
        <div className="px-1 py-2">
          <LevelProgress stats={stats} compact />
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
