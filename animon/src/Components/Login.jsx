import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Particle = ({ delay = 0, color = "#ff6b6b", duration = 6 }) => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: 100 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition({ x: Math.random() * 100, y: -10 });
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute w-0.5 h-0.5 opacity-60 rounded-full"
      style={{
        left: `${position.x}%`,
        top: `${position.y}vh`,
        backgroundColor: color,
        animation: `float ${duration}s infinite ease-in-out`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const ParticleSystem = () => {
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <Particle
          key={i}
          delay={i * 0.5}
          color={colors[i % colors.length]}
          duration={Math.random() * 3 + 4}
        />
      ))}
    </div>
  );
};

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
        className={`
          w-full px-5 py-4 
          bg-white bg-opacity-5 
          border border-white border-opacity-10 
          rounded-xl 
          text-white text-base 
          placeholder-gray-400 
          backdrop-blur-sm
          transition-all duration-300 ease-in-out
          focus:outline-none 
          focus:border-red-400 
          focus:shadow-lg focus:shadow-red-500/10
          focus:-translate-y-0.5
          hover:border-white hover:border-opacity-20
        `}
      />
      <label
        className={`
        absolute -top-2 left-4 
        px-2 py-0 
        text-sm font-medium 
        transition-all duration-300 ease-in-out
        pointer-events-none
        ${
          isFocused || hasValue
            ? "text-teal-400 -translate-y-0.5"
            : "text-red-400"
        }
      `}
        style={{
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
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

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("http://localhost:3000/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Invalid token");
          const user = await res.json();
          console.log("Already logged in as:", user);
          navigate("/dashboard");
        } catch (err) {
          console.error("Token invalid or expired:", err);
          localStorage.removeItem("token");
        }
      }
    };
    checkLogin();
  }, [navigate]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "http://localhost:3000/users"
        : "http://localhost:3000/users";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Login/signup failed");

      const data = await res.json();
      console.log("Response:", data);

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <FormGroup
                label="Username"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={handleInputChange("username")}
                required
              />
            )}

            <FormGroup
              label={isLogin ? "Email or Username" : "Email"}
              type="email"
              placeholder={
                isLogin ? "Enter your email or username" : "Enter your email"
              }
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
