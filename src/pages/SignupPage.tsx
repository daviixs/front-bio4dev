import React from "react";
import { SocialLoginButton } from "@/components/Auth/SocialLoginButton";
import { useAuthStore } from "@/stores/authStore";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export function SignupPage() {
  const { loginWithGoogle, isLoading, error } = useAuthStore();

  return (
    <div className="flex min-h-screen flex-col app-shell">
      <Header />

      <div className="flex flex-1 items-center justify-center px-4 py-12 lg:px-6">
        <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[rgba(236,229,217,0.14)] bg-[#1b1613]/80 px-8 py-10 text-center shadow-[0_24px_60px_-32px_rgba(0,0,0,0.7)] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-white/3" />
          <div className="relative mb-6 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">Acesso seguro</p>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
              Acesse com Google
            </h1>
            <p className="text-sm text-foreground/65">
              Autenticação segura com OAuth 2.0. Nenhuma senha é armazenada.
            </p>
          </div>

          {error && (
            <div className="relative z-10 p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-200 text-sm">
              {error}
            </div>
          )}

          <SocialLoginButton
            provider="google"
            onClick={loginWithGoogle}
            disabled={isLoading}
            label={isLoading ? "Redirecionando..." : "Continuar com Google"}
          />

          <p className="text-xs text-foreground/60 mt-4">
            Ao continuar, você concorda em compartilhar seu email e nome com o Bio4Dev.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
