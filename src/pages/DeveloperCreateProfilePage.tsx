import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { profileApi } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/api-errors';
import {
  createDeveloperDraftId,
  isDeveloperTemplateType,
  normalizeDeveloperSlug,
  type DeveloperTemplateType,
} from '@/features/developer-create/shared';
import {
  createDeveloperDraft,
  findReusableDeveloperDraft,
  saveDeveloperDraft,
} from '@/features/developer-create/storage';
import { toast } from 'sonner';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { landingTheme } from '@/theme/landingTheme';

const templateImages: Record<DeveloperTemplateType, string> = {
  template_01: '/images/templates/Portifolio%201.png',
  template_02: '/images/templates/Portifolio%202.png',
  template_03: '/images/templates/Portifolio%203.png',
};

const devTemplates = [
  {
    id: 'template_01',
    name: 'Portfolio Minimalista Dev',
    description: 'Foco total em projetos, GitHub e stack principal.',
    highlights: ['GitHub Integration', 'Tech Stack', 'Experiencia'],
  },
  {
    id: 'template_02',
    name: 'Portfolio Criativo Tech',
    description: 'Visual impactante para destacar produtos e demos.',
    highlights: ['Demos Interativas', 'Cases', 'Highlights'],
  },
  {
    id: 'template_03',
    name: 'Portfolio Corporativo Dev',
    description: 'Layout executivo para consultores e times tech.',
    highlights: ['Experiencia', 'Resultados', 'Credibilidade'],
  },
] as const satisfies ReadonlyArray<{
  id: DeveloperTemplateType;
  name: string;
  description: string;
  highlights: readonly string[];
}>;

const DEVELOPER_CREATE_PROFILE_TOAST_ID = 'developer-create-profile-toast';

export function DeveloperCreateProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<DeveloperTemplateType | null>(null);
  const [isSlugModalOpen, setIsSlugModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [slugError, setSlugError] = useState<string | null>(null);

  const slugPreview = normalizeDeveloperSlug(nameInput);
  const slugRegex = /^[a-z0-9-]{3,60}$/;

  const handleCreate = async (slug: string) => {
    if (!isDeveloperTemplateType(selectedTemplate)) {
      toast.error('Selecione um template para continuar.', {
        id: DEVELOPER_CREATE_PROFILE_TOAST_ID,
      });
      return;
    }

    const normalizedSlug = normalizeDeveloperSlug(slug);
    const displayName = nameInput.trim() || normalizedSlug;

    if (!slugRegex.test(normalizedSlug)) {
      setSlugError(
        'Slug inválido. Use 3-60 caracteres, minúsculas, números e hifens.',
      );
      return;
    }

    setIsLoading(true);

    try {
      const availability = await profileApi.checkSlug(normalizedSlug);
      if (!availability.available) {
        setSlugError(availability.message || 'Slug ja esta em uso.');
        return;
      }

      const reusableDraft = findReusableDeveloperDraft({
        templateType: selectedTemplate,
        slug: normalizedSlug,
      });

      if (reusableDraft) {
        const nextDraft = {
          ...reusableDraft,
          status: 'collecting' as const,
          displayName,
          slug: normalizedSlug,
          updatedAt: new Date().toISOString(),
          profile: {
            ...reusableDraft.profile,
            username: displayName,
            slug: normalizedSlug,
          },
        };

        saveDeveloperDraft(nextDraft);
        navigate(`/onboarding/developer/${reusableDraft.draftId}`);
        return;
      }

      const draft = createDeveloperDraft({
        draftId: createDeveloperDraftId(),
        templateType: selectedTemplate,
        slug: normalizedSlug,
        displayName,
      });

      navigate(`/onboarding/developer/${draft.draftId}`);
    } catch (error: unknown) {
      console.error('Error creating developer draft:', error);
      const message =
        getApiErrorMessage(error) ||
        (error instanceof Error ? error.message : 'Erro ao iniciar rascunho');

      if (message.toLowerCase().includes('slug')) {
        setSlugError(message);
      }

      toast.error(message, {
        id: DEVELOPER_CREATE_PROFILE_TOAST_ID,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSlugModal = () => {
    setSlugError(null);
    setIsSlugModalOpen(true);
  };

  const handleCloseSlugModal = () => {
    if (isLoading) return;
    setIsSlugModalOpen(false);
  };

  const handleConfirmSlug = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setSlugError('Informe seu nome.');
      return;
    }

    if (!slugPreview || !slugRegex.test(slugPreview)) {
      setSlugError(
        'Use 3-60 caracteres, apenas letras minúsculas, números e hifens.',
      );
      return;
    }

    setSlugError(null);
    void handleCreate(slugPreview);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex-1 px-4 py-12 lg:px-6">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 lg:text-4xl">
              Selecione um template Dev
            </h1>
            <p className="text-slate-500">
              Escolha visual, abra rascunho local e edite tudo antes do
              cadastro.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {devTemplates.map((template) => {
              const previewImage = templateImages[template.id];
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-slate-200'
                  }`}
                >
                  {previewImage && (
                    <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-white px-6 pb-4 pt-6">
                      <img
                        src={previewImage}
                        alt={`Preview do ${template.name}`}
                        className="max-h-[360px] w-full object-contain"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-4 p-6 text-left">
                    <div className="text-slate-800">
                      <h3 className="text-lg font-semibold">{template.name}</h3>
                      <p className="text-sm text-slate-500">
                        {template.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {template.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedTemplate && (
        <div className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 transform">
          <button
            onClick={handleOpenSlugModal}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white shadow-xl transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Abrindo editor...
              </>
            ) : (
              <>Começar edição</>
            )}
          </button>
        </div>
      )}

      {isSlugModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div
            className={`w-full max-w-[400px] rounded-3xl p-6 shadow-2xl ${landingTheme.card}`}
          >
            <h2 className="text-xl font-semibold text-slate-900">
              Escolha seu Nome
            </h2>
            <div className="mt-4 space-y-3">
              <label
                htmlFor="slug-name"
                className="text-sm font-semibold text-slate-700"
              >
                Nome
              </label>
              <input
                id="slug-name"
                value={nameInput}
                onChange={(event) => {
                  setNameInput(event.target.value);
                  setSlugError(null);
                }}
                placeholder="Digite seu nome"
                disabled={isLoading}
                className={`h-11 w-full rounded-xl border px-4 text-sm focus:outline-none focus:ring-2 ${landingTheme.input}`}
              />
              <p className={`text-xs ${landingTheme.textMuted}`}>
                Este nome sera usado para gerar seu link personalizado:
                bio4.dev/seunome
              </p>
              <p className={`text-sm ${landingTheme.textSecondary}`}>
                Seu link sera:{' '}
                <span className="font-semibold text-slate-900">
                  bio4.dev/{slugPreview || 'seunome'}
                </span>
              </p>
              {slugError && (
                <p className={`text-sm ${landingTheme.errorText}`}>
                  {slugError}
                </p>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseSlugModal}
                className={`rounded-full px-4 py-2 text-sm transition ${landingTheme.buttonSecondary}`}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSlug}
                disabled={isLoading}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition disabled:opacity-60 ${landingTheme.buttonPrimary}`}
              >
                {isLoading ? 'Abrindo...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
