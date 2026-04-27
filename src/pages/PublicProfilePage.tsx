import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { landingTheme } from '@/theme/landingTheme';
import { PortfolioService } from '../services/api/portfolio.service';
import { TemplateRenderer } from '../components/templates';
import type { PortfolioData } from '../services/api/types';

export function PublicProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!slug) {
        setError('Slug não encontrado');
        setIsLoading(false);
        return;
      }

      try {
        // Verifica se há token de preview na URL
        const urlParams = new URLSearchParams(window.location.search);
        const previewToken = urlParams.get('preview');

        // Usa o slug (username) para buscar o portfolio
        const data = await PortfolioService.getBySlug(
          slug,
          previewToken || undefined,
        );

        if (previewToken) {
          setIsPreview(true);
        }

        setProfile(data);
        document.title = `${data.username} | Bio4Dev`;
      } catch (err: any) {
        console.error('Erro ao carregar perfil:', err);

        // Tratamento específico de erros baseado nas mensagens do serviço
        if (err.message === 'INVALID_PREVIEW_TOKEN') {
          setError(
            'Link de preview expirado ou inválido. Solicite um novo link.',
          );
        } else if (err.message === 'PORTFOLIO_NOT_PUBLISHED') {
          setError(
            'Este perfil não está publicado e você não tem permissão para visualizá-lo.',
          );
        } else if (err.message === 'PORTFOLIO_NOT_FOUND') {
          setError('Perfil não encontrado.');
        } else {
          setError('Erro ao carregar perfil. Tente novamente mais tarde.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [slug]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className={`w-12 h-12 animate-spin mx-auto mb-4 ${landingTheme.accentText}`}
          />
          <p className="text-white/50">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <p
              className={`mb-2 text-sm font-semibold uppercase tracking-[0.2em] ${landingTheme.accentText}`}
            >
              Perfil indisponivel
            </p>
            <h1 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              {error || 'Perfil nao encontrado'}
            </h1>
            <p className={`mb-8 text-base ${landingTheme.textSecondary}`}>
              O perfil que voce esta procurando nao existe, foi removido ou
              ainda nao esta disponivel publicamente.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/">
                <Button
                  className={`rounded-full px-6 py-2 font-semibold ${landingTheme.buttonPrimary}`}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Voltar ao Inicio
                </Button>
              </Link>
              <Link to="/profile/type">
                <Button
                  variant="outline"
                  className={`rounded-full px-6 py-2 ${landingTheme.buttonSecondary}`}
                >
                  Criar meu portfolio
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Renderiza o template dinamicamente com base no templateType
  return (
    <>
      {/* TemplateRenderer renderiza automaticamente o template correto */}
      <TemplateRenderer data={profile} previewMode={isPreview} />
    </>
  );
}
