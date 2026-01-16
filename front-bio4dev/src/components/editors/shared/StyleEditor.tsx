import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileData } from "@/temas-lintree/types";

interface StyleEditorProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ profileData, setProfileData }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Estilização</h2>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="backgroundStyle">Background Style</Label>
          <Input
            id="backgroundStyle"
            value={profileData.backgroundStyle}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                backgroundStyle: e.target.value,
              })
            }
            placeholder="Ex: bg-slate-50 ou bg-gradient-to-br from-blue-900..."
          />
        </div>
        <div>
          <Label htmlFor="textColor">Cor do Texto</Label>
          <Input
            id="textColor"
            value={profileData.textColor}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                textColor: e.target.value,
              })
            }
            placeholder="Ex: text-slate-900"
          />
        </div>
        <div>
          <Label htmlFor="accentColor">Cor de Destaque</Label>
          <Input
            id="accentColor"
            value={profileData.accentColor}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                accentColor: e.target.value,
              })
            }
            placeholder="Ex: bg-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default StyleEditor;