// DemographicCard.tsx
export default function DemographicCard({ icon, name, number, bg, iconColor }) {
  return (
    <div className={`${bg} rounded-xl min-h-[150px] h-full`}>
      <div className="flex flex-col items-center text-center justify-center h-full gap-2 p-6">
        <div className={iconColor}>{icon}</div>
        <p className="text-white font-bold text-lg">{name}</p>
        <p className="text-slate-500 text-xs">{number} Clubs</p>
      </div>
    </div>
  )
}