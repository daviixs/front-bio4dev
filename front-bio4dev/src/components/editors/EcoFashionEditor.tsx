import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProfileData } from "@/temas-lintree/types";

interface EcoFashionEditorProps {
  profile: ProfileData;
  onSave: (data: ProfileData) => void;
}

const EcoFashionEditor: React.FC<EcoFashionEditorProps> = ({ profile, onSave }) => {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl);
  const [socials, setSocials] = useState(profile.socials);

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      name,
      bio,
      photoUrl,
      socials,
    };
    onSave(updatedProfile);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900">Eco Fashion Editor</h2>
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
        <div>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EcoFashionEditor;