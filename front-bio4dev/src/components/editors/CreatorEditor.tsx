import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProfileData } from "@/temas-lintree/types";

interface CreatorEditorProps {
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

const CreatorEditor: React.FC<CreatorEditorProps> = ({ profileData, onSave }) => {
  const [name, setName] = useState(profileData.name);
  const [bio, setBio] = useState(profileData.bio);
  const [photoUrl, setPhotoUrl] = useState(profileData.photoUrl);

  const handleSave = () => {
    onSave({ ...profileData, name, bio, photoUrl });
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Editor de Criador</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio / Descrição</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Descreva você ou seu negócio"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="photoUrl">URL da Foto</Label>
          <Input
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default CreatorEditor;