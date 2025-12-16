import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Profile, ProfileComplete } from '@/types';
import { usersApi, profileApi } from '@/lib/api';

interface AuthState {
  user: User | null;
  profile: ProfileComplete | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, senha: string) => Promise<void>;
  signup: (email: string, senha: string, nome: string) => Promise<User>;
  logout: () => void;
  setProfile: (profile: ProfileComplete | null) => void;
  loadProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, senha: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await usersApi.login({ email, senha });
          const { user, token } = response;
          
          localStorage.setItem('bio4dev_token', token);
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          // Carregar perfil do usuário
          await get().loadProfile();
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Erro ao fazer login',
            isLoading: false 
          });
          throw error;
        }
      },
      
      signup: async (email: string, senha: string, nome: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await usersApi.create({ email, senha, nome });
          set({ isLoading: false });
          return response.user;
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Erro ao criar conta',
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: () => {
        localStorage.removeItem('bio4dev_token');
        set({ 
          user: null, 
          profile: null, 
          token: null, 
          isAuthenticated: false 
        });
      },
      
      setProfile: (profile: ProfileComplete | null) => {
        set({ profile });
      },
      
      loadProfile: async () => {
        const { user } = get();
        if (!user) return;
        
        try {
          // Buscar perfil do usuário
          // TODO: Implementar busca de perfil por userId
          // Por enquanto, o profile será setado após criação
        } catch (error) {
          console.error('Erro ao carregar perfil:', error);
        }
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'bio4dev-auth',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

