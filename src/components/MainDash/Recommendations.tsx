import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DiscoveryAnime } from "@/types/kitsu";
import RecommendationsCard from "./RecommendationsCard";

interface RecommendationsProps {
  anime: DiscoveryAnime[];
  loading: boolean;
}

export default function Recommendations({
  anime,
  loading,
}: RecommendationsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({
      left: direction * Math.min(carouselRef.current.clientWidth * 0.8, 720),
      behavior: "smooth",
    });
  };

  return (
    <section aria-labelledby="new-anime-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
            Fresh this season
          </p>
          <h2
            id="new-anime-heading"
            className="mt-1 text-2xl font-black text-white sm:text-3xl"
          >
            New anime
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Show previous anime"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-purple-400/50 hover:bg-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Show more anime"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-purple-400/50 hover:bg-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="w-[170px] shrink-0 sm:w-[205px]"
                aria-hidden="true"
              >
                <div className="aspect-[2/3] animate-pulse rounded-2xl bg-slate-800" />
                <div className="mt-3 h-5 w-4/5 animate-pulse rounded bg-slate-800" />
                <div className="mt-2 h-4 w-3/5 animate-pulse rounded bg-slate-800" />
              </div>
            ))
          : anime.map((item) => (
              <RecommendationsCard key={item.id} anime={item} />
            ))}
      </div>

      {!loading && anime.length === 0 && (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
          No currently airing anime were returned.
        </p>
      )}
    </section>
  );
}
