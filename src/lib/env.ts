const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const readEnv = (key: string): string => {
  const value = import.meta.env[key];
  return typeof value === "string" ? value.trim() : "";
};

export const env = {
  /** Backend origin without a trailing slash. Callers append `/api` themselves. */
  apiBaseUrl: stripTrailingSlash(readEnv("VITE_API_BASE_URL")),
  supabaseUrl: readEnv("VITE_SUPABASE_URL"),
  supabaseAnonKey: readEnv("VITE_SUPABASE_ANON_KEY"),
} as const;

export function getSupabaseConfig(): { url: string; anonKey: string } {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error(
      "Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (see .env.example).",
    );
  }

  return { url: env.supabaseUrl, anonKey: env.supabaseAnonKey };
}
