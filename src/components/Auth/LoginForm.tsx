import React from "react";
import { SocialLoginButton } from "./SocialLoginButton";
import { useAuthStore } from "@/stores/authStore";

export function LoginForm() {
  const { loginWithGoogle, isLoading, error } = useAuthStore();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-8 lg:mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-lg">B</span>
        </div>
        <span className="text-xl font-bold text-gray-900">Bio4Dev</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Entrar com Google
      </h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <SocialLoginButton
        provider="google"
        onClick={loginWithGoogle}
        disabled={isLoading}
        label={isLoading ? "Redirecionando..." : "Continuar com Google"}
      />
    </div>
  );
}
