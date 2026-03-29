import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Profile, ProfileComplete } from "@/types";
import { usersApi, profileApi, api } from "@/lib/api";

interface AuthState {
  user: User | null;
  profile: ProfileComplete | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, senha: string) => Promise<{ hasProfile: boolean }>;
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
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, senha: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await usersApi.login({ email, senha });
          const { user } = response;

          // Armazenar dados do usuário
          localStorage.setItem("bio4dev_user", JSON.stringify(user));

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          // Verificar se o usuário tem perfil
          await get().loadProfile();
          const hasProfile = !!get().profile;

          return { hasProfile };
        } catch (error: any) {
          let errorMessage = "Erro ao fazer login";

          if (
            error.code === "ERR_NETWORK" ||
            error.message === "Network Error"
          ) {
            errorMessage =
              "Não foi possível conectar ao servidor. Verifique se o backend está rodando.";
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      signup: async (email: string, senha: string, nome: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await usersApi.create({ email, senha, nome });

          // Fazer login automático após criar a conta
          const user = response.user;
          localStorage.setItem("bio4dev_user", JSON.stringify(user));

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          return user;
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Erro ao criar conta",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("bio4dev_user");
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
        });
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
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
