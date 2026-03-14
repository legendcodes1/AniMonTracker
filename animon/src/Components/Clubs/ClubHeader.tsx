// ClubHeader.tsx — THIS is where the three-job pattern goes



// ClubHeader.tsx
export default function ClubHeader() {
  return (
    // h-[300px] not min-h — fixed height lets justify-end work
    <div className="relative h-[300px] rounded-xl overflow-hidden">
      
      {/* Job 1: image — absolute + inset-0 fills entire parent */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuC47VbC8O_Gi-8vwchO0ltN1ytGSwztFllfgWGBI_wlvsjPJlkPPXrWfEEkKb9iOLaVGPxj17yLNhaWECpcZDa0BeWSYDIg5S4rwihtdxoXpMviPo-MRWEVI1EZbLtgSdUsd6h01aYvszst0Xl23z-2pRqo9BQC5T0miNA7IjqrIo3eaR9momXams0F3OiHEULYspw06ywDkoePeDM0MVbrXqjJz_SCryfieX8Mwdi0YwYi3mGi3xIeXhRzA29LpgBDhk5BMbnGZ0wD')] bg-cover bg-center" />
      
      {/* Job 2: gradient — sits on top of image, same size */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      {/* Job 3: content — relative + z-10 lifts above both layers */}
      {/* justify-end pushes everything to bottom, items-start keeps it left */}
      <div className="relative z-10 flex flex-col justify-end items-start h-full p-8 gap-2">
        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          SEASONAL HIGHLIGHT
        </span>
        <h1 className="text-white text-4xl font-black">Anime Clubs & Circles</h1>
        <p className="text-slate-300 text-sm max-w-lg">
          Find your next obsession. Connect with thousands of fans in curated circles.
        </p>
      </div>
    </div>
  )
}