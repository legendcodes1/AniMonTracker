import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { UserProfile } from "../types/auth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (currentUser: User) => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (!error && data) {
        setProfile(data);
      } else {
        // Fallback to auth user metadata if Users table row isn't created yet
        setProfile({
          id: currentUser.id,
          username: currentUser.user_metadata?.username || currentUser.email?.split("@")[0] || "Otaku",
          email: currentUser.email,
        });
      }
    } catch (e) {
      console.warn("Could not fetch user profile:", e);
      setProfile({
        id: currentUser.id,
        username: currentUser.user_metadata?.username || currentUser.email?.split("@")[0] || "Otaku",
        email: currentUser.email,
      });
    }
  };

  useEffect(() => {
    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        localStorage.setItem("supabase_token", session.access_token);
        localStorage.setItem("user_id", session.user.id);
        fetchProfile(session.user);
      } else {
        localStorage.removeItem("supabase_token");
        localStorage.removeItem("user_id");
      }
      setLoading(false);
    });

    // 2. Realtime Auth State Listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        localStorage.setItem("supabase_token", session.access_token);
        localStorage.setItem("user_id", session.user.id);
        await fetchProfile(session.user);
      } else {
        localStorage.removeItem("supabase_token");
        localStorage.removeItem("user_id");
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data.session) {
      setSession(data.session);
      setUser(data.user);
      localStorage.setItem("supabase_token", data.session.access_token);
      localStorage.setItem("user_id", data.user.id);
      await fetchProfile(data.user);
    }
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, username?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: username || email.split("@")[0] },
      },
    });

    if (!error && data.user) {
      // Optional: Insert into custom Users table if configured
      try {
        await supabase.from("Users").insert({
          id: data.user.id,
          username: username || email.split("@")[0],
          email: email,
        });
      } catch (e) {
        console.warn("Could not insert to Users table:", e);
      }
    }

    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("supabase_token");
    localStorage.removeItem("user_id");
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
