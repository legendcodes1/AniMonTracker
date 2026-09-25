import { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
}
