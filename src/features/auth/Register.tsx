import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { FormGroup } from "../../components/ui/FormGroup";
import { SubmitButton } from "./SubmitButton";
import { AlertCircle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { showToast } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await signUp(
        formData.email,
        formData.password,
        formData.username
      );

      if (signUpError) {
        setError(signUpError.message);
      } else {
        showToast({
          title: "Account Created! 🎉",
          message: "Welcome to AniMon. Please sign in with your credentials.",
          type: "success",
        });
        navigate("/login");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <FormGroup
        label="Username"
        type="text"
        placeholder="Choose a username"
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
        placeholder="Create a password (min. 6 chars)"
        value={formData.password}
        onChange={handleInputChange("password")}
        required
      />

      <FormGroup
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleInputChange("confirmPassword")}
        required
      />

      <SubmitButton loading={loading}>Create Account</SubmitButton>
    </form>
  );
}
