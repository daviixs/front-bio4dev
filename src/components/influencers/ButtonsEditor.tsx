import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Save, ArrowLeft } from "lucide-react";

interface ButtonsEditorProps {
  isSaving?: boolean;
  onSave?: () => void;
  onPreview?: () => void;
  onBack?: () => void;
}

export function ButtonsEditor({
  isSaving,
  onSave,
  onPreview,
  onBack,
}: ButtonsEditorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <Button variant="outline" size="sm" onClick={onPreview}>
        <Eye className="mr-2 h-4 w-4" />
        Preview
      </Button>
      <Button size="sm" onClick={onSave} disabled={isSaving}>
        <Save className="mr-2 h-4 w-4" />
        {isSaving ? "Salvando..." : "Salvar"}
      </Button>
    </div>
  );
}
