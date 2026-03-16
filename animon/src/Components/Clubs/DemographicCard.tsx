import { Swords } from "lucide-react"; 

// icon prop accepts a JSX element like <Swords />
export default function DemographicCard({ icon, name, number, bg }) {
  return (

     <div className={`${bg} rounded-xl min-h-[150px] h-full`}>

      <div className="flex flex-col items-center text-center justify-center h-full gap-2 p-4">
        
        {/* icon renders directly — no <p> wrapper needed */}
        <div className="text-blue-400 text-3xl">
          {icon}
        </div>

        <p className="text-white font-bold text-lg">{name}</p>
        <p className="text-gray-400 text-sm">{number} Clubs</p>
      </div>

    </div>
  );
}