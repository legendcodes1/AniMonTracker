import { useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useDismissable } from "@/hooks/useDismissable";
import NotificationPanel from "./NotificationPanel";

const panelId = "notification-panel";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useDismissable<HTMLDivElement>(
    open,
    () => setOpen(false),
    triggerRef,
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
          open
            ? "border-purple-400/40 bg-purple-500/15 text-purple-200"
            : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Bell className="h-[18px] w-[18px]" />
      </button>

      {open && <NotificationPanel id={panelId} />}
    </div>
  );
}
