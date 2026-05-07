import React from "react";
import { MediaItem } from "../../types/Library";
import { Star, Clock, CheckCircle, PlayCircle, Tv, Book, Play, MoreVertical, Trash2, Edit } from "lucide-react";

interface Props {
  item: MediaItem;
  onClick: () => void;
}

const getStatusIcon = (status: MediaItem["status"]) => {
  switch (status) {
    case "watching":
      return <Clock className="w-3.5 h-3.5" />;
    case "completed":
      return <CheckCircle className="w-3.5 h-3.5" />;
    case "plan_to_watch":
      return <PlayCircle className="w-3.5 h-3.5" />;
    case "dropped":
      return <PlayCircle className="w-3.5 h-3.5" />;
  }
};

const getStatusColor = (status: MediaItem["status"]) => {
  switch (status) {
    case "watching":
      return "from-blue-500/30 to-blue-600/20 text-blue-300 border-blue-500/30";
    case "completed":
      return "from-green-500/30 to-green-600/20 text-green-300 border-green-500/30";
    case "plan_to_watch":
      return "from-yellow-500/30 to-yellow-600/20 text-yellow-300 border-yellow-500/30";
    case "dropped":
      return "from-red-500/30 to-red-600/20 text-red-300 border-red-500/30";
  }
};

const getStatusBg = (status: MediaItem["status"]) => {
  switch (status) {
    case "watching": return "bg-blue-500";
    case "completed": return "bg-green-500";
    case "plan_to_watch": return "bg-yellow-500";
    case "dropped": return "bg-red-500";
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case "watching": return "Watching";
    case "completed": return "Completed";
    case "plan_to_watch": return "Plan to Watch";
    case "dropped": return "Dropped";
    default: return status;
  }
};

const LibraryCard: React.FC<Props> = ({ item, onClick }) => {
  const isAnime = item.type === "anime";
  const total = isAnime ? (item.episodes || 0) : (item.chapters || 0);
  const current = isAnime ? (item.currentEpisode || 0) : (item.currentChapter || 0);
  const progressPercent = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <div
      onClick={onClick}
      className="group relative bg-slate-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md ${
            isAnime 
              ? "bg-blue-500/80 text-white" 
              : "bg-pink-500/80 text-white"
          }`}>
            {isAnime ? <Tv className="w-3 h-3" /> : <Book className="w-3 h-3" />}
            {item.type}
          </span>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-bold">{item.rating?.toFixed(1) || "0.0"}</span>
        </div>
        
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border bg-gradient-to-br ${getStatusColor(item.status)}`}>
            {getStatusIcon(item.status)}
            {formatStatus(item.status)}
          </span>
        </div>
        
        {/* Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>
        
        {/* Progress Bar */}
        {item.status !== "plan_to_watch" && total > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
            <div 
              className={`h-full ${getStatusBg(item.status)} transition-all duration-500`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-4 relative">
        <h4 className="font-bold text-white text-base mb-2 truncate group-hover:text-purple-300 transition-colors">
          {item.title}
        </h4>
        
        {item.status !== "plan_to_watch" && total > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full ${getStatusBg(item.status)} rounded-full transition-all duration-500`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-slate-400 shrink-0">
              {current}/{total}
            </span>
          </div>
        )}
        
        {item.notes && (
          <p className="text-slate-400 text-xs line-clamp-2 mb-2">{item.notes}</p>
        )}
        
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-white/5">
          <span>{isAnime ? `${item.episodes || 0} eps` : `${item.chapters || 0} chs`}</span>
          <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to edit
          </span>
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;
