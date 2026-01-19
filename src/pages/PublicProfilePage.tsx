import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, AlertCircle, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioService } from "../services/api/portfolio.service";
import { TemplateRenderer } from "../components/templates";
import type { PortfolioData } from "../services/api/types";

export function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!username) {
        setError("Username não encontrado");
        setIsLoading(false);
        return;
      }

      try {
        // Verifica se há token de preview na URL
        const urlParams = new URLSearchParams(window.location.search);
        const previewToken = urlParams.get("preview");

        // Usa o slug (username) para buscar o portfolio
        const data = await PortfolioService.getBySlug(
          username,
          previewToken || undefined,
        );

        // Se tem token de preview, marca como preview
        if (previewToken) {
          setIsPreview(true);
        }

        setProfile(data);
      } catch (err: any) {
        console.error("Erro ao carregar perfil:", err);

        // Tratamento específico de erros baseado nas mensagens do serviço
        if (err.message === "INVALID_PREVIEW_TOKEN") {
          setError(
            "Link de preview expirado ou inválido. Solicite um novo link.",
          );
        } else if (err.message === "PORTFOLIO_NOT_PUBLISHED") {
          setError(
            "Este perfil não está publicado e você não tem permissão para visualizá-lo.",
          );
        } else if (err.message === "PORTFOLIO_NOT_FOUND") {
          setError("Perfil não encontrado.");
        } else {
          setError("Erro ao carregar perfil. Tente novamente mais tarde.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-white/50">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {error || "Perfil não encontrado"}
          </h1>
          <p className="text-white/50 mb-8">
            O perfil que você está procurando não existe ou não está disponível.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Renderiza o template dinamicamente com base no templateType
  return (
    <>
      {/* Preview Banner */}
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5" />
              <div>
                <p className="font-semibold">Modo Preview</p>
                <p className="text-sm text-white/90">
                  Este é um link temporário de visualização
                </p>
              </div>
            </div>
            <p className="text-sm text-white/90">Link expira em 24 horas</p>
          </div>
        </div>
      )}
      {/* TemplateRenderer renderiza automaticamente o template correto */}
      <div className={isPreview ? "pt-20" : ""}>
        <TemplateRenderer data={profile} previewMode={isPreview} />
      </div>
    </>
  );
}
