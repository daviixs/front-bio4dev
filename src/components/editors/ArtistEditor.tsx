import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProfileData, ProfileButton, SocialLink } from "@/temas-lintree/types";
import { Palette, Plus, Trash2 } from "lucide-react";

interface ArtistEditorProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

const ArtistEditor: React.FC<ArtistEditorProps> = ({
  profileData,
  setProfileData,
}) => {
  const updateField = (field: keyof ProfileData, value: any) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const addButton = () => {
    const newButton: ProfileButton = { label: "Nova Obra", url: "" };
    updateField("buttons", [...profileData.buttons, newButton]);
  };

  const removeButton = (index: number) => {
    updateField(
      "buttons",
      profileData.buttons.filter((_, i) => i !== index)
    );
  };

  const updateButton = (
    index: number,
    field: keyof ProfileButton,
    value: string
  ) => {
    const updated = profileData.buttons.map((btn, i) =>
      i === index ? { ...btn, [field]: value } : btn
    );
    updateField("buttons", updated);
  };

  const addSocial = () => {
    const newSocial: SocialLink = { platform: "instagram", url: "" };
    updateField("socials", [...profileData.socials, newSocial]);
  };

  const removeSocial = (index: number) => {
    updateField(
      "socials",
      profileData.socials.filter((_, i) => i !== index)
    );
  };

  const updateSocial = (index: number, field: keyof SocialLink, value: any) => {
    const updated = profileData.socials.map((social, i) =>
      i === index ? { ...social, [field]: value } : social
    );
    updateField("socials", updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 p-6 rounded-xl border-2 border-rose-300">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="text-rose-600" size={32} />
          <h2 className="text-2xl font-bold text-rose-900">Editor Artista</h2>
        </div>
        <p className="text-rose-700">Mostre seu portfólio artístico ao mundo</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          🎨 Informações do Artista
        </h3>
        <div>
          <Label htmlFor="name" className="text-rose-700">
            Nome Artístico
          </Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Seu nome artístico"
            className="border-rose-200 focus:border-rose-500"
          />
        </div>
        <div>
          <Label htmlFor="bio" className="text-rose-700">
            Bio / Estilo Artístico
          </Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Artista visual | Pintura abstrata e arte contemporânea 🎨"
            rows={3}
            className="border-rose-200 focus:border-rose-500"
          />
        </div>
        <div>
          <Label htmlFor="photoUrl" className="text-rose-700">
            URL da Foto de Perfil
          </Label>
          <Input
            id="photoUrl"
            value={profileData.photoUrl}
            onChange={(e) => updateField("photoUrl", e.target.value)}
            placeholder="https://..."
            className="border-rose-200 focus:border-rose-500"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            🖼️ Portfolio e Obras
          </h3>
          <Button
            onClick={addButton}
            size="sm"
            className="bg-rose-600 hover:bg-rose-700"
          >
            <Plus size={16} className="mr-1" /> Adicionar Obra
          </Button>
        </div>
        {profileData.buttons.map((button, index) => (
          <div
            key={index}
            className="flex gap-2 p-4 bg-rose-50 rounded-lg border border-rose-100"
          >
            <div className="flex-1 space-y-2">
              <Input
                value={button.label}
                onChange={(e) => updateButton(index, "label", e.target.value)}
                placeholder="Coleção 2024 | Galeria | Exposição"
                className="border-rose-200"
              />
              <Input
                value={button.url}
                onChange={(e) => updateButton(index, "url", e.target.value)}
                placeholder="https://..."
                className="border-rose-200"
              />
            </div>
            <Button
              onClick={() => removeButton(index)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            📱 Redes Sociais
          </h3>
          <Button
            onClick={addSocial}
            size="sm"
            className="bg-rose-600 hover:bg-rose-700"
          >
            <Plus size={16} className="mr-1" /> Adicionar Rede
          </Button>
        </div>
        {profileData.socials.map((social, index) => (
          <div key={index} className="flex gap-2 p-4 bg-slate-50 rounded-lg">
            <select
              value={social.platform}
              onChange={(e) => updateSocial(index, "platform", e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-md"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
            </select>
            <Input
              value={social.url}
              onChange={(e) => updateSocial(index, "url", e.target.value)}
              placeholder="https://..."
              className="flex-1"
            />
            <Button
              onClick={() => removeSocial(index)}
              variant="ghost"
              size="sm"
              className="text-red-500"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">
          🎨 Paleta de Cores
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="accentColor">Cor de Destaque</Label>
            <Input
              id="accentColor"
              type="color"
              value={profileData.accentColor}
              onChange={(e) => updateField("accentColor", e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="textColor">Cor do Texto</Label>
            <Input
              id="textColor"
              type="color"
              value={profileData.textColor}
              onChange={(e) => updateField("textColor", e.target.value)}
              className="h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistEditor;
