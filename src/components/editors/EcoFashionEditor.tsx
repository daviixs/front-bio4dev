import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProfileData, ProfileButton, SocialLink } from "@/temas-lintree/types";
import { Flower2, Plus, Trash2 } from "lucide-react";

interface EcoFashionEditorProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

const EcoFashionEditor: React.FC<EcoFashionEditorProps> = ({
  profileData,
  setProfileData,
}) => {
  const updateField = (field: keyof ProfileData, value: any) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const addButton = () => {
    const newButton: ProfileButton = { label: "Nova Coleção", url: "" };
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
      <div className="bg-gradient-to-r from-green-50 via-teal-50 to-green-50 p-6 rounded-xl border-2 border-teal-300">
        <div className="flex items-center gap-3 mb-4">
          <Flower2 className="text-teal-600" size={32} />
          <h2 className="text-2xl font-bold text-green-900">
            Editor Eco Fashion
          </h2>
        </div>
        <p className="text-green-700">Moda consciente e sustentável</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          🌿 Informações da Marca
        </h3>
        <div>
          <Label htmlFor="name" className="text-teal-700">
            Nome da Marca
          </Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Sua marca sustentável"
            className="border-teal-200 focus:border-teal-500"
          />
        </div>
        <div>
          <Label htmlFor="bio" className="text-teal-700">
            Sobre / Missão
          </Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Moda sustentável | Matérias orgânicas | Slow Fashion 🌱"
            rows={3}
            className="border-teal-200 focus:border-teal-500"
          />
        </div>
        <div>
          <Label htmlFor="photoUrl" className="text-teal-700">
            URL do Logo / Foto
          </Label>
          <Input
            id="photoUrl"
            value={profileData.photoUrl}
            onChange={(e) => updateField("photoUrl", e.target.value)}
            placeholder="https://..."
            className="border-teal-200 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            👗 Coleções e Loja
          </h3>
          <Button
            onClick={addButton}
            size="sm"
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Plus size={16} className="mr-1" /> Adicionar Link
          </Button>
        </div>
        {profileData.buttons.map((button, index) => (
          <div
            key={index}
            className="flex gap-2 p-4 bg-teal-50 rounded-lg border border-teal-100"
          >
            <div className="flex-1 space-y-2">
              <Input
                value={button.label}
                onChange={(e) => updateButton(index, "label", e.target.value)}
                placeholder="Nova Coleção | Loja Online | Manifesto"
                className="border-teal-200"
              />
              <Input
                value={button.url}
                onChange={(e) => updateButton(index, "url", e.target.value)}
                placeholder="https://..."
                className="border-teal-200"
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
            className="bg-teal-600 hover:bg-teal-700"
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
              <option value="tiktok">TikTok</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
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
          🎨 Cores da Marca
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="accentColor">Cor Principal</Label>
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

export default EcoFashionEditor;
