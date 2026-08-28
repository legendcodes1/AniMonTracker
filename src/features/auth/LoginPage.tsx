import React, { useState } from "react";
import ParticleSystem from "../../components/common/ParticleSystem";
import { TabButton } from "../../components/ui/FormButtons";
import Login from "./Login";
import Register from "./Register";
import { BookOpen } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-4">
      <ParticleSystem />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-purple-900/30 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-black mb-1 bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent">
              AniMon
            </h1>
            <p className="text-slate-400 text-xs md:text-sm">
              Track your anime & manga journey, join circles, and earn badges
            </p>
          </div>

          <div className="flex bg-slate-800/80 rounded-xl p-1 mb-6 border border-white/5">
            <TabButton active={isLogin} onClick={() => setIsLogin(true)}>
              Sign In
            </TabButton>
            <TabButton active={!isLogin} onClick={() => setIsLogin(false)}>
              Sign Up
            </TabButton>
          </div>

          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}
