import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { UserProfile } from "@/types/auth";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue } from "./AuthContext";

function fallbackProfile(user: User): UserProfile {
  return {
    id: user.id,
    username: user.user_metadata?.username || user.email?.split("@")[0] || "Otaku",
    email: user.email,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const tokenRef = useRef<string | null>(null);

  const fetchProfile = useCallback(async (currentUser: User) => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      setProfile(!error && data ? (data as UserProfile) : fallbackProfile(currentUser));
    } catch (error) {
      console.warn("Could not fetch user profile:", error);
      setProfile(fallbackProfile(currentUser));
    }
  }, []);

  const applySession = useCallback(
    (nextSession: Session | null) => {
      tokenRef.current = nextSession?.access_token ?? null;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
      if (nextSession?.user) {
        void fetchProfile(nextSession.user);
      } else {
        setProfile(null);
      }
    },
    [fetchProfile],
  );

  useEffect(() => {
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (active) applySession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      // Never await inside this callback: the Supabase client can deadlock on its own lock.
      if (active) applySession(nextSession);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error };
      applySession(data.session);
      return { error: null };
    },
    [applySession],
  );

  const signUp = useCallback(async (email: string, password: string, username?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username: username || email.split("@")[0] } },
    });

    if (!error && data.user) {
      const { error: insertError } = await supabase.from("Users").insert({
        id: data.user.id,
        username: username || email.split("@")[0],
        email,
      });
      if (insertError) console.warn("Could not insert to Users table:", insertError.message);
    }

    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    tokenRef.current = null;
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user);
  }, [fetchProfile, user]);

  const getAccessToken = useCallback(async () => {
    if (tokenRef.current) return tokenRef.current;
    const { data } = await supabase.auth.getSession();
    tokenRef.current = data.session?.access_token ?? null;
    return tokenRef.current;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      refreshProfile,
      getAccessToken,
    }),
    [user, session, profile, loading, signIn, signUp, signOut, refreshProfile, getAccessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
