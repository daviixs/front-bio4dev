import axios from "axios";
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
  CreateTechnologyDTO,
  CreateWorkExperienceDTO,
  UpdateWorkExperienceDTO,
  CreateFooterDTO,
  UpdateFooterDTO,
  LoginDTO,
  Footer,
} from "@/types";

// Usa a variável de ambiente ou fallback para localhost:3000
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============ USERS ============
export const usersApi = {
  create: async (data: CreateUserDTO) => {
    const response = await api.post<{ message: string; user: User }>(
      "/users/register",
      data,
    );
    return response.data;
  },

  login: async (data: LoginDTO) => {
    const response = await api.post<{
      message: string;
      user: User;
    }>("/users/login", data);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },
};

// ============ PROFILE ============
export const profileApi = {
  create: async (data: CreateProfileDTO) => {
    const response = await api.post<{ message: string; profile: Profile }>(
      "/profile",
      data,
    );
    return response.data;
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
    const response = await api.get<Profile[]>("/profile");
    return response.data;
  },

  getByUsername: async (username: string, previewToken?: string) => {
    const url = previewToken
      ? `/profile/username/${username}?preview=${previewToken}`
      : `/profile/username/${username}`;
    const response = await api.get<ProfileComplete>(url);
    return response.data;
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

// ============ LEGENDA ============
export const legendaApi = {
  create: async (data: CreateLegendaDTO) => {
    const response = await api.post<{ message: string; legenda?: Legenda }>(
      "/legenda",
      data,
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<CreateLegendaDTO, "profileId">> & { greeting?: string },
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
      "/config",
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
      "/pages",
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
    const response = await api.post<Social>("/social", data);
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
      "/projects",
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
    formData.append("file", file);
    const response = await api.post<{ url: string; message: string }>(
      "/upload/resume",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
    }>("/link-buttons", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<LinkButton[]>("/link-buttons");
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
    buttons: Omit<CreateLinkButtonDTO, "profileId">[],
  ) => {
    const response = await api.put<{
      message: string;
      linkButtons: LinkButton[];
    }>(`/link-buttons/profile/${profileId}`, buttons);
    return response.data;
  },
};
