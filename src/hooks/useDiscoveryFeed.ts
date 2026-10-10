import { useCallback, useEffect, useState } from "react";
import { fetchDiscoveryFeed } from "@/services/kitsuService";
import type { DiscoveryFeed } from "@/types/kitsu";

const emptyFeed: DiscoveryFeed = { trending: [], newReleases: [] };

export function useDiscoveryFeed() {
  const [feed, setFeed] = useState<DiscoveryFeed>(emptyFeed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState(0);

  const retry = useCallback(() => setRequest((current) => current + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    const loadFeed = async () => {
      setLoading(true);
      setError(null);

      try {
        setFeed(await fetchDiscoveryFeed(controller.signal));
      } catch (cause) {
        if (controller.signal.aborted) return;
        setError(
          cause instanceof Error
            ? cause.message
            : "Unable to load anime right now.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void loadFeed();
    return () => controller.abort();
  }, [request]);

  return { feed, loading, error, retry };
}
