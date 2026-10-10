import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loading from "@/components/Common/Loading";
import { useAuth } from "@/providers/AuthContext";
import ParticleSystem from "./ParticleSystem";
import { TabButton } from "../FormComponents/FormButtons";
import Login from "./Login";
import Register from "./Register";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const registration = location.state as
    | {
        registrationSuccess?: boolean;
        confirmationRequired?: boolean;
        email?: string;
      }
    | undefined;
  const [isLogin, setIsLogin] = useState(location.pathname !== "/register");
  const showLogin = registration?.registrationSuccess || isLogin;

  const showSignUp = () => {
    if (registration?.registrationSuccess) {
      navigate("/login", { replace: true, state: null });
    }
    setIsLogin(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loading size="lg" />
      </div>
    );
  }

  if (user && !registration?.registrationSuccess) {
    return <Navigate to="/discovery" replace />;
  }

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

          {registration?.registrationSuccess && (
            <div
              role="status"
              className="mb-6 flex gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-emerald-100"
            >
              {registration.confirmationRequired ? (
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              )}
              <div>
                <p className="font-semibold">Account created successfully</p>
                <p className="mt-1 text-sm text-emerald-100/75">
                  {registration.confirmationRequired
                    ? `Check ${registration.email ?? "your inbox"} to confirm your email, then sign in.`
                    : "Your account is ready. Sign in to start discovering anime."}
                </p>
              </div>
            </div>
          )}

          <div className="mb-8 flex flex-col rounded-xl border border-white border-opacity-10 bg-white bg-opacity-5 p-1">
            <div className="flex">
              <TabButton active={showLogin} onClick={() => setIsLogin(true)}>
                Sign In
              </TabButton>
              <TabButton active={!showLogin} onClick={showSignUp}>
                Sign Up
              </TabButton>
            </div>
            {showLogin ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
}
