import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProfileData, ProfileButton, SocialLink } from "@/temas-lintree/types";
import { Video, Plus, Trash2, Sparkles } from "lucide-react";

interface CreatorEditorProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

const CreatorEditor: React.FC<CreatorEditorProps> = ({
  profileData,
  setProfileData,
}) => {
  const updateField = (field: keyof ProfileData, value: any) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const addButton = () => {
    const newButton: ProfileButton = { label: "Novo Conteúdo", url: "" };
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
    const newSocial: SocialLink = { platform: "youtube", url: "" };
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
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 p-6 rounded-xl border-2 border-purple-300">
        <div className="flex items-center gap-3 mb-4">
          <Video className="text-purple-600" size={32} />
          <h2 className="text-2xl font-bold text-purple-900">
            Editor Criador de Conteúdo
          </h2>
        </div>
        <p className="text-purple-700">
          Crie seu perfil profissional para conteúdo digital
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          ✨ Informações do Criador
        </h3>
        <div>
          <Label htmlFor="name" className="text-purple-700">
            Nome Artístico / Canal
          </Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Seu Nome de Creator"
            className="border-purple-200 focus:border-purple-500"
          />
        </div>
        <div>
          <Label htmlFor="bio" className="text-purple-700">
            Sobre Você / Nicho
          </Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Criador de conteúdo | Gaming, Tech & Lifestyle ✨"
            rows={3}
            className="border-purple-200 focus:border-purple-500"
          />
        </div>
        <div>
          <Label htmlFor="photoUrl" className="text-purple-700">
            URL da Foto de Perfil
          </Label>
          <Input
            id="photoUrl"
            value={profileData.photoUrl}
            onChange={(e) => updateField("photoUrl", e.target.value)}
            placeholder="https://..."
            className="border-purple-200 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            🎬 Conteúdos e Links
          </h3>
          <Button
            onClick={addButton}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus size={16} className="mr-1" /> Adicionar Link
          </Button>
        </div>
        {profileData.buttons.map((button, index) => (
          <div
            key={index}
            className="flex gap-2 p-4 bg-purple-50 rounded-lg border border-purple-100"
          >
            <div className="flex-1 space-y-2">
              <Input
                value={button.label}
                onChange={(e) => updateButton(index, "label", e.target.value)}
                placeholder="Último Vídeo | Meu Curso | Loja"
                className="border-purple-200"
              />
              <Input
                value={button.url}
                onChange={(e) => updateButton(index, "url", e.target.value)}
                placeholder="https://..."
                className="border-purple-200"
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
            className="bg-purple-600 hover:bg-purple-700"
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
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter</option>
              <option value="twitch">Twitch</option>
              <option value="facebook">Facebook</option>
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
          🎨 Personalização Visual
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

export default CreatorEditor;
