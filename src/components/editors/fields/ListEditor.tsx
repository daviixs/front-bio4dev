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
import { Plus, X, GripVertical } from "lucide-react";

interface ListItem {
  label: string;
  url: string;
  subtext?: string;
}

interface ListEditorProps {
  value: ListItem[];
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (value: ListItem[]) => void;
}

export function ListEditor({
  value,
  label,
  open,
  onOpenChange,
  onSave,
}: ListEditorProps) {
  const [items, setItems] = useState<ListItem[]>(value);

  useEffect(() => {
    setItems(value);
  }, [value, open]);

  const handleAdd = () => {
    setItems([...items, { label: "", url: "", subtext: "" }]);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof ListItem,
    value: string
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSave = () => {
    onSave(items.filter((item) => item.label && item.url));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar {label}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="space-y-2 rounded-lg border p-4 bg-slate-50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-slate-400" />
                  <Label className="text-sm font-medium">
                    Item {index + 1}
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Título do link"
                  value={item.label}
                  onChange={(e) => handleChange(index, "label", e.target.value)}
                />
                <Input
                  placeholder="https://exemplo.com"
                  value={item.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                />
                <Input
                  placeholder="Texto secundário (opcional)"
                  value={item.subtext || ""}
                  onChange={(e) =>
                    handleChange(index, "subtext", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={handleAdd}
            className="w-full"
            type="button"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Item
          </Button>
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
