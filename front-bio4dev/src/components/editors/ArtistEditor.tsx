import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { usePortfolioEditor } from "@/hooks/usePortfolioEditor";
import { ProfileData } from "@/temas-lintree/types";
import BasicInfoEditor from "./shared/BasicInfoEditor";
import SocialLinksEditor from "./shared/SocialLinksEditor";
import ButtonsEditor from "./shared/ButtonsEditor";
import StyleEditor from "./shared/StyleEditor";
import PreviewPanel from "./shared/PreviewPanel";

const ArtistEditor = () => {
  const { profileData, updateProfileData, saveProfile } = usePortfolioEditor();
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = async () => {
    try {
      await saveProfile();
      toast.success("Perfil salvo com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar perfil");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-semibold mb-4">Editor de Portfólio - Artista</h1>
      <BasicInfoEditor profileData={profileData} updateProfileData={updateProfileData} />
      <SocialLinksEditor profileData={profileData} updateProfileData={updateProfileData} />
      <ButtonsEditor profileData={profileData} updateProfileData={updateProfileData} />
      <StyleEditor profileData={profileData} updateProfileData={updateProfileData} />
      <div className="flex justify-between mt-4">
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Ocultar Preview" : "Ver Preview"}
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 text-white">
          Salvar
        </Button>
      </div>
      {showPreview && <PreviewPanel profileData={profileData} />}
    </div>
  );
};

export default ArtistEditor;