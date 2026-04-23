import axios from 'axios';
import type {
  User,
  Profile,
  Legenda,
  Config,
  Page,
  Social,
  Projeto,
  ProfileComplete,
  CreateUserDTO,
  CreateProfileDTO,
  UpdateProfileDTO,
  CreateLegendaDTO,
  CreateConfigDTO,
  CreatePageDTO,
  CreateSocialDTO,
  UpdateSocialDTO,
  CreateProjetoDTO,
  UpdateProjetoDTO,
  CreateTechStackDTO,
  CreateWorkExperienceDTO,
  UpdateWorkExperienceDTO,
  CreateFooterDTO,
  UpdateFooterDTO,
  LoginDTO,
  TemplateType,
} from '@/types';

// Detecta automaticamente o host atual (localhost ou IP local) para acessar a API
const currentHost =
  typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}`
    : 'http://localhost';
const API_BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : `${currentHost}:3000`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

type AccessTokenProvider = () => string | null;
type RefreshHandler = () => Promise<string | null>;
type LogoutHandler = () => void;

let getAccessToken: AccessTokenProvider | null = null;
let refreshHandler: RefreshHandler | null = null;
let logoutHandler: LogoutHandler | null = null;
let refreshPromise: Promise<string | null> | null = null;
let interceptorsConfigured = false;

const getApiErrorDetails = (error: unknown) => {
  if (error instanceof Error) {
    const maybeAxiosError = error as Error & {
      code?: string;
      response?: { status?: number; data?: unknown };
      config?: { url?: string; method?: string };
    };
    return {
      name: error.name,
      message: error.message,
      code: maybeAxiosError.code,
      status: maybeAxiosError.response?.status,
      data: maybeAxiosError.response?.data,
      url: maybeAxiosError.config?.url,
      method: maybeAxiosError.config?.method,
    };
  }

  return { error };
};

const logApiAuth = (message: string, details?: Record<string, unknown>) => {
  if (!import.meta.env.DEV) return;
  console.log(`[auth][api] ${message}`, details ?? {});
};

const warnApiAuth = (message: string, details?: Record<string, unknown>) => {
  if (!import.meta.env.DEV) return;
  console.warn(`[auth][api] ${message}`, details ?? {});
};

export function configureAuthInterceptors(options: {
  getAccessToken: AccessTokenProvider;
  refreshAccessToken: RefreshHandler;
  onUnauthorized: LogoutHandler;
}) {
  if (interceptorsConfigured) return;

  getAccessToken = options.getAccessToken;
  refreshHandler = options.refreshAccessToken;
  logoutHandler = options.onUnauthorized;

  api.interceptors.request.use((config) => {
    const token = getAccessToken?.();
    logApiAuth('request', {
      method: config.method?.toUpperCase() ?? 'GET',
      url: config.url,
      hasAccessToken: Boolean(token),
      withCredentials: config.withCredentials ?? true,
    });
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    // allow refresh cookies when needed
    if (config.withCredentials === undefined) {
      config.withCredentials = true;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const originalRequest: any = error.config || {};

      if (status === 401 && !originalRequest._retry && refreshHandler) {
        warnApiAuth('401 received; trying refresh before retry', {
          method: originalRequest.method?.toUpperCase() ?? 'GET',
          url: originalRequest.url,
          responseData: error.response?.data,
        });
        originalRequest._retry = true;
        try {
          const newToken = await queueRefresh();
          if (newToken) {
            logApiAuth('refresh succeeded after 401; retrying request', {
              method: originalRequest.method?.toUpperCase() ?? 'GET',
              url: originalRequest.url,
            });
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
          warnApiAuth('refresh returned no token after 401', {
            method: originalRequest.method?.toUpperCase() ?? 'GET',
            url: originalRequest.url,
          });
        } catch (refreshError) {
          warnApiAuth('refresh threw after 401', {
            method: originalRequest.method?.toUpperCase() ?? 'GET',
            url: originalRequest.url,
            error: getApiErrorDetails(refreshError),
          });
        }
        warnApiAuth('logging out after unauthorized request', {
          method: originalRequest.method?.toUpperCase() ?? 'GET',
          url: originalRequest.url,
        });
        logoutHandler?.();
      }

      return Promise.reject(error);
    },
  );

  interceptorsConfigured = true;
}

async function queueRefresh(): Promise<string | null> {
  if (!refreshHandler) return null;
  if (!refreshPromise) {
    refreshPromise = refreshHandler().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

// ============ USERS ============
export const usersApi = {
  // Backend NestJS expõe /auth/register e /auth/login
  create: async (data: CreateUserDTO) => {
    const response = await api.post<{ message: string; user: User }>(
      '/auth/register',
      data,
    );
    return response.data;
  },

  login: async (data: LoginDTO) => {
    const response = await api.post<{
      message: string;
      user: User;
    }>('/auth/login', data);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  update: async (id: string, data: Partial<User> & { username?: string }) => {
    const response = await api.patch<{ message: string; user: User }>(
      `/users/${id}`,
      data,
    );
    return response.data;
  },

  updatePreferences: async (
    id: string,
    data: {
      emailNotifications?: boolean;
      marketingEmails?: boolean;
      securityAlerts?: boolean;
      language?: string;
      timezone?: string;
    },
  ) => {
    const response = await api.patch<{ message: string }>(
      `/users/${id}/preferences`,
      data,
    );
    return response.data;
  },

  updatePassword: async (
    id: string,
    data: { oldPassword: string; newPassword: string },
  ) => {
    const response = await api.patch<{ message: string }>(
      `/users/${id}/password`,
      data,
    );
    return response.data;
  },

  enable2FA: async (id: string) => {
    const response = await api.post<{ message: string }>(
      `/users/${id}/2fa/enable`,
    );
    return response.data;
  },

  disable2FA: async (id: string) => {
    const response = await api.post<{ message: string }>(
      `/users/${id}/2fa/disable`,
    );
    return response.data;
  },
};

// ============ ANALYTICS ============
export const analyticsApi = {
  getOverview: async (profileId: string, range: string = 'last30d') => {
    const response = await api.get(`/analytics/overview`, {
      params: { profileId, range },
    });
    return response.data;
  },

  getTimeseries: async (
    profileId: string,
    interval: 'day' | 'month' = 'day',
    range: string = 'last90d',
  ) => {
    const response = await api.get(`/analytics/timeseries`, {
      params: { profileId, interval, range },
    });
    return response.data;
  },

  getTopPages: async (
    profileId: string,
    limit: number = 10,
    range: string = 'last30d',
  ) => {
    const response = await api.get(`/analytics/top-pages`, {
      params: { profileId, limit, range },
    });
    return response.data;
  },

  getDevices: async (profileId: string, range: string = 'last30d') => {
    const response = await api.get(`/analytics/devices`, {
      params: { profileId, range },
    });
    return response.data;
  },
};

// ============ PROFILE ============
export const profileApi = {
  create: async (data: CreateProfileDTO) => {
    const response = await api.post<{ message: string; profile: Profile }>(
      '/profile',
      data,
    );
    return response.data;
  },

  /**
   * Verifica se um slug está disponível.
   * Considera 404 como disponível; qualquer outra resposta (200/403/400) indica indisponibilidade.
   */
  checkSlug: async (slug: string) => {
    try {
      await api.get(`/profile/slug/${slug}`);
      return { available: false } as const;
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 404) {
        return { available: true } as const;
      }
      // slug existe mas pode estar não publicado ou outra validação
      if (status === 403 || status === 400 || status === 401) {
        const message = error?.response?.data?.message;
        return { available: false, message } as const;
      }
      throw error;
    }
  },

  update: async (id: string, data: UpdateProfileDTO) => {
    const response = await api.post<{ message: string; profile: Profile }>(
      `/profile/${id}`,
      data,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Profile>(`/profile/${id}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<Profile[]>('/profile');
    return response.data;
  },

  getByUserId: async (userId: string) => {
    const response = await api.get<Profile[]>(`/profile/user/${userId}`);
    return response.data;
  },

  getBySlug: async (slug: string, previewToken?: string) => {
    const url = previewToken
      ? `/profile/slug/${slug}?preview=${previewToken}`
      : `/profile/slug/${slug}`;
    const response = await api.get<ProfileComplete>(url);
    return response.data;
  },

  // Backwards compatibility: mantém assinatura anterior, mas usa slug internamente
  getByUsername: async (username: string, previewToken?: string) => {
    return profileApi.getBySlug(username, previewToken);
  },

  getComplete: async (id: string) => {
    const response = await api.get<ProfileComplete>(`/profile/${id}/complete`);
    return response.data;
  },

  generatePreviewToken: async (id: string) => {
    const response = await api.post<{ token: string; expiresAt: string }>(
      `/profile/${id}/preview-token`,
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ message: string }>(`/profile/${id}`);
    return response.data;
  },
};

export interface FinalizeOnboardingRequest {
  draftId: string;
  templateType: TemplateType;
  slug: string;
  displayName: string;
  bio?: string;
  avatarDataUrl?: string;
  selectedPlatforms?: string[];
  platformLinks?: Record<string, string>;
  additionalLinks?: Array<{
    label: string;
    url: string;
  }>;
}

export interface FinalizeOnboardingResponse {
  profileId: string;
  templateType: TemplateType;
  redirectTo: string;
  skippedPlatforms: string[];
}

export const onboardingApi = {
  finalize: async (data: FinalizeOnboardingRequest) => {
    const response = await api.post<FinalizeOnboardingResponse>(
      '/onboarding/finalize',
      data,
    );
    return response.data;
  },
};

export interface FinalizeDeveloperOnboardingRequest {
  draftId: string;
  templateType: Extract<
    TemplateType,
    'template_01' | 'template_02' | 'template_03'
  >;
  slug: string;
  displayName: string;
  avatarUrl?: string;
  legenda?: {
    greeting?: string;
    legendaFoto?: string;
    nome: string;
    titulo: string;
    subtitulo: string;
    descricao: string;
  };
  social?: Array<{
    plataforma: string;
    url: string;
    ordem?: number;
  }>;
  projetos?: Array<{
    nome: string;
    descricao: string;
    demoLink?: string;
    codeLink?: string;
    gif?: string;
    ordem?: number;
    tags?: string[];
  }>;
  techStack?: {
    title: string;
    subtitle: string;
    technologies?: Array<{
      name: string;
      icon: string;
      color: string;
      ordem?: number;
    }>;
  };
  workHistory?: Array<{
    company: string;
    period: string;
    summary: string;
    impact?: string;
    ordem?: number;
    technologies?: Array<{
      technology: string;
    }>;
    responsibilities?: Array<{
      responsibility: string;
      ordem?: number;
    }>;
  }>;
  footer?: {
    title: string;
    subtitle: string;
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    copyrightName: string;
    madeWith?: string;
    resumeUrl?: string;
  };
  meta?: Record<string, unknown>;
}

export interface FinalizeDeveloperOnboardingResponse {
  profileId: string;
  templateType: Extract<
    TemplateType,
    'template_01' | 'template_02' | 'template_03'
  >;
  redirectTo: string;
}

export const developerOnboardingApi = {
  finalize: async (data: FinalizeDeveloperOnboardingRequest) => {
    const response = await api.post<FinalizeDeveloperOnboardingResponse>(
      '/developer-onboarding/finalize',
      data,
    );
    return response.data;
  },
};

// ============ LEGENDA ============
export const legendaApi = {
  create: async (data: CreateLegendaDTO) => {
    const response = await api.post<{ message: string; legenda?: Legenda }>(
      '/legenda',
      data,
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<CreateLegendaDTO, 'profileId'>> & { greeting?: string },
  ) => {
    const response = await api.patch<{ message: string; legenda: Legenda }>(
      `/legenda/${id}`,
      data,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Legenda>(`/legenda/${id}`);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get<Legenda>(`/legenda/profile/${profileId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/legenda/${id}`);
    return response.data;
  },
};

// ============ CONFIG ============
export const configApi = {
  create: async (data: CreateConfigDTO) => {
    const response = await api.post<{ message: string; config: Config }>(
      '/config',
      data,
    );
    return response.data;
  },

  update: async (id: string, data: Partial<CreateConfigDTO>) => {
    const response = await api.patch<{ message: string; config: Config }>(
      `/config/${id}`,
      data,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Config>(`/config/${id}`);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get<Config>(`/config/profile/${profileId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/config/${id}`);
    return response.data;
  },
};

// ============ PAGES ============
export const pagesApi = {
  create: async (data: CreatePageDTO) => {
    const response = await api.post<{ message: string; page: Page }>(
      '/pages',
      data,
    );
    return response.data;
  },

  update: async (id: string, data: Partial<CreatePageDTO>) => {
    const response = await api.patch<{ message: string; page: Page }>(
      `/pages/${id}`,
      data,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Page>(`/pages/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get<Page>(`/pages/slug/${slug}`);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get<Page[]>(`/pages/profile/${profileId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/pages/${id}`);
    return response.data;
  },
};

// ============ SOCIAL ============
export const socialApi = {
  create: async (data: CreateSocialDTO) => {
    const response = await api.post<Social>('/social', data);
    return response.data;
  },

  update: async (id: string, data: UpdateSocialDTO) => {
    const response = await api.patch<Social>(`/social/${id}`, data);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Social>(`/social/${id}`);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get<Social[]>(`/social/profile/${profileId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/social/${id}`);
    return response.data;
  },
};

// ============ PROJETOS ============
export const projetosApi = {
  create: async (data: CreateProjetoDTO) => {
    const response = await api.post<{ message: string; projeto: Projeto }>(
      '/projects',
      data,
    );
    return response.data;
  },

  update: async (id: string, data: UpdateProjetoDTO) => {
    const response = await api.patch<{ message: string; projeto: Projeto }>(
      `/projects/${id}`,
      data,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Projeto>(`/projects/${id}`);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get<Projeto[]>(
      `/projects?profileId=${profileId}`,
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// ============ TECH STACK ============
export const techStackApi = {
  create: async (profileId: string, data: CreateTechStackDTO) => {
    const response = await api.post(`/techstack/profile/${profileId}`, data);
    return response.data;
  },

  update: async (profileId: string, data: CreateTechStackDTO) => {
    const response = await api.put(`/techstack/profile/${profileId}`, data);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get(`/techstack/profile/${profileId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/techstack/${id}`);
    return response.data;
  },
};

// ============ WORK EXPERIENCE ============
export const workExperienceApi = {
  create: async (data: CreateWorkExperienceDTO) => {
    const response = await api.post(`/workexperience`, data);
    return response.data;
  },

  update: async (id: string, data: UpdateWorkExperienceDTO) => {
    const response = await api.put(`/workexperience/${id}`, data);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get(`/workexperience/profile/${profileId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/workexperience/${id}`);
    return response.data;
  },
};

// ============ FOOTER ============
export const footerApi = {
  create: async (data: CreateFooterDTO) => {
    const response = await api.post(`/footer`, data);
    return response.data;
  },

  update: async (id: string, data: UpdateFooterDTO) => {
    const response = await api.put(`/footer/${id}`, data);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get(`/footer/profile/${profileId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/footer/${id}`);
    return response.data;
  },
};

// ============ UPLOAD ============
export const uploadApi = {
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<{ url: string; message: string }>(
      '/upload/resume',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
};

// ============ LINK BUTTONS ============
export interface CreateLinkButtonDTO {
  profileId: string;
  label: string;
  url: string;
  subtext?: string;
  icon?: string;
  style?: string;
  ordem?: number;
  ativo?: boolean;
}

export interface UpdateLinkButtonDTO {
  label?: string;
  url?: string;
  subtext?: string;
  icon?: string;
  style?: string;
  ordem?: number;
  ativo?: boolean;
}

export interface LinkButton {
  id: string;
  profileId: string;
  label: string;
  url: string;
  subtext?: string;
  icon?: string;
  style?: string;
  ordem: number;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export const linkButtonsApi = {
  create: async (data: CreateLinkButtonDTO) => {
    const response = await api.post<{
      message: string;
      linkButton: LinkButton;
    }>('/link-buttons', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<LinkButton[]>('/link-buttons');
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get<LinkButton[]>(
      `/link-buttons/profile/${profileId}`,
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<LinkButton>(`/link-buttons/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateLinkButtonDTO) => {
    const response = await api.patch<LinkButton>(`/link-buttons/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ message: string }>(
      `/link-buttons/${id}`,
    );
    return response.data;
  },

  deleteAllByProfileId: async (profileId: string) => {
    const response = await api.delete<{ message: string }>(
      `/link-buttons/profile/${profileId}`,
    );
    return response.data;
  },

  upsertMany: async (
    profileId: string,
    buttons: Omit<CreateLinkButtonDTO, 'profileId'>[],
  ) => {
    const response = await api.put<{
      message: string;
      linkButtons: LinkButton[];
    }>(`/link-buttons/profile/${profileId}`, buttons);
    return response.data;
  },
};
