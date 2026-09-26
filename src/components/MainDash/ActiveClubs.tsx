import { Plus } from "lucide-react";
import { useClubs } from "@/hooks/useClubs";

export default function ActiveClubs() {
  const { clubs: clubData, loading } = useClubs();

  return (
    <div className="bg-slate-800 rounded-2xl p-6 w-80">
      <h1 className="text-white font-bold mb-5">Active Clubs</h1>

      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : clubData.length === 0 ? (
          <p className="text-slate-400">Currently no Clubs have been created</p>
        ) : (
          clubData.slice(0, 3).map((club) => (
            <div key={club.id} className="flex justify-between items-center">
              <div className="flex-col">
                <h2 className="text-white font-bold">{club.name}</h2>
                <p className="text-slate-400 text-sm">
                  {club.memberCount > 0 
                    ? `${club.memberCount.toLocaleString()} Members` 
                    : 'No members yet'}
                </p>
              </div>
              <div className="border rounded-full bg-blue-500 hover:bg-blue-600 w-8 h-8 flex items-center justify-center cursor-pointer transition-colors">
                <Plus className="text-white" size={20} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}