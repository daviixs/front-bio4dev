import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Code2, Cpu, Briefcase } from "lucide-react";
import { profileApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { landingTheme } from "@/theme/landingTheme";

const templateImages: Record<string, string> = {
  template_01: "/images/templates/Portifolio%201.png",
  template_02: "/images/templates/Portifolio%202.png",
  template_03: "/images/templates/Portifolio%203.png",
};

const devTemplates = [
  {
    id: "template_01",
    name: "Portfolio Minimalista Dev",
    description: "Foco total em projetos, GitHub e stack principal.",
    icon: <Code2 className="w-5 h-5" />,
    highlights: ["GitHub Integration", "Tech Stack", "Experiencia"],
  },
  {
    id: "template_02",
    name: "Portfolio Criativo Tech",
    description: "Visual impactante para destacar produtos e demos.",
    icon: <Cpu className="w-5 h-5" />,
    highlights: ["Demos Interativas", "Cases", "Highlights"],
  },
  {
    id: "template_03",
    name: "Portfolio Corporativo Dev",
    description: "Layout executivo para consultores e times tech.",
    icon: <Briefcase className="w-5 h-5" />,
    highlights: ["Experiencia", "Resultados", "Credibilidade"],
  },
] as const;

export function DeveloperCreateProfilePage() {
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

  useEffect(() => {
    if (!user) {
      toast.error("Faca login para continuar");
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (hasPromptedForSlug || slugValue) return;
    setIsSlugModalOpen(true);
    setHasPromptedForSlug(true);
  }, [hasPromptedForSlug, slugValue]);

  const handleCreate = async (slug: string) => {
    if (!selectedTemplate) {
      toast.error("Selecione um template para continuar.");
      return;
    }

    const userId = user?.id;
    if (!userId || userId === "undefined" || typeof userId !== "string") {
      toast.error("Sessao invalida. Faca login novamente.");
      navigate("/");
      return;
    }

    setIsLoading(true);
    try {
      const templateData = devTemplates.find(
        (template) => template.id === selectedTemplate,
      );
      const templateType = selectedTemplate;

      const response = await profileApi.create({
        userId,
        username: slug,
        bio: `Perfil ${templateData?.name ?? "Dev"}`,
        avatarUrl: undefined,
        templateType,
        published: false,
      });

      const profileId = response.profile?.id || response.id;
      if (!profileId || typeof profileId !== "string") {
        toast.error(
          "Erro: ID do perfil nao foi retornado corretamente pelo servidor",
        );
        return;
      }

      localStorage.setItem("bio4dev_profile_id", profileId);
      localStorage.setItem(`bio4dev_theme_${profileId}`, templateType);

      toast.success("Perfil criado com sucesso!");
      setTimeout(() => {
        navigate(`/dashboard/bio/${profileId}`);
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
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Selecione um template Dev
            </h1>
            <p className="text-slate-500">
              Templates otimizados para GitHub, Tech Stack e projetos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {devTemplates.map((template) => {
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
                  }`}
                >
                  {previewImage && (
                    <div className="bg-white flex items-center justify-center px-6 pt-6 pb-4 rounded-2xl overflow-hidden">
                      <img
                        src={previewImage}
                        alt={`Preview do ${template.name}`}
                        className="w-full max-h-[360px] object-contain"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col gap-4 text-left">
                    <div className="flex items-center gap-3 text-slate-800">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                        {template.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {template.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {template.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {template.highlights.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
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
              <>Criar com este template</>
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
