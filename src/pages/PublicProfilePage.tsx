import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code2, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileApi } from '@/lib/api';
import { Template01, Template02, Template03 } from '@/templates';
import type { ProfileComplete } from '@/types';

export function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileComplete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!username) {
        setError('Username não encontrado');
        setIsLoading(false);
        return;
      }

      try {
        const data = await profileApi.getByUsername(username);
        
        if (!data.published) {
          setError('Este perfil não está publicado');
          setIsLoading(false);
          return;
        }
        
        setProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Perfil não encontrado');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-white/50">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {error || 'Perfil não encontrado'}
          </h1>
          <p className="text-white/50 mb-8">
            O perfil que você está procurando não existe ou não está disponível.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Render Template based on templateType
  const renderTemplate = () => {
    switch (profile.templateType) {
      case 'template_01':
        return <Template01 profile={profile} />;
      case 'template_02':
        return <Template02 profile={profile} />;
      case 'template_03':
        return <Template03 profile={profile} />;
      default:
        return <Template02 profile={profile} />;
    }
  };

  return renderTemplate();
}

