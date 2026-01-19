import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { profileApi } from "@/lib/api";
import type { ProfileComplete } from "@/types";
import { EditablePortfolio1 } from "@/components/portfolio/EditablePortfolio1";
import { EditablePortfolio2 } from "@/components/portfolio/EditablePortfolio2";

export default function BioEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [profile, setProfile] = useState<ProfileComplete | null>(null);

  // Carregar dados completos da bio
  useEffect(() => {
    const loadBio = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const profileData = await profileApi.getComplete(id);
        setProfile(profileData);
      } catch (error) {
        console.error("Erro ao carregar bio:", error);
        toast.error("Erro ao carregar dados da bio");
      } finally {
        setIsLoading(false);
      }
    };

    loadBio();
  }, [id]);

  const handleProfileUpdate = async () => {
    // Recarregar perfil após atualização
    if (!id) return;
    try {
      setIsSaving(true);
      const updatedProfile = await profileApi.getComplete(id);
      setProfile(updatedProfile);
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao recarregar perfil:", error);
      toast.error("Erro ao salvar alterações");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = async () => {
    if (!profile?.username) {
      toast.error(
        "Por favor, adicione um username antes de visualizar o preview",
      );
      return;
    }

    if (!id) {
      toast.error("ID do perfil não encontrado");
      return;
    }

    try {
      setIsGeneratingPreview(true);

      // Gerar token temporário de preview usando a lógica do backend
      const { token, expiresAt } = await profileApi.generatePreviewToken(id);

      // Calcula tempo de expiração
      const expiresDate = new Date(expiresAt);
      const hours = Math.round(
        (expiresDate.getTime() - Date.now()) / (1000 * 60 * 60),
      );

      // Abre preview em nova aba com token (usa slug que é o identificador da rota)
      const previewUrl = `/${profile.slug}?preview=${token}`;
      window.open(previewUrl, "_blank");

      toast.success(`Preview aberto! Token expira em ${hours}h`, {
        description: "O link funciona mesmo com o perfil não publicado",
      });
    } catch (error: any) {
      console.error("Erro ao gerar preview:", error);

      // Se falhar, mostrar erro específico
      if (error.response?.status === 404) {
        toast.error("Endpoint de preview não encontrado no backend");
      } else if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        toast.error("Sem permissão para gerar preview");
      } else {
        toast.error(
          "Erro ao gerar token de preview. Verifique se o backend está rodando.",
        );
      }
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Perfil não encontrado</p>
          <Button onClick={() => navigate("/dashboard/bio")} variant="outline">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  // Suporta template_01 e template_02
  if (
    profile.templateType !== "template_01" &&
    profile.templateType !== "template_02"
  ) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/bio")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
        <div className="rounded-xl border bg-card shadow-sm p-6 text-center">
          <p className="text-slate-600">
            Edição inline disponível para os Portfólios 1 e 2. Outros templates
            serão suportados em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Fixo */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard/bio")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Editar Bio
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Clique nos campos para editar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleProfileUpdate}
              disabled={isSaving}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
            {profile.published && (
              <Button
                onClick={() => window.open(`/${profile.slug}`, "_blank")}
                className="gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                <ExternalLink className="h-4 w-4" />
                Visualizar Portfólio
              </Button>
            )}
            <Button
              onClick={handlePreview}
              disabled={isGeneratingPreview}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {isGeneratingPreview ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  PREVIEW
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Portfolio Editável */}
      <div
        className={
          profile.templateType === "template_02" ? "bg-[#050505]" : "bg-white"
        }
      >
        {profile && (
          <>
            {profile.templateType === "template_01" && (
              <EditablePortfolio1
                profile={profile}
                onProfileUpdate={handleProfileUpdate}
              />
            )}
            {profile.templateType === "template_02" && (
              <EditablePortfolio2
                profile={profile}
                onProfileUpdate={handleProfileUpdate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
