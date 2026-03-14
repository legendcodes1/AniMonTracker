import React from "react";
import { MediaItem } from "../../types/MediaItem";
import { Star, Clock, CheckCircle, PlayCircle, Tv, Book } from "lucide-react";

interface Props {
  item: MediaItem;
  onClick: () => void;
}

const getStatusIcon = (status: MediaItem["status"]) => {
  switch (status) {
    case "ongoing":
      return <Clock className="w-4 h-4 text-blue-400" />;
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case "upcoming":
      return <PlayCircle className="w-4 h-4 text-yellow-400" />;
  }
};

const getStatusColor = (status: MediaItem["status"]) => {
  switch (status) {
    case "ongoing":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "completed":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "upcoming":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }
};

const LibraryCard: React.FC<Props> = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 border border-slate-700/50"
  >
    <div className="flex gap-4 mb-4">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-28 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
        <p className="text-slate-400 text-sm mb-2 flex items-center gap-1">
          {item.type === "anime" ? (
            <Tv className="w-3 h-3" />
          ) : (
            <Book className="w-3 h-3" />
          )}
          {item.type}
        </p>
        <div className="flex justify-between items-center gap-2 mb-2">
          <div>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">{item.rating}</span>
          </div>
          <button className="px-2 py-1 rounded-full border bg-orange-500/20 text-orange-400 border-orange-500/30">
            Watch Now
          </button>
        </div>
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            item.status
          )}`}
        >
          {getStatusIcon(item.status)}
          {item.status}
        </div>
      </div>
    </div>
    <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
    <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
      <span>{item.genre}</span>
      <span>
        {item.type === "anime"
          ? `${item.episodes ?? 0} episodes`
          : `${item.chapters ?? 0} chapters`}
      </span>
    </div>
  </div>
);

export default LibraryCard;
