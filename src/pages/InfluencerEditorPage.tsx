import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { profileApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { ProfileData } from "@/temas-lintree/types";
import { PROFILES } from "@/temas-lintree/constants";
import { TextEditor } from "@/components/editors/fields/TextEditor";
import { ImageEditor } from "@/components/editors/fields/ImageEditor";
import { ListEditor } from "@/components/editors/fields/ListEditor";
import { ColorPicker } from "@/components/editors/fields/ColorPicker";
import { Pencil, Save, ArrowLeft, Eye } from "lucide-react";
import { DynamicThemeRenderer } from "@/components/editors/DynamicThemeRenderer";

interface EditState {
  field: string;
  type: "text" | "textarea" | "image" | "list" | "color";
  label: string;
  value: any;
}

export function InfluencerEditorPage() {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [themeId, setThemeId] = useState<string>("");
  const [editState, setEditState] = useState<EditState | null>(null);
  const [showEditButtons, setShowEditButtons] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, [portfolioId]);

  const loadProfileData = async () => {
    if (!portfolioId) {
      toast.error("ID do portfólio não encontrado");
      navigate("/profile/create");
      return;
    }

    setIsLoading(true);
    try {
      // Check localStorage for saved profiles first
      const savedProfiles = JSON.parse(
        localStorage.getItem("bio4dev_saved_profiles") || "{}"
      );

      if (savedProfiles[portfolioId]) {
        console.log("Loading saved profile from localStorage:", portfolioId);
        setProfileData(savedProfiles[portfolioId]);
        setThemeId(savedProfiles[portfolioId].id);
        setIsLoading(false);
        return;
      }

      // Check for theme from URL or localStorage
      const themeFromUrl = searchParams.get("theme");
      const themeFromStorage = localStorage.getItem(
        `bio4dev_theme_${portfolioId}`
      );
      const selectedTheme = themeFromUrl || themeFromStorage;

      if (selectedTheme) {
        console.log("Loading theme:", selectedTheme);
        setThemeId(selectedTheme);

        // Find seed data from constants
        const seedData = PROFILES.find((p) => p.id === selectedTheme);

        if (seedData) {
          setProfileData(seedData);
        } else {
          // Create basic profile data if no seed found
          setProfileData({
            id: selectedTheme,
            themeName: selectedTheme,
            name: "Seu Nome",
            bio: "Sua bio aqui",
            photoUrl:
              "https://picsum.photos/seed/" + selectedTheme + "/300/300",
            backgroundStyle: "bg-white",
            buttonStyle: "bg-slate-100 hover:bg-slate-200 rounded-lg",
            textColor: "text-slate-900",
            accentColor: "#3b82f6",
            socials: [],
            buttons: [],
          });
        }
      } else {
        toast.error("Tema não especificado");
        navigate("/profile/create");
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
      toast.error("Erro ao carregar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profileData || !portfolioId) return;

    setIsSaving(true);
    try {
      // Save to localStorage
      const savedProfiles = JSON.parse(
        localStorage.getItem("bio4dev_saved_profiles") || "{}"
      );
      savedProfiles[portfolioId] = profileData;
      localStorage.setItem(
        "bio4dev_saved_profiles",
        JSON.stringify(savedProfiles)
      );

      console.log("Profile saved to localStorage:", portfolioId);

      // TODO: When backend is ready, uncomment this
      // await profileApi.update(portfolioId, profileData);

      toast.success("Portfólio salvo com sucesso!");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error("Erro ao salvar portfólio");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = (field: string, value: any) => {
    if (!profileData) return;

    const keys = field.split(".");
    const newData = { ...profileData };
    let current: any = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setProfileData(newData);
  };

  const openEditor = (
    field: string,
    type: EditState["type"],
    label: string,
    value: any
  ) => {
    setEditState({ field, type, label, value });
  };

  const handleInlineEdit = (
    field: string,
    type: string,
    label: string,
    value: any
  ) => {
    // Map type to EditState type
    const editType: EditState["type"] =
      type === "link"
        ? "list"
        : type === "social"
        ? "text"
        : (type as EditState["type"]);

    setEditState({ field, type: editType, label, value });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />
          <p className="mt-4 text-slate-600">Carregando editor...</p>
        </div>
      </div>
    );
  }

  if (!profileData || !themeId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Perfil não encontrado</p>
          <Button onClick={() => navigate("/profile/create")} className="mt-4">
            Voltar para seleção
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Top toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditButtons(!showEditButtons)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showEditButtons ? "Ocultar Edições" : "Mostrar Edições"}
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="pt-16">
        <div className="relative">
          {/* Render original theme component with dynamic data and inline edit controls */}
          <div className="relative">
            <DynamicThemeRenderer
              profileData={profileData}
              themeId={themeId}
              editMode={showEditButtons}
              onEdit={handleInlineEdit}
            />
          </div>
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
