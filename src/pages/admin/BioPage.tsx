import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit2,
  LayoutTemplate,
  Trash2,
  ExternalLink,
  Loader2,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/components/ui/utils";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { profileApi } from "@/lib/api";
import { PageHeader } from "@/components/structure/PageHeader";
import { MetricCard } from "@/components/analytics/MetricCard";

interface Bio {
  id: string;
  name: string;
  template: string;
  status: string;
  published: boolean;
  lastUpdated: string;
  url: string;
  username?: string;
  slug?: string;
}

export default function BioPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [bios, setBios] = useState<Bio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBio, setSelectedBio] = useState<Bio | null>(null);
  const [previewLoading, setPreviewLoading] = useState<string | null>(null);
  const [publishLoading, setPublishLoading] = useState<string | null>(null);
  const totalBios = bios.length;
  const publishedCount = bios.filter((b) => b.published).length;
  const draftCount = Math.max(totalBios - publishedCount, 0);

  // Buscar bios/perfis do usuário
  useEffect(() => {
    const fetchBios = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        // Buscar todos os perfis do usuário
        const response = await profileApi.getAll();
        const userBios = response.filter(
          (profile: any) => profile.userId === user.id,
        );

        // Mapear para o formato esperado
        const mappedBios = userBios.map((profile: any) => ({
          id: profile.id,
          name: profile.username || "Sem nome",
          username: profile.username,
          slug: profile.slug,
          template: profile.templateType || "template_01",
          status: profile.published ? "Published" : "Draft",
          published: !!profile.published,
          lastUpdated: new Date(
            profile.updatedAt || profile.createdAt,
          ).toLocaleDateString(),
          url: `bio4dev.com/${profile.slug}`,
        }));

        setBios(mappedBios);
      } catch (error) {
        console.error("Erro ao buscar bios:", error);
        toast.error("Erro ao carregar seus portfólios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBios();
  }, [user]);

  const handleDeleteClick = (bio: Bio) => {
    setSelectedBio(bio);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (bio: Bio) => {
    // Redirecionar para o editor com canetas (PortfolioEditorPage)
    navigate(`/dashboard/portfolio/${bio.id}`);
  };

  const handlePreviewClick = async (bio: Bio) => {
    if (!bio.slug) {
      toast.error("Slug não encontrado para este perfil");
      return;
    }

    try {
      setPreviewLoading(bio.id);

      // Gerar token temporário de preview usando a lógica do backend
      const { token, expiresAt } = await profileApi.generatePreviewToken(
        bio.id,
      );

      // Calcula tempo de expiração
      const expiresDate = new Date(expiresAt);
      const hours = Math.round(
        (expiresDate.getTime() - Date.now()) / (1000 * 60 * 60),
      );

      // Abre preview em nova aba com token (usa slug que é o identificador da rota)
      const previewUrl = `/${bio.slug}?preview=${token}`;
      window.open(previewUrl, "_blank");

      toast.success(`Preview aberto! Token expira em ${hours}h`, {
        description: "O link funciona mesmo com o perfil não publicado",
      });
    } catch (error: any) {
      console.error("Erro ao gerar preview:", error);

      // Se falhar, mostrar erro específico
      if (error.response?.status === 404) {
        toast.error("Endpoint de preview não encontrado no backend");
      } else if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        toast.error("Sem permissão para gerar preview");
      } else {
        toast.error(
          "Erro ao gerar token de preview. Verifique se o backend está rodando.",
        );
      }
    } finally {
      setPreviewLoading(null);
    }
  };

  const handleTogglePublish = async (bio: Bio) => {
    try {
      setPublishLoading(bio.id);

      const newStatus = !bio.published;
      await profileApi.update(bio.id, {
        published: newStatus,
      });

      setBios((prevBios) =>
        prevBios.map((b) =>
          b.id === bio.id
            ? {
                ...b,
                published: newStatus,
                status: newStatus ? "Published" : "Draft",
              }
            : b,
        ),
      );

      toast.success(
        newStatus ? "Página publicada com sucesso!" : "Página desativada",
      );
    } catch (error: any) {
      console.error("Erro ao alterar status:", error);
      toast.error("Erro ao alterar status da página");
    } finally {
      setPublishLoading(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedBio) {
      try {
        await profileApi.delete(selectedBio.id);
        setBios(bios.filter((b) => b.id !== selectedBio.id));
        toast.success(`Bio "${selectedBio.name}" deletada com sucesso!`);
      } catch (error: any) {
        console.error("Erro ao deletar bio:", error);
        toast.error(error.response?.data?.message || "Erro ao deletar bio");
      } finally {
        setDeleteDialogOpen(false);
        setSelectedBio(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="My Bios"
        subtitle="Manage your portfolio pages and templates."
        actions={
          <Button
            className="gap-2 w-full sm:w-auto"
            onClick={() => navigate("/profile/type")}
          >
            <Plus className="h-4 w-4" />
            Create New Bio
          </Button>
        }
      />

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total Bios" value={totalBios} helper="Portfólios criados" />
        <MetricCard title="Publicados" value={publishedCount} helper="Ativos" />
        <MetricCard title="Rascunhos" value={draftCount} helper="Prontos para publicar" />
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden sm:overflow-visible">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : bios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <LayoutTemplate className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Nenhum portfólio criado ainda
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md">
              Comece criando seu primeiro portfólio clicando no botão "Create
              New Bio" acima.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 p-4 sm:hidden">
              {bios.map((bio) => (
                <div
                  key={bio.id}
                  className="rounded-lg border bg-background/50 p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-slate-900">
                        {bio.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <LayoutTemplate className="h-4 w-4 text-slate-500" />
                          {bio.template}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{bio.lastUpdated}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-normal",
                        bio.status === "Published"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-50 text-slate-600 border-slate-200",
                      )}
                    >
                      {bio.status}
                    </Badge>
                  </div>

                  <button
                    onClick={() => {
                      const base = window.location.origin;
                      const path = bio.slug ? `/${bio.slug}` : `/${bio.url}`;
                      window.open(`${base}${path}`, "_blank");
                    }}
                    className="w-full text-left text-sm text-blue-700 hover:text-blue-800 flex items-center gap-2"
                    aria-label={`Abrir ${bio.url} em nova aba`}
                  >
                    {bio.url}
                    <ExternalLink className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreviewClick(bio)}
                      disabled={previewLoading === bio.id}
                      className="h-11 w-full justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      {previewLoading === bio.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(bio)}
                      disabled={publishLoading === bio.id}
                      className={cn(
                        "h-11 w-full justify-center",
                        bio.published
                          ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                          : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50",
                      )}
                    >
                      {publishLoading === bio.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : bio.published ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      {bio.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(bio)}
                      className="h-11 w-full justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    >
                      <Edit2 className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(bio)}
                      className="h-11 w-full justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:block overflow-x-auto">
              <Table className="min-w-[640px]">
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="min-w-[200px] sm:w-[300px]">
                      Bio Name
                    </TableHead>
                    <TableHead className="min-w-[120px]">Template</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[120px]">
                      Last Updated
                    </TableHead>
                    <TableHead className="text-right min-w-[140px] sm:min-w-[180px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bios.map((bio) => (
                    <TableRow key={bio.id} className="group">
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-base text-slate-900">
                            {bio.name}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            {bio.url}
                            <ExternalLink
                              className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              onClick={() => {
                                const base = window.location.origin;
                                const path = bio.slug
                                  ? `/${bio.slug}`
                                  : `/${bio.url}`;
                                window.open(`${base}${path}`, "_blank");
                              }}
                            />
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded bg-slate-100 border flex items-center justify-center">
                            <LayoutTemplate className="h-3 w-3 text-slate-500" />
                          </div>
                          <span className="text-sm text-slate-700">
                            {bio.template}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-normal",
                            bio.status === "Published"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-50 text-slate-600 border-slate-200",
                          )}
                        >
                          {bio.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {bio.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePreviewClick(bio)}
                            disabled={previewLoading === bio.id}
                            className="h-8 gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            {previewLoading === bio.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">Preview</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublish(bio)}
                            disabled={publishLoading === bio.id}
                            className={cn(
                              "h-8 gap-2",
                              bio.published
                                ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50",
                            )}
                          >
                            {publishLoading === bio.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : bio.published ? (
                              <XCircle className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">
                              {bio.published ? "Unpublish" : "Publish"}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(bio)}
                            className="h-8 gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                          >
                            <Edit2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(bio)}
                            className="h-8 gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar a bio{" "}
              <strong>"{selectedBio?.name}"</strong>? Esta ação não pode ser
              desfeita e todos os dados relacionados serão permanentemente
              removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedBio(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
