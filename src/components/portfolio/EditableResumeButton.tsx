import React, { useState } from "react";
import { FileDown, Pencil, Upload, Loader2 } from "lucide-react";
import { cn } from "@/components/ui/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { uploadApi } from "@/lib/api";

interface EditableResumeButtonProps {
  resumeUrl?: string;
  onResumeUpdate: (url: string) => void;
  className?: string;
}

export function EditableResumeButton({
  resumeUrl,
  onResumeUpdate,
  className,
}: EditableResumeButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(resumeUrl || "");
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = () => {
    onResumeUpdate(tempUrl);
    setIsEditing(false);
    toast.success("URL do currículo atualizado!");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const response = await uploadApi.uploadResume(file);
      setTempUrl(response.url);
      onResumeUpdate(response.url);
      setIsEditing(false);
      toast.success("Currículo enviado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      toast.error(
        error.response?.data?.message || "Erro ao fazer upload do currículo"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Botão Fixo com Indicador de Edição */}
      <div className={cn("fixed top-24 left-6 z-[100] group", className)}>
        {resumeUrl ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3",
              "bg-gradient-to-r from-blue-600 to-purple-600",
              "text-white font-semibold rounded-lg",
              "hover:from-blue-700 hover:to-purple-700",
              "transition-all duration-300",
              "shadow-lg hover:shadow-xl hover:scale-105",
              "backdrop-blur-sm"
            )}
          >
            <FileDown size={20} />
            <span className="hidden sm:inline">Download CV</span>
            <span className="sm:hidden">CV</span>
          </a>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={cn(
              "inline-flex items-center gap-2 px-6 py-3",
              "bg-gradient-to-r from-gray-400 to-gray-500",
              "text-white font-semibold rounded-lg",
              "hover:from-gray-500 hover:to-gray-600",
              "transition-all duration-300",
              "shadow-lg hover:shadow-xl",
              "backdrop-blur-sm opacity-50"
            )}
          >
            <Upload size={20} />
            <span className="hidden sm:inline">Adicionar CV</span>
            <span className="sm:hidden">CV</span>
          </button>
        )}

        {/* Botão de Edição (aparece ao passar o mouse) */}
        <button
          onClick={() => setIsEditing(true)}
          className={cn(
            "absolute -top-2 -right-2",
            "w-8 h-8 rounded-full",
            "bg-white border-2 border-blue-600",
            "flex items-center justify-center",
            "shadow-lg",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-200",
            "hover:bg-blue-50"
          )}
        >
          <Pencil size={14} className="text-blue-600" />
        </button>
      </div>

      {/* Dialog de Edição */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Currículo</DialogTitle>
            <DialogDescription>
              Faça upload de um novo arquivo ou cole a URL do seu currículo
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Upload de Arquivo */}
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="text-sm font-bold">
                Upload de Arquivo
              </Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                disabled={isUploading}
                className="cursor-pointer"
              />
              {isUploading && (
                <div className="flex items-center gap-2 text-sm text-blue-600 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Fazendo upload...
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Formatos aceitos: PDF, DOC, DOCX (máx. 5MB)
              </p>
            </div>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou
                </span>
              </div>
            </div>

            {/* URL Manual */}
            <div className="space-y-2">
              <Label htmlFor="resume-url" className="text-sm font-bold">
                URL do Currículo
              </Label>
              <Input
                id="resume-url"
                type="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://exemplo.com/meu-curriculo.pdf"
              />
              <p className="text-xs text-muted-foreground">
                Cole o link direto para o seu currículo hospedado online
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setTempUrl(resumeUrl || "");
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!tempUrl || isUploading}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
