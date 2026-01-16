import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "./TextInput";
import { RememberMe } from "./RememberMe";
import { SocialLoginButton } from "./SocialLoginButton";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRememberMeChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      clearError();
      const { hasProfile } = await login(formData.email, formData.password);
      toast.success("Login realizado com sucesso!");

      // Redirecionar para dashboard
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao fazer login");
    }
  };

  const handleGoogleLogin = () => {
    // Lógica de login com Google será implementada depois
    console.log("Google login clicked");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 lg:mb-10">
        {/* Substituir com o logo real do Figma */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-lg">U</span>
        </div>
        <span className="text-xl font-bold text-gray-900">UI Unicorn</span>
      </div>

      {/* Título */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
        Nice to see you again
      </h1>

      {/* Campo Email/Telefone */}
      <div className="mb-4">
        <TextInput
          label="Login"
          type="email"
          name="email"
          id="email"
          placeholder="Email or phone number"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Campo Senha */}
      <div className="mb-4">
        <TextInput
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleInputChange}
          required
          showPasswordToggle
        />
      </div>

      {/* Remember Me e Forgot Password */}
      <div className="flex items-center justify-between mb-6">
        <RememberMe
          checked={formData.rememberMe}
          onChange={handleRememberMeChange}
        />
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      {/* Botão Sign In */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800
          text-white font-semibold py-3 px-4 rounded-lg
          transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
          shadow-sm hover:shadow-md
          mb-6
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        "
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      {/* Divisor horizontal */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Botão Social Login */}
      <div className="mb-6">
        <SocialLoginButton provider="google" onClick={handleGoogleLogin} />
      </div>

      {/* Sign Up Link */}
      <div className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          Sign up now
        </a>
      </div>
    </form>
  );
}
