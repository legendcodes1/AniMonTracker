import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthContext";
import { checkMembership, joinClub, leaveClub } from "@/services/clubService";

export function useClubMembership(clubId: string | undefined, enabled = true) {
  const { user } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const [checking, setChecking] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!enabled || !clubId || !user) {
        if (active) {
          setIsMember(false);
          setChecking(false);
        }
        return;
      }

      try {
        setChecking(true);
        const result = await checkMembership(clubId, user.id);
        if (active) setIsMember(result.isMember);
      } catch (error) {
        console.error("Error checking membership:", error);
        if (active) setIsMember(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [clubId, enabled, user]);

  const join = useCallback(async () => {
    if (!clubId || !user) {
      throw new Error("Please login first!");
    }

    setJoining(true);
    try {
      await joinClub(clubId, user.id);
      setIsMember(true);
    } finally {
      setJoining(false);
    }
  }, [clubId, user]);

  const leave = useCallback(async () => {
    if (!clubId || !user) {
      throw new Error("Not authenticated");
    }
    await leaveClub(clubId, user.id);
    setIsMember(false);
  }, [clubId, user]);

  return { isMember, checking, joining, join, leave };
}
