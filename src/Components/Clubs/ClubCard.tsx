import { useState, useEffect } from "react";
import Loading from "../Common/Loading";
import { Link, useNavigate } from "react-router-dom";
interface ClubCardProps {
  id: string;          
  image: string;
  badge: number | string;
  title: string;
  description: string;
}

export default function ClubCard({ id, image, badge, title, description }: ClubCardProps) {
  const [isMember, setIsMember] = useState(false); 
  const [checkingMembership, setCheckingMembership] = useState(true);
  const [joining, setJoining] = useState(false);   
  const navigate = useNavigate();
  // Check if the user is already a member
  useEffect(() => {
    const checkMembership = async () => {
      const token = localStorage.getItem("supabase_token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId) {
        setCheckingMembership(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/clubs/${id}/members`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch members");
        const members = await response.json();

        if (members.some((member: any) => member.userId === userId)) {
          setIsMember(true);
        }
      } catch (error) {
        console.error("Error checking membership:", error);
      } finally {
        setCheckingMembership(false);
      }
    };

    checkMembership();
  }, [id]);

  // Handle joining the group
  const handleJoinClub = async () => {
    const token = localStorage.getItem("supabase_token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      alert("Please login first!");
      return;
    }

    setJoining(true);
    try {
      const response = await fetch(`http://localhost:3000/api/clubs/${id}/members/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to join group: ${errorText}`);
      }

      setIsMember(true); // Update UI immediately
      alert(`Successfully joined ${title}!`);
    } catch (error) {
      console.error("Error joining group:", error);
      alert(error instanceof Error ? error.message : "Failed to join group");
    } finally {
      setJoining(false);
    }
  };
const handleViewClub = () => {
  navigate(`/clubs/${id}`);
};
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:shadow-xl transition-shadow" onClick={handleViewClub}>
      <div className="relative">
        <img className="w-full h-40 object-cover" src={image} alt={title} />
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
          {badge}
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-600" />
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-500" />
          </div>
          {checkingMembership ? (
            <Loading variant="skeleton" size="sm" className="w-24 h-9" />
          ) : (
            <button
              className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold transition-colors
                ${isMember ? 'bg-green-500/20 text-green-500 cursor-not-allowed' : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-500'}
                ${joining ? 'opacity-70 cursor-wait' : ''}`}
              onClick={handleJoinClub}
              disabled={isMember || joining}
            >
              {isMember ? "✓ Joined" : joining ? "Joining..." : "Join Circle"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}