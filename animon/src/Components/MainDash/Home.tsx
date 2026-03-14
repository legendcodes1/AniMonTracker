import { Flame, Plus, Users } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import TrendingCard from "./TrendingCard";
import CommunityCard from "./CommunityCard";
import ActiveClubs from "./ActiveClubs";
import Recommendations from "./Recommendations";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-10 max-w-7xl flex px-10 gap-5 mx-auto">
        <div className="flex flex-col gap-5 flex-1">
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
