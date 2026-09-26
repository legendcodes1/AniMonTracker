import { Route, Routes } from "react-router-dom";
import Register from "../components/Auth/Register";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import LoginPage from "../components/Auth/LoginPage";
import Clubs from "../components/Clubs/Clubs";
import Home from "../components/MainDash/Home";
import Library from "../components/Library/Library";
import ClubDetailPage from "../pages/ClubDetailPage";
import ProfilePage from "../pages/ProfilePage";
import SearchPage from "../pages/SearchPage";
import AppLayout from "./AppLayout";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      >
        <source src="/lake-japan.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/mylibrary" element={<Library />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/discovery" element={<Home />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/clubs/:id" element={<ClubDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
