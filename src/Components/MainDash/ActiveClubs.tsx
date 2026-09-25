import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
const baseApi = import.meta.env.VITE_API_BASE_URL as string | undefined;

export default function ActiveClubs() {
  const [clubData, setClubData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClubData = async () => {
    try {
      setLoading(true);

      if (!baseApi) {
        throw new Error("VITE_API_BASE_URL is not configured");
      }

      const token = localStorage.getItem("supabase_token");
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(`${baseApi.replace(/\/$/, "")}/api/clubs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Failed to fetch clubs (${response.status} ${response.statusText}): ${errorBody.slice(0, 200)}`,
        );
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.toLowerCase().includes("json")) {
        const responseBody = await response.text();
        throw new Error(
          `Clubs endpoint returned ${contentType || "an unknown content type"}: ${responseBody.slice(0, 200)}`,
        );
      }

      const data: unknown = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Clubs endpoint returned an unexpected response");
      }

      setClubData(data);
    } catch (error) {
      console.error("Error fetching clubs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubData();
  }, []); // 

  return (
    <div className="bg-slate-800 rounded-2xl p-6 w-80">
      <h1 className="text-white font-bold mb-5">Active Clubs</h1>

      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : clubData.length === 0 ? (
          <p className="text-slate-400">Currently no Clubs have been created</p>
        ) : (
          clubData.slice(0, 3).map((club) => (
            <div key={club.id} className="flex justify-between items-center">
              <div className="flex-col">
                <h2 className="text-white font-bold">{club.name}</h2>
                <p className="text-slate-400 text-sm">
                  {club.memberCount > 0 
                    ? `${club.memberCount.toLocaleString()} Members` 
                    : 'No members yet'}
                </p>
              </div>
              <div className="border rounded-full bg-blue-500 hover:bg-blue-600 w-8 h-8 flex items-center justify-center cursor-pointer transition-colors">
                <Plus className="text-white" size={20} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}