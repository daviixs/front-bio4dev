import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProfileData } from "@/temas-lintree/types";
import { usePortfolioEditor } from "@/hooks/usePortfolioEditor";
import { BasicInfoEditor } from "./shared/BasicInfoEditor";
import { SocialLinksEditor } from "./shared/SocialLinksEditor";
import { ButtonsEditor } from "./shared/ButtonsEditor";
import { StyleEditor } from "./shared/StyleEditor";
import { PreviewPanel } from "./shared/PreviewPanel";

export function AthleteEditor() {
  const { profileData, setProfileData, handleSave } = usePortfolioEditor();

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Athlete Portfolio Editor</h2>
      <BasicInfoEditor profileData={profileData} setProfileData={setProfileData} />
      <SocialLinksEditor profileData={profileData} setProfileData={setProfileData} />
      <ButtonsEditor profileData={profileData} setProfileData={setProfileData} />
      <StyleEditor profileData={profileData} setProfileData={setProfileData} />
      <div className="mt-6">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Portfolio
        </Button>
      </div>
      <PreviewPanel profileData={profileData} />
    </div>
  );
}