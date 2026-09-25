import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SubmitButton } from "./SubmitButton";
import { FormGroup } from "../FormComponents/FormGroup";
// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

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

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log(error);
    }

    if (data.user) {
      const { error: insertError } = await supabase.from("Users").insert([
        {
          id: data.user.id,
          username: formData.username,
          email: formData.email,
        },
      ]);

      if (insertError) throw insertError;
    }
    navigate("/login");
  };

  return (
    <form onSubmit={handleRegister}>
      <FormGroup
        label="Username"
        type="username"
        placeholder="Enter your desired username"
        value={formData.username}
        onChange={handleInputChange("username")}
        required
      />
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
