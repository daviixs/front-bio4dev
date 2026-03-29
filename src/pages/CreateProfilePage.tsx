import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Palette, Zap, Rocket, Users } from "lucide-react";
import { profileApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { landingTheme } from "@/theme/landingTheme";
import activistImg from "@/temas-lintree/preview-screenshots/activist.png";
import altMusicImg from "@/temas-lintree/preview-screenshots/alt-music.png";
import architectImg from "@/temas-lintree/preview-screenshots/architect.png";
import artistImg from "@/temas-lintree/preview-screenshots/artist.png";
import athleteImg from "@/temas-lintree/preview-screenshots/Athlete.png";
import businessImg from "@/temas-lintree/preview-screenshots/business.png";
import creatorImg from "@/temas-lintree/preview-screenshots/creator.png";
import ecoFashionImg from "@/temas-lintree/preview-screenshots/eco-fashion.png";
import gourmetImg from "@/temas-lintree/preview-screenshots/gourmet.png";
import innovationImg from "@/temas-lintree/preview-screenshots/innovation.png";
import streamerImg from "@/temas-lintree/preview-screenshots/streamer.png";

// Image mapping for influencer previews (from preview-screenshots)
const templateImages: Record<string, string> = {
  activist: activistImg,
  altmusic: altMusicImg,
  architect: architectImg,
  artist: artistImg,
  athlete: athleteImg,
  business: businessImg,
  creator: creatorImg,
  ecofashion: ecoFashionImg,
  gourmet: gourmetImg,
  innovation: innovationImg,
  streamer: streamerImg,
};

// Influencer templates
const influencerTemplates = [
  {
    id: "activist",
    name: "Ativista",
    description: "Para causas e educação",
    icon: <Users className="w-6 h-6" />,
    color: "bg-green-600",
    preview: "bg-green-50",
    type: "influencer" as const,
  },
  {
    id: "altmusic",
    name: "Alt Music",
    description: "Para músicos alternativos",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-purple-600",
    preview: "bg-purple-50",
    type: "influencer" as const,
  },
  {
    id: "architect",
    name: "Arquiteto",
    description: "Portfolio de arquitetura",
    icon: <Palette className="w-6 h-6" />,
    color: "bg-slate-700",
    preview: "bg-slate-50",
    type: "influencer" as const,
  },
  {
    id: "artist",
    name: "Artista",
    description: "Para artistas musicais",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-pink-600",
    preview: "bg-pink-50",
    type: "influencer" as const,
  },
  {
    id: "athlete",
    name: "Atleta",
    description: "Para esportistas",
    icon: <Rocket className="w-6 h-6" />,
    color: "bg-blue-700",
    preview: "bg-blue-50",
    type: "influencer" as const,
  },
  {
    id: "business",
    name: "Negócio",
    description: "Para pequenos negócios",
    icon: <Palette className="w-6 h-6" />,
    color: "bg-amber-700",
    preview: "bg-amber-50",
    type: "influencer" as const,
  },
  {
    id: "creator",
    name: "Criador",
    description: "Para criadores de conteúdo",
    icon: <Rocket className="w-6 h-6" />,
    color: "bg-indigo-600",
    preview: "bg-indigo-50",
    type: "influencer" as const,
  },
  {
    id: "ecofashion",
    name: "Eco Fashion",
    description: "Moda sustentável",
    icon: <Palette className="w-6 h-6" />,
    color: "bg-teal-600",
    preview: "bg-teal-50",
    type: "influencer" as const,
  },
  {
    id: "gourmet",
    name: "Gourmet",
    description: "Para chefs e gastronomia",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-orange-600",
    preview: "bg-orange-50",
    type: "influencer" as const,
  },
  {
    id: "innovation",
    name: "Innovation",
    description: "Tech e inovação",
    icon: <Rocket className="w-6 h-6" />,
    color: "bg-cyan-600",
    preview: "bg-cyan-50",
    type: "influencer" as const,
  },
  {
    id: "streamer",
    name: "Streamer",
    description: "Para gamers e streamers",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-violet-600",
    preview: "bg-violet-50",
    type: "influencer" as const,
  },
] as const;

export function CreateProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSlugModalOpen, setIsSlugModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [slugError, setSlugError] = useState<string | null>(null);
  const [slugValue, setSlugValue] = useState<string | null>(null);
  const [hasPromptedForSlug, setHasPromptedForSlug] = useState(false);

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  const slugPreview = toSlug(nameInput);
  const hasInvalidChars = /[^a-zA-Z0-9-\s]/.test(nameInput);

  // Verificar se o usuário está logado ao montar o componente
  useEffect(() => {
    console.log("CreateProfilePage mounted, user:", user);
    if (!user) {
      console.warn("Nenhum usuário logado, redirecionando para login");
      toast.error("Faça login para continuar");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (hasPromptedForSlug || slugValue) return;
    setIsSlugModalOpen(true);
    setHasPromptedForSlug(true);
  }, [hasPromptedForSlug, slugValue]);

  // For onboarding we force influencer templates only
  const templates = influencerTemplates;

  const handleCreate = async (slugValue: string) => {
    if (!selectedTemplate) {
      toast.error("Selecione um tema para continuar.");
      return;
    }

    // Obter userId do usuário logado
    const userId = user?.id;

    console.log("User info:", {
      user,
      userId,
      userType: typeof userId,
      userStringified: JSON.stringify(user),
    });

    // Validação estrita do userId
    if (!userId || userId === "undefined" || typeof userId !== "string") {
      console.error("UserId inválido:", userId);
      toast.error("Sessão inválida. Faça login novamente.");
      navigate("/");
      return;
    }

    setIsLoading(true);
    try {
      const tempUsername = slugValue;

      // Mapear o tema selecionado para templateType do backend (template_04 até template_11 são os 11 temas)
      const templateMap: Record<string, string> = {
        activist: "template_04",
        altmusic: "template_05",
        architect: "template_06",
        artist: "template_07",
        athlete: "template_08",
        business: "template_09",
        creator: "template_10",
        ecofashion: "template_11",
        gourmet: "template_12",
        innovation: "template_13",
        streamer: "template_14",
      };

      const templateType = templateMap[selectedTemplate] || "template_04";

      console.log("Creating profile with:", {
        userId,
        username: tempUsername,
        templateType,
        influencerTheme: selectedTemplate,
      });

      // Criar perfil no backend
      const response = await profileApi.create({
        userId,
        username: tempUsername,
        bio: `Perfil ${selectedTemplate}`,
        avatarUrl: undefined,
        templateType: templateType,
        published: false,
      });

      console.log("Profile created successfully:", response);
      console.log("Response structure:", {
        hasProfile: !!response.profile,
        profileId: response.profile?.id,
        responseId: response.id,
        responseKeys: Object.keys(response),
        profileKeys: response.profile ? Object.keys(response.profile) : [],
        fullResponse: JSON.stringify(response, null, 2),
      });

      // O backend retorna { message, profile: { id, ... } }
      const profileId = response.profile?.id || response.id;

      console.log("✅ Extracted profileId:", profileId);
      console.log("✅ Type of profileId:", typeof profileId);
      console.log(
        "✅ Is valid UUID:",
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          profileId || "",
        ),
      );

      // Validação rigorosa do profileId
      if (
        !profileId ||
        typeof profileId !== "string" ||
        profileId === "undefined" ||
        profileId.trim() === ""
      ) {
        console.error("❌ Profile ID inválido na resposta:", {
          profileId,
          type: typeof profileId,
          response,
        });
        toast.error(
          "Erro: ID do perfil não foi retornado corretamente pelo servidor",
        );
        return;
      }

      // Validar se é um UUID válido
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(profileId)) {
        console.error("❌ Profile ID não é um UUID válido:", profileId);
        toast.error("Erro: ID do perfil está em formato inválido");
        return;
      }

      // Salvar informações do tema para o editor
      localStorage.setItem("bio4dev_profile_id", profileId);
      localStorage.setItem(`bio4dev_theme_${profileId}`, selectedTemplate);

      const navigationPath = `/onboarding/${profileId}`;
      console.log("🚀 Navigating to:", navigationPath);
      console.log("🚀 Final profileId being used:", profileId);

      toast.success("Perfil criado com sucesso!");

      // Pequeno delay para garantir que o estado seja salvo
      setTimeout(() => {
        navigate(navigationPath);
      }, 100);
    } catch (error: any) {
      console.error("Error creating profile:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao criar perfil";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSlugModal = () => {
    setSlugError(null);
    setIsSlugModalOpen(true);
  };

  const handleCloseSlugModal = () => {
    if (isLoading) return;
    setIsSlugModalOpen(false);
  };

  const handleConfirmSlug = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setSlugError("Informe seu nome.");
      return;
    }
    if (hasInvalidChars) {
      setSlugError("Apenas letras, numeros e hifens.");
      return;
    }
    if (!slugPreview) {
      setSlugError("Informe um nome valido.");
      return;
    }

    setSlugError(null);
    setSlugValue(slugPreview);
    setIsSlugModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex-1 py-12 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                Selecione um tema
              </h1>
              <p className="text-slate-500">
                Escolha o visual e personalize depois
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {templates.map((template) => {
                const previewImage = templateImages[template.id];
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                      selectedTemplate === template.id
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-slate-200"
                    } ${template.preview}`}
                  >
                    {previewImage && (
                      <div className="bg-white flex items-center justify-center px-6 pt-6 pb-4 rounded-2xl overflow-hidden">
                        <img
                          src={previewImage}
                          alt="Preview do template"
                          className="w-full max-h-[420px] object-contain"
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col gap-4">
                      {/* Avatar placeholder */}
                      <div className="flex justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/80 border border-white/40 shadow-sm" />
                      </div>

                      {/* Social row placeholder */}
                      <div className="flex items-center justify-center gap-2 text-slate-500/80 text-xs">
                        <span className="w-3 h-3 rounded-full bg-white/70" />
                        <span className="w-3 h-3 rounded-full bg-white/70" />
                        <span className="w-3 h-3 rounded-full bg-white/70" />
                      </div>

                      {/* Link bars */}
                      <div className="space-y-3">
                        <div className="h-11 rounded-xl bg-white/85 shadow-sm" />
                        <div className="h-11 rounded-xl bg-white/80 shadow-sm" />
                        <div className="h-11 rounded-xl bg-white/75 shadow-sm" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedTemplate && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 transform z-20">
          <button
            onClick={() =>
              slugValue ? handleCreate(slugValue) : handleOpenSlugModal()
            }
            disabled={isLoading}
            className="rounded-full bg-blue-600 text-white shadow-xl px-6 py-3 flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Criando...
              </>
            ) : (
              <>Criar com este tema</>
            )}
          </button>
        </div>
      )}

      {isSlugModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div
            className={`w-full max-w-[400px] rounded-3xl p-6 shadow-2xl ${landingTheme.card}`}
          >
            <h2 className="text-xl font-semibold text-slate-900">
              Escolha seu Nome
            </h2>
            <div className="mt-4 space-y-3">
              <label
                htmlFor="slug-name"
                className="text-sm font-semibold text-slate-700"
              >
                Nome
              </label>
              <input
                id="slug-name"
                value={nameInput}
                onChange={(event) => {
                  setNameInput(event.target.value);
                  setSlugError(null);
                }}
                placeholder="Digite seu nome"
                disabled={isLoading}
                className={`h-11 w-full rounded-xl border px-4 text-sm focus:outline-none focus:ring-2 ${landingTheme.input}`}
              />
              <p className={`text-xs ${landingTheme.textMuted}`}>
                Este nome sera usado para gerar seu link personalizado:
                bio4.dev/seunome
              </p>
              <p className={`text-sm ${landingTheme.textSecondary}`}>
                Seu link sera:{" "}
                <span className="font-semibold text-slate-900">
                  bio4.dev/{slugPreview || "seunome"}
                </span>
              </p>
              {slugError && (
                <p className={`text-sm ${landingTheme.errorText}`}>
                  {slugError}
                </p>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseSlugModal}
                className={`rounded-full px-4 py-2 text-sm transition ${landingTheme.buttonSecondary}`}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSlug}
                disabled={isLoading}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition disabled:opacity-60 ${landingTheme.buttonPrimary}`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
