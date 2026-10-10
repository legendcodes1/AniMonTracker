import { RefreshCw } from "lucide-react";
import { useDiscoveryFeed } from "@/hooks/useDiscoveryFeed";
import TrendingCard from "./TrendingCard";
import CommunityCard from "./CommunityCard";
import ActiveClubs from "./ActiveClubs";
import Recommendations from "./Recommendations";

export default function Home() {
  const { feed, loading, error, retry } = useDiscoveryFeed();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950/95">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:py-10">
        <main className="min-w-0 space-y-10">
          {error ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-red-400/20 bg-red-400/5 p-8 text-center">
              <p className="text-lg font-bold text-white">
                Anime feed unavailable
              </p>
              <p className="mt-2 max-w-md text-sm text-slate-400">{error}</p>
              <button
                type="button"
                onClick={retry}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-slate-950 transition hover:bg-purple-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <RefreshCw className="h-4 w-4" /> Try again
              </button>
            </div>
          ) : (
            <TrendingCard anime={feed.trending[0] ?? null} loading={loading} />
          )}
          <Recommendations anime={feed.newReleases} loading={loading} />
        </main>
        <aside className="grid content-start gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <CommunityCard />
          <ActiveClubs />
        </aside>
      </div>
    </div>
  );
}
