import { Loader2 } from "lucide-react";

interface LoadingProps {
  variant?: "spinner" | "skeleton";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Loading({ variant = "spinner", size = "md", className = "" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (variant === "skeleton") {
    return (
      <div
        className={`animate-pulse bg-slate-700 rounded ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <Loader2
      className={`animate-spin text-purple-500 ${sizeClasses[size]} ${className}`}
    />
  );
}