import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Github,
  Instagram,
  Youtube,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProfileStore } from "@/stores/profileStore";
import type { Social, PlataformaSocial } from "@/types";
import { toast } from "sonner";

const socialIcons: Record<PlataformaSocial, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  tiktok: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
};

const socialLabels: Record<PlataformaSocial, string> = {
  github: "GitHub",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const socialColors: Record<PlataformaSocial, string> = {
  github: "bg-gray-700",
  instagram: "bg-gradient-to-br from-purple-600 to-pink-500",
  youtube: "bg-red-600",
  tiktok: "bg-black",
};

export function SocialsEdit() {
  const { profile, createSocial, updateSocial, deleteSocial } =
    useProfileStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<Social | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    plataforma: "github" as PlataformaSocial,
    url: "",
  });

  const resetForm = () => {
    setFormData({ plataforma: "github", url: "" });
    setEditingSocial(null);
  };

  const openNewDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (social: Social) => {
    setEditingSocial(social);
    setFormData({
      plataforma: social.plataforma,
      url: social.url,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.url) {
      toast.error("Preencha a URL");
      return;
    }

    // Validação básica de URL
    try {
      new URL(formData.url);
    } catch {
      toast.error("URL inválida. Use o formato: https://exemplo.com");
      return;
    }

    setIsLoading(true);
    try {
      if (editingSocial) {
        await updateSocial(editingSocial.id, formData);
        toast.success("Rede social atualizada!");
      } else {
        await createSocial({
          profileId: profile!.id,
          ...formData,
          ordem: (profile?.socials?.length || 0) + 1,
        });
        toast.success("Rede social adicionada!");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Erro ao salvar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      await deleteSocial(id);
      toast.success("Rede social excluída!");
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Redes Sociais</h1>
          <p className="text-white/50">Gerencie suas redes sociais</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openNewDialog}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-[#0f0f17] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingSocial ? "Editar Rede Social" : "Nova Rede Social"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label className="text-white/70">Plataforma</Label>
                <Select
                  value={formData.plataforma}
                  onValueChange={(value: PlataformaSocial) =>
                    setFormData({ ...formData, plataforma: value })
                  }
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white/70">URL do Perfil</Label>
                <Input
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder={`https://${formData.plataforma}.com/seuusername`}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              {/* Preview */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-white/50 mb-2">Preview:</p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${
                      socialColors[formData.plataforma]
                    } flex items-center justify-center text-white`}
                  >
                    {socialIcons[formData.plataforma]}
                  </div>
                  <div>
                    <p className="font-medium">
                      {socialLabels[formData.plataforma]}
                    </p>
                    <p className="text-sm text-white/50 truncate max-w-[200px]">
                      {formData.url || "URL não definida"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Salvar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Socials List */}
      {profile?.socials && profile.socials.length > 0 ? (
        <div className="space-y-3">
          {profile.socials
            .sort((a, b) => a.ordem - b.ordem)
            .map((social) => (
              <div
                key={social.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="text-white/30 cursor-move">
                  <GripVertical className="w-5 h-5" />
                </div>

                <div
                  className={`w-12 h-12 rounded-xl ${
                    socialColors[social.plataforma]
                  } flex items-center justify-center text-white`}
                >
                  {socialIcons[social.plataforma]}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium">
                    {socialLabels[social.plataforma]}
                  </p>
                  <p className="text-sm text-white/50 truncate">{social.url}</p>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(social)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(social.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Instagram className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Nenhuma rede social</h3>
          <p className="text-white/50 mb-6">
            Adicione suas redes sociais para conectar com visitantes
          </p>
          <Button
            onClick={openNewDialog}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Primeira Rede
          </Button>
        </div>
      )}
    </div>
  );
}
