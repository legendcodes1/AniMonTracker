import { ReactNode } from "react";


interface submitButton {
    children : ReactNode,
    loading: boolean
}


export const SubmitButton = ({ children, loading = false} : submitButton) => (
  <button
    disabled={loading}
    className={`
      w-full px-4 py-4 
      bg-gradient-to-r from-red-400 to-teal-400 
      border-none 
      rounded-xl 
      text-white text-lg font-semibold 
      cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:-translate-y-0.5 
      hover:shadow-lg hover:shadow-red-500/30
      active:translate-y-0
      focus:outline-none
      disabled:opacity-70
      relative overflow-hidden
      mb-4
      ${loading ? "animate-pulse" : ""}
    `}
  >
    <span className="relative z-10">
      {loading ? "Processing..." : children}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -translate-x-full hover:translate-x-full transition-transform duration-500" />
  </button>
);