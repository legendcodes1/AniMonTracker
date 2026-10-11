import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/providers/AuthContext";
import { checkMembership, joinClub, leaveClub } from "@/services/clubService";

export function useClubMembership(clubId: string | undefined, enabled = true) {
  const { user } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const mutationInProgress = useRef(false);
  const membershipVersion = useRef(0);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!enabled || !clubId || !user) {
        if (active) {
          setIsMember(false);
          setCanJoin(false);
          setReason(null);
          setError(null);
          setChecking(false);
        }
        return;
      }

      try {
        setChecking(true);
        setError(null);
        const requestedVersion = membershipVersion.current;
        const result = await checkMembership(clubId, user.id);
        if (
          active &&
          !mutationInProgress.current &&
          requestedVersion === membershipVersion.current
        ) {
          setIsMember(result.isMember);
          setCanJoin(result.canJoin);
          setReason(result.reason ?? null);
        }
      } catch (error) {
        console.error("Error checking membership:", error);
        if (active) {
          setIsMember(false);
          setCanJoin(false);
          setReason(null);
          setError(
            error instanceof Error
              ? error.message
              : "Could not check club membership",
          );
        }
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
    if (mutationInProgress.current) return false;
    if (!canJoin) {
      throw new Error(reason || "You cannot join this club");
    }

    mutationInProgress.current = true;
    setJoining(true);
    setError(null);
    try {
      await joinClub(clubId, user.id);
      membershipVersion.current += 1;
      setIsMember(true);
      setCanJoin(false);
      setReason(null);
      return true;
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Failed to join club";
      setCanJoin(false);
      setReason(message);
      throw cause;
    } finally {
      mutationInProgress.current = false;
      setJoining(false);
    }
  }, [canJoin, clubId, reason, user]);

  const leave = useCallback(async () => {
    if (!clubId || !user) {
      throw new Error("Not authenticated");
    }
    if (mutationInProgress.current) return false;

    mutationInProgress.current = true;
    setLeaving(true);
    setError(null);
    try {
      await leaveClub(clubId, user.id);
      membershipVersion.current += 1;
      setIsMember(false);
      setCanJoin(true);
      return true;
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Failed to leave club";
      setError(message);
      throw cause;
    } finally {
      mutationInProgress.current = false;
      setLeaving(false);
    }
  }, [clubId, user]);

  return {
    isMember,
    canJoin,
    reason,
    error,
    checking,
    joining,
    leaving,
    join,
    leave,
  };
}
