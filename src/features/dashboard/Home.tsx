import React from "react";
import Navbar from "../../components/layout/Navbar";
import TrendingCard from "./TrendingCard";
import Recommendations from "./Recommendations";
import CommunityCard from "./CommunityCard";
import ActiveClubs from "./ActiveClubs";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed Column */}
          <div className="lg:col-span-2 space-y-8">
            <TrendingCard />
            <Recommendations />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <CommunityCard />
            <ActiveClubs />
          </div>
        </div>
      </main>
    </div>
  );
}
