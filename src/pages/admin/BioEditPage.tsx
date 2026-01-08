import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Eye, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { profileApi } from "@/lib/api";
import type { Profile } from "@/types";

export default function BioEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    avatarUrl: "",
    published: false,
    templateType: "template_01" as
      | "template_01"
      | "template_02"
      | "template_03",
  });

  // Carregar dados da bio
  useEffect(() => {
    const loadBio = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const profile = await profileApi.getById(id);
        setFormData({
          username: profile.username || "",
          bio: profile.bio || "",
          avatarUrl: profile.avatarUrl || "",
          published: profile.published || false,
          templateType: profile.templateType || "template_01",
        });
      } catch (error) {
        console.error("Erro ao carregar bio:", error);
        toast.error("Erro ao carregar dados da bio");
      } finally {
        setIsLoading(false);
      }
    };

    loadBio();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      published: checked,
    }));
  };

  const handleSave = async () => {
    if (!id) return;

    try {
      setIsSaving(true);
      await profileApi.update(id, formData);
      toast.success("Bio atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar bio:", error);
      toast.error("Erro ao salvar alterações");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (!formData.username) {
      toast.error(
        "Por favor, adicione um username antes de visualizar o preview"
      );
      return;
    }
    // Abrir preview da bio em nova aba
    window.open(`/${formData.username}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/bio")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Editar Bio
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Personalize seu portfólio
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handlePreview} className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Salvar
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Informações Básicas
              </h2>

              {/* Username */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="username">Username</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    bio4dev.com/
                  </span>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="seu-username"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Este será o endereço público do seu portfólio
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Conte um pouco sobre você..."
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.bio.length}/500 caracteres
                </p>
              </div>

              {/* Avatar URL */}
              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Avatar URL</Label>
                <Input
                  id="avatarUrl"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/avatar.jpg"
                  type="url"
                />
                {formData.avatarUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.avatarUrl}
                      alt="Avatar preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Status */}
          <div className="rounded-xl border bg-card shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Status
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Publicado</p>
                <p className="text-sm text-muted-foreground">
                  {formData.published
                    ? "Visível publicamente"
                    : "Modo rascunho"}
                </p>
              </div>
              <Switch
                checked={formData.published}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </div>

          {/* Preview Card */}
          <div className="rounded-xl border bg-card shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Preview
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Veja como seu portfólio ficará para os visitantes
            </p>
            <Button
              onClick={handlePreview}
              variant="outline"
              className="w-full gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Visualizar Preview
            </Button>
          </div>

          {/* Info Card */}
          <div className="rounded-xl border bg-blue-50 border-blue-200 p-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Dica</h3>
            <p className="text-sm text-blue-700">
              Salve suas alterações regularmente. O preview mostrará como seu
              portfólio aparecerá após publicado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
