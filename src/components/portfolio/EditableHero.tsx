import React from 'react';
import { Legenda, Profile } from '@/types';
import { template01Theme } from '@/theme/template01Theme';
import { EditableField } from './EditableField';
import { Pencil } from 'lucide-react';

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

export function EditableHero({
  profile,
  legenda,
  onLegendaUpdate,
  onAvatarUpdate,
}: EditableHeroProps) {
  const handleFieldUpdate = async (
    field: LegendaEditableField,
    value: string,
  ) => {
    if (onLegendaUpdate) {
      await onLegendaUpdate(field, value);
    }
  };

  const handleAvatarClick = async () => {
    const url = prompt('Digite a URL do avatar:');
    if (url && onAvatarUpdate) {
      await onAvatarUpdate(url);
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 py-20 ${template01Theme.pageBg}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Imagem de Perfil */}
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            <img
              src={
                profile?.avatarUrl ||
                legenda?.legendaFoto ||
                'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQ5MjIxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              }
              alt={legenda?.nome || 'Desenvolvedor'}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#a69b98] shadow-[0_24px_48px_-28px_rgba(74,65,62,0.6)] cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleAvatarClick}
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-[#a69b98]"></div>
            <div className="absolute inset-0 rounded-full bg-[#4a413e]/0 group-hover:bg-[#4a413e]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Pencil className="h-6 w-6 text-[#c5b9b7]" />
            </div>
          </div>
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
    </section>
  );
}
