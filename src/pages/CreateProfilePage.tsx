import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Code2, AtSign, FileText, Image, ArrowRight, Loader2, Palette, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { profileApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

const profileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username deve ter pelo menos 3 caracteres')
    .max(30, 'Username deve ter no máximo 30 caracteres')
    .regex(/^[a-z0-9_-]+$/, 'Username só pode conter letras minúsculas, números, _ e -'),
  bio: z.string().max(500, 'Bio deve ter no máximo 500 caracteres').optional(),
  avatarUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const templates = [
  {
    id: 'template_01',
    name: 'Minimal',
    description: 'Clean e profissional',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-slate-500 to-slate-700',
    preview: 'bg-gradient-to-br from-slate-900 to-slate-800',
  },
  {
    id: 'template_02',
    name: 'Neon',
    description: 'Moderno e vibrante',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-cyan-500',
    preview: 'bg-gradient-to-br from-emerald-900 to-cyan-900',
  },
  {
    id: 'template_03',
    name: 'Creative',
    description: 'Criativo e único',
    icon: <Rocket className="w-6 h-6" />,
    gradient: 'from-purple-500 to-pink-500',
    preview: 'bg-gradient-to-br from-purple-900 to-pink-900',
  },
] as const;

export function CreateProfilePage() {
  const navigate = useNavigate();
  const { user, setProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'template_01' | 'template_02' | 'template_03'>('template_02');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const username = watch('username', '');

  const onSubmit = async (data: ProfileFormData) => {
    // Obter userId do localStorage (temporário) ou do user logado
    const userId = user?.id || localStorage.getItem('bio4dev_temp_user_id');
    
    if (!userId) {
      toast.error('Usuário não encontrado. Crie uma conta primeiro.');
      navigate('/signup');
      return;
    }

    setIsLoading(true);
    try {
      const response = await profileApi.create({
        userId,
        username: data.username,
        bio: data.bio || undefined,
        avatarUrl: data.avatarUrl || undefined,
        templateType: selectedTemplate,
        published: false,
      });

      // Salvar profileId para usar no setup
      localStorage.setItem('bio4dev_profile_id', response.profile.id);
      
      toast.success('Perfil criado com sucesso!');
      navigate('/setup');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao criar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-12 px-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mx-auto mb-6">
            <Code2 className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Crie seu perfil</h1>
          <p className="text-white/50 text-lg">
            Escolha seu username e template para começar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Username e Bio */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/70 flex items-center gap-2">
                  <AtSign className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="seuusername"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-emerald-500/20 text-lg py-6"
                  {...register('username')}
                />
                {errors.username && (
                  <p className="text-sm text-red-400">{errors.username.message}</p>
                )}
                {username && !errors.username && (
                  <p className="text-sm text-emerald-400">
                    Seu link: bio4dev.com/{username}
                  </p>
                )}
              </div>

              {/* Avatar URL */}
              <div className="space-y-2">
                <Label htmlFor="avatarUrl" className="text-white/70 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  URL do Avatar (opcional)
                </Label>
                <Input
                  id="avatarUrl"
                  type="url"
                  placeholder="https://exemplo.com/avatar.jpg"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-emerald-500/20"
                  {...register('avatarUrl')}
                />
                {errors.avatarUrl && (
                  <p className="text-sm text-red-400">{errors.avatarUrl.message}</p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white/70 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Bio curta (opcional)
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Uma breve descrição sobre você..."
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
                  {...register('bio')}
                />
                {errors.bio && (
                  <p className="text-sm text-red-400">{errors.bio.message}</p>
                )}
              </div>
            </div>

            {/* Preview Card */}
            <div className="flex items-center justify-center">
              <div className={`w-full max-w-sm aspect-[3/4] rounded-2xl ${templates.find(t => t.id === selectedTemplate)?.preview} p-6 border border-white/10`}>
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 mb-4 overflow-hidden">
                    {watch('avatarUrl') ? (
                      <img
                        src={watch('avatarUrl')}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30">
                        <Image className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {username || 'seuusername'}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-3">
                    {watch('bio') || 'Sua bio aparecerá aqui...'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Escolha seu template</h2>
              <p className="text-white/50">Você pode trocar depois a qualquer momento</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedTemplate === template.id
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.gradient} flex items-center justify-center mb-4 text-white`}>
                    {template.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-white/50">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold px-12 py-6 text-lg rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Continuar para Configuração
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

