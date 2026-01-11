import React, { useState } from "react";
import { EditableHero } from "./EditableHero";
import { EditableResumeButton } from "./EditableResumeButton";
import { TechStack } from "../../../Portifolios/portifolio-1/components/TechStack";
import { WorkHistory } from "../../../Portifolios/portifolio-1/components/WorkHistory";
import { Projects } from "../../../Portifolios/portifolio-1/components/Projects";
import { Footer } from "../../../Portifolios/portifolio-1/components/Footer";
import { profileApi, legendaApi, footerApi } from "@/lib/api";
import type { ProfileComplete, Legenda } from "@/types";
import { toast } from "sonner";

interface EditablePortfolio1Props {
  profile: ProfileComplete;
  onProfileUpdate?: () => void;
}

export function EditablePortfolio1({
  profile,
  onProfileUpdate,
}: EditablePortfolio1Props) {
  const [localProfile, setLocalProfile] = useState<ProfileComplete>(profile);
  const legenda = localProfile.legendas?.[0];

  const handleLegendaUpdate = async (field: keyof Legenda, value: string) => {
    if (!legenda?.id) {
      toast.error("Legenda não encontrada");
      return;
    }

    try {
      await legendaApi.update(legenda.id, { [field]: value });

      // Atualizar estado local
      setLocalProfile((prev) => {
        if (!prev.legendas || prev.legendas.length === 0) return prev;
        return {
          ...prev,
          legendas: [
            {
              ...prev.legendas![0],
              [field]: value,
            },
          ],
        };
      });

      toast.success("Campo atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar legenda:", error);
      toast.error("Erro ao atualizar campo");
      throw error;
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    if (!localProfile.id) {
      toast.error("Perfil não encontrado");
      return;
    }

    try {
      await profileApi.update(localProfile.id, { avatarUrl: url });

      setLocalProfile((prev) => ({
        ...prev,
        avatarUrl: url,
      }));

      toast.success("Avatar atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
      toast.error("Erro ao atualizar avatar");
      throw error;
    }
  };

  const handleResumeUpdate = async (url: string) => {
    if (!localProfile.footer?.id) {
      toast.error("Footer não encontrado");
      return;
    }

    try {
      await footerApi.update(localProfile.footer.id, { resumeUrl: url });

      setLocalProfile((prev) => ({
        ...prev,
        footer: prev.footer
          ? {
              ...prev.footer,
              resumeUrl: url,
            }
          : undefined,
      }));

      toast.success("Currículo atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error);
      toast.error("Erro ao atualizar currículo");
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Botão de Currículo Editável - Fixo no Topo */}
      <EditableResumeButton
        resumeUrl={localProfile.footer?.resumeUrl}
        onResumeUpdate={handleResumeUpdate}
      />

      {/* Teste: Indicador sempre visível para debug */}
      <div className="fixed top-40 left-6 z-[100] bg-green-500 text-white px-4 py-2 rounded text-xs">
        EDIT MODE - Footer: {localProfile.footer ? "YES" : "NO"}
        {localProfile.footer?.resumeUrl && ` - URL EXISTS`}
      </div>

      {/* Seção Hero/Inicial */}
      <EditableHero
        profile={localProfile}
        legenda={legenda}
        onLegendaUpdate={handleLegendaUpdate}
        onAvatarUpdate={handleAvatarUpdate}
      />

      {/* Seção Tech Stack */}
      <TechStack techStack={localProfile.techStack} />

      {/* Seção de Histórico de Trabalho */}
      <WorkHistory workHistory={localProfile.workHistory} />

      {/* Seção de Projetos */}
      <Projects projects={localProfile.projetos} />

      {/* Rodapé */}
      <Footer footer={localProfile.footer} socials={localProfile.social} />
    </div>
  );
}
