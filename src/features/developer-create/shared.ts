import type {
  Footer,
  Legenda,
  ProfileComplete,
  Projeto,
  Social,
  TechStack,
  Technology,
  TemplateType,
  WorkExperience,
  WorkResponsibility,
  WorkTechnology,
} from '@/types';

export type DeveloperTemplateType = Extract<
  TemplateType,
  'template_01' | 'template_02' | 'template_03'
>;

export type DeveloperDraftStatus = 'collecting' | 'pending_auth' | 'completed';

export interface DeveloperDraftAuthIntent {
  intent: 'developer_draft_finalize';
  draftId: string;
  returnTo: string;
  createdAt: string;
}

export interface DeveloperDraft {
  version: 1;
  draftId: string;
  status: DeveloperDraftStatus;
  templateType: DeveloperTemplateType;
  slug: string;
  displayName: string;
  profile: ProfileComplete;
  createdAt: string;
  updatedAt: string;
}

const developerTemplateNames: Record<DeveloperTemplateType, string> = {
  template_01: 'Portfolio Minimalista Dev',
  template_02: 'Portfolio Criativo Tech',
  template_03: 'Portfolio Corporativo Dev',
};

export function isDeveloperTemplateType(
  value: string | null | undefined,
): value is DeveloperTemplateType {
  return (
    value === 'template_01' ||
    value === 'template_02' ||
    value === 'template_03'
  );
}

export function getDeveloperTemplateName(templateType: DeveloperTemplateType) {
  return developerTemplateNames[templateType];
}

export function normalizeDeveloperSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function createDeveloperDraftId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return `draft-${crypto.randomUUID()}`;
  }

  return `draft-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildAvatarUrl(seed: string) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed || 'Bio4Dev')}`;
}

function buildLegendaTemplateCopy(
  templateType: DeveloperTemplateType,
  displayName: string,
  avatarUrl: string,
): Legenda {
  const now = new Date().toISOString();

  if (templateType === 'template_02') {
    return {
      id: 'draft-legenda',
      profileId: 'draft-profile',
      greeting: '',
      legendaFoto: avatarUrl,
      nome: displayName,
      titulo: 'Building useful products for humans.',
      subtitulo: 'Open to product, frontend and full-stack work.',
      descricao:
        'Casos, experimentos e software com foco em velocidade, clareza e impacto real.',
      createdAt: now,
    };
  }

  if (templateType === 'template_03') {
    return {
      id: 'draft-legenda',
      profileId: 'draft-profile',
      greeting: '',
      legendaFoto: avatarUrl,
      nome: displayName,
      titulo: 'Designing and shipping software with business impact.',
      subtitulo: 'Developer portfolio',
      descricao:
        'Descreva aqui sua atuação, experiência e o que você está construindo.',
      createdAt: now,
    };
  }

  return {
    id: 'draft-legenda',
    profileId: 'draft-profile',
    greeting: 'Olá, eu sou',
    legendaFoto: avatarUrl,
    nome: displayName,
    titulo: 'Desenvolvedor Full Stack',
    subtitulo: 'Criando produtos web com foco em performance e clareza.',
    descricao:
      'Compartilho projetos, stack principal e experiências que mostram como eu construo software.',
    createdAt: now,
  };
}

function buildFooterTemplateCopy(
  templateType: DeveloperTemplateType,
  displayName: string,
): Footer {
  if (templateType === 'template_02') {
    return {
      id: 'draft-footer',
      profileId: 'draft-profile',
      title: "Let's Connect",
      subtitle: 'Open for freelance, product and startup work.',
      email: '',
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      copyrightName: displayName,
      madeWith: 'Made with Bio4Dev',
      resumeUrl: '',
    };
  }

  if (templateType === 'template_03') {
    return {
      id: 'draft-footer',
      profileId: 'draft-profile',
      title: 'Contact',
      subtitle: 'Aberto para novos projetos e conversas sobre produto.',
      email: '',
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      copyrightName: displayName,
      madeWith: 'Made with Bio4Dev',
      resumeUrl: '',
    };
  }

  return {
    id: 'draft-footer',
    profileId: 'draft-profile',
    title: 'Vamos construir algo juntos?',
    subtitle: 'Estou disponível para novos projetos e oportunidades.',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    copyrightName: displayName,
    madeWith: 'Made with Bio4Dev',
    resumeUrl: '',
  };
}

function buildTechStackTemplateCopy(
  templateType: DeveloperTemplateType,
): TechStack {
  if (templateType === 'template_03') {
    return {
      id: 'draft-tech-stack',
      profileId: 'draft-profile',
      title: 'Experience With',
      subtitle: 'Tecnologias e ferramentas que utilizo no dia a dia',
      technologies: [],
    };
  }

  return {
    id: 'draft-tech-stack',
    profileId: 'draft-profile',
    title: 'Tech Stack',
    subtitle: 'Tecnologias e ferramentas que uso para tirar produtos do papel',
    technologies: [],
  };
}

export function createDefaultDeveloperProfileSnapshot(input: {
  draftId: string;
  templateType: DeveloperTemplateType;
  slug: string;
  displayName: string;
}): ProfileComplete {
  const now = new Date().toISOString();
  const avatarUrl = buildAvatarUrl(input.displayName || input.slug);
  const legenda = buildLegendaTemplateCopy(
    input.templateType,
    input.displayName,
    avatarUrl,
  );
  const footer = buildFooterTemplateCopy(input.templateType, input.displayName);
  const techStack = buildTechStackTemplateCopy(input.templateType);

  return {
    id: input.draftId,
    userId: 'draft-user',
    username: input.displayName,
    slug: input.slug,
    bio: legenda.descricao,
    avatarUrl,
    theme: 'LIGHT',
    templateType: input.templateType,
    published: false,
    createdAt: now,
    legendas: [{ ...legenda, profileId: input.draftId }],
    social: [],
    projetos: [],
    techStack: { ...techStack, profileId: input.draftId },
    workHistory: [],
    footer: { ...footer, profileId: input.draftId },
  };
}

function normalizeLegenda(
  draftId: string,
  defaults: Legenda,
  raw?: Legenda[],
): Legenda[] {
  const current = raw?.[0];

  return [
    {
      ...defaults,
      ...current,
      id: current?.id || defaults.id,
      profileId: draftId,
      nome: current?.nome?.trim() || defaults.nome,
      titulo: current?.titulo?.trim() || defaults.titulo,
      subtitulo: current?.subtitulo?.trim() || defaults.subtitulo,
      descricao: current?.descricao?.trim() || defaults.descricao,
      legendaFoto: current?.legendaFoto?.trim() || defaults.legendaFoto,
      greeting: current?.greeting ?? defaults.greeting,
      createdAt: current?.createdAt || defaults.createdAt,
    },
  ];
}

function normalizeSocials(draftId: string, raw?: Social[]): Social[] {
  return (raw || [])
    .filter((item) => item?.plataforma && item?.url)
    .map((item, index) => ({
      ...item,
      id: item.id || `draft-social-${index + 1}`,
      profileId: draftId,
      ordem: typeof item.ordem === 'number' ? item.ordem : index,
    }));
}

function normalizeProjects(draftId: string, raw?: Projeto[]): Projeto[] {
  const now = new Date().toISOString();

  return (raw || [])
    .filter((item) => item?.nome && item?.descricao)
    .map((item, index) => ({
      ...item,
      id: item.id || `draft-project-${index + 1}`,
      profileId: draftId,
      nome: item.nome,
      descricao: item.descricao,
      ordem: typeof item.ordem === 'number' ? item.ordem : index,
      gif: item.gif || '',
      tags: item.tags || [],
      createdAt: item.createdAt || now,
    }));
}

function normalizeTechnologies(raw?: Technology[]): Technology[] {
  return (raw || [])
    .filter((item) => item?.name && item?.icon)
    .map((item, index) => ({
      ...item,
      id: item.id || `draft-tech-${index + 1}`,
      techStackId: item.techStackId || 'draft-tech-stack',
      color: item.color || 'text-slate-700',
      ordem: typeof item.ordem === 'number' ? item.ordem : index,
    }));
}

function normalizeTechStack(
  draftId: string,
  defaults: TechStack,
  raw?: TechStack,
): TechStack {
  const technologies = normalizeTechnologies(raw?.technologies).map((item) => ({
    ...item,
    techStackId: raw?.id || defaults.id,
  }));

  return {
    ...defaults,
    ...raw,
    id: raw?.id || defaults.id,
    profileId: draftId,
    title: raw?.title?.trim() || defaults.title,
    subtitle: raw?.subtitle?.trim() || defaults.subtitle,
    technologies,
  };
}

function normalizeWorkTechnologies(raw?: WorkTechnology[]): WorkTechnology[] {
  return (raw || [])
    .filter((item) => item?.technology)
    .map((item, index) => ({
      ...item,
      id: item.id || `draft-work-tech-${index + 1}`,
      workExperienceId: item.workExperienceId || 'draft-work',
      technology: item.technology,
    }));
}

function normalizeResponsibilities(
  raw?: WorkResponsibility[],
): WorkResponsibility[] {
  return (raw || [])
    .filter((item) => item?.responsibility)
    .map((item, index) => ({
      ...item,
      id: item.id || `draft-work-resp-${index + 1}`,
      workExperienceId: item.workExperienceId || 'draft-work',
      responsibility: item.responsibility,
      ordem: typeof item.ordem === 'number' ? item.ordem : index,
    }));
}

function normalizeWorkHistory(
  draftId: string,
  raw?: WorkExperience[],
): WorkExperience[] {
  return (raw || [])
    .filter((item) => item?.company && item?.period && item?.summary)
    .map((item, index) => ({
      ...item,
      id: item.id || `draft-work-${index + 1}`,
      profileId: draftId,
      ordem: typeof item.ordem === 'number' ? item.ordem : index,
      technologies: normalizeWorkTechnologies(item.technologies).map(
        (tech) => ({
          ...tech,
          workExperienceId: item.id || `draft-work-${index + 1}`,
        }),
      ),
      responsibilities: normalizeResponsibilities(item.responsibilities).map(
        (responsibility) => ({
          ...responsibility,
          workExperienceId: item.id || `draft-work-${index + 1}`,
        }),
      ),
    }));
}

function normalizeFooter(
  draftId: string,
  defaults: Footer,
  raw?: Footer,
): Footer {
  return {
    ...defaults,
    ...raw,
    id: raw?.id || defaults.id,
    profileId: draftId,
    title: raw?.title?.trim() || defaults.title,
    subtitle: raw?.subtitle?.trim() || defaults.subtitle,
    copyrightName: raw?.copyrightName?.trim() || defaults.copyrightName,
    madeWith: raw?.madeWith?.trim() || defaults.madeWith,
    email: raw?.email?.trim() || '',
    github: raw?.github?.trim() || '',
    linkedin: raw?.linkedin?.trim() || '',
    twitter: raw?.twitter?.trim() || '',
    instagram: raw?.instagram?.trim() || '',
    resumeUrl: raw?.resumeUrl?.trim() || '',
  };
}

export function normalizeDeveloperProfileSnapshot(
  raw: Partial<ProfileComplete> | null | undefined,
  input: {
    draftId: string;
    templateType: DeveloperTemplateType;
    slug: string;
    displayName: string;
  },
): ProfileComplete {
  const defaults = createDefaultDeveloperProfileSnapshot(input);

  return {
    ...defaults,
    ...raw,
    id: input.draftId,
    userId:
      typeof raw?.userId === 'string' && raw.userId.trim()
        ? raw.userId
        : defaults.userId,
    username:
      typeof raw?.username === 'string' && raw.username.trim()
        ? raw.username.trim()
        : input.displayName,
    slug:
      normalizeDeveloperSlug(raw?.slug || input.slug) ||
      normalizeDeveloperSlug(input.slug) ||
      defaults.slug,
    bio:
      typeof raw?.bio === 'string' && raw.bio.trim()
        ? raw.bio.trim()
        : defaults.bio,
    avatarUrl:
      typeof raw?.avatarUrl === 'string' && raw.avatarUrl.trim()
        ? raw.avatarUrl.trim()
        : defaults.avatarUrl,
    templateType: input.templateType,
    published: Boolean(raw?.published),
    createdAt:
      typeof raw?.createdAt === 'string' && raw.createdAt.trim()
        ? raw.createdAt
        : defaults.createdAt,
    legendas: normalizeLegenda(
      input.draftId,
      defaults.legendas?.[0]!,
      raw?.legendas,
    ),
    social: normalizeSocials(input.draftId, raw?.social),
    projetos: normalizeProjects(input.draftId, raw?.projetos),
    techStack: normalizeTechStack(
      input.draftId,
      defaults.techStack!,
      raw?.techStack,
    ),
    workHistory: normalizeWorkHistory(input.draftId, raw?.workHistory),
    footer: normalizeFooter(input.draftId, defaults.footer!, raw?.footer),
  };
}

export function buildDeveloperDraft(input: {
  draftId: string;
  templateType: DeveloperTemplateType;
  slug: string;
  displayName: string;
}): DeveloperDraft {
  const normalizedSlug =
    normalizeDeveloperSlug(input.slug) ||
    normalizeDeveloperSlug(input.displayName) ||
    'meu-portfolio';
  const displayName = input.displayName.trim() || normalizedSlug;
  const now = new Date().toISOString();

  return {
    version: 1,
    draftId: input.draftId,
    status: 'collecting',
    templateType: input.templateType,
    slug: normalizedSlug,
    displayName,
    profile: createDefaultDeveloperProfileSnapshot({
      draftId: input.draftId,
      templateType: input.templateType,
      slug: normalizedSlug,
      displayName,
    }),
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizeDeveloperDraft(
  raw: Partial<DeveloperDraft> & { draftId: string },
): DeveloperDraft | null {
  if (!isDeveloperTemplateType(raw.templateType)) {
    return null;
  }

  const normalizedSlug = normalizeDeveloperSlug(raw.slug || '');
  if (!normalizedSlug) {
    return null;
  }

  const displayName =
    raw.displayName?.trim() ||
    raw.profile?.legendas?.[0]?.nome?.trim() ||
    raw.profile?.username?.trim() ||
    normalizedSlug;

  const profile = normalizeDeveloperProfileSnapshot(raw.profile, {
    draftId: raw.draftId,
    templateType: raw.templateType,
    slug: normalizedSlug,
    displayName,
  });

  return {
    version: 1,
    draftId: raw.draftId,
    status:
      raw.status === 'pending_auth' || raw.status === 'completed'
        ? raw.status
        : 'collecting',
    templateType: raw.templateType,
    slug: normalizedSlug,
    displayName:
      profile.legendas?.[0]?.nome?.trim() ||
      profile.username?.trim() ||
      displayName,
    profile: {
      ...profile,
      username:
        profile.legendas?.[0]?.nome?.trim() ||
        profile.username?.trim() ||
        displayName,
      bio: profile.legendas?.[0]?.descricao?.trim() || profile.bio,
      avatarUrl:
        profile.legendas?.[0]?.legendaFoto?.trim() ||
        profile.avatarUrl ||
        buildAvatarUrl(displayName),
    },
    createdAt:
      typeof raw.createdAt === 'string' && raw.createdAt.trim()
        ? raw.createdAt
        : new Date().toISOString(),
    updatedAt:
      typeof raw.updatedAt === 'string' && raw.updatedAt.trim()
        ? raw.updatedAt
        : new Date().toISOString(),
  };
}

export function toDeveloperFinalizePayload(draft: DeveloperDraft) {
  const legenda = draft.profile.legendas?.[0];

  return {
    draftId: draft.draftId,
    templateType: draft.templateType,
    slug: draft.slug,
    displayName:
      legenda?.nome?.trim() ||
      draft.profile.username?.trim() ||
      draft.displayName.trim() ||
      draft.slug,
    avatarUrl:
      draft.profile.avatarUrl?.trim() || legenda?.legendaFoto?.trim() || '',
    legenda: legenda
      ? {
          greeting: legenda.greeting || '',
          legendaFoto:
            legenda.legendaFoto?.trim() ||
            draft.profile.avatarUrl?.trim() ||
            '',
          nome: legenda.nome.trim() || draft.displayName,
          titulo: legenda.titulo.trim() || 'Developer Portfolio',
          subtitulo:
            legenda.subtitulo.trim() ||
            legenda.descricao.trim().slice(0, 255) ||
            'Developer portfolio',
          descricao:
            legenda.descricao.trim() ||
            legenda.subtitulo.trim() ||
            'Developer portfolio',
        }
      : undefined,
    social: (draft.profile.social || [])
      .filter((item) => item.plataforma && item.url)
      .map((item, index) => ({
        plataforma: item.plataforma,
        url: item.url.trim(),
        ordem: typeof item.ordem === 'number' ? item.ordem : index,
      })),
    projetos: (draft.profile.projetos || [])
      .filter((item) => item.nome?.trim() && item.descricao?.trim())
      .map((item, index) => ({
        nome: item.nome.trim(),
        descricao: item.descricao.trim(),
        demoLink: item.demoLink?.trim() || undefined,
        codeLink: item.codeLink?.trim() || undefined,
        gif: item.gif?.trim() || undefined,
        ordem: typeof item.ordem === 'number' ? item.ordem : index,
        tags: (item.tags || []).map((tag) => tag.trim()).filter(Boolean),
      })),
    techStack: draft.profile.techStack
      ? {
          title: draft.profile.techStack.title.trim(),
          subtitle: draft.profile.techStack.subtitle.trim(),
          technologies: (draft.profile.techStack.technologies || [])
            .filter((item) => item.name?.trim() && item.icon?.trim())
            .map((item, index) => ({
              name: item.name.trim(),
              icon: item.icon.trim(),
              color: item.color || 'text-slate-700',
              ordem: typeof item.ordem === 'number' ? item.ordem : index,
            })),
        }
      : undefined,
    workHistory: (draft.profile.workHistory || [])
      .filter(
        (item) =>
          item.company?.trim() && item.period?.trim() && item.summary?.trim(),
      )
      .map((item, index) => ({
        company: item.company.trim(),
        period: item.period.trim(),
        summary: item.summary.trim(),
        impact: item.impact?.trim() || undefined,
        ordem: typeof item.ordem === 'number' ? item.ordem : index,
        technologies: (item.technologies || [])
          .filter((tech) => tech.technology?.trim())
          .map((tech) => ({
            technology: tech.technology.trim(),
          })),
        responsibilities: (item.responsibilities || [])
          .filter((responsibility) => responsibility.responsibility?.trim())
          .map((responsibility, responsibilityIndex) => ({
            responsibility: responsibility.responsibility.trim(),
            ordem:
              typeof responsibility.ordem === 'number'
                ? responsibility.ordem
                : responsibilityIndex,
          })),
      })),
    footer: draft.profile.footer
      ? {
          title: draft.profile.footer.title.trim(),
          subtitle: draft.profile.footer.subtitle.trim(),
          email: draft.profile.footer.email?.trim() || undefined,
          github: draft.profile.footer.github?.trim() || undefined,
          linkedin: draft.profile.footer.linkedin?.trim() || undefined,
          twitter: draft.profile.footer.twitter?.trim() || undefined,
          instagram: draft.profile.footer.instagram?.trim() || undefined,
          copyrightName:
            draft.profile.footer.copyrightName.trim() || draft.displayName,
          madeWith: draft.profile.footer.madeWith?.trim() || undefined,
          resumeUrl: draft.profile.footer.resumeUrl?.trim() || undefined,
        }
      : undefined,
    meta: {
      source: 'developer-draft-v1',
    },
  };
}
