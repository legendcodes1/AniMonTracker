import { useState } from "react";
import Navbar from "./Navbar";

export default function Library() {
  const [collection, setCollection] = useState([]);
  return (
    <>
      <Navbar />
      <div className=" justify-center">
        <p className="text-center mt-10 text-lg">
          {" "}
          You currently have no collection, add a anime or your favorite manga
        </p>
        <button className="border px-10 py-5 rounded-md"> Add</button>
      </div>
    </>
  );
}
