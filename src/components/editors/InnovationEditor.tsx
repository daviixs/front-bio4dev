import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProfileData, ProfileButton, SocialLink } from "@/temas-lintree/types";
import { Lightbulb, Plus, Trash2 } from "lucide-react";

interface InnovationEditorProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

const InnovationEditor: React.FC<InnovationEditorProps> = ({
  profileData,
  setProfileData,
}) => {
  const updateField = (field: keyof ProfileData, value: any) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const addButton = () => {
    const newButton: ProfileButton = { label: "Novo Projeto", url: "" };
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
    const newSocial: SocialLink = { platform: "linkedin", url: "" };
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
      <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-cyan-400">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="text-cyan-600" size={32} />
          <h2 className="text-2xl font-bold text-cyan-900">
            Editor Innovation
          </h2>
        </div>
        <p className="text-cyan-700">Perfil de inovação e tecnologia</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          🚀 Informações do Inovador
        </h3>
        <div>
          <Label htmlFor="name" className="text-cyan-700">
            Nome / Startup
          </Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Seu nome ou startup"
            className="border-cyan-200 focus:border-cyan-500"
          />
        </div>
        <div>
          <Label htmlFor="bio" className="text-cyan-700">
            Bio / Visão
          </Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Inovador | Transformando idéias em realidade 💡"
            rows={3}
            className="border-cyan-200 focus:border-cyan-500"
          />
        </div>
        <div>
          <Label htmlFor="photoUrl" className="text-cyan-700">
            URL da Foto
          </Label>
          <Input
            id="photoUrl"
            value={profileData.photoUrl}
            onChange={(e) => updateField("photoUrl", e.target.value)}
            placeholder="https://..."
            className="border-cyan-200 focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">
            💻 Projetos e Pitch
          </h3>
          <Button
            onClick={addButton}
            size="sm"
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            <Plus size={16} className="mr-1" /> Adicionar Projeto
          </Button>
        </div>
        {profileData.buttons.map((button, index) => (
          <div
            key={index}
            className="flex gap-2 p-4 bg-cyan-50 rounded-lg border border-cyan-100"
          >
            <div className="flex-1 space-y-2">
              <Input
                value={button.label}
                onChange={(e) => updateButton(index, "label", e.target.value)}
                placeholder="Pitch Deck | Produto | Investidores | Blog"
                className="border-cyan-200"
              />
              <Input
                value={button.url}
                onChange={(e) => updateButton(index, "url", e.target.value)}
                placeholder="https://..."
                className="border-cyan-200"
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
            🌐 Redes Profissionais
          </h3>
          <Button
            onClick={addSocial}
            size="sm"
            className="bg-cyan-600 hover:bg-cyan-700"
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
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
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
          🎨 Cores da Marca
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

export default InnovationEditor;
