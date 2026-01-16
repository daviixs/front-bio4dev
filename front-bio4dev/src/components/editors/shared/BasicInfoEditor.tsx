import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProfileData } from "@/temas-lintree/types";

interface BasicInfoEditorProps {
  profileData: ProfileData;
  onProfileDataChange: (updatedData: ProfileData) => void;
}

const BasicInfoEditor: React.FC<BasicInfoEditorProps> = ({
  profileData,
  onProfileDataChange,
}) => {
  const handleChange = (field: keyof ProfileData) => (value: string) => {
    onProfileDataChange({ ...profileData, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Informações Básicas</h2>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => handleChange("name")(e.target.value)}
            placeholder="Seu nome"
          />
        </div>
        <div>
          <Label htmlFor="themeName">Nome do Tema</Label>
          <Input
            id="themeName"
            value={profileData.themeName}
            onChange={(e) => handleChange("themeName")(e.target.value)}
            placeholder="Ex: Atleta, Criador, etc."
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio / Descrição</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => handleChange("bio")(e.target.value)}
            placeholder="Descreva você ou seu negócio"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="photoUrl">URL da Foto</Label>
          <Input
            id="photoUrl"
            value={profileData.photoUrl}
            onChange={(e) => handleChange("photoUrl")(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoEditor;