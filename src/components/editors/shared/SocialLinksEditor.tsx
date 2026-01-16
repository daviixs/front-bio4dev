import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { SocialLink } from "@/temas-lintree/types";

interface SocialLinksEditorProps {
  socials: SocialLink[];
  onAddSocial: () => void;
  onUpdateSocial: (index: number, field: keyof SocialLink, value: string) => void;
  onRemoveSocial: (index: number) => void;
}

export const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({
  socials,
  onAddSocial,
  onUpdateSocial,
  onRemoveSocial,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Redes Sociais</h2>
        </div>
        <Button size="sm" variant="outline" onClick={onAddSocial}>
          Adicionar
        </Button>
      </div>
      <div className="space-y-3">
        {socials.map((social, index) => (
          <div key={index} className="flex gap-2">
            <select
              value={social.platform}
              onChange={(e) =>
                onUpdateSocial(index, "platform", e.target.value)
              }
              className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="youtube">YouTube</option>
              <option value="spotify">Spotify</option>
              <option value="tiktok">TikTok</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
            <Input
              value={social.url}
              onChange={(e) =>
                onUpdateSocial(index, "url", e.target.value)
              }
              placeholder="https://..."
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onRemoveSocial(index)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
        {socials.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">
            Nenhuma rede social adicionada
          </p>
        )}
      </div>
    </div>
  );
};