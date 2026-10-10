import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import { SubmitButton } from "./SubmitButton";
import { FormGroup } from "../FormComponents/FormGroup";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await signIn(
        formData.email,
        formData.password,
      );
      if (signInError) {
        setError(signInError.message);
        return;
      }
      const destination = location.state?.from?.pathname ?? "/discovery";
      navigate(destination, { replace: true });
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Sign in failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-1">
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

      {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

      <SubmitButton loading={loading}>Sign in</SubmitButton>
    </form>
  );
}
