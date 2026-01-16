import React from "react";
import { usePortfolioEditor } from "@/hooks/usePortfolioEditor";
import EditorLayout from "@/components/editors/shared/EditorLayout";
import BasicInfoEditor from "@/components/editors/shared/BasicInfoEditor";
import SocialLinksEditor from "@/components/editors/shared/SocialLinksEditor";
import ButtonsEditor from "@/components/editors/shared/ButtonsEditor";
import StyleEditor from "@/components/editors/shared/StyleEditor";
import PreviewPanel from "@/components/editors/shared/PreviewPanel";

const ActivistEditor = () => {
  const {
    profileData,
    handleSave,
    isSaving,
    addSocial,
    removeSocial,
    updateSocial,
    addButton,
    removeButton,
    updateButton,
  } = usePortfolioEditor("activist");

  return (
    <EditorLayout onSave={handleSave} isSaving={isSaving}>
      <BasicInfoEditor profileData={profileData} />
      <SocialLinksEditor
        socials={profileData.socials}
        addSocial={addSocial}
        removeSocial={removeSocial}
        updateSocial={updateSocial}
      />
      <ButtonsEditor
        buttons={profileData.buttons}
        addButton={addButton}
        removeButton={removeButton}
        updateButton={updateButton}
      />
      <StyleEditor profileData={profileData} />
      <PreviewPanel profileData={profileData} />
    </EditorLayout>
  );
};

export default ActivistEditor;