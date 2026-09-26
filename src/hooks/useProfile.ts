import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthContext";
import { fetchUserClubs } from "@/services/clubService";
import type { Club } from "@/services/clubService";

export function useProfile() {
  const { user, profile } = useAuth();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!user) {
        setClubs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchUserClubs(user.id);
        if (active) setClubs(data);
      } catch (cause) {
        console.error("Error fetching profile:", cause);
        if (active)
          setError(
            cause instanceof Error ? cause.message : "Failed to fetch profile",
          );
      } finally {
        if (active) setLoading(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [user]);

  return {
    username: profile?.username ?? "",
    clubs,
    loading,
    error,
  };
}
