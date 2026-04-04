import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'
// Create a single supabase client for interacting with your database
const supabase = createClient( import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
import ParticleSystem from "./ParticalSystem"
import { FormGroup } from "../FormComponents/FormGroup";
import { SubmitButton, TabButton } from "../FormComponents/FormButtons";


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


  const handleLogin = async (e) => {  
    e.preventDefault()
   const {data, error} =  await supabase.auth.signInWithPassword({
      email: formData.email,
     password: formData.password,
    })

    if(error){
      console.log(error)
    }
  navigate("/discovery")
}

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