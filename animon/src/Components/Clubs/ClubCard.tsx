// ClubCard.tsx
export default function ClubCard({ image, badge, title, description }) {
  return (
    // bg-slate-800 gives the dark card background
    <div className="bg-slate-800 rounded-xl overflow-hidden">

      {/* image section — relative so badge can be absolute inside it */}
      <div className="relative">
        {/* w-full fills card width, object-cover crops without stretching */}
        {/* aspect-[4/3] makes it taller than wide like the mockup */}
        <img className="w-full object-cover aspect-[4/3]" src={image} />
        
        {/* badge — absolute pins to top right corner of image */}
        <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      </div>

      {/* text section */}
      <div className="p-4">
        {/* title row — name on left, icon on right */}
        <div className="flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        
        {/* muted description */}
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>
        
        {/* divider */}
        <hr className="border-slate-700 my-3" />
        
        {/* bottom row — avatars left, button right */}
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {/* avatar placeholders */}
            <div className="w-6 h-6 rounded-full bg-slate-600" />
            <div className="w-6 h-6 rounded-full bg-slate-500" />
          </div>
            <button className="text-blue-500 font-semibold text-sm border border-blue-500 px-4 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                Join Circle
                </button>
        </div>
      </div>

    </div>
  )
}