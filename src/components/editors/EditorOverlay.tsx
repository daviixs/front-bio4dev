import React, { useState, cloneElement, ReactElement } from "react";
import { Pencil } from "lucide-react";
import { TextEditor } from "./fields/TextEditor";
import { ImageEditor } from "./fields/ImageEditor";
import { ListEditor } from "./fields/ListEditor";
import { ColorPicker } from "./fields/ColorPicker";

interface EditableField {
  key: string;
  type: "text" | "textarea" | "image" | "list" | "color";
  label: string;
  value: any;
}

interface EditorOverlayProps {
  children: ReactElement;
  data: any;
  onSave: (data: any) => void;
  editableFields: EditableField[];
}

export function EditorOverlay({
  children,
  data,
  onSave,
  editableFields,
}: EditorOverlayProps) {
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [localData, setLocalData] = useState(data);

  const handleFieldSave = (key: string, value: any) => {
    const keys = key.split(".");
    const newData = { ...localData };
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setLocalData(newData);
    onSave(newData);
    setEditingField(null);
  };

  const renderEditButton = (field: EditableField) => (
    <button
      onClick={() => setEditingField(field)}
      className="group absolute top-2 right-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg opacity-0 transition-opacity hover:bg-blue-700"
      title={`Editar ${field.label}`}
    >
      <Pencil className="h-4 w-4" />
    </button>
  );

  return (
    <div className="relative">
      {/* Render the original component with updated data */}
      {cloneElement(children, localData)}

      {/* Render edit buttons as overlays */}
      <style>{`
        [data-editable]:hover .group {
          opacity: 1;
        }
      `}</style>

      {/* Render appropriate editor based on field type */}
      {editingField && editingField.type === "text" && (
        <TextEditor
          value={editingField.value}
          label={editingField.label}
          multiline={false}
          open={true}
          onOpenChange={(open) => !open && setEditingField(null)}
          onSave={(value) => handleFieldSave(editingField.key, value)}
        />
      )}

      {editingField && editingField.type === "textarea" && (
        <TextEditor
          value={editingField.value}
          label={editingField.label}
          multiline={true}
          open={true}
          onOpenChange={(open) => !open && setEditingField(null)}
          onSave={(value) => handleFieldSave(editingField.key, value)}
        />
      )}

      {editingField && editingField.type === "image" && (
        <ImageEditor
          value={editingField.value}
          label={editingField.label}
          open={true}
          onOpenChange={(open) => !open && setEditingField(null)}
          onSave={(value) => handleFieldSave(editingField.key, value)}
        />
      )}

      {editingField && editingField.type === "list" && (
        <ListEditor
          value={editingField.value}
          label={editingField.label}
          open={true}
          onOpenChange={(open) => !open && setEditingField(null)}
          onSave={(value) => handleFieldSave(editingField.key, value)}
        />
      )}

      {editingField && editingField.type === "color" && (
        <ColorPicker
          value={editingField.value}
          label={editingField.label}
          open={true}
          onOpenChange={(open) => !open && setEditingField(null)}
          onSave={(value) => handleFieldSave(editingField.key, value)}
        />
      )}
    </div>
  );
}
