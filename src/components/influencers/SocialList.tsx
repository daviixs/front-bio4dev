import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";

export interface SocialItem {
  id?: string;
  platform: string;
  url: string;
}

const PLATFORM_OPTIONS = [
  "instagram",
  "tiktok",
  "youtube",
  "twitter",
  "linkedin",
  "facebook",
  "whatsapp",
];

interface SocialListProps {
  socials: SocialItem[];
  onChange: (next: SocialItem[]) => void;
}

export function SocialList({ socials, onChange }: SocialListProps) {
  const updateItem = (index: number, key: keyof SocialItem, value: string) => {
    const next = socials.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    onChange(next);
  };

  const addItem = () => {
    onChange([...socials, { platform: "instagram", url: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(socials.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {socials.map((social, index) => (
        <div
          key={`${social.platform}-${index}`}
          className="flex flex-wrap items-center gap-2"
        >
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
            value={social.platform}
            onChange={(event) =>
              updateItem(index, "platform", event.target.value)
            }
          >
            {PLATFORM_OPTIONS.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          <Input
            value={social.url}
            placeholder="https://..."
            onChange={(event) => updateItem(index, "url", event.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar rede social
      </Button>
    </div>
  );
}
