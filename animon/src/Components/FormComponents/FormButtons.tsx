export const SubmitButton = ({ children, loading = false, onClick }) => (
  <button
    onClick={onClick}
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

export const TabButton = ({ active, onClick, children }) => (
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
