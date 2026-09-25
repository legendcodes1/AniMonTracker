import React from "react";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ loading = false, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full mt-4 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}
