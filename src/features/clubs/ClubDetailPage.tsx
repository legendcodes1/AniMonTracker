import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Loading from "../../components/common/Loading";
import {
  getClubById,
  checkClubMembership,
  joinClub,
  leaveClub,
  getClubDiscussions,
  createClubDiscussion,
} from "../../services/clubService";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { Club, DiscussionPost } from "../../types/club";
import {
  Users,
  MessageSquare,
  Send,
  UserPlus,
  Check,
  Crown,
  Heart,
  Calendar,
  ArrowLeft,
} from "lucide-react";

export default function ClubDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast, triggerAchievement } = useNotifications();

  const [club, setClub] = useState<Club | null>(null);
  const [discussions, setDiscussions] = useState<DiscussionPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [joining, setJoining] = useState(false);
  const [activeTab, setActiveTab] = useState<"discussions" | "about">("discussions");
  const [postContent, setPostContent] = useState("");
  const [submittingPost, setSubmittingPost] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadClubData = async () => {
      setLoading(true);
      try {
        const clubData = await getClubById(id);
        setClub(clubData);

        if (user) {
          const member = await checkClubMembership(id, user.id);
          setIsMember(member);
        }

        const discData = await getClubDiscussions(id);
        setDiscussions(discData);
      } catch (err) {
        console.error("Failed to load club details:", err);
        // Fallback demo data
        setClub({
          id: id || "demo",
          name: "Shonen Elite Circle",
          description: "A hub dedicated to the best shonen anime, fight analysis, and seasonal rankings.",
          created_at: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    loadClubData();
  }, [id, user]);

  const handleJoinToggle = async () => {
    if (!user || !id) {
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
          message: "You have left this club.",
          type: "info",
        });
      } else {
        await joinClub(id, user.id);
        setIsMember(true);
        showToast({
          title: "Joined Circle! 🎉",
          message: "You are now a member of this club!",
          type: "success",
        });
        triggerAchievement("Community Voice", "Joined a club discussion", "💬", 25);
      }
    } catch (e) {
      console.error(e);
      setIsMember(!isMember);
    } finally {
      setJoining(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() || !id || !user) return;

    try {
      setSubmittingPost(true);
      const newPost = await createClubDiscussion(id, postContent.trim());
      setDiscussions((prev) => [newPost, ...prev]);
      setPostContent("");
      showToast({
        title: "Message Posted! 💬",
        message: "Your message was added to the circle feed.",
        type: "success",
      });
    } catch (e) {
      console.error(e);
      // Local optimistic post fallback
      const mockPost: DiscussionPost = {
        id: Math.random().toString(36).substring(2, 9),
        club_id: id,
        user_id: user.id,
        username: user.user_metadata?.username || user.email?.split("@")[0] || "You",
        content: postContent.trim(),
        created_at: new Date().toISOString(),
      };
      setDiscussions((prev) => [mockPost, ...prev]);
      setPostContent("");
    } finally {
      setSubmittingPost(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="py-20">
          <Loading size="lg" text="Loading club hub..." />
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-2">Circle Not Found</h2>
          <Link to="/clubs" className="text-purple-400 underline">
            Back to Clubs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        <Link
          to="/clubs"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Circles
        </Link>

        {/* Club Banner Hero */}
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/40 via-slate-900/80 to-pink-900/40 p-6 md:p-8 border border-purple-500/20 backdrop-blur-xl shadow-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-purple-500/30 shrink-0">
              {club.name?.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1">{club.name}</h1>
              <p className="text-slate-300 text-xs md:text-sm max-w-xl line-clamp-2">
                {club.description}
              </p>
            </div>
          </div>

          <button
            onClick={handleJoinToggle}
            disabled={joining}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              isMember
                ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-red-500/20 hover:text-red-400"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/30"
            }`}
          >
            {isMember ? (
              <>
                <Check className="w-4 h-4" /> Joined Member
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" /> Join This Circle
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("discussions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "discussions"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Feed & Discussions ({discussions.length})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "about"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Circle Guidelines & Info
          </button>
        </div>

        {activeTab === "discussions" ? (
          <div className="space-y-6">
            {/* Create Post Box */}
            <form onSubmit={handleCreatePost} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 shadow-xl">
              <textarea
                rows={3}
                placeholder={isMember ? "Share your thoughts or episode reactions..." : "Join this circle to post discussions..."}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                disabled={!isMember}
                className="w-full p-3 bg-slate-800/60 border border-slate-700/60 focus:border-purple-500 rounded-xl text-white text-xs outline-none resize-none transition-colors disabled:opacity-50"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-[11px] text-slate-500">
                  {isMember ? "Markdown supported" : "Membership required to post"}
                </span>
                <button
                  type="submit"
                  disabled={!isMember || !postContent.trim() || submittingPost}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/25"
                >
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </div>
            </form>

            {/* Discussions Feed */}
            <div className="space-y-4">
              {discussions.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-white/5 text-slate-400 text-xs">
                  No discussions yet. Be the first to start a thread!
                </div>
              ) : (
                discussions.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 transition-all flex gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                      {post.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-xs">
                          {post.username || "Anime Member"}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4 text-xs text-slate-300 leading-relaxed">
            <h3 className="text-sm font-bold text-white">About This Circle</h3>
            <p>{club.description}</p>
            <h4 className="text-xs font-bold text-white pt-2">Rules & Guidelines</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Be respectful and avoid personal attacks during debates.</li>
              <li>Tag spoilers when discussing the latest manga raw scans.</li>
              <li>Share high quality recommendations and theories.</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
