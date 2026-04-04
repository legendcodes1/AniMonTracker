import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'
// Create a single supabase client for interacting with your database
const supabase = createClient( import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
import ParticleSystem from "./ParticalSystem"

const FormGroup = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (e) => {
    setHasValue(e.target.value !== "");
    onChange(e);
  };

  return (
    <div className="relative mb-6">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        style={{
          width: "100%",
          padding: "16px 20px",
          backgroundColor: "rgba(15, 15, 35, 0.85)",
          border: isFocused ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.2)",
          borderRadius: "12px",
          color: "#ffffff",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
          backdropFilter: "blur(8px)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isFocused ? "0 0 0 3px rgba(248, 113, 113, 0.15)" : "none",
        }}
      />
      <label
        style={{
          position: "absolute",
          top: "-10px",
          left: "16px",
          padding: "0 8px",
          fontSize: "13px",
          fontWeight: "500",
          color: isFocused || hasValue ? "#4ecdc4" : "#f87171",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
          pointerEvents: "none",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </label>
    </div>
  );
};

const SubmitButton = ({ children, loading = false, onClick }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`
      w-full px-4 py-4 
      bg-gradient-to-r from-red-400 to-teal-400 
      border-none 
      rounded-xl 
      text-white text-lg font-semibold 
      cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:-translate-y-0.5 
      hover:shadow-lg hover:shadow-red-500/30
      active:translate-y-0
      focus:outline-none
      disabled:opacity-70
      relative overflow-hidden
      mb-4
      ${loading ? "animate-pulse" : ""}
    `}
  >
    <span className="relative z-10">
      {loading ? "Processing..." : children}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -translate-x-full hover:translate-x-full transition-transform duration-500" />
  </button>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 px-3 py-3 
      border-none 
      rounded-lg 
      font-medium 
      cursor-pointer 
      transition-all duration-300 ease-in-out
      relative overflow-hidden
      ${
        active
          ? "bg-gradient-to-r from-red-400 to-teal-400 text-white -translate-y-0.5"
          : "bg-transparent text-gray-400 hover:text-white"
      }
    `}
  >
    <span className="relative z-10">{children}</span>
  </button>
);

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };


 const handleRegister = async (e) => {  
    e.preventDefault()
   const {data, error} =  await supabase.auth.signUp({
      email: formData.email,
     password: formData.password,
    })

    if(error){
      console.log(error)
    }
  navigate("/")
}

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <ParticleSystem />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%,
          90% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10vh) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div
          className="
          bg-white bg-opacity-5 
          backdrop-blur-xl 
          rounded-3xl 
          p-8 
          border border-white border-opacity-10 
          shadow-2xl shadow-black/30
          transition-all duration-300 ease-in-out
          hover:-translate-y-1
          hover:shadow-3xl hover:shadow-black/40
        "
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-400 to-teal-400 bg-clip-text text-transparent">
              Animon
            </h1>
            <p className="text-gray-400 text-sm opacity-80">
              Track your anime & manga journey
            </p>
          </div>

          <div
            className="
            flex 
            bg-white bg-opacity-5 
            rounded-xl 
            p-1 
            mb-8 
            border border-white border-opacity-10
          "
          >
            <TabButton active={isLogin} onClick={() => setIsLogin(true)}>
              Sign In
            </TabButton>
            <TabButton active={!isLogin} onClick={() => setIsLogin(false)}>
              Sign Up
            </TabButton>
          </div>

          <form onSubmit={handleRegister}>

            <FormGroup
              label="Email"
              type="email"
              placeholder= "Enter your email"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
            />

            <FormGroup
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />

            {!isLogin && (
              <FormGroup
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                required
              />
            )}

            <SubmitButton loading={loading}>
              {isLogin ? "Sign In" : "Create Account"}
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}