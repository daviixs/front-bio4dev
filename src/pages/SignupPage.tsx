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
                  className="pl-10 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  {...register("nome")}
                />
              </div>
              {errors.nome && (
                <p className="text-sm text-red-600">{errors.nome.message}</p>
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
                  className="pl-10 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
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
                  className="pl-10 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  {...register("senha")}
                />
              </div>
              {errors.senha && (
                <p className="text-sm text-red-600">{errors.senha.message}</p>
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
                          valid ? "bg-blue-500" : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs space-y-1">
                    <p
                      className={
                        passwordStrength.length
                          ? "text-blue-600"
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
                  className="pl-10 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                  {...register("confirmarSenha")}
                />
              </div>
              {errors.confirmarSenha && (
                <p className="text-sm text-red-600">
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-lg"
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
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-sm">ou</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Login Link */}
          <p className="text-center text-slate-600">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
