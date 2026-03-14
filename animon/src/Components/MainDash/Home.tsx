import { Flame, Plus, Users } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import TrendingCard from "./TrendingCard";
import CommunityCard from "./CommunityCard";
import ActiveClubs from "../ActiveClubs";
import Recommendations from "./Recommendations";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex  p-4 gap-5">
        <div className="flex flex-col gap-8 flex-1">
          <TrendingCard />
          <Recommendations />
        </div>
        <div className="flex flex-col gap-5 w-80">
          <CommunityCard />
          <ActiveClubs />
        </div>


      </div>
    </>
  );
}
