import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ProfileButton } from "@/temas-lintree/types";

interface ButtonsEditorProps {
  buttons: ProfileButton[];
  onAddButton: () => void;
  onUpdateButton: (index: number, field: keyof ProfileButton, value: string) => void;
  onRemoveButton: (index: number) => void;
}

const ButtonsEditor: React.FC<ButtonsEditorProps> = ({
  buttons,
  onAddButton,
  onUpdateButton,
  onRemoveButton,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Botões / Links</h2>
        <Button size="sm" variant="outline" onClick={onAddButton}>
          Adicionar
        </Button>
      </div>
      <div className="space-y-4">
        {buttons.map((button, index) => (
          <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-slate-700">Botão {index + 1}</span>
              <Button size="sm" variant="ghost" onClick={() => onRemoveButton(index)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <input
              type="text"
              value={button.label}
              onChange={(e) => onUpdateButton(index, "label", e.target.value)}
              placeholder="Texto do botão"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            />
            <input
              type="text"
              value={button.url}
              onChange={(e) => onUpdateButton(index, "url", e.target.value)}
              placeholder="URL do link"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            />
            <input
              type="text"
              value={button.subtext || ""}
              onChange={(e) => onUpdateButton(index, "subtext", e.target.value)}
              placeholder="Subtexto (opcional)"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            />
          </div>
        ))}
        {buttons.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">Nenhum botão adicionado</p>
        )}
      </div>
    </div>
  );
};

export default ButtonsEditor;