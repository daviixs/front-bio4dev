import React from "react";
import { SocialLoginButton } from "@/components/Auth/SocialLoginButton";
import { useAuthStore } from "@/stores/authStore";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export function SignupPage() {
  const { loginWithGoogle, isLoading, error } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex flex-1 items-center justify-center px-4 py-12 lg:px-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Acesse com Google
            </h1>
            <p className="mt-2 text-slate-600">
              Autenticação segura com OAuth 2.0. Nenhuma senha é armazenada.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <SocialLoginButton
            provider="google"
            onClick={loginWithGoogle}
            disabled={isLoading}
            label={isLoading ? "Redirecionando..." : "Continuar com Google"}
          />

          <p className="text-xs text-slate-500">
            Ao continuar, você concorda em compartilhar seu email e nome com o Bio4Dev.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
