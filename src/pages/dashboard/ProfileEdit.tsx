import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Loader2, Image, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfileStore } from '@/stores/profileStore';
import { toast } from 'sonner';

const profileSchema = z.object({
  legendaFoto: z.string().url('URL inválida').optional().or(z.literal('')),
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  titulo: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  subtitulo: z.string().optional(),
  descricao: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileEdit() {
  const { profile, updateLegenda } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      legendaFoto: profile?.legenda?.legendaFoto || '',
      nome: profile?.legenda?.nome || '',
      titulo: profile?.legenda?.titulo || '',
      subtitulo: profile?.legenda?.subtitulo || '',
      descricao: profile?.legenda?.descricao || '',
    },
  });

  useEffect(() => {
    if (profile?.legenda) {
      reset({
        legendaFoto: profile.legenda.legendaFoto || '',
        nome: profile.legenda.nome || '',
        titulo: profile.legenda.titulo || '',
        subtitulo: profile.legenda.subtitulo || '',
        descricao: profile.legenda.descricao || '',
      });
    }
  }, [profile?.legenda, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!profile?.legenda?.id) {
      toast.error('Legenda não encontrada');
      return;
    }

    setIsLoading(true);
    try {
      await updateLegenda(profile.legenda.id, {
        ...data,
        profileId: profile.id,
      });
      toast.success('Informações atualizadas!');
    } catch (error) {
      toast.error('Erro ao atualizar informações');
    } finally {
      setIsLoading(false);
    }
  };

  const fotoUrl = watch('legendaFoto');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Informações Pessoais</h1>
        <p className="text-white/50">Edite suas informações de perfil</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Photo Section */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Image className="w-5 h-5 text-emerald-400" />
            Foto de Perfil
          </h2>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-32 h-32 rounded-2xl bg-white/10 overflow-hidden flex-shrink-0">
              {fotoUrl ? (
                <img
                  src={fotoUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-2 w-full">
              <Label className="text-white/70">URL da foto</Label>
              <Input
                {...register('legendaFoto')}
                placeholder="https://exemplo.com/sua-foto.jpg"
                className="bg-white/5 border-white/10 text-white"
              />
              {errors.legendaFoto && (
                <p className="text-sm text-red-400">{errors.legendaFoto.message}</p>
              )}
              <p className="text-xs text-white/40">
                Recomendado: imagem quadrada, mínimo 400x400px
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            Informações Básicas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white/70">Nome</Label>
              <Input
                {...register('nome')}
                placeholder="Seu nome completo"
                className="bg-white/5 border-white/10 text-white"
              />
              {errors.nome && (
                <p className="text-sm text-red-400">{errors.nome.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/70">Título</Label>
              <Input
                {...register('titulo')}
                placeholder="Ex: Desenvolvedor Full Stack"
                className="bg-white/5 border-white/10 text-white"
              />
              {errors.titulo && (
                <p className="text-sm text-red-400">{errors.titulo.message}</p>
              )}
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label className="text-white/70">Subtítulo</Label>
              <Input
                {...register('subtitulo')}
                placeholder="Ex: Especialista em Node.js e React"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            Sobre Você
          </h2>
          
          <div className="space-y-2">
            <Textarea
              {...register('descricao')}
              placeholder="Conte um pouco sobre você, sua experiência e o que você faz..."
              rows={5}
              className="bg-white/5 border-white/10 text-white resize-none"
            />
            {errors.descricao && (
              <p className="text-sm text-red-400">{errors.descricao.message}</p>
            )}
            <p className="text-xs text-white/40 text-right">
              {watch('descricao')?.length || 0}/500
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !isDirty}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

