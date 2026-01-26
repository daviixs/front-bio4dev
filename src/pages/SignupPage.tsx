import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { landingTheme } from "@/theme/landingTheme";

const signupSchema = z
  .object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const senha = watch("senha", "");
  const passwordStrength = {
    length: senha.length >= 6,
    hasNumber: /\d/.test(senha),
    hasSpecial: /[!@#$%^&*]/.test(senha),
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      clearError();
      const user = await signup(data.email, data.senha, data.nome);
      toast.success("Conta criada com sucesso!");
      // Usuário já está logado automaticamente após signup
      navigate("/profile/type");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao criar conta");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 lg:px-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Criar conta
            </h1>
            <p className="mt-2 text-slate-600">
              Comece a criar seu portfólio profissional agora.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-slate-700">
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  className={`pl-10 ${landingTheme.input}`}
                  {...register("nome")}
                />
              </div>
              {errors.nome && (
                <p className={`text-sm ${landingTheme.errorText}`}>
                  {errors.nome.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={`pl-10 ${landingTheme.input}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className={`text-sm ${landingTheme.errorText}`}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="senha" className="text-slate-700">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-10 ${landingTheme.input}`}
                  {...register("senha")}
                />
              </div>
              {errors.senha && (
                <p className={`text-sm ${landingTheme.errorText}`}>
                  {errors.senha.message}
                </p>
              )}

              {/* Password Strength */}
              {senha && (
                <div className="space-y-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex gap-2">
                    {[
                      passwordStrength.length,
                      passwordStrength.hasNumber,
                      passwordStrength.hasSpecial,
                    ].map((valid, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                          valid ? landingTheme.accentBg : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs space-y-1">
                    <p
                      className={
                        passwordStrength.length
                          ? landingTheme.accentText
                          : "text-slate-400"
                      }
                    >
                      ✓ Mínimo 6 caracteres
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha" className="text-slate-700">
                Confirmar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="confirmarSenha"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-10 ${landingTheme.input}`}
                  {...register("confirmarSenha")}
                />
              </div>
              {errors.confirmarSenha && (
                <p className={`text-sm ${landingTheme.errorText}`}>
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div
                className={`p-3 rounded-lg text-sm ${landingTheme.errorBox}`}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className={`flex-1 font-semibold py-6 rounded-lg ${landingTheme.buttonPrimary}`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Criar Conta
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 font-semibold py-6 rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50"
                onClick={() => navigate("/login")}
              >
                Fazer Login
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
