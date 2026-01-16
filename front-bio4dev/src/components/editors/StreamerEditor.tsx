import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { usePortfolioEditor } from "@/hooks/usePortfolioEditor";
import { ProfileData } from "@/temas-lintree/types";
import EditorLayout from "@/components/editors/shared/EditorLayout";
import BasicInfoEditor from "@/components/editors/shared/BasicInfoEditor";
import SocialLinksEditor from "@/components/editors/shared/SocialLinksEditor";
import ButtonsEditor from "@/components/editors/shared/ButtonsEditor";
import StyleEditor from "@/components/editors/shared/StyleEditor";
import PreviewPanel from "@/components/editors/shared/PreviewPanel";

const StreamerEditor = () => {
  const { profileData, handleSave } = usePortfolioEditor<ProfileData>();

  return (
    <EditorLayout>
      <h1 className="text-lg font-semibold">Editor de Portfólio - Streamer</h1>
      <BasicInfoEditor profileData={profileData} />
      <SocialLinksEditor profileData={profileData} />
      <ButtonsEditor profileData={profileData} />
      <StyleEditor profileData={profileData} />
      <div className="flex justify-end mt-4">
        <Button onClick={handleSave}>Salvar</Button>
      </div>
      <PreviewPanel profileData={profileData} />
    </EditorLayout>
  );
};

export default StreamerEditor;