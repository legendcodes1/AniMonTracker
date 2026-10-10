import { Star } from "lucide-react";
import type { DiscoveryAnime } from "@/types/kitsu";

export default function RecommendationsCard({
  anime,
}: {
  anime: DiscoveryAnime;
}) {
  const year = anime.startDate?.slice(0, 4);

  return (
    <a
      href={`https://kitsu.app/anime/${anime.slug}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${anime.title} on Kitsu`}
      className="group block w-[170px] shrink-0 snap-start focus-visible:outline-none sm:w-[205px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 shadow-xl shadow-black/20 transition duration-300 group-hover:-translate-y-1 group-hover:border-purple-400/40 group-focus-visible:ring-2 group-focus-visible:ring-purple-400">
        {anime.posterImage ? (
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={anime.posterImage}
            alt={`${anime.title} poster`}
            loading="lazy"
            onError={(event) => event.currentTarget.remove()}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-5 text-center text-sm font-semibold text-slate-400">
            Poster unavailable
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent" />
        {anime.rating !== null && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-slate-950/85 px-2.5 py-1 text-xs font-bold text-amber-200 backdrop-blur">
            <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
            {anime.rating.toFixed(1)}
          </span>
        )}
      </div>
      <h3 className="mt-3 line-clamp-1 font-bold text-white transition-colors group-hover:text-purple-300">
        {anime.title}
      </h3>
      <p className="mt-1 text-sm capitalize text-slate-400">
        {[
          anime.subtype,
          year,
          anime.episodeCount && `${anime.episodeCount} eps`,
        ]
          .filter(Boolean)
          .join(" · ") || anime.status}
      </p>
    </a>
  );
}
