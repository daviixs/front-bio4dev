import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { usePortfolioEditor } from "@/hooks/usePortfolioEditor";
import { ProfileData } from "@/temas-lintree/types";

export function InnovationEditor() {
  const { profileData, updateProfileData, saveProfile } = usePortfolioEditor();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveProfile();
      toast.success("Perfil salvo com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar perfil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Editor de Inovação</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => updateProfileData("name", e.target.value)}
            placeholder="Seu nome"
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio / Descrição</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => updateProfileData("bio", e.target.value)}
            placeholder="Descreva você ou seu negócio"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="photoUrl">URL da Foto</Label>
          <Input
            id="photoUrl"
            value={profileData.photoUrl}
            onChange={(e) => updateProfileData("photoUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}