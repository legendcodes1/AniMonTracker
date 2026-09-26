import { BellRing } from "lucide-react";

interface NotificationPanelProps {
  id: string;
}

export default function NotificationPanel({ id }: NotificationPanelProps) {
  return (
    <section
      id={id}
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h2 className="font-semibold text-white">Notifications</h2>
          <p className="text-xs text-slate-500">Your latest AniMon activity</p>
        </div>
        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400">
          All caught up
        </span>
      </div>

      <div className="flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/10">
          <BellRing className="h-5 w-5 text-purple-300" />
        </div>
        <p className="font-medium text-slate-200">Nothing new yet</p>
        <p className="mt-1 max-w-56 text-sm leading-6 text-slate-500">
          Club activity, achievements, and library updates will appear here.
        </p>
      </div>
    </section>
  );
}
