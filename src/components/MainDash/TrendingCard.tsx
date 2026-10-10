import { CalendarDays, ExternalLink, Flame, Star } from "lucide-react";
import type { DiscoveryAnime } from "@/types/kitsu";

interface TrendingCardProps {
  anime: DiscoveryAnime | null;
  loading: boolean;
}

export default function TrendingCard({ anime, loading }: TrendingCardProps) {
  if (loading) {
    return (
      <div className="min-h-[420px] animate-pulse rounded-3xl border border-white/10 bg-slate-800/80" />
    );
  }

  if (!anime) return null;

  const backgroundImage = anime.coverImage || anime.posterImage;
  const year = anime.startDate?.slice(0, 4);

  return (
    <section
      className="relative isolate min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/40 sm:min-h-[500px]"
      aria-labelledby="trending-title"
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => event.currentTarget.remove()}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[420px] max-w-3xl flex-col justify-end p-6 sm:min-h-[500px] sm:p-10 lg:p-12">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
          <Flame className="h-5 w-5" />
          Trending now
        </div>
        <h1
          id="trending-title"
          className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl"
        >
          {anime.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-slate-200">
          {anime.rating !== null && (
            <span className="flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5">
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              {anime.rating.toFixed(1)}
            </span>
          )}
          {year && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5">
              <CalendarDays className="h-4 w-4" /> {year}
            </span>
          )}
          {anime.subtype && (
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 uppercase">
              {anime.subtype}
            </span>
          )}
        </div>
        <p className="mt-5 line-clamp-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
          {anime.synopsis}
        </p>
        <div className="mt-7">
          <a
            href={`https://kitsu.app/anime/${anime.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 font-bold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
          >
            View on Kitsu <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
