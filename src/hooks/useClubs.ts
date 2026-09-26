import { useCallback, useEffect, useState } from "react";
import { fetchClubs } from "@/services/clubService";
import type { Club } from "@/services/clubService";

export interface UseClubsResult {
  clubs: Club[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useClubs(): UseClubsResult {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setClubs(await fetchClubs());
    } catch (cause) {
      console.error("Error fetching clubs", cause);
      setError(cause instanceof Error ? cause.message : "Failed to fetch clubs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchClubs();
        if (active) setClubs(data);
      } catch (cause) {
        console.error("Error fetching clubs", cause);
        if (active) setError(cause instanceof Error ? cause.message : "Failed to fetch clubs");
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  return { clubs, loading, error, refresh };
}
