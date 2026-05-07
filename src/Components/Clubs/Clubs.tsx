import { useEffect, useState } from "react";
import NavbarClub from "../Navbar/NavbarClub";
import ClubCard from "./ClubCard";
import ClubSearch from "./ClubSearch";
import ClubModal from "../Modal/ClubModal";
import DemographicCard from "./DemographicCard";
import Loading from "../Common/Loading";
import { Swords, Skull, Heart, Smile, Sparkles, Users, ArrowRight, Plus } from "lucide-react";

export default function Clubs() {
  const [currentClubs, setCurrentClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchClubData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("supabase_token");
      const response = await fetch("http://localhost:3000/api/clubs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("failed to fetch clubs");
      }

      const data = await response.json();
      setCurrentClubs(data);
    } catch (error) {
      console.log("Error fetching clubs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900 to-pink-900/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        
        <NavbarClub onOpenModal={() => setModalOpen(true)}/>
        
        <div className="max-w-6xl mx-auto mt-8 px-6 relative z-10">
          {/* Hero Header */}
          <div className="relative rounded-3xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-blue-600/30" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200')] bg-cover bg-center opacity-10" />
            <div className="relative z-10 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Discover Communities
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                  Anime Clubs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Circles</span>
                </h1>
                <p className="text-slate-300 text-lg max-w-xl">
                  Find your tribe. Join circles of passionate fans and dive deep into your favorite series together.
                </p>
                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold text-white">{currentClubs.length}</span> clubs active
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Heart className="w-5 h-5 text-pink-400" />
                    <span className="font-semibold text-white">2.4k</span> members
                  </div>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="shrink-0 px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Club
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-10">
            <ClubSearch />
          </div>

          {/* Featured Clubs */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                Featured Clubs
              </h2>
              <button className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <Loading variant="spinner" size="lg" />
              </div>
            ) : currentClubs.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-white/5">
                <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No clubs yet</p>
                <p className="text-slate-500 text-sm mt-1">Be the first to create a club!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentClubs.slice(0, 6).map((club) => (
                  <ClubCard
                    key={club.id}
                    id={club.id}
                    title={club.name}
                    description={club.description}
                    image={club.group_avatar_url}
                    badge={club.memberCount}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Browse by Demographics */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
              Browse by Genre
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DemographicCard
                icon={<Swords size={28} />}
                name="Shonen"
                number="2.4k"
                bg="bg-blue-500/20"
                iconColor="text-blue-400"
              />
              <DemographicCard
                icon={<Skull size={28} />}
                name="Seinen"
                number="1.8k"
                bg="bg-purple-500/20"
                iconColor="text-purple-400"
              />
              <DemographicCard
                icon={<Heart size={28} />}
                name="Shojo"
                number="1.1k"
                bg="bg-pink-500/20"
                iconColor="text-pink-400"
              />
              <DemographicCard
                icon={<Smile size={28} />}
                name="Josei"
                number="640"
                bg="bg-amber-500/20"
                iconColor="text-amber-400"
              />
            </div>
          </div>

          {/* Popular Clubs Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <span className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full" />
              Popular This Week
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "One Piece Fans", members: 890, trend: "+12%" },
                { name: "Naruto Legacy", members: 756, trend: "+8%" },
                { name: "Attack on Titan", members: 623, trend: "+15%" },
                { name: "Manga Readers", members: 512, trend: "+5%" },
              ].map((club, i) => (
                <div key={i} className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-purple-500/30 hover:bg-slate-800/60 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center text-lg">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{club.name}</h4>
                      <p className="text-xs text-slate-400">{club.members} members</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">{club.trend} this week</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ClubModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRefresh={fetchClubData}
      />
    </div>
  );
}
