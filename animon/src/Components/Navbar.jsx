import {
  Plus,
  Star,
  BookOpen,
  Play,
  MessageCircle,
  Search,
  Filter,
  Heart,
  Eye,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Library from "./Library";
import MainPage from "./MainPage";
export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");
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
            <Link
              onClick={() => setActiveTab("home")}
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "home"
                  ? "bg-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              onClick={() => setActiveTab("library")}
              to="/mylibrary"
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "library"
                  ? "bg-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              My Library
            </Link>
            <Link
              onClick={() => setActiveTab("search")}
              to="/search"
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "search"
                  ? "bg-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Search
            </Link>
            <Link className="text-slate-400 hover:text-white">Sign out</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
