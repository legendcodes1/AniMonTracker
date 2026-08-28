import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  variant?: "spinner" | "skeleton";
}

export default function Loading({ size = "md", text, variant = "spinner" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (variant === "skeleton") {
    return (
      <div className="w-full space-y-4 animate-pulse">
        <div className="h-48 bg-slate-800/60 rounded-2xl border border-white/5" />
        <div className="h-4 bg-slate-800/60 rounded w-3/4" />
        <div className="h-4 bg-slate-800/60 rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <Loader2 className={`${sizeClasses[size]} text-purple-500 animate-spin`} />
      {text && <p className="text-slate-400 text-sm font-medium animate-pulse">{text}</p>}
    </div>
  );
}