import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import MainPage from "./Components/MainPage";
import Library from "./Components/Library"; // ✅ create/import this component
import Search from "./Components/Search"; // ✅ create/import this component
import "./App.css";

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/lake-japan.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* App content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* Home */}
          <Route path="/mylibrary" element={<Library />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
