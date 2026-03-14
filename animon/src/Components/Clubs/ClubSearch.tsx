import { Search } from "lucide-react"

export default function ClubSearch() {
    return (
        // outer wrapper — flex flex-col stacks search and tags vertically
        <div className="flex flex-col gap-4 mt-5">

            <div className="relative">

                <div className="absolute inset-y-0 left-3 flex items-center">
                    <Search size={16} className="text-slate-400" />
                </div>
        
                <input
                    className="w-full pl-10 py-3 rounded-xl bg-slate-800 text-white placeholder-slate-400"
                    placeholder="Search for Shonen, Seinen, or specific series clubs..."
                />
            </div>

  
            <div className="flex gap-2 flex-wrap">
  
                <button className="bg-blue-500 text-white rounded-full px-4 py-1 text-sm">All Categories</button>

                <button className="border border-slate-600 text-slate-300 rounded-full px-4 py-1 text-sm">Shonen</button>
                <button className="border border-slate-600 text-slate-300 rounded-full px-4 py-1 text-sm">Seinen</button>
                <button className="border border-slate-600 text-slate-300 rounded-full px-4 py-1 text-sm">Shojo</button>
                <button className="border border-slate-600 text-slate-300 rounded-full px-4 py-1 text-sm">Isekai</button>
                <button className="border border-slate-600 text-slate-300 rounded-full px-4 py-1 text-sm">Slice of Life</button>
            </div>

        </div>
    )
}