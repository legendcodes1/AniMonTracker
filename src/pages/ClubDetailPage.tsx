import { useState, useEffect } from "react";
import { Plus, Settings, Vote, Users, MessageSquare, Trash2, UserPlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ClubDetailPage() {
  const { id } = useParams();
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      const token = localStorage.getItem("supabase_token");
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        // You'll need an endpoint to get the current user ID to determine Admin status
        // For now, let's assume it comes from your auth logic
        const response = await fetch(`http://localhost:3000/api/clubs/${id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch club");
        const data = await response.json();
        const clubData = Array.isArray(data) ? data[0] : data;
        setClub(clubData);
        
        // Mocking user ID check - replace with your actual auth user ID
        setCurrentUserId("user_123"); 
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching club");
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0f172a] p-10 text-white">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#0f172a] p-10 text-red-500">{error}</div>;

  const isAdmin = club.creator_id === currentUserId; // Change creator_id to match your DB column

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      {/* --- HERO HEADER --- */}
      <div className="relative h-[350px] w-full overflow-hidden">
        <img 
          src={club.group_avatar_url} 
          className="w-full h-full object-cover opacity-40 blur-sm scale-105" 
          alt="banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent" />
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6">
          <h1 className="text-5xl font-bold mb-2 tracking-tight">{club.name}</h1>
          <p className="text-gray-300 max-w-2xl text-lg mb-6">
            {isAdmin ? "Admin view: " : ""}{club.description || "A tight-knit community for deep dives."}
          </p>
          
          <div className="flex gap-4">
            {isAdmin ? (
              <>
                <button className="bg-[#22c55e] hover:bg-[#16a34a] px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all">
                  <Settings size={20} /> Manage Circle
                </button>
                <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] px-6 py-2.5 rounded-lg font-bold transition-all">
                  Edit Details
                </button>
                <button className="bg-[#3b82f6] hover:bg-[#2563eb] px-6 py-2.5 rounded-lg font-bold transition-all">
                  Invite Members
                </button>
              </>
            ) : (
              <div className=""> 
              <button className="bg-[#3b82f6] hover:bg-[#2563eb] px-10 py-3 rounded-lg font-bold text-lg shadow-lg shadow-blue-500/20 transition-all">
                Join Circle
              </button>

              <Link to="/clubs" className="bg-[#3b82f6] hover:bg-[#2563eb] px-10 py-3 rounded-lg font-bold text-lg shadow-lg shadow-blue-500/20 transition-all ml-5"> View Clubs</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Feed & Discussions */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4">
            {isAdmin ? "Active Discussions & Polls" : "Club Activity Feed"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Create Discussion Card (Admin Only) */}
            {isAdmin && (
              <button className="group border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-purple-500 hover:bg-purple-500/5 transition-all">
                <div className="bg-purple-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Plus size={32} />
                </div>
                <span className="text-lg font-medium text-slate-300 group-hover:text-white">+ Create Voting Discussion</span>
              </button>
            )}

            {/* Voting Card Example */}
            <div className="bg-[#1a1f2e] border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="avatar" />
                </div>
                <div>
                  <p className="text-sm font-bold">MangaSage</p>
                  <p className="text-xs text-slate-400">Poll Status: Which 2024 OP is best?</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Bling-Bang-Bang-Born</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[65%]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Tensei</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-[25%]" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 text-slate-400 text-sm border-t border-slate-800 pt-4">
                <span className="flex items-center gap-1"><Vote size={16} /> 24 Likes</span>
                <span className="flex items-center gap-1"><MessageSquare size={16} /> 15 Comments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#161b26] rounded-2xl p-6 border border-slate-800">
            <h3 className="text-xl font-bold mb-6 flex justify-between items-center">
              {isAdmin ? "Members & Roles" : "Members & Info"}
            </h3>
            
            <div className="space-y-4">
              {/* Member Row */}
              {[1, 2, 3, 4].map((m) => (
                <div key={m} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m}`} 
                      className="w-10 h-10 rounded-full bg-slate-800" 
                      alt="user"
                    />
                    <div>
                      <p className="text-sm font-medium">User_{m}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{m === 1 ? "Admin" : "Member"}</p>
                    </div>
                  </div>
                  
                  {isAdmin && m !== 1 && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Promote" className="text-slate-500 hover:text-blue-400"><UserPlus size={16} /></button>
                      <button title="Kick" className="text-slate-500 hover:text-red-400"><Trash2 size={16} /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-semibold transition-all">
              {isAdmin ? "Creator Tools" : "Rules & Guidelines"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}