import type { ReactNode } from "react";

interface TabButtonProps {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}

export const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`
      flex-1 px-3 py-3 
      border-none 
      rounded-lg 
      font-medium 
      cursor-pointer 
      transition-all duration-300 ease-in-out
      relative overflow-hidden
      ${
        active
          ? "bg-gradient-to-r from-red-400 to-teal-400 text-white -translate-y-0.5"
          : "bg-transparent text-gray-400 hover:text-white"
      }
    `}
  >
    <span className="relative z-10">{children}</span>
  </button>
);
