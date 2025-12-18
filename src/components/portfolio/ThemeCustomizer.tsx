
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export function ThemeCustomizer({
  open,
  onOpenChange,
  theme,
  mainColor,
  onThemeChange,
  onColorChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: 'LIGHT' | 'DARK';
  mainColor: string;
  onThemeChange: (theme: 'LIGHT' | 'DARK') => void;
  onColorChange: (color: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-zinc-950 text-slate-900 dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Personalização do Tema</DialogTitle>
          <DialogDescription>
            Escolha o modo de cores e a cor principal do seu portfólio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Theme Toggle */}
          <div className="space-y-3">
            <Label>Modo de Cor</Label>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => onThemeChange('LIGHT')}
                className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                  theme === 'LIGHT'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center">
                  <Sun className="w-6 h-6 text-orange-500" />
                </div>
                <span className="font-medium text-sm text-slate-900">Light</span>
              </div>

              <div
                onClick={() => onThemeChange('DARK')}
                className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                  theme === 'DARK'
                    ? 'border-blue-500 bg-slate-900 text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-blue-400" />
                </div>
                <span className="font-medium text-sm text-slate-900 dark:text-slate-50">Dark</span>
              </div>
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-3">
            <Label>Cor Principal</Label>
            <div className="flex gap-4 items-center">
              <div className="relative overflow-hidden w-16 h-16 rounded-full border-2 border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                <input
                  type="color"
                  value={mainColor}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-0"
                />
              </div>
              <div className="flex-1">
                <Input
                  value={mainColor}
                  onChange={(e) => {
                     const val = e.target.value;
                     if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                        onColorChange(val);
                     }
                  }}
                  placeholder="#000000"
                  className="font-mono uppercase"
                  maxLength={7}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Selecione uma cor para botões, links e destaques.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => onOpenChange(false)}>Concluído</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
