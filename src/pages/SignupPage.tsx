import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Code2, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

const signupSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmarSenha: z.string(),
}).refine(data => data.senha === data.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
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

  const senha = watch('senha', '');
  const passwordStrength = {
    length: senha.length >= 6,
    hasNumber: /\d/.test(senha),
    hasSpecial: /[!@#$%^&*]/.test(senha),
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      clearError();
      const user = await signup(data.email, data.senha, data.nome);
      toast.success('Conta criada com sucesso!');
      // Salvar userId temporariamente e redirecionar para criação de perfil
      localStorage.setItem('bio4dev_temp_user_id', user.id);
      navigate('/profile/create');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao criar conta');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-purple-500/10 border-r border-white/5 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-cyan-500/20 rounded-full blur-[100px]" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Content */}
        <div className="relative z-10 max-w-md px-8">
          <h2 className="text-4xl font-bold mb-6">
            Junte-se a{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              500+ desenvolvedores
            </span>
          </h2>
          
          <div className="space-y-4">
            {[
              'Crie um portfólio profissional em minutos',
              'Escolha entre 3 templates exclusivos',
              'Compartilhe seu link personalizado',
              '100% gratuito, para sempre',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">Bio4Dev</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Criar conta</h1>
            <p className="text-white/50">
              Comece a criar seu portfólio profissional agora.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-white/70">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-emerald-500/20"
                  {...register('nome')}
                />
              </div>
              {errors.nome && (
                <p className="text-sm text-red-400">{errors.nome.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-emerald-500/20"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="senha" className="text-white/70">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-emerald-500/20"
                  {...register('senha')}
                />
              </div>
              {errors.senha && (
                <p className="text-sm text-red-400">{errors.senha.message}</p>
              )}
              
              {/* Password Strength */}
              {senha && (
                <div className="space-y-2 p-3 rounded-lg bg-white/5">
                  <div className="flex gap-2">
                    {[passwordStrength.length, passwordStrength.hasNumber, passwordStrength.hasSpecial].map((valid, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                          valid ? 'bg-emerald-500' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs space-y-1">
                    <p className={passwordStrength.length ? 'text-emerald-400' : 'text-white/30'}>
                      ✓ Mínimo 6 caracteres
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha" className="text-white/70">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="confirmarSenha"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-emerald-500/20"
                  {...register('confirmarSenha')}
                />
              </div>
              {errors.confirmarSenha && (
                <p className="text-sm text-red-400">{errors.confirmarSenha.message}</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold py-6 rounded-xl"
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
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-sm">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

        </div>
      </div>
    </div>
  );
}

