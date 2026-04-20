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

const buildApiUrl = (path: string) =>
  new URL(
    path.replace(/^\//, ''),
    `${getApiBaseUrl().replace(/\/$/, '')}/`,
  ).toString();

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
          window.location.assign(buildApiUrl('/auth/google'));
        } catch (error: any) {
          set({
            isLoading: false,
            error:
              error?.message || 'Não foi possível iniciar login com Google',
          });
          throw error;
        }
      },

      bootstrapAuth: async () => {
        const { authStatus, accessToken, isAuthenticated, user } = get();

        if (authStatus === 'authenticated' && user) {
          return 'authenticated';
        }

        if (
          authStatus === 'guest' &&
          !isAuthenticated &&
          !accessToken &&
          !user
        ) {
          return 'guest';
        }

        if (bootstrapAuthPromise) {
          return bootstrapAuthPromise;
        }

        set({ authStatus: 'booting' });

        bootstrapAuthPromise = (async () => {
          const syncCurrentUser = async () => {
            try {
              const response = await api.get<User>('/users/me');
              set({ user: response.data, error: null });
              return response.data;
            } catch {
              return null;
            }
          };

          if (get().accessToken && get().isAuthenticated) {
            if (!get().user) {
              const currentUser = await syncCurrentUser();
              if (!currentUser) {
                set({
                  authStatus: 'guest',
                  isAuthenticated: false,
                  accessToken: null,
                  user: null,
                  profile: null,
                });
                return 'guest' as const;
              }
            }
            set({ authStatus: 'authenticated' });
            return 'authenticated' as const;
          }

          const token = await get().refreshAccessToken();

          if (token) {
            const currentUser = get().user ?? (await syncCurrentUser());
            if (!currentUser) {
              set({
                authStatus: 'guest',
                isAuthenticated: false,
                accessToken: null,
                user: null,
                profile: null,
              });
              return 'guest' as const;
            }
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
          const response = await fetch(buildApiUrl('/auth/refresh'), {
            method: 'POST',
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Token refresh failed');
          }

          const data = await response.json();
          set({
            accessToken: data.accessToken,
            user: data.user ?? get().user,
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
          await fetch(buildApiUrl('/auth/logout'), {
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
