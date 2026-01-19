import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";

export interface LinkButtonItem {
  id?: string;
  label: string;
  url: string;
  subtext?: string;
  icon?: string;
  style?: string;
}

interface LinksListProps {
  buttons: LinkButtonItem[];
  onChange: (next: LinkButtonItem[]) => void;
}

export function LinksList({ buttons, onChange }: LinksListProps) {
  const updateItem = (
    index: number,
    key: keyof LinkButtonItem,
    value: string,
  ) => {
    const next = buttons.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    onChange(next);
  };

  const addItem = () => {
    onChange([...buttons, { label: "", url: "" }]);
  };

  const removeItem = (index: number) => {
    onChange(buttons.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {buttons.map((button, index) => (
        <div key={`${button.label}-${index}`} className="grid gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={button.label}
              placeholder="Label"
              onChange={(event) =>
                updateItem(index, "label", event.target.value)
              }
            />
            <Input
              value={button.url}
              placeholder="https://..."
              onChange={(event) =>
                updateItem(index, "url", event.target.value)
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={button.subtext || ""}
              placeholder="Subtexto (opcional)"
              onChange={(event) =>
                updateItem(index, "subtext", event.target.value)
              }
            />
            <Input
              value={button.icon || ""}
              placeholder="Icon (opcional)"
              onChange={(event) =>
                updateItem(index, "icon", event.target.value)
              }
            />
            <Input
              value={button.style || ""}
              placeholder="Style (opcional)"
              onChange={(event) =>
                updateItem(index, "style", event.target.value)
              }
            />
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar botao
      </Button>
    </div>
  );
}
