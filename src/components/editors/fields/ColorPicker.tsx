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

interface ColorPickerProps {
  value: string;
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (value: string) => void;
}

const PRESET_COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#10b981", // emerald
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#0ea5e9", // sky
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#a855f7", // purple
  "#d946ef", // fuchsia
  "#ec4899", // pink
  "#f43f5e", // rose
  "#000000", // black
  "#ffffff", // white
  "#6b7280", // gray
];

export function ColorPicker({
  value,
  label,
  open,
  onOpenChange,
  onSave,
}: ColorPickerProps) {
  const [color, setColor] = useState(value);

  useEffect(() => {
    setColor(value);
  }, [value, open]);

  const handleSave = () => {
    onSave(color);
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
            <Label htmlFor="color-input">Cor (Hexadecimal)</Label>
            <div className="flex gap-2">
              <Input
                id="color-input"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#3b82f6"
              />
              <div
                className="w-12 h-10 rounded border border-slate-300"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Cores Predefinidas</Label>
            <div className="grid grid-cols-10 gap-2">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  onClick={() => setColor(presetColor)}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    color === presetColor
                      ? "border-blue-500 scale-110"
                      : "border-slate-200 hover:scale-105"
                  }`}
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
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
