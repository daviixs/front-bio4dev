import { create } from 'zustand';
import type { 
  ProfileComplete, 
  Legenda, 
  Config, 
  Page, 
  Social, 
  Projeto,
  CreateLegendaDTO,
  CreateConfigDTO,
  CreatePageDTO,
  CreateSocialDTO,
  CreateProjetoDTO,
} from '@/types';
import { 
  profileApi, 
  legendaApi, 
  configApi, 
  pagesApi, 
  socialApi, 
  projetosApi 
} from '@/lib/api';

interface ProfileState {
  profile: ProfileComplete | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProfile: (profile: ProfileComplete | null) => void;
  loadProfile: (profileId: string) => Promise<void>;
  loadPublicProfile: (username: string) => Promise<ProfileComplete | null>;
  updateProfile: (id: string, data: Partial<ProfileComplete>) => Promise<void>;
  
  // Legenda
  createLegenda: (data: CreateLegendaDTO) => Promise<void>;
  updateLegenda: (id: string, data: Partial<CreateLegendaDTO>) => Promise<void>;
  
  // Config
  createConfig: (data: CreateConfigDTO) => Promise<void>;
  updateConfig: (id: string, data: Partial<CreateConfigDTO>) => Promise<void>;
  
  // Pages
  createPage: (data: CreatePageDTO) => Promise<void>;
  updatePage: (id: string, data: Partial<CreatePageDTO>) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  
  // Social
  createSocial: (data: CreateSocialDTO) => Promise<void>;
  updateSocial: (id: string, data: Partial<CreateSocialDTO>) => Promise<void>;
  deleteSocial: (id: string) => Promise<void>;
  
  // Projetos
  createProjeto: (data: CreateProjetoDTO) => Promise<void>;
  updateProjeto: (id: string, data: Partial<CreateProjetoDTO>) => Promise<void>;
  deleteProjeto: (id: string) => Promise<void>;
  
  clearError: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,
  
  setProfile: (profile) => set({ profile }),
  
  loadProfile: async (profileId: string) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await profileApi.getComplete(profileId);
      set({ profile, isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erro ao carregar perfil',
        isLoading: false 
      });
    }
  },
  
  loadPublicProfile: async (username: string) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await profileApi.getByUsername(username);
      set({ profile, isLoading: false });
      return profile;
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Perfil não encontrado',
        isLoading: false 
      });
      return null;
    }
  },
  
  updateProfile: async (id: string, data: Partial<ProfileComplete>) => {
    set({ isLoading: true, error: null });
    try {
      await profileApi.update(id, data);
      const profile = get().profile;
      if (profile) {
        set({ profile: { ...profile, ...data }, isLoading: false });
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Erro ao atualizar perfil',
        isLoading: false 
      });
    }
  },
  
  // Legenda
  createLegenda: async (data: CreateLegendaDTO) => {
    try {
      const response = await legendaApi.create(data);
      const profile = get().profile;
      if (profile && response.legenda) {
        set({ profile: { ...profile, legenda: response.legenda } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao criar legenda' });
    }
  },
  
  updateLegenda: async (id: string, data: Partial<CreateLegendaDTO>) => {
    try {
      const response = await legendaApi.update(id, data);
      const profile = get().profile;
      if (profile) {
        set({ profile: { ...profile, legenda: response.legenda } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao atualizar legenda' });
    }
  },
  
  // Config
  createConfig: async (data: CreateConfigDTO) => {
    try {
      const response = await configApi.create(data);
      const profile = get().profile;
      if (profile) {
        set({ profile: { ...profile, config: response.config } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao criar config' });
    }
  },
  
  updateConfig: async (id: string, data: Partial<CreateConfigDTO>) => {
    try {
      const response = await configApi.update(id, data);
      const profile = get().profile;
      if (profile) {
        set({ profile: { ...profile, config: response.config } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao atualizar config' });
    }
  },
  
  // Pages
  createPage: async (data: CreatePageDTO) => {
    try {
      const response = await pagesApi.create(data);
      const profile = get().profile;
      if (profile) {
        const pages = [...(profile.pages || []), response.page];
        set({ profile: { ...profile, pages } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao criar página' });
    }
  },
  
  updatePage: async (id: string, data: Partial<CreatePageDTO>) => {
    try {
      await pagesApi.update(id, data);
      const profile = get().profile;
      if (profile) {
        const pages = profile.pages?.map(p => p.id === id ? { ...p, ...data } : p);
        set({ profile: { ...profile, pages } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao atualizar página' });
    }
  },
  
  deletePage: async (id: string) => {
    try {
      await pagesApi.delete(id);
      const profile = get().profile;
      if (profile) {
        const pages = profile.pages?.filter(p => p.id !== id);
        set({ profile: { ...profile, pages } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao deletar página' });
    }
  },
  
  // Social
  createSocial: async (data: CreateSocialDTO) => {
    try {
      const response = await socialApi.create(data);
      const profile = get().profile;
      if (profile) {
        const socials = [...(profile.socials || []), response.social];
        set({ profile: { ...profile, socials } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao criar rede social' });
    }
  },
  
  updateSocial: async (id: string, data: Partial<CreateSocialDTO>) => {
    try {
      await socialApi.update(id, data);
      const profile = get().profile;
      if (profile) {
        const socials = profile.socials?.map(s => s.id === id ? { ...s, ...data } : s);
        set({ profile: { ...profile, socials } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao atualizar rede social' });
    }
  },
  
  deleteSocial: async (id: string) => {
    try {
      await socialApi.delete(id);
      const profile = get().profile;
      if (profile) {
        const socials = profile.socials?.filter(s => s.id !== id);
        set({ profile: { ...profile, socials } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao deletar rede social' });
    }
  },
  
  // Projetos
  createProjeto: async (data: CreateProjetoDTO) => {
    try {
      const response = await projetosApi.create(data);
      const profile = get().profile;
      if (profile) {
        const projetos = [...(profile.projetos || []), response.projeto];
        set({ profile: { ...profile, projetos } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao criar projeto' });
    }
  },
  
  updateProjeto: async (id: string, data: Partial<CreateProjetoDTO>) => {
    try {
      await projetosApi.update(id, data);
      const profile = get().profile;
      if (profile) {
        const projetos = profile.projetos?.map(p => p.id === id ? { ...p, ...data } : p);
        set({ profile: { ...profile, projetos } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao atualizar projeto' });
    }
  },
  
  deleteProjeto: async (id: string) => {
    try {
      await projetosApi.delete(id);
      const profile = get().profile;
      if (profile) {
        const projetos = profile.projetos?.filter(p => p.id !== id);
        set({ profile: { ...profile, projetos } });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Erro ao deletar projeto' });
    }
  },
  
  clearError: () => set({ error: null }),
}));

