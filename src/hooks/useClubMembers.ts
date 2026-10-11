import { useCallback, useEffect, useState } from "react";
import { fetchClubMembers } from "@/services/clubService";
import type { ClubMember } from "@/services/clubService";

export function useClubMembers(clubId: string | undefined, enabled = true) {
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled || !clubId) {
      setMembers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMembers(await fetchClubMembers(clubId));
    } catch (cause) {
      console.error("Error fetching club members:", cause);
      setError(
        cause instanceof Error ? cause.message : "Failed to fetch club members",
      );
    } finally {
      setLoading(false);
    }
  }, [clubId, enabled]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { members, loading, error, refresh };
}
