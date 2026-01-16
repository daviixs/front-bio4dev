import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface TextEditorProps {
  value: string;
  label: string;
  multiline?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (value: string) => void;
}

export function TextEditor({
  value,
  label,
  multiline = false,
  open,
  onOpenChange,
  onSave,
}: TextEditorProps) {
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value, open]);

  const handleSave = () => {
    onSave(editValue);
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
            <Label htmlFor="text-input">{label}</Label>
            {multiline ? (
              <Textarea
                id="text-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={6}
                className="resize-none"
              />
            ) : (
              <Input
                id="text-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            )}
          </div>
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
