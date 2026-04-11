import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
import ParticleSystem from "./ParticalSystem";
import { SubmitButton } from "./SubmitButton";
import { FormGroup } from "../FormComponents/FormGroup";

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

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      console.log(error);
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      localStorage.setItem("supabase_token", session.access_token);
      localStorage.setItem("user_id", session.user.id);
    }
    console.log(data);
    navigate("/discovery");
  };

  return (
    <form onSubmit={handleLogin}>
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
      <SubmitButton loading={false}>Sign </SubmitButton>
    </form>
  );
}
