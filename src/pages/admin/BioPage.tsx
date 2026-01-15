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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import portfolio1Image from "@/bio-exempleimages/Portifolio 1.png";
import portfolio2Image from "@/bio-exempleimages/Portifolio 2.png";
import portfolio3Image from "@/bio-exempleimages/Portifolio 3.png";

const portfolioExamples = [
  {
    id: 1,
    name: "Portfólio 1",
    image: portfolio1Image,
    template: "template_01",
  },
  {
    id: 2,
    name: "Portfólio 2",
    image: portfolio2Image,
    template: "template_02",
  },
  {
    id: 3,
    name: "Portfólio 3",
    image: portfolio3Image,
    template: "template_03",
  },
];

interface Bio {
  id: string;
  name: string;
  template: string;
  status: string;
  published: boolean;
  lastUpdated: string;
  url: string;
  username?: string;
}

export default function BioPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [bios, setBios] = useState<Bio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createBioDialogOpen, setCreateBioDialogOpen] = useState(false);
  const [selectedBio, setSelectedBio] = useState<Bio | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<number | null>(
    null
  );
  const [previewLoading, setPreviewLoading] = useState<string | null>(null);
  const [publishLoading, setPublishLoading] = useState<string | null>(null);

  // Buscar bios/perfis do usuário
  useEffect(() => {
    const fetchBios = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        // Buscar todos os perfis do usuário
        const response = await profileApi.getAll();
        const userBios = response.filter(
          (profile: any) => profile.userId === user.id
        );

        // Mapear para o formato esperado
        const mappedBios = userBios.map((profile: any) => ({
          id: profile.id,
          name: profile.username || "Sem nome",
          username: profile.username,
          template: profile.templateType || "template_01",
          status: profile.published ? "Published" : "Draft",
          published: !!profile.published,
          lastUpdated: new Date(
            profile.updatedAt || profile.createdAt
          ).toLocaleDateString(),
          url: `bio4dev.com/${profile.username}`,
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

  const handleCreateBio = async () => {
    if (!selectedPortfolio || !user) {
      toast.error("Erro ao criar portfólio");
      return;
    }

    try {
      setIsLoading(true);

      // Mapear portfolioId para templateType
      const templateMap: Record<
        number,
        "template_01" | "template_02" | "template_03"
      > = {
        1: "template_01",
        2: "template_02",
        3: "template_03",
      };

      const templateType = templateMap[selectedPortfolio] || "template_01";

      // Verificar se usuário já tem perfil
      const allProfiles = await profileApi.getAll();
      const existingProfile = allProfiles.find(
        (profile: any) => profile.userId === user.id
      );

      let profileId: string;

      if (existingProfile) {
        // Se já existe, apenas atualiza o template
        await profileApi.update(existingProfile.id, {
          templateType,
        });
        profileId = existingProfile.id;
        toast.success("Template atualizado com sucesso!");
      } else {
        // Se não existe, cria novo perfil
        const baseUsername =
          (user as any).nome?.toLowerCase().replace(/\s+/g, "") || "user";
        const timestamp = Date.now();
        const username = `${baseUsername}${timestamp}`;

        const response = await profileApi.create({
          userId: user.id,
          username,
          templateType,
          published: false,
        });
        profileId = response.profile.id;
        toast.success("Portfólio criado com sucesso!");
      }

      // Redirecionar para a página de edição
      navigate(`/dashboard/bio/${profileId}`);
      setCreateBioDialogOpen(false);
      setSelectedPortfolio(null);

      // Recarregar lista de bios
      const updatedProfiles = await profileApi.getAll();
      const userBios = updatedProfiles.filter(
        (profile: any) => profile.userId === user.id
      );

      const mappedBios = userBios.map((profile: any) => ({
        id: profile.id,
        name: profile.username || "Sem nome",
        username: profile.username,
        template: profile.templateType || "template_01",
        status: profile.published ? "Published" : "Draft",
        published: !!profile.published,
        lastUpdated: new Date(
          profile.updatedAt || profile.createdAt
        ).toLocaleDateString(),
        url: `bio4dev.com/${profile.username}`,
      }));

      setBios(mappedBios);
    } catch (error: any) {
      console.error("Erro ao criar portfólio:", error);
      toast.error(error.response?.data?.message || "Erro ao criar portfólio");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewClick = async (bio: Bio) => {
    if (!bio.username) {
      toast.error("Username não encontrado para este perfil");
      return;
    }

    try {
      setPreviewLoading(bio.id);

      // Gerar token temporário de preview usando a lógica do backend
      const { token, expiresAt } = await profileApi.generatePreviewToken(
        bio.id
      );

      // Calcula tempo de expiração
      const expiresDate = new Date(expiresAt);
      const hours = Math.round(
        (expiresDate.getTime() - Date.now()) / (1000 * 60 * 60)
      );

      // Abre preview em nova aba com token
      const previewUrl = `/${bio.username}?preview=${token}`;
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
          "Erro ao gerar token de preview. Verifique se o backend está rodando."
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
            : b
        )
      );

      toast.success(
        newStatus ? "Página publicada com sucesso!" : "Página desativada"
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
        // TODO: Implementar delete na API
        // await profileApi.delete(selectedBio.id);
        setBios(bios.filter((b) => b.id !== selectedBio.id));
        toast.success(`Bio "${selectedBio.name}" deletada com sucesso!`);
      } catch (error) {
        toast.error("Erro ao deletar bio");
      } finally {
        setDeleteDialogOpen(false);
        setSelectedBio(null);
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            My Bios
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your portfolio pages and templates.
          </p>
        </div>
        <Button
          className="gap-2 w-full sm:w-auto"
          onClick={() => setCreateBioDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Create New Bio
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="min-w-[200px] sm:w-[300px]">
                    Bio Name
                  </TableHead>
                  <TableHead className="min-w-[120px]">Template</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Last Updated</TableHead>
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
                            onClick={() =>
                              window.open(
                                `http://localhost:3000/${bio.url
                                  .split("/")
                                  .slice(1)
                                  .join("/")}`,
                                "_blank"
                              )
                            }
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
                            : "bg-slate-50 text-slate-600 border-slate-200"
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
                              : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
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
          )}
        </div>
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

      {/* Create New Bio - Portfolio Selection Dialog */}
      <Dialog open={createBioDialogOpen} onOpenChange={setCreateBioDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {bios.length > 0 ? "Trocar Template" : "Selecione um Portfólio"}
            </DialogTitle>
            <DialogDescription>
              {bios.length > 0
                ? "Você já tem um portfólio. Escolha um novo template para atualizá-lo."
                : "Escolha um dos modelos de portfólio abaixo para começar. Você pode personalizar depois."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 relative px-16">
            <Carousel className="w-full" opts={{ align: "center", loop: true }}>
              <CarouselContent className="-ml-0">
                {portfolioExamples.map((portfolio) => (
                  <CarouselItem key={portfolio.id} className="pl-0 basis-full">
                    <div className="flex flex-col items-center gap-6 px-4">
                      <div
                        className={cn(
                          "relative w-full rounded-lg border-2 overflow-hidden cursor-pointer transition-all bg-slate-50",
                          selectedPortfolio === portfolio.id
                            ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                        )}
                        onClick={() => setSelectedPortfolio(portfolio.id)}
                      >
                        <div className="flex items-center justify-center p-6 min-h-[70vh] max-h-[80vh]">
                          <img
                            src={portfolio.image}
                            alt={portfolio.name}
                            className="max-w-full max-h-full w-auto h-auto object-contain rounded"
                          />
                        </div>
                        {selectedPortfolio === portfolio.id && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-lg font-semibold text-slate-700">
                        {portfolio.name}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border-slate-200 hover:bg-slate-50 shadow-lg z-10 w-10 h-10" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border-slate-200 hover:bg-slate-50 shadow-lg z-10 w-10 h-10" />
            </Carousel>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setCreateBioDialogOpen(false);
                  setSelectedPortfolio(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateBio}
                disabled={!selectedPortfolio || isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {bios.length > 0 ? "Atualizando..." : "Criando..."}
                  </>
                ) : bios.length > 0 ? (
                  "Atualizar Template"
                ) : (
                  "Criar Bio"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
