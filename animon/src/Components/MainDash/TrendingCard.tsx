import { Flame, Plus, Users } from "lucide-react";

export default function TrendingCard() {
  return (
    <>
      <div className=" rounded-lg bg-cover bg-center bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgNxZBglRtNVhw_vFW-8SQWnOSKTRIG9ynqQ7_t4d8Ak5vpBpF5BYrx6c3CH_ZWokVGt0OKJcDmXrXmPhOWhUFta3eYrOxOimgagfiP7hl-_PEUk5hzcNOc-NDdQNfByj6YU4lzgxj4CjT8g_lMaJWXJhE46Yv_qqrn2fguDTs4F2NZj_opFAFpJ80seym-7N71QYfPFlT1L0wdytBL-Sds7RD6FAgNGZ_YW2tRiqbHz-vJIVLNFN1ZqD1K_gKMsP72icFSPCU07zF')] min-h-[440px]">
      <div className="relative z-10 flex flex-col justify-end h-full p-12">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-blue-500" />
          <p className="text-white text-sm font-bold uppercase tracking-wider">
            Trending Now
          </p>
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
          Cyberpunk: <br />
          <span className="text-blue-500">Edgerunners</span>
        </h1>
        <p className="text-slate-200 mt-4">
          In a dystopia riddled with corruption and cybernetic implants, a
          talented but reckless street kid strives to become a mercenary outlaw.
        </p>
        {/* items-center aligns icon and text vertically in the button */}
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
            Watch Now
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full border border-white/20">
            <Plus size={16} /> Add to List
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
