import React, { useState } from 'react';
import { FileDown, Pencil, Upload, Loader2 } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { template01Theme } from '@/theme/template01Theme';
import { uploadApi } from '@/lib/api';
import { showPortfolioEditorError } from './portfolioEditorToast';

interface EditableResumeButtonProps {
  resumeUrl?: string;
  onResumeUpdate: (url: string) => Promise<void>;
  className?: string;
}

export function EditableResumeButton({
  resumeUrl,
  onResumeUpdate,
  className,
}: EditableResumeButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(resumeUrl || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    try {
      await onResumeUpdate(tempUrl);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar currículo:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const response = await uploadApi.uploadResume(file);
      setTempUrl(response.url);
      await onResumeUpdate(response.url);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Erro ao fazer upload:', error);
      showPortfolioEditorError(
        error.response?.data?.message || 'Erro ao fazer upload do currículo',
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Botão Inline dentro do Card */}
      <div className={cn('w-full', className)}>
        {resumeUrl ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center justify-center gap-2 px-4 py-2 w-full',
              template01Theme.primaryButton,
              'font-semibold rounded-lg text-sm',
              'transition-all duration-300',
              'shadow-md hover:shadow-lg',
            )}
          >
            <FileDown size={16} />
            <span>Download CV</span>
          </a>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={cn(
              'inline-flex items-center justify-center gap-2 px-4 py-2 w-full',
              template01Theme.primaryButton,
              'font-semibold rounded-lg text-sm',
              'transition-all duration-300',
              'shadow-md hover:shadow-lg',
            )}
          >
            <Upload size={16} />
            <span>Adicionar CV</span>
          </button>
        )}

        {/* Botão de Edição (aparece ao passar o mouse) */}
        <button
          onClick={() => setIsEditing(true)}
          className={cn(
            'absolute -top-2 -right-2',
            'w-8 h-8 rounded-full',
            'bg-[#c5b9b7] border-2 border-[#695f5c]',
            'flex items-center justify-center',
            'shadow-lg',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-200',
            'hover:bg-[#a69b98]',
          )}
        >
          <Pencil size={14} className="text-[#4a413e]" />
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
                setTempUrl(resumeUrl || '');
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
