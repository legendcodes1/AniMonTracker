import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ClubCard from "./ClubCard";
import ClubHeader from "./ClubHeader";
import ClubSearch from "./ClubSearch";
import ClubModal from "../Modal/ClubModal";
import DemographicCard from "./DemographicCard";
import Loading from "../Common/Loading";
import { Swords, Skull, Heart, Smile } from "lucide-react";

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
      console.log(data);
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
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10">
        <ClubHeader />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
        >
          + Create Club
        </button>
        <ClubSearch />
        <h2 className="text-2xl text-white p-2"> Featured Clubs</h2>
        <div className="grid grid-cols-3 mt-5 gap-5">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loading variant="spinner" size="lg" />
            </div>
          ) : currentClubs.length === 0 ? (
            <p className="text-slate-400"> No clubs currently</p>
          ) : (
            currentClubs
              .slice(0, 3)
              .map((club) => (
                <ClubCard
                  key={club.id}
                  id={club.id}
                  title={club.name}
                  description={club.description}
                  image={club.group_avatar_url}
                  badge={club.memberCount}
                />
              ))
          )}
        </div>
        <h2 className="text-2xl text-white p-2"> Browse by Demographics</h2>

        <div className="grid grid-cols-4 gap-3 mt-5">
          <DemographicCard
            icon={<Swords size={32} />}
            name="Shonen"
            number="2.4k"
            bg="bg-blue-500/20"
            iconColor="text-blue-500"
          />
          <DemographicCard
            icon={<Skull size={32} />}
            name="Seinen"
            number="1.8k"
            bg="bg-purple-500/20"
            iconColor="text-purple-500"
          />
          <DemographicCard
            icon={<Heart size={32} />}
            name="Shojo"
            number="1.1k"
            bg="bg-pink-500/20"
            iconColor="text-pink-500"
          />
          <DemographicCard
            icon={<Smile size={32} />}
            name="Josei"
            number="640"
            bg="bg-amber-500/20"
            iconColor="text-amber-500"
          />
        </div>
      </div>
      <ClubModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRefresh={fetchClubData}
      />
    </>
  );
}
