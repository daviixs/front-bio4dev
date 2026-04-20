import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, ProfileComplete } from '@/types';
import { profileApi, configureAuthInterceptors, api } from '@/lib/api';

type AuthStatus = 'booting' | 'authenticated' | 'guest';

interface AuthState {
  user: User | null;
  profile: ProfileComplete | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  authStatus: AuthStatus;
  hasHydrated: boolean;
  isLoading: boolean;
  error: string | null;

  loginWithGoogle: () => Promise<void>;
  handleOAuthCallback: (
    code: string,
    state?: string | null,
  ) => Promise<boolean | void>;
  bootstrapAuth: () => Promise<AuthStatus>;
  refreshAccessToken: () => Promise<string | null>;
  logout: () => Promise<void>;
  setProfile: (profile: ProfileComplete | null) => void;
  loadProfile: () => Promise<void>;
  clearError: () => void;
}

let bootstrapAuthPromise: Promise<AuthStatus> | null = null;

const getApiBaseUrl = () => {
  const currentHost =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.hostname}`
      : 'http://localhost';

  return import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : `${currentHost}:3000`;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      accessToken: null,
      isAuthenticated: false,
      authStatus: 'booting',
      hasHydrated: false,
      isLoading: false,
      error: null,

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get<{ url: string; state: string }>(
            '/auth/google',
          );
          const { url } = response.data;
          window.location.href = url;
        } catch (error: any) {
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              'Não foi possível iniciar login com Google',
          });
        }
      },

      handleOAuthCallback: async (code: string, state?: string | null) => {
        set({ isLoading: true, error: null });
        try {
          const apiUrl = getApiBaseUrl();
          const url = new URL(`${apiUrl}/auth/google/callback`);
          url.searchParams.set('code', code);
          if (state) url.searchParams.set('state', state);

          const response = await fetch(url.toString(), {
            method: 'GET',
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Falha ao concluir login com Google');
          }

          const data = await response.json();

          set({
            user: data.user,
            accessToken: data.accessToken,
            isAuthenticated: true,
            authStatus: 'authenticated',
            isLoading: false,
            error: null,
          });

          return data.isNew as boolean;
        } catch (error: any) {
          set({
            error:
              error.message ||
              'Não foi possível autenticar com Google. Tente novamente.',
            isLoading: false,
            isAuthenticated: false,
            authStatus: 'guest',
            accessToken: null,
            user: null,
            profile: null,
          });
          throw error;
        }
      },

      bootstrapAuth: async () => {
        const { authStatus, accessToken, isAuthenticated } = get();

        if (authStatus === 'authenticated') {
          return 'authenticated';
        }

        if (authStatus === 'guest' && !isAuthenticated && !accessToken) {
          return 'guest';
        }

        if (bootstrapAuthPromise) {
          return bootstrapAuthPromise;
        }

        set({ authStatus: 'booting' });

        bootstrapAuthPromise = (async () => {
          if (get().accessToken && get().isAuthenticated) {
            set({ authStatus: 'authenticated' });
            return 'authenticated' as const;
          }

          const token = await get().refreshAccessToken();

          if (token) {
            set({ authStatus: 'authenticated' });
            return 'authenticated' as const;
          }

          set({
            authStatus: 'guest',
            isAuthenticated: false,
            accessToken: null,
            user: null,
            profile: null,
          });
          return 'guest' as const;
        })().finally(() => {
          bootstrapAuthPromise = null;
        });

        return bootstrapAuthPromise;
      },

      refreshAccessToken: async () => {
        try {
          const apiUrl = getApiBaseUrl();
          const response = await fetch(`${apiUrl}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Token refresh failed');
          }

          const data = await response.json();
          set({
            accessToken: data.accessToken,
            isAuthenticated: true,
            authStatus: 'authenticated',
          });
          return data.accessToken as string;
        } catch (error) {
          set({
            authStatus: 'guest',
            isAuthenticated: false,
            accessToken: null,
            user: null,
            profile: null,
          });
          return null;
        }
      },

      logout: async () => {
        try {
          const apiUrl = getApiBaseUrl();
          await fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });
        } finally {
          set({
            user: null,
            profile: null,
            accessToken: null,
            isAuthenticated: false,
            authStatus: 'guest',
          });
        }
      },

      setProfile: (profile: ProfileComplete | null) => {
        set({ profile });
      },

      loadProfile: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const profiles = await profileApi.getAll();
          const userProfile =
            profiles.find((p: any) => p.isActive) || profiles[0] || null;

          if (userProfile) {
            set({ profile: userProfile });
          }
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
      onRehydrateStorage: () => (state, error) => {
        useAuthStore.setState({
          hasHydrated: true,
          authStatus: error ? 'guest' : 'booting',
        });
      },
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

configureAuthInterceptors({
  getAccessToken: () => useAuthStore.getState().accessToken,
  refreshAccessToken: () => useAuthStore.getState().refreshAccessToken(),
  onUnauthorized: () => useAuthStore.getState().logout(),
});
