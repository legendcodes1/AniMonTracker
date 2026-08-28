import React from "react";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function SubmitButton({
  loading = false,
  children,
  onClick,
  className = "",
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading || disabled}
      className={`w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-lg transition-all duration-200 ${
        active
          ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
          : "text-slate-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
