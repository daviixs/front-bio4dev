import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { profileApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { ProfileData } from "@/temas-lintree/types";
import ActivistEditor from "@/components/editors/ActivistEditor";
import AltMusicEditor from "@/components/editors/AltMusicEditor";
import ArchitectEditor from "@/components/editors/ArchitectEditor";
import ArtistEditor from "@/components/editors/ArtistEditor";
import AthleteEditor from "@/components/editors/AthleteEditor";
import BusinessEditor from "@/components/editors/BusinessEditor";
import CreatorEditor from "@/components/editors/CreatorEditor";
import EcoFashionEditor from "@/components/editors/EcoFashionEditor";
import GourmetEditor from "@/components/editors/GourmetEditor";
import InnovationEditor from "@/components/editors/InnovationEditor";
import StreamerEditor from "@/components/editors/StreamerEditor";

const THEME_EDITORS: Record<string, React.ComponentType<any>> = {
  activist: ActivistEditor,
  altmusic: AltMusicEditor,
  architect: ArchitectEditor,
  artist: ArtistEditor,
  athlete: AthleteEditor,
  business: BusinessEditor,
  creator: CreatorEditor,
  ecofashion: EcoFashionEditor,
  gourmet: GourmetEditor,
  innovation: InnovationEditor,
  streamer: StreamerEditor,
};

export function InfluencerEditorPage() {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const navigate = useNavigate();
  const { setProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [themeId, setThemeId] = useState<string>("");

  useEffect(() => {
    loadProfileData();
  }, [portfolioId]);

  const loadProfileData = async () => {
    if (!portfolioId) {
      toast.error("ID do portfólio não encontrado");
      navigate("/profile/create");
      return;
    }

    setIsLoading(true);
    try {
      const profile = await profileApi.getComplete(portfolioId);
      setProfileData(profile);
      setThemeId(profile.themeName.toLowerCase());
    } catch (error: any) {
      toast.error("Erro ao carregar perfil");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!portfolioId || !profileData) return;

    setIsSaving(true);
    try {
      await profileApi.update(portfolioId, profileData);
      setProfile(profileData);
      toast.success("Perfil salvo com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao salvar perfil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const ThemeEditor = THEME_EDITORS[themeId];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Editor de Portfólio</h1>
      <Button onClick={() => navigate("/dashboard")}>Voltar</Button>
      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Salvando..." : "Salvar"}
      </Button>
      {ThemeEditor && profileData && (
        <ThemeEditor profileData={profileData} setProfileData={setProfileData} />
      )}
    </div>
  );
}