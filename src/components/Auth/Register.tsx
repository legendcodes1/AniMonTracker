import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import { SubmitButton } from "./SubmitButton";
import { FormGroup } from "../FormComponents/FormGroup";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signUpError, confirmationRequired } = await signUp(
        formData.email,
        formData.password,
        formData.username,
      );

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      navigate("/login", {
        replace: true,
        state: {
          registrationSuccess: true,
          confirmationRequired,
          email: formData.email,
        },
      });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-1">
      <FormGroup
        label="Username"
        type="text"
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

      {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

      <SubmitButton loading={loading}>Create account</SubmitButton>
    </form>
  );
}
