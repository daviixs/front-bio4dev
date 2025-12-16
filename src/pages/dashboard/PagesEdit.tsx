import React, { useState } from 'react';
import { Plus, Trash2, Save, Loader2, FileText, GripVertical, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useProfileStore } from '@/stores/profileStore';
import type { Page } from '@/types';
import { toast } from 'sonner';

export function PagesEdit() {
  const { profile, createPage, updatePage, deletePage } = useProfileStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
  });

  const resetForm = () => {
    setFormData({ titulo: '', slug: '' });
    setEditingPage(null);
  };

  const openNewDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (page: Page) => {
    setEditingPage(page);
    setFormData({
      titulo: page.titulo,
      slug: page.slug,
    });
    setIsDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titulo = e.target.value;
    setFormData({
      titulo,
      slug: generateSlug(titulo),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.slug) {
      toast.error('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    try {
      if (editingPage) {
        await updatePage(editingPage.id, formData);
        toast.success('Página atualizada!');
      } else {
        await createPage({
          profileId: profile!.id,
          ...formData,
          ordem: (profile?.pages?.length || 0) + 1,
        });
        toast.success('Página criada!');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Erro ao salvar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta página?')) return;
    
    try {
      await deletePage(id);
      toast.success('Página excluída!');
    } catch (error) {
      toast.error('Erro ao excluir');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Páginas</h1>
          <p className="text-white/50">Gerencie as páginas do seu portfólio</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openNewDialog}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Página
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-[#0f0f17] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingPage ? 'Editar Página' : 'Nova Página'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label className="text-white/70">Título da Página</Label>
                <Input
                  value={formData.titulo}
                  onChange={handleTitleChange}
                  placeholder="Ex: Sobre Mim"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/70">Slug (URL)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-sm">/</span>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="sobre-mim"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <p className="text-xs text-white/40">
                  URL: /{profile?.username}/{formData.slug || 'slug'}
                </p>
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

      {/* Info Box */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <p className="text-sm text-emerald-400">
          💡 As páginas são seções do seu portfólio. Use-as para organizar conteúdo como "Sobre Mim", "Projetos", "Contato", etc.
        </p>
      </div>

      {/* Pages List */}
      {profile?.pages && profile.pages.length > 0 ? (
        <div className="space-y-3">
          {profile.pages
            .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
            .map((page, index) => (
              <div
                key={page.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="text-white/30 cursor-move">
                  <GripVertical className="w-5 h-5" />
                </div>
                
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/50 font-medium">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{page.titulo}</p>
                  <p className="text-sm text-white/50 flex items-center gap-1">
                    <span className="text-emerald-400">/{profile.username}/</span>
                    {page.slug}
                  </p>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(page)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(page.id)}
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
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhuma página ainda</h3>
          <p className="text-white/50 mb-6">
            Crie páginas para organizar seu portfólio
          </p>
          <Button
            onClick={openNewDialog}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Criar Primeira Página
          </Button>
        </div>
      )}
    </div>
  );
}

