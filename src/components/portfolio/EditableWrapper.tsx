import React, { useState } from 'react';
import { Pencil, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { uploadApi } from '@/lib/api';

interface EditableWrapperProps {
  children: React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;
  type?: 'text' | 'textarea' | 'image' | 'file';
  label: string;
  className?: string;
}

export function EditableWrapper({
  children,
  value,
  onChange,
  type = 'text',
  label,
  className = '',
}: EditableWrapperProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
    toast.success('Alteração aplicada!');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(10);
      
      const response = await uploadApi.uploadResume(file);
      
      setUploadProgress(100);
      onChange(response.url);
      setTempValue(response.url);
      setIsEditing(false);
      toast.success('Arquivo enviado com sucesso!');
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao enviar arquivo. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className={`relative group ${className}`}>
        <div>{children}</div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 bg-white hover:bg-slate-50 shadow-sm z-10 border border-slate-200 rounded-full w-6 h-6 p-0 transition-transform group-hover:scale-110"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setTempValue(value || '');
            setIsEditing(true);
          }}
        >
          <Pencil className="w-3 h-3 text-slate-700" />
        </Button>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {type === 'text' && (
              <div className="space-y-2">
                <Label>{label}</Label>
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder={`Digite o ${label.toLowerCase()}`}
                  autoFocus
                />
              </div>
            )}

            {type === 'textarea' && (
              <div className="space-y-2">
                <Label>{label}</Label>
                <Textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder={`Digite o ${label.toLowerCase()}`}
                  className="min-h-[100px]"
                  autoFocus
                />
              </div>
            )}

            {type === 'image' && (
              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Dica: Você pode usar URLs do Unsplash ou DiceBear para testes.
                </p>
              </div>
            )}

            {type === 'file' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Arquivo atual (URL)</Label>
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    placeholder="URL do arquivo..."
                  />
                </div>
                
                <div className="relative pt-4 border-t">
                  <Label className="block mb-2 text-sm font-bold">Ou fazer upload de novo arquivo</Label>
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-600 animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Fazendo upload...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isUploading}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
