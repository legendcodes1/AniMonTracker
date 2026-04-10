import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Loading from "../Components/Common/Loading";
// import ProfileStats from "../Components/Profile/ProfileStats";
import AchievementBadge, { deriveAchievements } from "../Components/Profile/AchievementBadge";
import { fetchMediaCollection } from "../services/mediaService";
import { MediaItem } from "../types/Library";

export default function ProfilePage() {
  const [collection, setCollection] = useState<MediaItem[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username") || "Otaku";
  const token = localStorage.getItem("supabase_token") || localStorage.getItem("token") || "";
  const userId = localStorage.getItem("user_id") || localStorage.getItem("userId") || "";

  useEffect(() => {
    const load = async () => {
      try {
        const [lib, clubRes] = await Promise.all([
          fetchMediaCollection(token),
          fetch(`http://localhost:3000/api/groups/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => (r.ok ? r.json() : [])),
        ]);
        setCollection(lib);
        setClubs(Array.isArray(clubRes) ? clubRes : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, userId]);

  const stats = {
    totalAnime: collection.filter((i: MediaItem) => i.type === "anime").length,
    totalManga: collection.filter((i: MediaItem) => i.type === "manga").length,
    completed: collection.filter((i: MediaItem) => i.status === "completed").length,
    watching: collection.filter((i: MediaItem) => i.status === "watching").length,
    avgRating:
      collection.length > 0
        ? collection.reduce((sum: number, i: MediaItem) => sum + (i.rating || 0), 0) / collection.length
        : 0,
  };

  const achievements = deriveAchievements(stats);
  const recentLibrary = collection.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{username}</h1>
            <p className="text-slate-400 text-sm mt-1">
              {stats.totalAnime + stats.totalManga} titles in library
            </p>
          </div>
        </div>

        {/* Stats */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Stats</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loading variant="spinner" size="lg" />
            </div>
          ) : (
            // <ProfileStats stats={stats} />
            <p> test</p>
          )}
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {achievements.map((a) => (
              <AchievementBadge key={a.id} achievement={a} />
            ))}
          </div>
        </section>

        {/* Library Snippet */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Library</h2>
            <Link to="/mylibrary" className="text-purple-400 hover:text-purple-300 text-sm">
              View all →
            </Link>
          </div>
          {recentLibrary.length === 0 ? (
            <p className="text-slate-400 text-sm">Nothing in your library yet.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {recentLibrary.map((item: MediaItem) => (
                <div key={item.id} className="rounded-lg overflow-hidden border border-slate-700/50 group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                  />
                  <p className="text-xs text-slate-300 p-1 truncate">{item.title}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Clubs Snippet */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">My Clubs</h2>
            <Link to="/clubs" className="text-purple-400 hover:text-purple-300 text-sm">
              View all →
            </Link>
          </div>
          {clubs.length === 0 ? (
            <p className="text-slate-400 text-sm">You haven't joined any clubs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {clubs.slice(0, 3).map((club: any) => (
                <Link
                  key={club.id}
                  to={`/clubs/${club.id}`}
                  className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {club.group_avatar_url ? (
                      <img src={club.group_avatar_url} alt={club.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    )}
                    <div>
                      <p className="text-white font-semibold text-sm">{club.name}</p>
                      <p className="text-slate-400 text-xs line-clamp-1">{club.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
