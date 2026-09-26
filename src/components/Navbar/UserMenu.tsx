import { useRef, useState } from "react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDismissable } from "@/hooks/useDismissable";
import { useAuth } from "@/providers/AuthContext";
import { useGamification } from "@/providers/GamificationContext";
import LevelProgress from "@/components/Gamification/LevelProgress";

const menuId = "user-menu";

export default function UserMenu() {
  const navigate = useNavigate();
  const { profile, user, signOut } = useAuth();
  const { stats } = useGamification();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useDismissable<HTMLDivElement>(
    open,
    () => setOpen(false),
    triggerRef,
  );
  const username = profile?.username || user?.email?.split("@")[0] || "Otaku";

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    navigate("/");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 pr-2.5 text-left transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
      >
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt=""
            className="h-8 w-8 rounded-lg object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
            {username.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="hidden max-w-28 truncate text-sm font-medium text-slate-200 lg:block">
          {username}
        </span>
        <span className="hidden rounded-md bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-bold text-purple-300 xl:block">
          LV {stats.level}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <div className="border-b border-white/10 px-3 py-3">
            <p className="truncate font-semibold text-white">{username}</p>
            <p className="mt-0.5 truncate text-xs text-slate-500">
              {profile?.email || user?.email}
            </p>
          </div>
          <div className="border-b border-white/10 p-2">
            <LevelProgress stats={stats} compact />
          </div>
          <div className="py-2">
            <Link
              to="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <UserRound className="h-4 w-4 text-purple-400" />
              View profile
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
