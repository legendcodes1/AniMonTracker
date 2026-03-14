
import { Flame, Plus, Users } from "lucide-react";
export default function CommunityCard(){
    return( 
          <div className="bg-slate-800 rounded-2xl p-6 w-80 mr-10">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-blue-500" />
            <div>
              <h2 className="text-white font-bold">Community Highlights</h2>
              <p className="text-gray-400 text-sm">What's happening now</p>
            </div>
          </div>

          {/* each discussion block follows the same pattern */}
          <div className="mt-5">
            <div className="flex justify-between">
              <p className="text-blue-500 text-sm font-semibold">#jujutsukaisen</p>
              <p className="text-blue-500 text-sm">2.4k active</p>
            </div>
            <p className="text-white text-sm mt-1">Is Gojo Satoru truly the strongest? Power scaling debate</p>
          </div>

          <hr className="border-slate-700 my-4" />

          <div>
            <div className="flex justify-between">
              <p className="text-blue-500 text-sm font-semibold">#chainsawman</p>
              <p className="text-blue-500 text-sm">1.8k active</p>
            </div>
            <p className="text-white text-sm mt-1">Episode 12 ending theory: who was that at the end?</p>
          </div>

          <hr className="border-slate-700 my-4" />

          <div>
            <div className="flex justify-between">
              <p className="text-blue-500 text-sm font-semibold">#fall2024</p>
              <p className="text-blue-500 text-sm">850 active</p>
            </div>
            <p className="text-white text-sm mt-1">Full season schedule and where to watch list.</p>
          </div>

          {/* w-full spans full sidebar width, slate-700 matches the dark gray in mockup */}
          <button className="bg-slate-700 hover:bg-slate-600 rounded-full text-white font-bold w-full py-2 mt-6">
            Join Discussion
          </button>
        </div>
    )
}