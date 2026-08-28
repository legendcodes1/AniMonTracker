import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Loading from "../../components/common/Loading";
import AchievementBadge, {
  deriveAchievements,
  calculateUserStats,
} from "./AchievementBadge";
import { useAuth } from "../../context/AuthContext";
import { fetchMediaCollection } from "../../services/mediaService";
import { getClubs } from "../../services/clubService";
import { MediaItem } from "../../types/library";
import { Club } from "../../types/club";
import {
  Trophy,
  Sparkles,
  BookOpen,
  Users,
  Tv,
  Book,
  CheckCircle2,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [collection, setCollection] = useState<MediaItem[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const [libData, clubData] = await Promise.all([
          fetchMediaCollection(),
          getClubs(),
        ]);
        setCollection(libData);
        setClubs(clubData);
      } catch (err) {
        console.error("Error loading profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const stats = calculateUserStats(collection);
  const achievements = deriveAchievements({
    totalAnime: stats.totalAnime,
    totalManga: stats.totalManga,
    completed: stats.completed,
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const recentLibrary = collection.slice(0, 6);
  const username = profile?.username || user?.user_metadata?.username || user?.email?.split("@")[0] || "Anime Fan";

  const xpProgressPercent = Math.min(
    Math.round(((stats.xp % 100) / 100) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
        {/* Profile Card Hero */}
        <div className="relative mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-slate-900/80 to-pink-900/40 border border-purple-500/20 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-purple-500/40">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-yellow-500 text-slate-950 font-black text-xs shadow-md">
                Lv. {stats.level}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-black text-white">{username}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {stats.rankTitle}
                </span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm">
                Member of AniMon • {stats.totalEntries} entries tracking
              </p>

              {/* XP Bar */}
              <div className="mt-3 max-w-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-1">
                  <span>Level Progress</span>
                  <span>{stats.xp} Total XP</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/mylibrary"
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
            >
              Open Vault
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold">Anime Series</p>
              <p className="text-2xl font-black text-white">{stats.totalAnime}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold">Manga Volumes</p>
              <p className="text-2xl font-black text-white">{stats.totalManga}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold">Completed</p>
              <p className="text-2xl font-black text-white">{stats.completed}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold">Badges Unlocked</p>
              <p className="text-2xl font-black text-white">
                {unlockedCount}/{achievements.length}
              </p>
            </div>
          </div>
        </div>

        {/* Gamified Achievements Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Achievements & Badges</h2>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {unlockedCount} of {achievements.length} Claimed
            </span>
          </div>

          {loading ? (
            <Loading size="md" text="Loading achievements..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </div>
          )}
        </section>

        {/* Recent Library Grid */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Recent Vault Entries</h2>
            </div>
            <Link to="/mylibrary" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentLibrary.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 text-center text-slate-400 text-sm">
              Nothing in your library yet. <Link to="/search" className="text-purple-400 underline">Add titles</Link> to get started!
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {recentLibrary.map((item) => (
                <Link
                  key={item.id}
                  to="/mylibrary"
                  className="group rounded-xl overflow-hidden bg-slate-900/60 border border-white/5 hover:border-purple-500/40 transition-all flex flex-col"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <p className="text-[11px] font-bold text-slate-300 p-2 truncate">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Joined Clubs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-400" />
              <h2 className="text-xl font-bold text-white">My Circles & Clubs</h2>
            </div>
            <Link to="/clubs" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {clubs.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 text-center text-slate-400 text-sm">
              You haven't joined any clubs yet. <Link to="/clubs" className="text-purple-400 underline">Explore circles</Link>!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {clubs.slice(0, 3).map((club) => (
                <Link
                  key={club.id}
                  to={`/clubs/${club.id}`}
                  className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-purple-500/40 transition-all flex items-center gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {club.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{club.name}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{club.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
