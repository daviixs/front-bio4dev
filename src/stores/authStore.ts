import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, ProfileComplete } from '@/types';
import { profileApi, configureAuthInterceptors, api } from '@/lib/api';

type AuthStatus = 'booting' | 'authenticated' | 'guest';
type RefreshAccessTokenOptions = {
  markAuthenticated?: boolean;
  invalidateOnFailure?: boolean;
};

const SESSION_REQUEST_TIMEOUT_MS = 8000;
const SESSION_EXPIRED_MESSAGE = 'Sua sessão expirou. Entre novamente.';

const getAuthErrorDetails = (error: unknown) => {
  if (error instanceof Error) {
    const maybeAxiosError = error as Error & {
      code?: string;
      response?: { status?: number; data?: unknown };
    };
    return {
      name: error.name,
      message: error.message,
      code: maybeAxiosError.code,
      status: maybeAxiosError.response?.status,
      data: maybeAxiosError.response?.data,
    };
  }

  return { error };
};

const logAuthStore = (message: string, details?: Record<string, unknown>) => {
  if (!import.meta.env.DEV) return;
  console.log(`[auth][store] ${message}`, details ?? {});
};

const warnAuthStore = (message: string, details?: Record<string, unknown>) => {
  if (!import.meta.env.DEV) return;
  console.warn(`[auth][store] ${message}`, details ?? {});
};

interface AuthState {
  user: User | null;
  profile: ProfileComplete | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  authStatus: AuthStatus;
  hasHydrated: boolean;
  isLoading: boolean;
  error: string | null;
  authRedirectMessage: string | null;

  loginWithGoogle: () => Promise<void>;
  bootstrapAuth: () => Promise<AuthStatus>;
  refreshAccessToken: (
    options?: RefreshAccessTokenOptions,
  ) => Promise<string | null>;
  logout: () => Promise<void>;
  setProfile: (profile: ProfileComplete | null) => void;
  loadProfile: () => Promise<void>;
  clearError: () => void;
  consumeAuthRedirectMessage: () => string | null;
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
    (set, get) => {
      const clearSession = (authRedirectMessage: string | null = null) => {
        warnAuthStore('clearing session', {
          reason: authRedirectMessage ?? 'no redirect message',
        });
        set({
          user: null,
          profile: null,
          accessToken: null,
          isAuthenticated: false,
          authStatus: 'guest',
          isLoading: false,
          error: null,
          authRedirectMessage,
        });
      };

      const requestAccessToken = async (
        options: RefreshAccessTokenOptions = {},
      ) => {
        const { markAuthenticated = true, invalidateOnFailure = true } =
          options;
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          SESSION_REQUEST_TIMEOUT_MS,
        );

        logAuthStore('refresh request started', {
          markAuthenticated,
          invalidateOnFailure,
          url: buildApiUrl('/auth/refresh'),
        });

        try {
          const response = await fetch(buildApiUrl('/auth/refresh'), {
            method: 'POST',
            credentials: 'include',
            signal: controller.signal,
          });

          if (!response.ok) {
            warnAuthStore('refresh request returned non-OK response', {
              status: response.status,
              statusText: response.statusText,
            });
            throw new Error('Token refresh failed');
          }

          const data = await response.json();
          logAuthStore('refresh request succeeded', {
            hasAccessToken: Boolean(data.accessToken),
            responseUserId: data.user?.id ?? null,
            previousUserId: get().user?.id ?? null,
            markAuthenticated,
          });
          set({
            accessToken: data.accessToken,
            user: data.user ?? get().user,
            isAuthenticated: true,
            authStatus: markAuthenticated ? 'authenticated' : get().authStatus,
            authRedirectMessage: null,
            error: null,
          });
          return data.accessToken as string;
        } catch (error) {
          warnAuthStore('refresh request failed', {
            invalidateOnFailure,
            error: getAuthErrorDetails(error),
          });
          if (invalidateOnFailure) {
            clearSession();
          }
          return null;
        } finally {
          clearTimeout(timeoutId);
        }
      };

      return {
        user: null,
        profile: null,
        accessToken: null,
        isAuthenticated: false,
        authStatus: 'booting',
        hasHydrated: false,
        isLoading: false,
        error: null,
        authRedirectMessage: null,

        loginWithGoogle: async () => {
          if (get().isLoading) {
            return;
          }

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
          const hasSessionHint = Boolean(
            accessToken || isAuthenticated || user,
          );

          logAuthStore('bootstrap requested', {
            authStatus,
            hasAccessToken: Boolean(accessToken),
            isAuthenticated,
            hasUser: Boolean(user),
            userId: user?.id ?? null,
            hasSessionHint,
          });

          if (authStatus === 'authenticated' && accessToken && user) {
            logAuthStore('bootstrap skipped because session is already valid', {
              userId: user.id,
            });
            return 'authenticated';
          }

          if (authStatus === 'guest' && !hasSessionHint) {
            logAuthStore('bootstrap skipped because state is a clean guest');
            return 'guest';
          }

          if (bootstrapAuthPromise) {
            logAuthStore('bootstrap joined existing request');
            return bootstrapAuthPromise;
          }

          set({ authStatus: 'booting', authRedirectMessage: null });

          bootstrapAuthPromise = (async () => {
            const syncCurrentUser = async () => {
              try {
                logAuthStore('syncing current user via /users/me');
                const response = await api.get<User>('/users/me', {
                  timeout: SESSION_REQUEST_TIMEOUT_MS,
                });
                logAuthStore('/users/me succeeded', {
                  userId: response.data.id,
                });
                set({ user: response.data, error: null });
                return response.data;
              } catch (error) {
                warnAuthStore('/users/me failed', {
                  error: getAuthErrorDetails(error),
                });
                return null;
              }
            };

            if (get().accessToken) {
              logAuthStore('bootstrap using existing access token');
              const currentUser = await syncCurrentUser();
              if (!currentUser) {
                warnAuthStore(
                  'bootstrap rejected existing access token because /users/me failed',
                );
                clearSession(hasSessionHint ? SESSION_EXPIRED_MESSAGE : null);
                return 'guest' as const;
              }
              set({
                isAuthenticated: true,
                authStatus: 'authenticated',
                authRedirectMessage: null,
              });
              return 'authenticated' as const;
            }

            logAuthStore('bootstrap trying refresh cookie');
            const token = await get().refreshAccessToken({
              markAuthenticated: false,
              invalidateOnFailure: false,
            });

            if (!token) {
              warnAuthStore('bootstrap refresh returned no token');
              clearSession(hasSessionHint ? SESSION_EXPIRED_MESSAGE : null);
              return 'guest' as const;
            }

            const currentUser = get().user ?? (await syncCurrentUser());
            if (!currentUser) {
              warnAuthStore(
                'bootstrap had a token but could not resolve current user',
              );
              clearSession(SESSION_EXPIRED_MESSAGE);
              return 'guest' as const;
            }

            set({
              isAuthenticated: true,
              authStatus: 'authenticated',
              authRedirectMessage: null,
            });
            return 'authenticated' as const;
          })()
            .catch((error) => {
              warnAuthStore('bootstrap failed unexpectedly', {
                error: getAuthErrorDetails(error),
              });
              clearSession(hasSessionHint ? SESSION_EXPIRED_MESSAGE : null);
              return 'guest' as const;
            })
            .finally(() => {
              logAuthStore('bootstrap request finished');
              bootstrapAuthPromise = null;
            });

          return bootstrapAuthPromise;
        },

        refreshAccessToken: async (options = {}) => {
          return requestAccessToken(options);
        },

        logout: async () => {
          try {
            await fetch(buildApiUrl('/auth/logout'), {
              method: 'POST',
              credentials: 'include',
            });
          } finally {
            clearSession();
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

        consumeAuthRedirectMessage: () => {
          const message = get().authRedirectMessage;
          if (message) {
            set({ authRedirectMessage: null });
          }
          return message;
        },
      };
    },
    {
      name: 'bio4dev-auth',
      onRehydrateStorage: () => (state, error) => {
        logAuthStore('persisted auth rehydrated', {
          hasError: Boolean(error),
          error: error ? getAuthErrorDetails(error) : null,
          hasPersistedUser: Boolean(state?.user),
          persistedUserId: state?.user?.id ?? null,
          persistedIsAuthenticated: Boolean(state?.isAuthenticated),
        });
        useAuthStore.setState({
          hasHydrated: true,
          authStatus: error ? 'guest' : 'booting',
          authRedirectMessage: null,
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
