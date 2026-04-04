import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SubmitButton } from "./SubmitButton";
// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

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
          border: isFocused
            ? "1px solid #f87171"
            : "1px solid rgba(255,255,255,0.2)",
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

export default function Register() {
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
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleRegister}>
      <FormGroup
        label="Email"
        type="email"
        placeholder="Enter your email"
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
       <SubmitButton loading={false}>Register </SubmitButton>
    </form>
  );
}
