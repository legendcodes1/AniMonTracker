import { useState, useEffect } from "react";
import { Plus, Settings, Vote, Users, MessageSquare, Trash2, UserPlus, Loader2, Heart, Send, MoreHorizontal, Calendar, MessageCircle, Sparkles, Leave, Crown } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ClubDetailPage() {
  const { id } = useParams();
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [checkingMembership, setCheckingMembership] = useState(true);
  const [joining, setJoining] = useState(false);
  const [activeTab, setActiveTab] = useState<"discussions" | "members" | "about">("discussions");
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const fetchClubDetails = async () => {
      const token = localStorage.getItem("supabase_token");
      const userId = localStorage.getItem("user_id");
      
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        setCurrentUserId(userId);
        
        const response = await fetch(`http://localhost:3000/api/clubs/${id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch club");
        const data = await response.json();
        const clubData = Array.isArray(data) ? data[0] : data;
        setClub(clubData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching club");
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id]);

  useEffect(() => {
    const checkMembership = async () => {
      const token = localStorage.getItem("supabase_token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId || !id) {
        setCheckingMembership(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/clubs/${id}/members/${userId}`,
          {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
          },
        );

        if (response.ok) {
          const result = await response.json();
          setIsMember(result.isMember || false);
        }
      } catch (error) {
        console.error("Error checking membership:", error);
      } finally {
        setCheckingMembership(false);
      }
    };

    if (club) {
      checkMembership();
    }
  }, [club, id]);

  const handleJoinClub = async () => {
    const token = localStorage.getItem("supabase_token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      alert("Please login first!");
      return;
    }

    setJoining(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/clubs/${id}/members/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to join group: ${errorText}`);
      }

      setIsMember(true);
    } catch (error) {
      console.error("Error joining group:", error);
      alert(error instanceof Error ? error.message : "Failed to join group");
    } finally {
      setJoining(false);
    }
  };

  const handleLeaveClub = async () => {
    if (!confirm("Are you sure you want to leave this club?")) return;
    
    const token = localStorage.getItem("supabase_token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/clubs/${id}/members/${userId}`,
        {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` },
        },
      );

      if (response.ok) {
        setIsMember(false);
        window.location.href = "/clubs";
      }
    } catch (error) {
      console.error("Error leaving club:", error);
      alert("Failed to leave club");
    }
  };

  const handleCreatePost = () => {
    if (!postContent.trim()) return;
    alert("Post created! (Demo - API not connected)");
    setPostContent("");
  };

  if (loading) return <div className="min-h-screen bg-slate-900 p-10 text-white flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-500" /></div>;
  if (error) return <div className="min-h-screen bg-slate-900 p-10 text-red-500">{error}</div>;

  const isAdmin = club?.creator_id === currentUserId;
  
  const mockDiscussions = [
    { id: 1, user: "AnimeFan92", avatar: "A", title: "What's your favorite arc in this series?", replies: 24, likes: 45, time: "2h ago" },
    { id: 2, user: "MangaReader", avatar: "M", title: "Chapter 150 discussion thread", replies: 56, likes: 89, time: "5h ago" },
    { id: 3, user: "OtakuKing", avatar: "O", title: "Weekly predictions - who will win?", replies: 12, likes: 23, time: "1d ago" },
    { id: 4, user: "NostalgiaUser", avatar: "N", title: "This series got me into anime!", replies: 8, likes: 15, time: "2d ago" },
  ];

  const mockMembers = [
    { id: 1, name: club?.creator_id || "Admin", role: "Admin", avatar: "A", joined: "Jan 2024", online: true },
    { id: 2, name: "AnimeFan92", role: "Moderator", avatar: "F", joined: "Feb 2024", online: true },
    { id: 3, name: "MangaReader", role: "Member", avatar: "M", joined: "Mar 2024", online: false },
    { id: 4, name: "OtakuKing", role: "Member", avatar: "O", joined: "Apr 2024", online: true },
    { id: 5, name: "NostalgiaUser", role: "Member", avatar: "N", joined: "May 2024", online: false },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Hero Header with gradient */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900/80 to-pink-900/40" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        </div>
        <img 
          src={club.group_avatar_url || "https://via.placeholder.com/1200x400?text=Club+Banner"} 
          className="w-full h-full object-cover opacity-20" 
          alt="banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img src={club.group_avatar_url || "https://via.placeholder.com/96?text=Club"} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                    {club.name}
                    {isAdmin && <Crown className="w-6 h-6 text-yellow-400" />}
                  </h1>
                  <p className="text-slate-300 text-lg max-w-xl">
                    {club.description || "A tight-knit community for deep dives."}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {club.memberCount || 0} members</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Created Jan 2024</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                {isAdmin ? (
                  <>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-500/20">
                      <Settings size={18} /> Manage
                    </button>
                    <button className="bg-slate-700/80 hover:bg-slate-600 px-5 py-2.5 rounded-xl font-bold transition-all">
                      Edit
                    </button>
                  </>
                ) : checkingMembership ? (
                  <button disabled className="bg-slate-700 px-8 py-3 rounded-xl font-bold flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Checking...
                  </button>
                ) : isMember ? (
                  <div className="flex gap-2">
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-500/20">
                      <MessageCircle size={18} />
                      Post
                    </button>
                    <button 
                      onClick={handleLeaveClub}
                      className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 px-4 py-3 rounded-xl font-bold text-red-400 flex items-center gap-2 transition-all"
                    >
                      <Leave size={18} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleJoinClub}
                    disabled={joining}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-70"
                  >
                    {joining ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                    {joining ? "Joining..." : "Join Club"}
                  </button>
                )}
                <Link to="/clubs" className="bg-slate-700/80 hover:bg-slate-600 px-5 py-3 rounded-xl font-bold transition-all">
                  Clubs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: "discussions", label: "Discussions", icon: MessageSquare },
            { id: "members", label: "Members", icon: Users },
            { id: "about", label: "About", icon: Sparkles },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "discussions" && (
              <>
                {/* Create Post (Members Only) */}
                {isMember && !isAdmin && (
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-white/5">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shrink-0">
                        {currentUserId?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          placeholder="Start a discussion..."
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
                          rows={2}
                        />
                        <div className="flex justify-end mt-3">
                          <button 
                            onClick={handleCreatePost}
                            disabled={!postContent.trim()}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Create Discussion (Admin Only) */}
                {isAdmin && (
                  <button className="w-full group border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-2xl p-6 flex items-center justify-center gap-3 hover:bg-purple-500/5 transition-all">
                    <div className="bg-purple-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                      <Plus size={24} />
                    </div>
                    <span className="text-lg font-medium text-slate-300 group-hover:text-white">Create New Discussion</span>
                  </button>
                )}

                {/* Discussion Cards */}
                <div className="space-y-4">
                  {mockDiscussions.map((discussion) => (
                    <div key={discussion.id} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-5 border border-white/5 hover:border-purple-500/20 hover:bg-slate-800/60 transition-all cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-lg font-bold text-slate-300 shrink-0">
                          {discussion.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-lg mb-1">{discussion.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-slate-400">
                            <span className="font-medium text-purple-400">{discussion.user}</span>
                            <span>•</span>
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
                        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-pink-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          {discussion.likes}
                        </button>
                        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          {discussion.replies} replies
                        </button>
                        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-purple-400 transition-colors ml-auto">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "members" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockMembers.map((member) => (
                  <div key={member.id} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-5 border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white">
                          {member.avatar}
                        </div>
                        {member.online && (
                          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white flex items-center gap-2">
                          {member.name}
                          {member.role === "Admin" && <Crown className="w-4 h-4 text-yellow-400" />}
                          {member.role === "Moderator" && <Settings className="w-4 h-4 text-blue-400" />}
                        </h4>
                        <p className="text-sm text-slate-400">{member.role}</p>
                        <p className="text-xs text-slate-500 mt-1">Joined {member.joined}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  About This Club
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {club.description || "Welcome to our community! This is a place for fans to discuss, share, and connect over our shared interests. Feel free to participate in discussions and meet new friends!"}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                    <p className="text-slate-400 text-sm mb-1">Total Members</p>
                    <p className="text-2xl font-bold text-white">{club.memberCount || 0}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                    <p className="text-slate-400 text-sm mb-1">Discussions</p>
                    <p className="text-2xl font-bold text-white">{mockDiscussions.length}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Recent Members
              </h3>
              <div className="space-y-3">
                {mockMembers.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center gap-3 group">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                        {member.avatar}
                      </div>
                      {member.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isMember && !isAdmin && (
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/20">
                <h3 className="font-bold text-lg mb-2">Join this Club</h3>
                <p className="text-slate-400 text-sm mb-4">Connect with {club.memberCount || 0} members and participate in discussions!</p>
                <button 
                  onClick={handleJoinClub}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}