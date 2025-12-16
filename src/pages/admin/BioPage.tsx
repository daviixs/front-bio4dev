import { useState } from "react";
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
import { Plus, Edit2, LayoutTemplate, Trash2, ExternalLink } from "lucide-react";
import { cn } from "@/components/ui/utils";
import { toast } from "sonner";
import portfolio1Image from "@/bio-exempleimages/Portifolio 1.png";
import portfolio2Image from "@/bio-exempleimages/Portifolio 2.png";
import portfolio3Image from "@/bio-exempleimages/Portifolio 3.png";

const bios = [
  {
    id: "1",
    name: "Main Portfolio",
    template: "Minimalist Dev",
    status: "Published",
    lastUpdated: "2 hours ago",
    url: "dev.bio/alex",
  },
  {
    id: "2",
    name: "Freelance Landing",
    template: "Creative Agency",
    status: "Draft",
    lastUpdated: "2 days ago",
    url: "dev.bio/alex-freelance",
  },
  {
    id: "3",
    name: "Photography Hobby",
    template: "Visual Grid",
    status: "Published",
    lastUpdated: "1 week ago",
    url: "dev.bio/alex-photos",
  },
];

const portfolioExamples = [
  { id: 1, name: "Portfólio 1", image: portfolio1Image },
  { id: 2, name: "Portfólio 2", image: portfolio2Image },
  { id: 3, name: "Portfólio 3", image: portfolio3Image },
];

export default function BioPage() {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createBioDialogOpen, setCreateBioDialogOpen] = useState(false);
  const [selectedBio, setSelectedBio] = useState<typeof bios[0] | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<number | null>(null);

  const handleDeleteClick = (bio: typeof bios[0]) => {
    setSelectedBio(bio);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (bio: typeof bios[0]) => {
    setSelectedBio(bio);
    setEditDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedBio) {
      // Aqui você pode adicionar a lógica de deletar
      toast.success(`Bio "${selectedBio.name}" deletada com sucesso!`);
      setDeleteDialogOpen(false);
      setSelectedBio(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">My Bios</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your portfolio pages and templates.</p>
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
            <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="min-w-[200px] sm:w-[300px]">Bio Name</TableHead>
                <TableHead className="min-w-[120px]">Template</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Last Updated</TableHead>
                <TableHead className="text-right min-w-[140px] sm:min-w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bios.map((bio) => (
                <TableRow key={bio.id} className="group">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="text-base text-slate-900">{bio.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        {bio.url}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded bg-slate-100 border flex items-center justify-center">
                        <LayoutTemplate className="h-3 w-3 text-slate-500" />
                      </div>
                      <span className="text-sm text-slate-700">{bio.template}</span>
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
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja deletar a bio <strong>"{selectedBio?.name}"</strong>? 
                Esta ação não pode ser desfeita e todos os dados relacionados serão permanentemente removidos.
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

        {/* Edit Preview Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview - {selectedBio?.name}</DialogTitle>
              <DialogDescription>
                Visualize e edite sua bio. As alterações serão salvas automaticamente.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {/* Área preparada para o preview - você pode inserir o conteúdo aqui */}
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
                <LayoutTemplate className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 font-medium mb-2">Preview da Bio</p>
                <p className="text-sm text-slate-500">
                  Área preparada para inserir o preview da página bio
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Bio selecionada: <strong>{selectedBio?.name}</strong>
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create New Bio - Portfolio Selection Dialog */}
        <Dialog open={createBioDialogOpen} onOpenChange={setCreateBioDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Selecione um Portfólio</DialogTitle>
              <DialogDescription>
                Escolha um dos modelos de portfólio abaixo para começar. Você pode personalizar depois.
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
                        <p className="text-lg font-semibold text-slate-700">{portfolio.name}</p>
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
                  onClick={() => {
                    if (selectedPortfolio) {
                      // Redirecionar para a página de edição do portfólio
                      navigate(`/dashboard/portfolio/${selectedPortfolio}`);
                      setCreateBioDialogOpen(false);
                      setSelectedPortfolio(null);
                    } else {
                      toast.error("Por favor, selecione um portfólio");
                    }
                  }}
                  disabled={!selectedPortfolio}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Criar Bio
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}
