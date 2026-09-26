import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/discovery"
            aria-label="AniMon home"
            className="group flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 shadow-lg shadow-purple-500/20 transition-transform group-hover:scale-105">
              <BookOpen className="h-5 w-5 text-white" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </span>
            <span>
              <span className="block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-xl font-black tracking-tight text-transparent">
                AniMon
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600 xl:block">
                Track · Discover · Belong
              </span>
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden md:block">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-2">
            <NotificationBell />
            <div className="hidden md:block">
              <UserMenu />
            </div>
            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/35 to-transparent" />
    </header>
  );
}
