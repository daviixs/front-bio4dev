import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, X } from 'lucide-react';

import {
  footerApi,
  legendaApi,
  profileApi,
  projetosApi,
  socialApi,
  techStackApi,
  workExperienceApi,
} from '@/lib/api';
import type {
  Footer,
  Legenda,
  ProfileComplete,
  Projeto,
  Technology,
  WorkExperience,
} from '@/types';
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
import { Textarea } from '@/components/ui/textarea';
import { EditableField } from './EditableField';
import { TechIcon } from './TechIcon';
import {
  PORTFOLIO3_DEFAULT_HEADLINE,
  PORTFOLIO3_SOCIAL_SLOTS,
  Portfolio3FooterSection,
  Portfolio3HeroSection,
  Portfolio3Layout,
  Portfolio3ProjectsSection,
  Portfolio3TechStackSection,
  Portfolio3ExperienceSection,
  findPortfolio3Social,
  getPortfolio3HeroHeadline,
  getPortfolio3Initials,
  getPortfolio3ExperienceDescription,
  isPortfolio3ColorToken,
} from './portfolio3Shared';
import { TECH_OPTIONS, type TechOption } from './EditablePortfolio1';
import {
  showPortfolioEditorError,
  showPortfolioEditorSuccess,
} from './portfolioEditorToast';

interface EditablePortfolio3Props {
  profile: ProfileComplete;
  onProfileUpdate?: () => void;
}

type LegendaEditableField =
  | 'greeting'
  | 'nome'
  | 'titulo'
  | 'descricao'
  | 'legendaFoto';

type FooterEditableField = 'subtitle' | 'email' | 'resumeUrl';

type SocialSlotId = (typeof PORTFOLIO3_SOCIAL_SLOTS)[number]['id'];

const actionButtonClassName =
  'inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#171717] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#444] hover:bg-[#1e1e1e]';

const PROJECT_FALLBACK_IMAGE_URL =
  'https://picsum.photos/seed/portfolio3-project/800/600';

const LOCAL_HOST_SUFFIXES = [
  '.local',
  '.internal',
  '.lan',
  '.home',
  '.localdomain',
];

const SINGLE_LABEL_HOST_REGEX = /^[a-z0-9-]+$/i;

const isValidIpv4Host = (value: string) =>
  /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value) &&
  value.split('.').every((segment) => {
    const parsedSegment = Number(segment);
    return parsedSegment >= 0 && parsedSegment <= 255;
  });

const getHostnameCandidate = (value: string) => {
  const withoutProtocol = value
    .trim()
    .replace(/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//, '');
  const rawHost = withoutProtocol.split(/[/?#]/)[0] || '';

  return rawHost.replace(/:\d+$/, '').replace(/^\[|\]$/g, '');
};

const isLocalNetworkInput = (value: string) => {
  const hostname = getHostnameCandidate(value).toLowerCase();

  if (!hostname) {
    return false;
  }

  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    LOCAL_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix)) ||
    isValidIpv4Host(hostname) ||
    hostname.includes(':')
  ) {
    return true;
  }

  return (
    SINGLE_LABEL_HOST_REGEX.test(hostname) &&
    /:\d+(?:$|[/?#])/.test(value.trim())
  );
};

const looksLikeUrlCandidate = (value: string) => {
  const trimmed = value.trim();
  const hostname = getHostnameCandidate(trimmed).toLowerCase();

  if (!trimmed || !hostname) {
    return false;
  }

  if (isLocalNetworkInput(trimmed)) {
    return true;
  }

  return hostname.includes('.');
};

const isAllowedUrlHostname = (
  hostname: string,
  hadProtocol: boolean,
  parsedPort: string,
) => {
  const normalizedHostname = hostname.toLowerCase();

  if (
    normalizedHostname === 'localhost' ||
    normalizedHostname.endsWith('.localhost') ||
    LOCAL_HOST_SUFFIXES.some((suffix) => normalizedHostname.endsWith(suffix)) ||
    isValidIpv4Host(normalizedHostname) ||
    normalizedHostname.includes(':') ||
    normalizedHostname.includes('.')
  ) {
    return true;
  }

  return (
    SINGLE_LABEL_HOST_REGEX.test(normalizedHostname) &&
    (hadProtocol || Boolean(parsedPort))
  );
};

const normalizeHttpUrl = (value: string, fieldLabel: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return { value: undefined as string | undefined };
  }

  const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed);

  if (!hasProtocol && !looksLikeUrlCandidate(trimmed)) {
    return { error: `${fieldLabel} inválido` };
  }

  const normalized = hasProtocol
    ? trimmed
    : `${isLocalNetworkInput(trimmed) ? 'http' : 'https'}://${trimmed}`;

  try {
    const parsed = new URL(normalized);

    if (
      !['http:', 'https:'].includes(parsed.protocol) ||
      !isAllowedUrlHostname(parsed.hostname, hasProtocol, parsed.port)
    ) {
      throw new Error('unsupported_protocol');
    }

    return { value: parsed.toString() };
  } catch {
    return { error: `${fieldLabel} inválido` };
  }
};

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return '';

  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

function EditablePortfolio3ResumeButton({
  resumeUrl,
  onResumeUpdate,
}: {
  resumeUrl?: string;
  onResumeUpdate: (url: string) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(resumeUrl || '');

  useEffect(() => {
    setTempUrl(resumeUrl || '');
  }, [resumeUrl]);

  const handleSave = async () => {
    try {
      await onResumeUpdate(tempUrl.trim());
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar currículo:', error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        {resumeUrl ? 'Edit CV Link' : 'Add CV Link'}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar link do currículo</DialogTitle>
            <DialogDescription>
              Cole o link direto do seu currículo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="portfolio3-resume-url">URL do currículo</Label>
              <Input
                id="portfolio3-resume-url"
                type="url"
                value={tempUrl}
                onChange={(event) => setTempUrl(event.target.value)}
                placeholder="https://exemplo.com/curriculo.pdf"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setTempUrl(resumeUrl || '');
                setIsOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AddTechDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (tech: Technology) => void;
}) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<TechOption | null>(null);

  const filtered = TECH_OPTIONS.filter((tech) =>
    tech.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleConfirm = () => {
    const base =
      selected ||
      (search.trim()
        ? {
            name: search.trim(),
            icon: 'lucide:code-2',
            color: 'text-[#FF6B35]',
          }
        : null);

    if (!base) return;

    onAdd({
      id: Date.now().toString(),
      techStackId: '',
      name: base.name,
      icon: base.icon,
      color: base.color || 'text-[#FF6B35]',
      ordem: 0,
    });

    setSearch('');
    setSelected(null);
    onOpenChange(false);
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSearch('');
      setSelected(null);
    }

    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar tecnologia</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar tecnologia (ex: React, Python)..."
          />

          <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
            {filtered.map((tech) => (
              <button
                key={tech.name}
                type="button"
                onClick={() => setSelected(tech)}
                className={`rounded-xl border p-2 text-left transition-colors ${
                  selected?.name === tech.name
                    ? 'border-[#FF6B35] bg-[#FFF3ED]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="mb-2">
                  <TechIcon
                    icon={tech.icon}
                    size={22}
                    className={tech.color || 'text-[#FF6B35]'}
                  />
                </div>
                <span className="text-sm text-slate-900">{tech.name}</span>
              </button>
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full text-sm text-slate-500">
                Nenhuma tecnologia encontrada.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => handleDialogChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditablePortfolio3({
  profile,
  onProfileUpdate,
}: EditablePortfolio3Props) {
  const [localProfile, setLocalProfile] = useState(profile);

  const [isTechDialogOpen, setIsTechDialogOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Projeto | null>(null);
  const [editingWork, setEditingWork] = useState<WorkExperience | null>(null);
  const [editingSocialSlot, setEditingSocialSlot] =
    useState<SocialSlotId | null>(null);

  const [projectForm, setProjectForm] = useState({
    nome: '',
    descricao: '',
    demoLink: '',
    codeLink: '',
    gif: '',
    tags: '',
  });
  const [workForm, setWorkForm] = useState({
    company: '',
    summary: '',
    period: '',
    description: '',
  });
  const [socialUrl, setSocialUrl] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [avatarUrlInput, setAvatarUrlInput] = useState('');

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const legenda = localProfile.legendas?.[0];
  const heroHeadline = getPortfolio3HeroHeadline(legenda);
  const techs = localProfile.techStack?.technologies || [];
  const projects = localProfile.projetos || [];
  const workHistory = localProfile.workHistory || [];

  const footerDescription =
    localProfile.footer?.subtitle || legenda?.descricao || '';
  const footerEmail = localProfile.footer?.email || '';

  const socialLinks = useMemo(
    () =>
      PORTFOLIO3_SOCIAL_SLOTS.map((slot) => {
        const existing = findPortfolio3Social(localProfile.social, slot.id);

        return {
          id: slot.id,
          label: existing?.url ? slot.label : `Adicionar ${slot.label}`,
          url: existing?.url,
          icon: slot.icon,
          onClick: () => openSocialModal(slot.id),
        };
      }),
    [localProfile.social],
  );

  const buildLegendaDefaults = (
    field?: LegendaEditableField,
    value?: string,
  ) => ({
    profileId: localProfile.id,
    legendaFoto:
      field === 'legendaFoto'
        ? value || ''
        : legenda?.legendaFoto || localProfile.avatarUrl || '',
    greeting: field === 'greeting' ? value || '' : legenda?.greeting || '',
    nome:
      field === 'nome'
        ? value ||
          localProfile.user?.nome ||
          localProfile.username ||
          'M Portfolio'
        : legenda?.nome ||
          localProfile.user?.nome ||
          localProfile.username ||
          'M Portfolio',
    titulo:
      field === 'titulo'
        ? value || PORTFOLIO3_DEFAULT_HEADLINE
        : legenda?.titulo || PORTFOLIO3_DEFAULT_HEADLINE,
    subtitulo:
      legenda?.subtitulo ||
      legenda?.titulo ||
      legenda?.descricao?.slice(0, 255) ||
      'Developer portfolio',
    descricao:
      field === 'descricao'
        ? value ||
          'Descreva aqui sua atuação, experiência e o que você está construindo.'
        : legenda?.descricao ||
          'Descreva aqui sua atuação, experiência e o que você está construindo.',
  });

  const handleHeadlineUpdate = async (value: string) => {
    if (!localProfile.id) {
      showPortfolioEditorError('Perfil não encontrado');
      return;
    }

    try {
      let legendaId = legenda?.id;

      if (!legendaId) {
        const response = await legendaApi.create({
          ...buildLegendaDefaults('titulo', value),
          greeting: '',
          titulo: value,
        });
        legendaId = response.legenda.id;

        setLocalProfile((prev) => ({
          ...prev,
          legendas: [
            {
              ...response.legenda,
              greeting: '',
              titulo: value,
            },
          ],
        }));
      } else {
        await legendaApi.update(legendaId, { titulo: value, greeting: '' });

        setLocalProfile((prev) => {
          if (!prev.legendas?.length) return prev;

          return {
            ...prev,
            legendas: [
              {
                ...prev.legendas[0],
                greeting: '',
                titulo: value,
              },
            ],
          };
        });
      }

      onProfileUpdate?.();
    } catch (error) {
      console.error('Erro ao atualizar headline:', error);
      showPortfolioEditorError('Erro ao atualizar headline');
      throw error;
    }
  };

  const buildFooterDefaults = (patch: Partial<Footer> = {}) => ({
    profileId: localProfile.id,
    title: localProfile.footer?.title || 'Contact',
    subtitle:
      localProfile.footer?.subtitle ||
      legenda?.descricao ||
      'Descreva como as pessoas podem entrar em contato.',
    email: localProfile.footer?.email || undefined,
    github: localProfile.footer?.github || undefined,
    linkedin: localProfile.footer?.linkedin || undefined,
    twitter: localProfile.footer?.twitter || undefined,
    instagram: localProfile.footer?.instagram || undefined,
    copyrightName:
      localProfile.footer?.copyrightName ||
      legenda?.nome ||
      localProfile.user?.nome ||
      localProfile.username ||
      'Bio4Dev',
    madeWith: localProfile.footer?.madeWith || 'Made with Bio4Dev',
    resumeUrl: localProfile.footer?.resumeUrl || undefined,
    ...patch,
  });

  const handleLegendaUpdate = async (
    field: LegendaEditableField,
    value: string,
  ) => {
    if (!localProfile.id) {
      showPortfolioEditorError('Perfil não encontrado');
      return;
    }

    try {
      let legendaId = legenda?.id;

      if (!legendaId) {
        const response = await legendaApi.create(
          buildLegendaDefaults(field, value),
        );
        legendaId = response.legenda.id;

        setLocalProfile((prev) => ({
          ...prev,
          legendas: [response.legenda],
        }));
      } else {
        await legendaApi.update(legendaId, { [field]: value });

        setLocalProfile((prev) => {
          if (!prev.legendas?.length) return prev;

          return {
            ...prev,
            legendas: [
              {
                ...prev.legendas[0],
                [field]: value,
              } as Legenda,
            ],
          };
        });
      }

      onProfileUpdate?.();
    } catch (error) {
      console.error('Erro ao atualizar legenda:', error);
      showPortfolioEditorError('Erro ao atualizar campo');
      throw error;
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    if (!localProfile.id) {
      showPortfolioEditorError('Perfil não encontrado');
      return;
    }

    const normalizedAvatar = normalizeHttpUrl(url, 'Avatar');

    if (normalizedAvatar.error || !normalizedAvatar.value) {
      showPortfolioEditorError(normalizedAvatar.error || 'Avatar inválido');
      throw new Error(normalizedAvatar.error || 'Avatar inválido');
    }

    try {
      await profileApi.update(localProfile.id, {
        avatarUrl: normalizedAvatar.value,
      });

      if (legenda?.id) {
        await legendaApi.update(legenda.id, {
          legendaFoto: normalizedAvatar.value,
        });

        setLocalProfile((prev) => ({
          ...prev,
          avatarUrl: normalizedAvatar.value,
          legendas: prev.legendas?.length
            ? [
                {
                  ...prev.legendas[0],
                  legendaFoto: normalizedAvatar.value,
                },
              ]
            : prev.legendas,
        }));
      } else {
        const response = await legendaApi.create(
          buildLegendaDefaults('legendaFoto', normalizedAvatar.value),
        );

        setLocalProfile((prev) => ({
          ...prev,
          avatarUrl: normalizedAvatar.value,
          legendas: response.legenda ? [response.legenda] : prev.legendas,
        }));
      }

      onProfileUpdate?.();
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
      showPortfolioEditorError('Erro ao atualizar avatar');
      throw error;
    }
  };

  const upsertFooter = async (field: FooterEditableField, value: string) => {
    try {
      if (localProfile.footer?.id) {
        await footerApi.update(localProfile.footer.id, {
          [field]: value || undefined,
        });

        setLocalProfile((prev) => ({
          ...prev,
          footer: prev.footer
            ? ({
                ...prev.footer,
                [field]: value || undefined,
              } as Footer)
            : prev.footer,
        }));
      } else {
        const createPayload = buildFooterDefaults({
          [field]: value || undefined,
        });
        const response: any = await footerApi.create(createPayload);
        const createdFooter = response.footer || response;

        setLocalProfile((prev) => ({
          ...prev,
          footer: {
            id: createdFooter.id || 'draft-footer',
            profileId: prev.id,
            title: createdFooter.title || createPayload.title,
            subtitle: createdFooter.subtitle || createPayload.subtitle,
            email: createdFooter.email || createPayload.email,
            github: createdFooter.github || createPayload.github,
            linkedin: createdFooter.linkedin || createPayload.linkedin,
            twitter: createdFooter.twitter || createPayload.twitter,
            instagram: createdFooter.instagram || createPayload.instagram,
            copyrightName:
              createdFooter.copyrightName || createPayload.copyrightName,
            madeWith: createdFooter.madeWith || createPayload.madeWith,
            resumeUrl: createdFooter.resumeUrl || createPayload.resumeUrl,
          },
        }));
      }

      onProfileUpdate?.();
    } catch (error) {
      console.error('Erro ao atualizar footer:', error);
      showPortfolioEditorError('Erro ao atualizar contato');
      throw error;
    }
  };

  const handleFooterFieldUpdate = async (
    field: Exclude<FooterEditableField, 'resumeUrl'>,
    value: string,
  ) => {
    if (field === 'email') {
      const normalizedEmailValue = normalizeEmail(value);

      if (normalizedEmailValue && !isValidEmail(normalizedEmailValue)) {
        showPortfolioEditorError('Email inválido');
        throw new Error('Email inválido');
      }

      await upsertFooter(field, normalizedEmailValue);
      return;
    }

    await upsertFooter(field, value);
  };

  const handleResumeUpdate = async (url: string) => {
    const normalizedResumeUrl = normalizeHttpUrl(url, 'Link do currículo');

    if (normalizedResumeUrl.error) {
      showPortfolioEditorError(normalizedResumeUrl.error);
      throw new Error(normalizedResumeUrl.error);
    }

    await upsertFooter('resumeUrl', normalizedResumeUrl.value || '');
  };

  const openNameDialog = () => {
    setNameInput(legenda?.nome || localProfile.username || '');
    setIsNameDialogOpen(true);
  };

  const saveNameDialog = async () => {
    const nextName = nameInput.trim();

    if (!nextName) return;

    await handleLegendaUpdate('nome', nextName);
    setIsNameDialogOpen(false);
  };

  const openAvatarDialog = () => {
    setAvatarUrlInput(localProfile.avatarUrl || legenda?.legendaFoto || '');
    setIsAvatarDialogOpen(true);
  };

  const saveAvatarDialog = async () => {
    const nextUrl = avatarUrlInput.trim();

    if (!nextUrl) return;

    await handleAvatarUpdate(nextUrl);
    setIsAvatarDialogOpen(false);
  };

  const handleAddTech = async (newTech: Technology) => {
    const currentTechs = localProfile.techStack?.technologies || [];
    const newTechnologies = [...currentTechs, newTech].map((item, index) => ({
      ...item,
      ordem: index,
    }));

    const payload = {
      title: localProfile.techStack?.title || 'Experience With',
      subtitle:
        localProfile.techStack?.subtitle ||
        'Tecnologias e ferramentas que utilizo no dia a dia',
      technologies: newTechnologies.map((item, index) => ({
        name: item.name,
        icon: item.icon,
        color: item.color || 'text-[#FF6B35]',
        ordem: index,
      })),
    };

    try {
      if (localProfile.techStack?.id) {
        await techStackApi.update(localProfile.id, payload);
      } else {
        await techStackApi.create(localProfile.id, payload);
      }

      setLocalProfile((prev) => ({
        ...prev,
        techStack: {
          id: prev.techStack?.id || 'draft-tech-stack',
          profileId: prev.id,
          title: payload.title,
          subtitle: payload.subtitle,
          technologies: newTechnologies,
        },
      }));

      onProfileUpdate?.();
      showPortfolioEditorSuccess('Tecnologia adicionada');
    } catch (error) {
      console.error('Erro ao adicionar tecnologia:', error);
      showPortfolioEditorError('Erro ao adicionar tecnologia');
    }
  };

  const handleRemoveTech = async (tech: Technology) => {
    const currentTechs = localProfile.techStack?.technologies || [];
    const newTechnologies = currentTechs
      .filter((item) => item.id !== tech.id)
      .map((item, index) => ({
        ...item,
        ordem: index,
      }));

    const payload = {
      title: localProfile.techStack?.title || 'Experience With',
      subtitle:
        localProfile.techStack?.subtitle ||
        'Tecnologias e ferramentas que utilizo no dia a dia',
      technologies: newTechnologies.map((item, index) => ({
        name: item.name,
        icon: item.icon,
        color: item.color || 'text-[#FF6B35]',
        ordem: index,
      })),
    };

    try {
      await techStackApi.update(localProfile.id, payload);

      setLocalProfile((prev) => ({
        ...prev,
        techStack: prev.techStack
          ? {
              ...prev.techStack,
              technologies: newTechnologies,
            }
          : prev.techStack,
      }));

      onProfileUpdate?.();
      showPortfolioEditorSuccess('Tecnologia removida');
    } catch (error) {
      console.error('Erro ao remover tecnologia:', error);
      showPortfolioEditorError('Erro ao remover tecnologia');
    }
  };

  const openProjectModal = (project?: Projeto) => {
    setEditingProject(project || null);
    setProjectForm({
      nome: project?.nome || '',
      descricao: project?.descricao || '',
      demoLink: project?.demoLink || '',
      codeLink: project?.codeLink || '',
      gif: project?.gif || '',
      tags: project?.tags?.join(', ') || '',
    });
    setIsProjectModalOpen(true);
  };

  const handleProjectSave = async () => {
    if (!localProfile.id) {
      showPortfolioEditorError('Perfil não encontrado');
      return;
    }

    const normalizedDemoLink = normalizeHttpUrl(
      projectForm.demoLink,
      'Demo link',
    );
    if (normalizedDemoLink.error) {
      showPortfolioEditorError(normalizedDemoLink.error);
      return;
    }

    const normalizedCodeLink = normalizeHttpUrl(
      projectForm.codeLink,
      'Code link',
    );
    if (normalizedCodeLink.error) {
      showPortfolioEditorError(normalizedCodeLink.error);
      return;
    }

    const trimmedGif = projectForm.gif.trim();
    const shouldUseFallbackGif =
      !trimmedGif || isPortfolio3ColorToken(trimmedGif);
    const normalizedGif = shouldUseFallbackGif
      ? { value: PROJECT_FALLBACK_IMAGE_URL }
      : normalizeHttpUrl(trimmedGif, 'Imagem do projeto');
    if (normalizedGif.error) {
      showPortfolioEditorError(normalizedGif.error);
      return;
    }

    const projectTags = projectForm.tags
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload: any = {
      nome: projectForm.nome.trim() || 'Novo Projeto',
      descricao:
        projectForm.descricao.trim() ||
        editingProject?.descricao ||
        'Projeto em destaque',
      gif: normalizedGif.value || PROJECT_FALLBACK_IMAGE_URL,
      tags: projectTags,
      ordem: editingProject?.ordem ?? projects.length,
    };

    if (editingProject) {
      payload.demoLink = normalizedDemoLink.value || '';
      payload.codeLink = normalizedCodeLink.value || '';
    } else {
      if (normalizedDemoLink.value) {
        payload.demoLink = normalizedDemoLink.value;
      }
      if (normalizedCodeLink.value) {
        payload.codeLink = normalizedCodeLink.value;
      }
    }

    try {
      if (editingProject) {
        const response: any = await projetosApi.update(
          editingProject.id,
          payload,
        );
        const updatedProject = response.projeto || {
          ...editingProject,
          ...payload,
        };

        setLocalProfile((prev) => ({
          ...prev,
          projetos: (prev.projetos || []).map((project) =>
            project.id === editingProject.id ? updatedProject : project,
          ),
        }));
      } else {
        const response: any = await projetosApi.create({
          profileId: localProfile.id,
          ...payload,
        });
        const createdProject = response.projeto || {
          id: Date.now().toString(),
          profileId: localProfile.id,
          createdAt: new Date().toISOString(),
          ...payload,
        };

        setLocalProfile((prev) => ({
          ...prev,
          projetos: [...(prev.projetos || []), createdProject],
        }));
      }

      setIsProjectModalOpen(false);
      setEditingProject(null);
      onProfileUpdate?.();
      showPortfolioEditorSuccess('Projeto salvo');
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      showPortfolioEditorError('Erro ao salvar projeto');
    }
  };

  const handleProjectDelete = async () => {
    if (!editingProject) return;

    try {
      await projetosApi.delete(editingProject.id);

      setLocalProfile((prev) => ({
        ...prev,
        projetos: (prev.projetos || []).filter(
          (project) => project.id !== editingProject.id,
        ),
      }));

      setIsProjectModalOpen(false);
      setEditingProject(null);
      onProfileUpdate?.();
      showPortfolioEditorSuccess('Projeto removido');
    } catch (error) {
      console.error('Erro ao remover projeto:', error);
      showPortfolioEditorError('Erro ao remover projeto');
    }
  };

  const openWorkModal = (work?: WorkExperience) => {
    setEditingWork(work || null);
    setWorkForm({
      company: work?.company || '',
      summary: work?.summary || '',
      period: work?.period || '',
      description: work ? getPortfolio3ExperienceDescription(work) : '',
    });
    setIsWorkModalOpen(true);
  };

  const handleWorkSave = async () => {
    if (!localProfile.id) {
      showPortfolioEditorError('Perfil não encontrado');
      return;
    }

    const payload = {
      company: workForm.company.trim() || 'Empresa',
      period: workForm.period.trim() || 'Atual',
      summary: workForm.summary.trim() || 'Cargo',
      impact: workForm.description.trim() || undefined,
      ordem: editingWork?.ordem ?? workHistory.length,
      technologies:
        editingWork?.technologies?.map((item) => ({
          technology: item.technology,
        })) || [],
      responsibilities:
        editingWork?.responsibilities?.map((item, index) => ({
          responsibility: item.responsibility,
          ordem: index,
        })) ||
        (workForm.description.trim()
          ? [{ responsibility: workForm.description.trim(), ordem: 0 }]
          : []),
    };

    try {
      if (editingWork) {
        const response: any = await workExperienceApi.update(
          editingWork.id,
          payload,
        );
        const updatedWork = response.workExperience || {
          ...editingWork,
          ...payload,
          technologies: editingWork.technologies,
          responsibilities: editingWork.responsibilities,
        };

        setLocalProfile((prev) => ({
          ...prev,
          workHistory: (prev.workHistory || []).map((work) =>
            work.id === editingWork.id ? updatedWork : work,
          ),
        }));
      } else {
        const response: any = await workExperienceApi.create({
          profileId: localProfile.id,
          ...payload,
        });
        const createdWork = response.workExperience || {
          id: Date.now().toString(),
          profileId: localProfile.id,
          company: payload.company,
          period: payload.period,
          summary: payload.summary,
          impact: payload.impact,
          ordem: payload.ordem,
          technologies: [],
          responsibilities: payload.responsibilities.map((item) => ({
            id: `${Date.now()}-${item.ordem}`,
            workExperienceId: '',
            responsibility: item.responsibility,
            ordem: item.ordem,
          })),
        };

        setLocalProfile((prev) => ({
          ...prev,
          workHistory: [...(prev.workHistory || []), createdWork],
        }));
      }

      setIsWorkModalOpen(false);
      setEditingWork(null);
      onProfileUpdate?.();
      showPortfolioEditorSuccess('Experiência salva');
    } catch (error) {
      console.error('Erro ao salvar experiência:', error);
      showPortfolioEditorError('Erro ao salvar experiência');
    }
  };

  const handleWorkDelete = async () => {
    if (!editingWork) return;

    try {
      await workExperienceApi.delete(editingWork.id);

      setLocalProfile((prev) => ({
        ...prev,
        workHistory: (prev.workHistory || []).filter(
          (work) => work.id !== editingWork.id,
        ),
      }));

      setIsWorkModalOpen(false);
      setEditingWork(null);
      onProfileUpdate?.();
      showPortfolioEditorSuccess('Experiência removida');
    } catch (error) {
      console.error('Erro ao remover experiência:', error);
      showPortfolioEditorError('Erro ao remover experiência');
    }
  };

  function openSocialModal(slotId: SocialSlotId) {
    const existing = findPortfolio3Social(localProfile.social, slotId);
    setEditingSocialSlot(slotId);
    setSocialUrl(existing?.url || '');
    setIsSocialModalOpen(true);
  }

  const handleSocialSave = async () => {
    if (!localProfile.id || !editingSocialSlot) {
      showPortfolioEditorError('Perfil não encontrado');
      return;
    }

    const slot = PORTFOLIO3_SOCIAL_SLOTS.find(
      (item) => item.id === editingSocialSlot,
    );

    if (!slot) return;

    const normalized = normalizeUrl(socialUrl);

    if (!normalized) {
      showPortfolioEditorError('Informe uma URL válida');
      return;
    }

    try {
      const existing = findPortfolio3Social(
        localProfile.social,
        editingSocialSlot,
      );
      const nextSocials = [...(localProfile.social || [])];

      if (existing) {
        await socialApi.update(existing.id, {
          plataforma: existing.plataforma,
          url: normalized,
        });

        const index = nextSocials.findIndex((item) => item.id === existing.id);
        if (index >= 0) {
          nextSocials[index] = {
            ...existing,
            url: normalized,
          };
        }
      } else {
        const createdSocial = await socialApi.create({
          profileId: localProfile.id,
          plataforma: slot.preferredPlatform,
          url: normalized,
          ordem: nextSocials.length,
        });

        nextSocials.push(createdSocial);
      }

      setLocalProfile((prev) => ({
        ...prev,
        social: nextSocials,
      }));

      setIsSocialModalOpen(false);
      setEditingSocialSlot(null);
      onProfileUpdate?.();
      showPortfolioEditorSuccess('Link social salvo');
    } catch (error) {
      console.error('Erro ao salvar link social:', error);
      showPortfolioEditorError('Erro ao salvar link social');
    }
  };

  const handleSocialDelete = async () => {
    if (!editingSocialSlot) return;

    try {
      const existing = findPortfolio3Social(
        localProfile.social,
        editingSocialSlot,
      );

      if (existing) {
        await socialApi.delete(existing.id);
      }

      setLocalProfile((prev) => ({
        ...prev,
        social: (prev.social || []).filter((item) => item.id !== existing?.id),
      }));

      setIsSocialModalOpen(false);
      setEditingSocialSlot(null);
      onProfileUpdate?.();
      showPortfolioEditorSuccess('Link social removido');
    } catch (error) {
      console.error('Erro ao remover link social:', error);
      showPortfolioEditorError('Erro ao remover link social');
    }
  };

  return (
    <>
      <Portfolio3Layout
        initials={getPortfolio3Initials(localProfile)}
        onInitialsClick={openNameDialog}
        hero={
          <Portfolio3HeroSection
            avatar={
              <button
                type="button"
                onClick={openAvatarDialog}
                className="group relative h-full w-full cursor-pointer"
              >
                <img
                  src={
                    localProfile.avatarUrl ||
                    legenda?.legendaFoto ||
                    'https://api.dicebear.com/7.x/notionists/svg?seed=Bio4Dev&backgroundColor=transparent'
                  }
                  alt={legenda?.nome || localProfile.username}
                  className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <Pencil className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>
            }
            headline={
              <EditableField
                value={heroHeadline}
                onSave={handleHeadlineUpdate}
                placeholder={PORTFOLIO3_DEFAULT_HEADLINE}
                className="w-full hover:bg-white/5"
                valueClassName="bg-gradient-to-r from-[#FF6B35] to-[#FF1493] bg-clip-text text-transparent"
                inputClassName="border-white/20 bg-white/5 text-white placeholder:text-white/30"
              />
            }
            description={
              <EditableField
                value={legenda?.descricao || ''}
                onSave={(value) => handleLegendaUpdate('descricao', value)}
                placeholder="Descreva aqui sua atuação, experiência e o que você está construindo."
                type="textarea"
                multiline
                className="text-[#a0a0a0] hover:bg-white/5"
                inputClassName="border-white/20 bg-white/5 text-white placeholder:text-white/30"
              />
            }
            primaryAction={
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-200"
              >
                Get In Touch
              </a>
            }
            secondaryAction={
              <EditablePortfolio3ResumeButton
                resumeUrl={localProfile.footer?.resumeUrl}
                onResumeUpdate={handleResumeUpdate}
              />
            }
          />
        }
        techStack={
          <Portfolio3TechStackSection
            items={techs}
            action={
              <button
                type="button"
                onClick={() => setIsTechDialogOpen(true)}
                className={actionButtonClassName}
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            }
            onRemoveTech={(tech) => void handleRemoveTech(tech)}
          />
        }
        projects={
          <Portfolio3ProjectsSection
            projects={projects}
            action={
              <button
                type="button"
                onClick={() => openProjectModal()}
                className={actionButtonClassName}
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            }
            onProjectClick={openProjectModal}
          />
        }
        experience={
          <Portfolio3ExperienceSection
            items={workHistory}
            action={
              <button
                type="button"
                onClick={() => openWorkModal()}
                className={actionButtonClassName}
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            }
            onExperienceClick={openWorkModal}
          />
        }
        footer={
          <Portfolio3FooterSection
            description={
              <EditableField
                value={footerDescription}
                onSave={(value) => handleFooterFieldUpdate('subtitle', value)}
                placeholder="Descreva como as pessoas podem entrar em contato."
                type="textarea"
                multiline
                className="text-[#a0a0a0] hover:bg-white/5"
                inputClassName="border-white/20 bg-white/5 text-white placeholder:text-white/30"
              />
            }
            email={
              <EditableField
                value={footerEmail}
                onSave={(value) => handleFooterFieldUpdate('email', value)}
                placeholder="your@email.com"
                className="text-white hover:bg-white/5"
                inputClassName="border-white/20 bg-white/5 text-white placeholder:text-white/30"
              />
            }
            socialLinks={socialLinks}
          />
        }
      />

      <AddTechDialog
        open={isTechDialogOpen}
        onOpenChange={setIsTechDialogOpen}
        onAdd={(tech) => void handleAddTech(tech)}
      />

      <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar nome</DialogTitle>
            <DialogDescription>
              O nome completo define as iniciais exibidas na navegação.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-2">
            <Label htmlFor="portfolio3-name">Nome completo</Label>
            <Input
              id="portfolio3-name"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="Seu nome"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setNameInput(legenda?.nome || localProfile.username || '');
                setIsNameDialogOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={saveNameDialog}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar avatar</DialogTitle>
            <DialogDescription>
              Cole a URL da imagem que deve aparecer no hero.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-[#1a1a1a]">
              <img
                src={
                  avatarUrlInput ||
                  localProfile.avatarUrl ||
                  legenda?.legendaFoto ||
                  'https://api.dicebear.com/7.x/notionists/svg?seed=Bio4Dev&backgroundColor=transparent'
                }
                alt={legenda?.nome || localProfile.username}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio3-avatar-url">URL do avatar</Label>
              <Input
                id="portfolio3-avatar-url"
                type="url"
                value={avatarUrlInput}
                onChange={(event) => setAvatarUrlInput(event.target.value)}
                placeholder="https://exemplo.com/avatar.jpg"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAvatarUrlInput(
                  localProfile.avatarUrl || legenda?.legendaFoto || '',
                );
                setIsAvatarDialogOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={saveAvatarDialog}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Editar projeto' : 'Novo projeto'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Nome do projeto</Label>
              <Input
                value={projectForm.nome}
                onChange={(event) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    nome: event.target.value,
                  }))
                }
                placeholder="HTML Tutorial"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={projectForm.descricao}
                onChange={(event) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    descricao: event.target.value,
                  }))
                }
                placeholder="Descreva o projeto"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Demo link</Label>
              <Input
                value={projectForm.demoLink}
                onChange={(event) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    demoLink: event.target.value,
                  }))
                }
                placeholder="https://exemplo.com ou localhost:3000"
              />
            </div>

            <div className="space-y-2">
              <Label>Code link</Label>
              <Input
                value={projectForm.codeLink}
                onChange={(event) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    codeLink: event.target.value,
                  }))
                }
                placeholder="https://github.com/usuario/repo"
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem de capa</Label>
              <Input
                value={projectForm.gif}
                onChange={(event) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    gif: event.target.value,
                  }))
                }
                placeholder="https://exemplo.com/capa.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input
                value={projectForm.tags}
                onChange={(event) =>
                  setProjectForm((prev) => ({
                    ...prev,
                    tags: event.target.value,
                  }))
                }
                placeholder="React, TypeScript, NestJS"
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <div>
              {editingProject && (
                <Button variant="destructive" onClick={handleProjectDelete}>
                  Remover
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setEditingProject(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleProjectSave}>Salvar</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isWorkModalOpen} onOpenChange={setIsWorkModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingWork ? 'Editar experiência' : 'Nova experiência'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Input
                value={workForm.company}
                onChange={(event) =>
                  setWorkForm((prev) => ({
                    ...prev,
                    company: event.target.value,
                  }))
                }
                placeholder="Google"
              />
            </div>

            <div className="space-y-2">
              <Label>Cargo / resumo</Label>
              <Input
                value={workForm.summary}
                onChange={(event) =>
                  setWorkForm((prev) => ({
                    ...prev,
                    summary: event.target.value,
                  }))
                }
                placeholder="Lead Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <Label>Período</Label>
              <Input
                value={workForm.period}
                onChange={(event) =>
                  setWorkForm((prev) => ({
                    ...prev,
                    period: event.target.value,
                  }))
                }
                placeholder="Nov 2019 – Present"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={workForm.description}
                onChange={(event) =>
                  setWorkForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                placeholder="Descreva o impacto desta experiência."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <div>
              {editingWork && (
                <Button variant="destructive" onClick={handleWorkDelete}>
                  Remover
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsWorkModalOpen(false);
                  setEditingWork(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleWorkSave}>Salvar</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSocialModalOpen} onOpenChange={setIsSocialModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSocialSlot
                ? `Editar ${PORTFOLIO3_SOCIAL_SLOTS.find((slot) => slot.id === editingSocialSlot)?.label}`
                : 'Editar link social'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={socialUrl}
                onChange={(event) => setSocialUrl(event.target.value)}
                placeholder="https://instagram.com/seu-perfil"
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <div>
              {editingSocialSlot &&
                findPortfolio3Social(
                  localProfile.social,
                  editingSocialSlot,
                ) && (
                  <Button variant="destructive" onClick={handleSocialDelete}>
                    Remover
                  </Button>
                )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSocialModalOpen(false);
                  setEditingSocialSlot(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSocialSave}>Salvar</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
