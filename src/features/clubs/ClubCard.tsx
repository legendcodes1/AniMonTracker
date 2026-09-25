import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { checkClubMembership, joinClub, leaveClub } from "../../services/clubService";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { Users, ArrowRight, UserPlus, Check, Loader2 } from "lucide-react";

interface ClubCardProps {
  id: string;
  image?: string;
  badge?: number | string;
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
  const { user } = useAuth();
  const { showToast, triggerAchievement } = useNotifications();
  const navigate = useNavigate();

  const [isMember, setIsMember] = useState(false);
  const [checkingMembership, setCheckingMembership] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!user) {
      setCheckingMembership(false);
      return;
    }

    checkClubMembership(id, user.id)
      .then((member) => setIsMember(member))
      .finally(() => setCheckingMembership(false));
  }, [id, user]);

  const handleJoinToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setJoining(true);
      if (isMember) {
        await leaveClub(id, user.id);
        setIsMember(false);
        showToast({
          title: "Left Circle",
          message: `You left "${title}".`,
          type: "info",
        });
      } else {
        await joinClub(id, user.id);
        setIsMember(true);
        showToast({
          title: "Joined Circle! 🎉",
          message: `Welcome to "${title}"!`,
          type: "success",
        });
        triggerAchievement("Socialite", `Joined the "${title}" circle`, "🤝", 25);
      }
    } catch (error) {
      console.error("Membership toggle failed:", error);
      // Fallback local toggle
      setIsMember(!isMember);
    } finally {
      setJoining(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/clubs/${id}`)}
      className="group relative rounded-3xl bg-slate-900/60 border border-white/5 hover:border-purple-500/40 p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/25 shrink-0 overflow-hidden">
            {image ? (
              <img src={image} alt={title} className="w-full h-full object-cover" />
            ) : (
              title.charAt(0)
            )}
          </div>

          <button
            onClick={handleJoinToggle}
            disabled={joining || checkingMembership}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isMember
                ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-red-500/20 hover:text-red-400"
                : "bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40"
            }`}
          >
            {joining ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : isMember ? (
              <>
                <Check className="w-3.5 h-3.5" /> Member
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5" /> Join Circle
              </>
            )}
          </button>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-semibold">
          <Users className="w-4 h-4 text-purple-400" />
          {badge ? `${badge} members` : "Active Circle"}
        </span>
        <span className="text-purple-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Enter Hub <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
