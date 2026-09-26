import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import LevelUpToast from "@/components/Gamification/LevelUpToast";
import { GamificationProvider } from "@/providers/GamificationProvider";

export default function AppLayout() {
  return (
    <GamificationProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <LevelUpToast />
      </div>
    </GamificationProvider>
  );
}
