import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Upload, Link as LinkIcon } from "lucide-react";

interface ImageEditorProps {
  value: string;
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (value: string) => void;
}

export function ImageEditor({
  value,
  label,
  open,
  onOpenChange,
  onSave,
}: ImageEditorProps) {
  const [imageUrl, setImageUrl] = useState(value);

  useEffect(() => {
    setImageUrl(value);
  }, [value, open]);

  const handleSave = () => {
    onSave(imageUrl);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar {label}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">URL da Imagem</Label>
            <div className="flex gap-2">
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <Button variant="outline" size="icon">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {imageUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-slate-50">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x300?text=Imagem+Invalida";
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
