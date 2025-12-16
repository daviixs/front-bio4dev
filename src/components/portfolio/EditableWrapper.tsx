import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EditableWrapperProps {
  children: React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;
  type?: 'text' | 'image' | 'gif';
  label?: string;
  className?: string;
}

export function EditableWrapper({
  children,
  value,
  onChange,
  type = 'text',
  label = 'Editar',
  className = '',
}: EditableWrapperProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Sincronizar o valor quando mudar externamente
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <>
      <div className={`relative group ${className}`}>
        <div className="w-full">{children}</div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-lg z-10 border border-slate-200 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            setTempValue(value);
            setIsEditing(true);
          }}
        >
          <Pencil className="w-4 h-4 text-slate-700" />
        </Button>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
            <DialogDescription>
              {type === 'text' && 'Edite o texto abaixo'}
              {type === 'image' && 'Insira a URL da imagem'}
              {type === 'gif' && 'Insira a URL do GIF'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {type === 'text' ? (
              <div>
                <Label>Texto</Label>
                <Textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="mt-2 min-h-[100px]"
                />
              </div>
            ) : (
              <div>
                <Label>URL</Label>
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder={
                    type === 'image'
                      ? 'https://exemplo.com/imagem.jpg'
                      : 'https://exemplo.com/animation.gif'
                  }
                  className="mt-2"
                />
                {(type === 'image' || type === 'gif') && tempValue && (
                  <div className="mt-4">
                    <Label>Preview</Label>
                    <div className="mt-2 rounded-lg overflow-hidden border">
                      <img
                        src={tempValue}
                        alt="Preview"
                        className="w-full h-auto max-h-64 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

