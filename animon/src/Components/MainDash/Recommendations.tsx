import { Link } from "react-router-dom";
import RecommendationsCard from "../RecommendationsCard"

export default function Recommendations(){
    return( 
        <> 
        <div className="flex justify-between"> 
                 <h1 className="text-2xl"> For your Recommendations</h1>
        <Link to="/">View all  </Link>
        </div>
   
        <div className="grid grid-cols-4 gap-5"> 
     <RecommendationsCard/>
      <RecommendationsCard/>
       <RecommendationsCard/>
        <RecommendationsCard/>
        </div>
    </>
    )
}