import { useState } from "react";
import ParticleSystem from "./ParticalSystem";
import { TabButton } from "../FormComponents/FormButtons";
import Login from "./Login";
import Register from "./Register";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <ParticleSystem />

      <div className="relative z-10 mx-4 w-full max-w-md">
        <div className="rounded-3xl border border-white border-opacity-10 bg-white bg-opacity-5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-3xl hover:shadow-black/40">
          <div className="mb-8 text-center">
            <h1 className="mb-2 bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-4xl font-bold text-transparent">
              Animon
            </h1>
            <p className="text-sm text-gray-400 opacity-80">
              Track your anime &amp; manga journey and meet new friends
            </p>
          </div>

          <div className="mb-8 flex flex-col rounded-xl border border-white border-opacity-10 bg-white bg-opacity-5 p-1">
            <div className="flex">
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
    </div>
  );
}
