import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { ProfileData } from "@/temas-lintree/types";
import { TextEditor } from "./fields/TextEditor";
import { ImageEditor } from "./fields/ImageEditor";
import { ListEditor } from "./fields/ListEditor";
import { ColorPicker } from "./fields/ColorPicker";

interface EditableWrapperProps {
  children: React.ReactNode;
  profileData: ProfileData;
  onUpdate: (data: ProfileData) => void;
  ThemeComponent: React.ComponentType<{ profileData: ProfileData }>;
}

interface EditState {
  field: string;
  type: "text" | "textarea" | "image" | "list" | "color";
  label: string;
  value: any;
}

export function EditableThemeWrapper({
  profileData,
  onUpdate,
  ThemeComponent,
}: EditableWrapperProps) {
  const [data, setData] = useState<ProfileData>(profileData);
  const [editState, setEditState] = useState<EditState | null>(null);

  const handleUpdate = (field: string, value: any) => {
    const keys = field.split(".");
    const newData = { ...data };
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setData(newData);
    onUpdate(newData);
  };

  const EditButton = ({
    field,
    type,
    label,
    value,
  }: {
    field: string;
    type: EditState["type"];
    label: string;
    value: any;
  }) => (
    <button
      onClick={() => setEditState({ field, type, label, value })}
      className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg opacity-0 group-hover:opacity-100 hover:bg-blue-700 transition-all duration-200"
      title={`Editar ${label}`}
    >
      <Pencil className="h-3.5 w-3.5" />
    </button>
  );

  return (
    <div className="relative">
      {/* Render theme component with wrapper divs for edit buttons */}
      <div className="relative">
        {/* Profile Header Section - Editable */}
        <div className="relative group">
          <EditButton field="name" type="text" label="Nome" value={data.name} />
          <EditButton
            field="bio"
            type="textarea"
            label="Bio"
            value={data.bio}
          />
          <EditButton
            field="photoUrl"
            type="image"
            label="Foto de Perfil"
            value={data.photoUrl}
          />
        </div>

        {/* Render the actual theme component */}
        <ThemeComponent profileData={data} />

        {/* Floating edit panel for buttons and socials */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <button
            onClick={() =>
              setEditState({
                field: "buttons",
                type: "list",
                label: "Botões/Links",
                value: data.buttons,
              })
            }
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Editar Links
          </button>
          <button
            onClick={() =>
              setEditState({
                field: "accentColor",
                type: "color",
                label: "Cor de Destaque",
                value: data.accentColor,
              })
            }
            className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm text-white shadow-lg hover:bg-slate-800 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Cores
          </button>
        </div>
      </div>

      {/* Editors */}
      {editState && editState.type === "text" && (
        <TextEditor
          value={editState.value}
          label={editState.label}
          multiline={false}
          open={true}
          onOpenChange={(open) => !open && setEditState(null)}
          onSave={(value) => {
            handleUpdate(editState.field, value);
            setEditState(null);
          }}
        />
      )}

      {editState && editState.type === "textarea" && (
        <TextEditor
          value={editState.value}
          label={editState.label}
          multiline={true}
          open={true}
          onOpenChange={(open) => !open && setEditState(null)}
          onSave={(value) => {
            handleUpdate(editState.field, value);
            setEditState(null);
          }}
        />
      )}

      {editState && editState.type === "image" && (
        <ImageEditor
          value={editState.value}
          label={editState.label}
          open={true}
          onOpenChange={(open) => !open && setEditState(null)}
          onSave={(value) => {
            handleUpdate(editState.field, value);
            setEditState(null);
          }}
        />
      )}

      {editState && editState.type === "list" && (
        <ListEditor
          value={editState.value}
          label={editState.label}
          open={true}
          onOpenChange={(open) => !open && setEditState(null)}
          onSave={(value) => {
            handleUpdate(editState.field, value);
            setEditState(null);
          }}
        />
      )}

      {editState && editState.type === "color" && (
        <ColorPicker
          value={editState.value}
          label={editState.label}
          open={true}
          onOpenChange={(open) => !open && setEditState(null)}
          onSave={(value) => {
            handleUpdate(editState.field, value);
            setEditState(null);
          }}
        />
      )}
    </div>
  );
}
