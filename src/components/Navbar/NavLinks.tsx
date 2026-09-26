import { BookMarked, Compass, House, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

interface NavLinksProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/discovery", icon: House },
  { label: "Library", to: "/mylibrary", icon: BookMarked },
  { label: "Discover", to: "/search", icon: Compass },
  { label: "Clubs", to: "/clubs", icon: Users },
];

export default function NavLinks({
  mobile = false,
  onNavigate,
}: NavLinksProps) {
  return (
    <div className={mobile ? "grid gap-1" : "flex items-center gap-1"}>
      {navItems.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              "group relative flex items-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400",
              mobile ? "px-4 py-3 text-base" : "px-3 py-2 text-sm",
              isActive
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white",
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                className={`h-4 w-4 transition-colors ${
                  isActive
                    ? "text-pink-400"
                    : "text-slate-500 group-hover:text-purple-400"
                }`}
              />
              <span>{label}</span>
              {isActive && !mobile && (
                <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
