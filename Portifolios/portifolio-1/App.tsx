import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { WorkHistory } from './components/WorkHistory';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { profileApi } from '@/lib/api';
import { ProfileComplete } from '@/types';

export default function App() {
  const [profile, setProfile] = useState<ProfileComplete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // No futuro, o slug pode vir da URL (ex: daviixs.bio4dev.com ou bio4dev.com/daviixs)
  const slug = 'joaosilva'; // Slug para teste

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const data = await profileApi.getBySlug(slug);
        setProfile(data);
      } catch (err: any) {
        console.error('Erro ao buscar perfil:', err);
        setError(err.message || 'Erro ao carregar o perfil');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ops! Perfil não encontrado</h1>
        <p className="text-gray-600 mb-8">{error || 'O perfil que você está procurando não existe ou não está publicado.'}</p>
        <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Voltar para Home
        </a>
      </div>
    );
  }

  const legenda = profile.legendas?.[0];

  return (
    <div className="min-h-screen">
      {/* Seção Hero/Inicial */}
      <Hero profile={profile} legenda={legenda} />

      {/* Seção Tech Stack */}
      <TechStack techStack={profile.techStack} />

      {/* Seção de Histórico de Trabalho */}
      <WorkHistory workHistory={profile.workHistory} />

      {/* Seção de Projetos */}
      <Projects projects={profile.projetos} />

      {/* Rodapé */}
      <Footer footer={profile.footer} socials={profile.social} />
    </div>
  );
}
