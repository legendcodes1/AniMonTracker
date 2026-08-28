import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import Register from "./features/auth/Register";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import Home from "./features/dashboard/Home";
import Library from "./features/library/Library";
import SearchPage from "./features/search/SearchPage";
import Clubs from "./features/clubs/Clubs";
import ClubDetailPage from "./features/clubs/ClubDetailPage";
import ProfilePage from "./features/profile/ProfilePage";
import MainPage from "./features/carousel/MainPage";
import ToastContainer from "./components/common/ToastContainer";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* Background Ambient Video/Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        >
          <source src="/lake-japan.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/90 to-purple-950/40 backdrop-blur-[2px]" />
      </div>

      {/* App Routes Content */}
      <div className="relative z-10">
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/discovery"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mylibrary"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs"
            element={
              <ProtectedRoute>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs/:id"
            element={
              <ProtectedRoute>
                <ClubDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/discovery" replace />} />
        </Routes>
      </div>

      {/* Global Celebratory Toasts */}
      <ToastContainer />
    </div>
  );
}
