import {  Plus } from "lucide-react";
export default function ActiveClubs(){
    return(
        // background div
        <div className="bg-slate-800 rounded-2xl p-6 w-80">
            <h1 className="text-white mb-5"> Active Clubs</h1>
            <div className="flex-col">
            <div className="flex justify-between"> 
                <div className="flex-col"> 
                    <h2 className="text-white font-bold"> Studio Ghibli fans</h2>
                    <p className="text-white"> 12.5K Members</p>
                </div>
                <div className="border rounded-full bg-blue-500 w-8 h-8"> 
                    <Plus/>
                </div>
            </div>

         <div className="flex justify-between"> 
                <div className="flex-col"> 
                    <h2 className="text-white font-bold"> Isekai Junkies</h2>
                    <p className="text-white"> 8.2k Members</p>
                </div>
                <div className="border rounded-full bg-blue-500 w-8 h-8"> 
                    <Plus/>
                </div>
            </div>
            </div>
        </div>
    )
}