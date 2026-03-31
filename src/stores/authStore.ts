import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, ProfileComplete } from "@/types";
import { profileApi, configureAuthInterceptors, api } from "@/lib/api";

interface AuthState {
  user: User | null;
  profile: ProfileComplete | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  loginWithGoogle: () => Promise<void>;
  handleOAuthCallback: (code: string, state?: string | null) => Promise<boolean | void>;
  refreshAccessToken: () => Promise<string | null>;
  logout: () => Promise<void>;
  setProfile: (profile: ProfileComplete | null) => void;
  loadProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get<{ url: string; state: string }>(
            "/auth/google",
          );
          const { url } = response.data;
          window.location.href = url;
        } catch (error: any) {
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              "Não foi possível iniciar login com Google",
          });
        }
      },

      handleOAuthCallback: async (code: string, state?: string | null) => {
        set({ isLoading: true, error: null });
        try {
          const url = new URL(
            `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/google/callback`,
          );
          url.searchParams.set("code", code);
          if (state) url.searchParams.set("state", state);

          const response = await fetch(url.toString(), {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Falha ao concluir login com Google");
          }

          const data = await response.json();

          set({
            user: data.user,
            accessToken: data.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });

          await get().loadProfile();
          return data.isNew as boolean;
        } catch (error: any) {
          set({
            error:
              error.message ||
              "Não foi possível autenticar com Google. Tente novamente.",
            isLoading: false,
            isAuthenticated: false,
            accessToken: null,
            user: null,
          });
          throw error;
        }
      },

      refreshAccessToken: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/refresh`,
            {
              method: "POST",
              credentials: "include",
            },
          );

          if (!response.ok) {
            throw new Error("Token refresh failed");
          }

          const data = await response.json();
          set({ accessToken: data.accessToken, isAuthenticated: true });
          return data.accessToken as string;
        } catch (error) {
          set({
            isAuthenticated: false,
            accessToken: null,
            user: null,
          });
          return null;
        }
      },

      logout: async () => {
        try {
          await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/logout`,
            {
              method: "POST",
              credentials: "include",
            },
          );
        } finally {
          set({
            user: null,
            profile: null,
            accessToken: null,
            isAuthenticated: false,
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
          const userProfile = profiles.find((p: any) => p.userId === user.id);

          if (userProfile) {
            set({ profile: userProfile });
          }
        } catch (error) {
          console.error("Erro ao carregar perfil:", error);
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "bio4dev-auth",
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
