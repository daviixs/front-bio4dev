import { useState, useEffect } from "react";
import { profileApi } from "@/lib/api";
import { toast } from "sonner";
import type { ProfileData, ProfileComplete } from "@/types";

export const usePortfolioEditor = (portfolioId: string) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        const profile = await profileApi.getComplete(portfolioId);
        const legenda = profile.legendas?.[0];
        const converted: ProfileData = {
          id: profile.id,
          themeName: legenda?.titulo || profile.username,
          name: legenda?.nome || profile.username,
          bio: legenda?.descricao || profile.bio || "",
          photoUrl: legenda?.legendaFoto || profile.avatarUrl || "",
          backgroundStyle: "bg-slate-50",
          buttonStyle:
            "bg-white hover:shadow-lg border border-slate-200 text-slate-800 rounded-2xl transition-all duration-300",
          textColor: "text-slate-900",
          accentColor: "bg-blue-500",
          socials: (profile.social || []).map((s) => ({
            platform: s.plataforma.toLowerCase(),
            url: s.url,
          })),
          buttons: (profile.projetos || []).map((p) => ({
            label: p.nome,
            url: p.demoLink || "#",
            subtext: p.descricao,
          })),
        };
        setProfileData(converted);
      } catch (error) {
        toast.error("Erro ao carregar perfil");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [portfolioId]);

  const handleSave = async () => {
    if (!profileData) return;

    setIsSaving(true);
    try {
      await profileApi.update(portfolioId, {
        bio: profileData.bio,
        avatarUrl: profileData.photoUrl,
      });
      toast.success("Perfil salvo com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar perfil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profileData,
    isLoading,
    isSaving,
    handleSave,
    setProfileData,
  };
};