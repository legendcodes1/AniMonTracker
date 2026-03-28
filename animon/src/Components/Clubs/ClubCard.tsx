// ClubCard.tsx

interface ClubCardProps {
  id: string;           // ✅ ADD THIS - need groupId
  image: string;
  badge: number | string;
  title: string;
  description: string;
}

export default function ClubCard({ id, image, badge, title, description }: ClubCardProps) {
  
  const handleJoinClub = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Please login first!");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/groups/${id}/members/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
          "Authorization": `Bearer ${token}`,  
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to join group: ${errorText}`);
      }

      const data = await response.json();
      console.log("Joined group:", data);

      alert(`Successfully joined ${title}!`);

      window.location.reload(); 

    } catch (error) {
      console.error("Error joining group:", error);
      alert(error instanceof Error ? error.message : "Failed to join group");
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:shadow-xl transition-shadow">
      <div className="relative">
        <img className="w-full h-40 object-cover" src={image} alt={title} />
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
          {badge}
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-600" />
            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-500" />
          </div>
          <button 
            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-4 py-2 rounded-lg text-sm font-bold transition-colors" 
            onClick={handleJoinClub}
          >
            Join Circle
          </button>
        </div>
      </div>
    </div>
  );
}