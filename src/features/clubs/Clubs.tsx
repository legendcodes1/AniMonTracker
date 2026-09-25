import React, { useEffect, useState } from "react";
import NavbarClub from "../../components/layout/NavbarClub";
import ClubCard from "./ClubCard";
import { ClubHeader, ClubSearch, DemographicCard } from "./ClubHeader";
import ClubModal from "./ClubModal";
import Loading from "../../components/common/Loading";
import { getClubs } from "../../services/clubService";
import { Club } from "../../types/club";

const defaultClubs: Club[] = [
  {
    id: "shonen-elite",
    name: "Shonen Elite",
    description: "The premier circle for fans of high-stakes battle anime, power scaling discussions, and weekly manga release hype.",
    badge: 142,
  },
  {
    id: "slice-of-life",
    name: "Cozy Anime Lounge",
    description: "Relaxing vibes only. We share recommendations for wholesome romance, iyashikei, and heartwarming seasonal shows.",
    badge: 98,
  },
  {
    id: "manga-theorists",
    name: "Manga Chapter Theorists",
    description: "Spoilers allowed! Deep dives, narrative analysis, and character breakdowns for ongoing weekly manga.",
    badge: 215,
  },
  {
    id: "retro-classics",
    name: "90s & 2000s Retro Gems",
    description: "Celebrating legendary anime classics like Cowboy Bebop, Evangelion, Trigun, and Yu Yu Hakusho.",
    badge: 76,
  },
];

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>(defaultClubs);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const loadClubs = async () => {
    try {
      setLoading(true);
      const data = await getClubs();
      if (data && data.length > 0) {
        setClubs(data);
      }
    } catch (error) {
      console.warn("Using fallback clubs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClubs();
  }, []);

  const filteredClubs = clubs.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavbarClub onOpenModal={() => setModalOpen(true)} />

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
        <ClubHeader totalClubs={clubs.length} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <DemographicCard
            title="All Circles"
            icon="🌐"
            active={selectedTag === "all"}
            onClick={() => setSelectedTag("all")}
          />
          <DemographicCard
            title="Shonen & Action"
            icon="⚔️"
            active={selectedTag === "shonen"}
            onClick={() => setSelectedTag("shonen")}
          />
          <DemographicCard
            title="Slice of Life"
            icon="☕"
            active={selectedTag === "sol"}
            onClick={() => setSelectedTag("sol")}
          />
          <DemographicCard
            title="Manga Theories"
            icon="📖"
            active={selectedTag === "manga"}
            onClick={() => setSelectedTag("manga")}
          />
        </div>

        <ClubSearch query={searchQuery} onChange={setSearchQuery} />

        {loading ? (
          <div className="py-20">
            <Loading size="lg" text="Loading anime circles..." />
          </div>
        ) : filteredClubs.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-white/5">
            <p className="text-slate-400 text-sm">No circles found matching your search.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
            >
              Create This Circle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard
                key={club.id}
                id={club.id}
                title={club.name}
                description={club.description}
                badge={club.badge || club.member_count || 10}
                image={club.group_avatar_url || club.image}
              />
            ))}
          </div>
        )}
      </main>

      <ClubModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRefresh={loadClubs}
      />
    </div>
  );
}
