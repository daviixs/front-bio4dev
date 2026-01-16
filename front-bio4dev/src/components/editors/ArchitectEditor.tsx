import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { usePortfolioEditor } from "@/hooks/usePortfolioEditor";
import { ProfileData } from "@/temas-lintree/types";
import EditorLayout from "./shared/EditorLayout";
import BasicInfoEditor from "./shared/BasicInfoEditor";
import SocialLinksEditor from "./shared/SocialLinksEditor";
import ButtonsEditor from "./shared/ButtonsEditor";
import StyleEditor from "./shared/StyleEditor";
import PreviewPanel from "./shared/PreviewPanel";

export function ArchitectEditor() {
  const navigate = useNavigate();
  const {
    profileData,
    setProfileData,
    handleSave,
    isSaving,
  } = usePortfolioEditor();

  const [showPreview, setShowPreview] = useState(false);

  const handleSaveClick = async () => {
    try {
      await handleSave();
      toast.success("Perfil salvo com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar perfil");
    }
  };

  return (
    <EditorLayout>
      <div className="flex justify-between mb-4">
        <h1 className="text-lg font-semibold">Editor de Portfólio - Arquitetura</h1>
        <Button onClick={() => navigate("/dashboard")}>Voltar</Button>
      </div>
      <BasicInfoEditor profileData={profileData} setProfileData={setProfileData} />
      <SocialLinksEditor profileData={profileData} setProfileData={setProfileData} />
      <ButtonsEditor profileData={profileData} setProfileData={setProfileData} />
      <StyleEditor profileData={profileData} setProfileData={setProfileData} />
      <div className="flex justify-between mt-4">
        <Button onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? "Ocultar Preview" : "Ver Preview"}
        </Button>
        <Button onClick={handleSaveClick} disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
      {showPreview && <PreviewPanel profileData={profileData} />}
    </EditorLayout>
  );
}