import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProfileData, ProfileButton, SocialLink } from "@/temas-lintree/types";
import { Radio, Plus, Trash2 } from "lucide-react";

interface StreamerEditorProps {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
}

const StreamerEditor: React.FC<StreamerEditorProps> = ({
  profileData,
  setProfileData,
}) => {
  const updateField = (field: keyof ProfileData, value: any) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const addButton = () => {
    const newButton: ProfileButton = { label: "Novo Link", url: "" };
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
    const newSocial: SocialLink = { platform: "twitch", url: "" };
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
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 rounded-xl border-2 border-purple-400">
        <div className="flex items-center gap-3 mb-4">
          <Radio className="text-white" size={32} />
          <h2 className="text-2xl font-bold text-white">Editor Streamer</h2>
        </div>
        <p className="text-purple-100">Seu perfil profissional de streaming</p>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">
          🎮 Informações do Streamer
        </h3>
        <div>
          <Label htmlFor="name" className="text-purple-300">
            Nome / Canal
          </Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Seu nome ou canal"
            className="bg-slate-800 border-purple-500 text-white focus:border-purple-400"
          />
        </div>
        <div>
          <Label htmlFor="bio" className="text-purple-300">
            Bio / Jogos
          </Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Streamer | FPS, RPG & Just Chatting 🎮💫"
            rows={3}
            className="bg-slate-800 border-purple-500 text-white focus:border-purple-400"
          />
        </div>
        <div>
          <Label htmlFor="photoUrl" className="text-purple-300">
            URL da Foto
          </Label>
          <Input
            id="photoUrl"
            value={profileData.photoUrl}
            onChange={(e) => updateField("photoUrl", e.target.value)}
            placeholder="https://..."
            className="bg-slate-800 border-purple-500 text-white focus:border-purple-400"
          />
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">
            🔗 Links e Conteudo
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
            className="flex gap-2 p-4 bg-purple-900/30 rounded-lg border border-purple-700"
          >
            <div className="flex-1 space-y-2">
              <Input
                value={button.label}
                onChange={(e) => updateButton(index, "label", e.target.value)}
                placeholder="Schedule | Discord | Merch | Doações"
                className="bg-slate-800 border-purple-500 text-white"
              />
              <Input
                value={button.url}
                onChange={(e) => updateButton(index, "url", e.target.value)}
                placeholder="https://..."
                className="bg-slate-800 border-purple-500 text-white"
              />
            </div>
            <Button
              onClick={() => removeButton(index)}
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">
            📺 Plataformas de Stream
          </h3>
          <Button
            onClick={addSocial}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus size={16} className="mr-1" /> Adicionar Plataforma
          </Button>
        </div>
        {profileData.socials.map((social, index) => (
          <div key={index} className="flex gap-2 p-4 bg-slate-800 rounded-lg">
            <select
              value={social.platform}
              onChange={(e) => updateSocial(index, "platform", e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-purple-500 text-white rounded-md"
            >
              <option value="twitch">Twitch</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook Gaming</option>
            </select>
            <Input
              value={social.url}
              onChange={(e) => updateSocial(index, "url", e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-slate-700 border-purple-500 text-white"
            />
            <Button
              onClick={() => removeSocial(index)}
              variant="ghost"
              size="sm"
              className="text-red-400"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-purple-500 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-white">🎨 Cores do Canal</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-purple-300">Cor de Destaque</Label>
            <Input
              type="color"
              value={profileData.accentColor}
              onChange={(e) => updateField("accentColor", e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <Label className="text-purple-300">Cor do Texto</Label>
            <Input
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

export default StreamerEditor;
