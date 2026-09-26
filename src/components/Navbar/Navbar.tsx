import { BookOpen, Bell, MessageSquare, CircleUserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";

interface NavbarProps {
  actions?: ReactNode;
  showClubs?: boolean;
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-lg transition-colors ${
    isActive ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
  }`;

export default function Navbar({ actions, showClubs = true }: NavbarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AniMon
            </h1>
          </div>
          <nav className="flex items-center gap-6">
            <NavLink to="/discovery" className={navClass}>
              Home
            </NavLink>
            <NavLink to="/mylibrary" className={navClass}>
              My Library
            </NavLink>
            <NavLink to="/search" className={navClass}>
              Discovery
            </NavLink>
            {showClubs && (
              <NavLink to="/clubs" className={navClass}>
                Clubs
              </NavLink>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </nav>
          <div className="flex justify-between gap-3">
            {actions ?? (
              <>
                <div>
                  <button type="button" aria-label="Notifications">
                    <Bell />
                  </button>
                </div>
                <div>
                  <button type="button" aria-label="Messages">
                    <MessageSquare />
                  </button>
                </div>
                <div>
                  <Link to="/profile">
                    <CircleUserRound />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
