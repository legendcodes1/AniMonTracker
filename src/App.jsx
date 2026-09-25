import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Auth/LoginPage";
import Library from "./Components/Library/Library";
import Home from "./Components/MainDash/Home";
import Clubs from "./Components/Clubs/Clubs";
import "./App.css";
import Register from "./Components/Auth/Register";
import ClubDetailPage from "./pages/ClubDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import SearchComponent from "./pages/SearchPage"
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
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mylibrary" element={<ProtectedRoute><Library /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchComponent /></ProtectedRoute>} />
          <Route path="/discovery" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/clubs" element={<ProtectedRoute><Clubs /></ProtectedRoute>} />
          <Route path="/clubs/:id" element={<ProtectedRoute><ClubDetailPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
