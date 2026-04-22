import React, { useState } from 'react';
import { Legenda, Profile } from '@/types';
import { template01Theme } from '@/theme/template01Theme';
import { EditableField } from './EditableField';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showPortfolioEditorError } from './portfolioEditorToast';

type LegendaEditableField =
  | 'legendaFoto'
  | 'greeting'
  | 'nome'
  | 'titulo'
  | 'subtitulo'
  | 'descricao';

interface EditableHeroProps {
  profile?: Profile;
  legenda?: Legenda;
  onLegendaUpdate?: (
    field: LegendaEditableField,
    value: string,
  ) => Promise<void>;
  onAvatarUpdate?: (url: string) => Promise<void>;
}

const normalizeAvatarUrl = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return {
      value: undefined,
      error: 'URL da imagem invalida',
    };
  }

  const normalizedValue = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  try {
    const parsedUrl = new URL(normalizedValue);

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return {
        value: undefined,
        error: 'URL da imagem deve usar http ou https',
      };
    }

    return {
      value: parsedUrl.toString(),
      error: undefined,
    };
  } catch {
    return {
      value: undefined,
      error: 'URL da imagem invalida',
    };
  }
};

export function EditableHero({
  profile,
  legenda,
  onLegendaUpdate,
  onAvatarUpdate,
}: EditableHeroProps) {
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const currentAvatarUrl = profile?.avatarUrl || legenda?.legendaFoto || '';
  const previewAvatarUrl =
    avatarUrlInput ||
    currentAvatarUrl ||
    'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQ5MjIxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

  const handleFieldUpdate = async (
    field: LegendaEditableField,
    value: string,
  ) => {
    if (onLegendaUpdate) {
      await onLegendaUpdate(field, value);
    }
  };

  const handleAvatarClick = () => {
    setAvatarUrlInput(currentAvatarUrl);
    setIsAvatarDialogOpen(true);
  };

  const handleAvatarSave = async () => {
    if (!onAvatarUpdate) return;

    const normalizedAvatarUrl = normalizeAvatarUrl(avatarUrlInput);

    if (normalizedAvatarUrl.error || !normalizedAvatarUrl.value) {
      showPortfolioEditorError(
        normalizedAvatarUrl.error || 'URL da imagem invalida',
      );
      return;
    }

    try {
      setIsSavingAvatar(true);
      await onAvatarUpdate(normalizedAvatarUrl.value);
      setAvatarUrlInput(normalizedAvatarUrl.value);
      setIsAvatarDialogOpen(false);
    } catch (error) {
      console.error('Erro ao salvar avatar:', error);
    } finally {
      setIsSavingAvatar(false);
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 py-20 ${template01Theme.pageBg}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Imagem de Perfil */}
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={handleAvatarClick}
            className="relative group rounded-full focus:outline-none focus:ring-2 focus:ring-[#c9b6a1]/60"
            aria-label="Editar imagem do perfil"
          >
            <img
              src={previewAvatarUrl}
              alt={legenda?.nome || 'Desenvolvedor'}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#d8c7b4] shadow-[0_24px_48px_-28px_rgba(24,33,43,0.28)] cursor-pointer hover:opacity-80 transition-opacity"
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-[#efe8de]"></div>
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[#18212b]/0 group-hover:bg-[#18212b]/12 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Pencil className="h-6 w-6 text-[#fffdf9]" />
            </div>
          </button>
        </div>

        {/* Saudação */}
        <div className="mb-4">
          <EditableField
            value={legenda?.greeting || 'Olá, eu sou'}
            onSave={(value) => handleFieldUpdate('greeting', value)}
            placeholder="Olá, eu sou"
            className={template01Theme.textSecondary}
          />
        </div>

        {/* Nome */}
        <div className="mb-6">
          <div
            className={`text-5xl md:text-7xl font-bold ${template01Theme.textPrimary}`}
          >
            <EditableField
              value={legenda?.nome || ''}
              onSave={(value) => handleFieldUpdate('nome', value)}
              placeholder="Seu nome"
              className={template01Theme.textPrimary}
            />
          </div>
        </div>

        {/* Frase de apresentação */}
        <div className="mb-8">
          <div
            className={`text-2xl md:text-3xl ${template01Theme.textSecondary}`}
          >
            <EditableField
              value={legenda?.titulo || ''}
              onSave={(value) => handleFieldUpdate('titulo', value)}
              placeholder="Eu construo coisas para web"
              className={template01Theme.textSecondary}
            />
          </div>
        </div>

        {/* Subtitulo */}
        <div className="mb-6">
          <div className={`text-xl md:text-2xl ${template01Theme.textMuted}`}>
            <EditableField
              value={legenda?.subtitulo || ''}
              onSave={(value) => handleFieldUpdate('subtitulo', value)}
              placeholder="Subtitulo ou chamada auxiliar"
              className={template01Theme.textMuted}
            />
          </div>
        </div>

        {/* Descrição adicional */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className={template01Theme.textSecondary}>
            <EditableField
              value={legenda?.descricao || ''}
              onSave={(value) => handleFieldUpdate('descricao', value)}
              type="textarea"
              multiline
              placeholder="Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis..."
              className={template01Theme.textSecondary}
            />
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projetos"
            className={`px-8 py-3 rounded-lg transition-all hover:shadow-xl hover:scale-105 ${template01Theme.primaryButton}`}
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className={`px-8 py-3 rounded-lg transition-all hover:shadow-xl hover:scale-105 ${template01Theme.secondaryButton}`}
          >
            Entre em Contato
          </a>
        </div>
      </div>

      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar imagem</DialogTitle>
            <DialogDescription>
              Cole link da imagem que deve aparecer no portfolio.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border border-[#d8c7b4]/50 bg-[#f7f3ec]">
              <img
                src={previewAvatarUrl}
                alt={legenda?.nome || 'Desenvolvedor'}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio1-avatar-url">Image URL</Label>
              <Input
                id="portfolio1-avatar-url"
                type="url"
                value={avatarUrlInput}
                onChange={(event) => setAvatarUrlInput(event.target.value)}
                placeholder="https://exemplo.com/avatar.jpg"
                disabled={isSavingAvatar}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setAvatarUrlInput(currentAvatarUrl);
                setIsAvatarDialogOpen(false);
              }}
              disabled={isSavingAvatar}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleAvatarSave}
              disabled={isSavingAvatar}
            >
              {isSavingAvatar ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
