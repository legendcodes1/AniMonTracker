export default function RecommendationsCard({imgurl, title, genre, episode}){
    return(
        <div className="">
            <div className="relative border rounded-xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/20 cursor-pointer">
            <img className="w-full object-cover aspect-[3/5]" src={imgurl} />
            <p className="absolute top-2 right-2 border rounded-md bg-black  text-white px-3">EP {episode}</p>
            </div>
            <div>
                <p className="text-white"> {title}</p>
                  <p className="text-white"> {genre}</p>
            </div>
        </div>
    )
}