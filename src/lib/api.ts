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
  CreateProjetoDTO,
  LoginDTO,
} from "@/types";

const API_BASE_URL = "http://localhost:5000";

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
      data
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
      data
    );
    return response.data;
  },

  update: async (id: string, data: UpdateProfileDTO) => {
    const response = await api.post<{ message: string; profile: Profile }>(
      `/profile/${id}`,
      data
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

  getByUsername: async (username: string) => {
    const response = await api.get<ProfileComplete>(
      `/profile/username/${username}`
    );
    return response.data;
  },

  getComplete: async (id: string) => {
    const response = await api.get<ProfileComplete>(`/profile/${id}/complete`);
    return response.data;
  },
};

// ============ LEGENDA ============
export const legendaApi = {
  create: async (data: CreateLegendaDTO) => {
    const response = await api.post<{ message: string; legenda?: Legenda }>(
      "/legenda",
      data
    );
    return response.data;
  },

  update: async (id: string, data: Partial<CreateLegendaDTO>) => {
    const response = await api.patch<{ message: string; legenda: Legenda }>(
      `/legenda/${id}`,
      data
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
      data
    );
    return response.data;
  },

  update: async (id: string, data: Partial<CreateConfigDTO>) => {
    const response = await api.post<{ message: string; config: Config }>(
      `/config/${id}`,
      data
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
      data
    );
    return response.data;
  },

  update: async (id: string, data: Partial<CreatePageDTO>) => {
    const response = await api.patch<{ message: string; page: Page }>(
      `/pages/${id}`,
      data
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
    const response = await api.post<{ message: string; social: Social }>(
      "/social",
      data
    );
    return response.data;
  },

  update: async (id: string, data: Partial<CreateSocialDTO>) => {
    const response = await api.patch<{ message: string; social: Social }>(
      `/social/${id}`,
      data
    );
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
      "/projetos",
      data
    );
    return response.data;
  },

  update: async (id: string, data: Partial<CreateProjetoDTO>) => {
    const response = await api.patch<{ message: string; projeto: Projeto }>(
      `/projetos/${id}`,
      data
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Projeto>(`/projetos/${id}`);
    return response.data;
  },

  getByProfileId: async (profileId: string) => {
    const response = await api.get<Projeto[]>(`/projetos/profile/${profileId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projetos/${id}`);
    return response.data;
  },
};
