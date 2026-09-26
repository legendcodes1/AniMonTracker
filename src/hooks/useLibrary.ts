import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthContext";
import { fetchMediaCollection } from "@/services/mediaService";
import type { MediaItem } from "@/types/library";

export function useLibrary() {
  const { user } = useAuth();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setItems(await fetchMediaCollection());
    } catch (cause) {
      console.error("Error fetching library:", cause);
      setError(cause instanceof Error ? cause.message : "Failed to fetch library");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchMediaCollection();
        if (active) setItems(data);
      } catch (cause) {
        console.error("Error fetching library:", cause);
        if (active) setError(cause instanceof Error ? cause.message : "Failed to fetch library");
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [user]);

  return { items, loading, error, refresh };
}
