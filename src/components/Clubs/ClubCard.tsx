import type { MouseEvent } from "react";
import Loading from "../Common/Loading";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, UserPlus, Check } from "lucide-react";
import { useClubMembership } from "@/hooks/useClubMembership";

interface ClubCardProps {
  id: string;
  image: string;
  badge: number | string;
  title: string;
  description: string;
}

export default function ClubCard({
  id,
  image,
  badge,
  title,
  description,
}: ClubCardProps) {
  const navigate = useNavigate();
  const { isMember, checking: checkingMembership, joining, join } = useClubMembership(id);

  const handleJoinClub = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await join();
    } catch (error) {
      console.error("Error joining group:", error);
      alert(error instanceof Error ? error.message : "Failed to join group");
    }
  };

  const handleCardClick = () => {
    navigate(`/clubs/${id}`);
  };

  const memberCount = typeof badge === 'number' ? badge : parseInt(badge) || 0;
  const activityLevel = memberCount > 50 ? "Active" : memberCount > 10 ? "Growing" : "New";

  return (
    <div
      className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-36 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={image || "https://via.placeholder.com/400x200?text=Club"} 
          alt={title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
            activityLevel === "Active" ? "bg-green-500/20 text-green-400" :
            activityLevel === "Growing" ? "bg-blue-500/20 text-blue-400" :
            "bg-slate-500/20 text-slate-300"
          }`}>
            <TrendingUp className="w-3 h-3 inline mr-1" />
            {activityLevel}
          </span>
        </div>
        
        <span className="absolute top-3 right-3 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1">
          <Users className="w-3 h-3" />
          {memberCount}
        </span>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-bold text-lg truncate pr-2">{title}</h3>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4 min-h-[40px]">
          {description || "Join this community to connect with fans!"}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full border-2 border-slate-800 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs text-slate-300"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            {memberCount > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-900 flex items-center justify-center text-xs text-slate-400">
                +{memberCount - 3}
              </div>
            )}
          </div>
          
          {checkingMembership ? (
            <Loading variant="skeleton" size="sm" className="w-24 h-9" />
          ) : (
            <button
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
                ${isMember 
                  ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                  : "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 hover:border-purple-500/40"
                }
                ${joining ? "opacity-70 cursor-wait" : ""}`}
              onClick={handleJoinClub}
              disabled={isMember || joining}
            >
              {isMember ? (
                <>
                  <Check className="w-4 h-4" />
                  Joined
                </>
              ) : joining ? (
                <>
                  <Loading variant="spinner" size="sm" className="w-4 h-4" />
                  Joining...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Join
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
