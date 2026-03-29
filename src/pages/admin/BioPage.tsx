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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import activistImg from "@/temas-lintree/preview-screenshots/activist.png";
import altMusicImg from "@/temas-lintree/preview-screenshots/alt-music.png";
import architectImg from "@/temas-lintree/preview-screenshots/architect.png";
import artistImg from "@/temas-lintree/preview-screenshots/artist.png";
import athleteImg from "@/temas-lintree/preview-screenshots/Athlete.png";
import businessImg from "@/temas-lintree/preview-screenshots/business.png";
import creatorImg from "@/temas-lintree/preview-screenshots/creator.png";
import ecoFashionImg from "@/temas-lintree/preview-screenshots/eco-fashion.png";
import gourmetImg from "@/temas-lintree/preview-screenshots/gourmet.png";
import innovationImg from "@/temas-lintree/preview-screenshots/innovation.png";
import streamerImg from "@/temas-lintree/preview-screenshots/streamer.png";

const portfolioExamples = [
  {
    id: 1,
    name: "Minimalist Dev",
    image: portfolio1Image,
    template: "template_01",
    category: "dev",
  },
  {
    id: 2,
    name: "Creative Tech",
    image: portfolio2Image,
    template: "template_02",
    category: "dev",
  },
  {
    id: 3,
    name: "Corporate Dev",
    image: portfolio3Image,
    template: "template_03",
    category: "dev",
  },
  {
    id: 4,
    name: "Ativista",
    image: activistImg,
    template: "template_04",
    category: "influenciador",
  },
  {
    id: 5,
    name: "Alt Music",
    image: altMusicImg,
    template: "template_05",
    category: "influenciador",
  },
  {
    id: 6,
    name: "Arquiteto",
    image: architectImg,
    template: "template_06",
    category: "influenciador",
  },
  {
    id: 7,
    name: "Artista",
    image: artistImg,
    template: "template_07",
    category: "influenciador",
  },
  {
    id: 8,
    name: "Atleta",
    image: athleteImg,
    template: "template_08",
    category: "influenciador",
  },
  {
    id: 9,
    name: "Business",
    image: businessImg,
    template: "template_09",
    category: "influenciador",
  },
  {
    id: 10,
    name: "Creator",
    image: creatorImg,
    template: "template_10",
    category: "influenciador",
  },
  {
    id: 11,
    name: "Eco Fashion",
    image: ecoFashionImg,
    template: "template_11",
    category: "influenciador",
  },
  {
    id: 12,
    name: "Gourmet",
    image: gourmetImg,
    template: "template_12",
    category: "influenciador",
  },
  {
    id: 13,
    name: "Innovation",
    image: innovationImg,
    template: "template_13",
    category: "influenciador",
  },
  {
    id: 14,
    name: "Streamer",
    image: streamerImg,
    template: "template_14",
    category: "influenciador",
  },
];

const toSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

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
  const [createBioDialogOpen, setCreateBioDialogOpen] = useState(false);
  const [selectedBio, setSelectedBio] = useState<Bio | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<number | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("dev");
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

  const handleCreateBio = async () => {
    if (!selectedPortfolio || !user) {
      toast.error("Erro ao criar portfólio");
      return;
    }

    try {
      setIsLoading(true);

      // Encontrar o template selecionado
      const selectedTemplate = portfolioExamples.find(
        (p) => p.id === selectedPortfolio,
      );

      if (!selectedTemplate) {
        toast.error("Template não encontrado");
        return;
      }

      const templateType = selectedTemplate.template;

      // Gerar slug único baseado no nome do usuário
      const baseName = (user as any).nome || "user";
      const uniqueSuffix = Date.now().toString(36);
      const slug = toSlug(`${baseName}-${uniqueSuffix}`) || "user";
      const username = baseName;

      // Criar novo perfil
      const response = await profileApi.create({
        userId: user.id,
        username,
        slug,
        bio: `Portfólio ${selectedTemplate.name}`,
        avatarUrl: undefined,
        templateType: templateType,
        published: true,
      });

      toast.success("Portfólio criado com sucesso!");
      setCreateBioDialogOpen(false);
      setSelectedPortfolio(null);

      // Recarregar lista de bios
      const updatedProfiles = await profileApi.getAll();
      const userBios = updatedProfiles.filter(
        (profile: any) => profile.userId === user.id,
      );

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

      // Redirecionar para o editor
      navigate(`/dashboard/portfolio/${response.id}`);
    } catch (error: any) {
      console.error("Erro ao criar portfólio:", error);
      toast.error(error.response?.data?.message || "Erro ao criar portfólio");
    } finally {
      setIsLoading(false);
    }
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
                    onClick={() =>
                      window.open(
                        `http://localhost:3000/${bio.url
                          .split("/")
                          .slice(1)
                          .join("/")}`,
                        "_blank",
                      )
                    }
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
                              onClick={() =>
                                window.open(
                                  `http://localhost:3000/${bio.url
                                    .split("/")
                                    .slice(1)
                                    .join("/")}`,
                                  "_blank",
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
          <div className="mt-4 rounded-xl border bg-muted/40 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Novo fluxo Dev
              </h3>
              <p className="text-xs text-slate-500">
                Crie um portfolio dev completo com templates dedicados.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setCreateBioDialogOpen(false);
                navigate("/profile/create/developer");
              }}
            >
              Criar Perfil Dev
            </Button>
          </div>
          <div className="mt-6">
            <Tabs
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedPortfolio(null);
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dev">Dev</TabsTrigger>
                <TabsTrigger value="influenciador">Influenciador</TabsTrigger>
              </TabsList>
              <TabsContent value="dev" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioExamples
                    .filter((p) => p.category === "dev")
                    .map((portfolio) => (
                      <div
                        key={portfolio.id}
                        className={cn(
                          "relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all bg-slate-50 hover:shadow-md",
                          selectedPortfolio === portfolio.id
                            ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg"
                            : "border-slate-200 hover:border-slate-300",
                        )}
                        onClick={() => setSelectedPortfolio(portfolio.id)}
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={portfolio.image}
                            alt={portfolio.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-slate-900 mb-1">
                            {portfolio.name}
                          </h3>
                          <p className="text-sm text-slate-600">
                            Template profissional para desenvolvedores
                          </p>
                        </div>
                        {selectedPortfolio === portfolio.id && (
                          <div className="absolute top-2 right-2 z-10">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                              <svg
                                className="w-4 h-4 text-white"
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
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="influenciador" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioExamples
                    .filter((p) => p.category === "influenciador")
                    .map((portfolio) => (
                      <div
                        key={portfolio.id}
                        className={cn(
                          "relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all bg-slate-50 hover:shadow-md",
                          selectedPortfolio === portfolio.id
                            ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg"
                            : "border-slate-200 hover:border-slate-300",
                        )}
                        onClick={() => setSelectedPortfolio(portfolio.id)}
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={portfolio.image}
                            alt={portfolio.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-slate-900 mb-1">
                            {portfolio.name}
                          </h3>
                          <p className="text-sm text-slate-600">
                            Template criativo para influenciadores
                          </p>
                        </div>
                        {selectedPortfolio === portfolio.id && (
                          <div className="absolute top-2 right-2 z-10">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                              <svg
                                className="w-4 h-4 text-white"
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
                    ))}
                </div>
              </TabsContent>
            </Tabs>

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
