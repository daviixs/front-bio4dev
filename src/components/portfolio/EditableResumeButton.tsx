import React, { useEffect, useState } from 'react';
import { FileDown, Pencil } from 'lucide-react';
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

  useEffect(() => {
    setTempUrl(resumeUrl || '');
  }, [resumeUrl]);

  const handleSave = async () => {
    try {
      await onResumeUpdate(tempUrl.trim());
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar currículo:', error);
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
            <FileDown size={16} />
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
              Cole apenas o link do seu currículo hospedado online
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
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
            <Button onClick={handleSave} disabled={!tempUrl.trim()}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
