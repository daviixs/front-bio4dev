import React from "react";
import { ProfileData } from "@/temas-lintree/types";
import ThemeWrapper from "@/components/editors/shared/ThemeWrapper";

interface PreviewPanelProps {
  profileData: ProfileData;
  themeId: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ profileData, themeId }) => {
  const ThemeComponent = THEME_COMPONENTS[themeId];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg">
      <div className="bg-slate-100 p-3 border-b border-slate-200">
        <p className="text-sm font-medium text-slate-700 text-center">
          Preview do Perfil
        </p>
      </div>
      <div className="aspect-[9/16] overflow-auto">
        {ThemeComponent ? (
          <ThemeWrapper Component={ThemeComponent} profile={profileData} />
        ) : (
          <p className="text-center text-slate-500">Tema não encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;