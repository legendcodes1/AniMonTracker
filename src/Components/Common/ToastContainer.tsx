import React from "react";
import { useNotifications } from "../../context/NotificationContext";
import { X, Trophy, Info, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-slate-900/95 border border-purple-500/40 backdrop-blur-xl shadow-2xl shadow-purple-500/20 text-white animate-in slide-in-from-right-5 fade-in duration-300 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-xl shrink-0">
            {toast.icon ? (
              <span>{toast.icon}</span>
            ) : toast.type === "achievement" ? (
              <Trophy className="w-5 h-5 text-yellow-400" />
            ) : toast.type === "error" ? (
              <AlertCircle className="w-5 h-5 text-red-400" />
            ) : toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <Info className="w-5 h-5 text-blue-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white leading-tight truncate">
              {toast.title}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
