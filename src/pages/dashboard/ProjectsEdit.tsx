import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Loader2, ExternalLink, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useProfileStore } from '@/stores/profileStore';
import type { Projeto } from '@/types';
import { toast } from 'sonner';

export function ProjectsEdit() {
  const { profile, createProjeto, updateProjeto, deleteProjeto } = useProfileStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Projeto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    gif: '',
  });

  const resetForm = () => {
    setFormData({ nome: '', descricao: '', gif: '' });
    setEditingProject(null);
  };

  const openNewDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (projeto: Projeto) => {
    setEditingProject(projeto);
    setFormData({
      nome: projeto.nome,
      descricao: projeto.descricao,
      gif: projeto.gif,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.descricao) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);
    try {
      if (editingProject) {
        await updateProjeto(editingProject.id, formData);
        toast.success('Projeto atualizado!');
      } else {
        await createProjeto({
          profileId: profile!.id,
          ...formData,
        });
        toast.success('Projeto criado!');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Erro ao salvar projeto');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
    
    try {
      await deleteProjeto(id);
      toast.success('Projeto excluído!');
    } catch (error) {
      toast.error('Erro ao excluir projeto');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Projetos</h1>
          <p className="text-white/50">Gerencie seus projetos em destaque</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openNewDialog}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Projeto
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-[#0f0f17] border-white/10 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label className="text-white/70">Nome do Projeto *</Label>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: E-commerce App"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/70">URL do GIF/Imagem</Label>
                <Input
                  value={formData.gif}
                  onChange={(e) => setFormData({ ...formData, gif: e.target.value })}
                  placeholder="https://exemplo.com/preview.gif"
                  className="bg-white/5 border-white/10 text-white"
                />
                {formData.gif && (
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-white/5">
                    <img
                      src={formData.gif}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/70">Descrição *</Label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva seu projeto..."
                  rows={4}
                  className="bg-white/5 border-white/10 text-white resize-none"
                />
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

      {/* Projects List */}
      {profile?.projetos && profile.projetos.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {profile.projetos.map((projeto) => (
            <div
              key={projeto.id}
              className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all group"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 overflow-hidden">
                {projeto.gif ? (
                  <img
                    src={projeto.gif}
                    alt={projeto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <Briefcase className="w-16 h-16" />
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{projeto.nome}</h3>
                <p className="text-white/50 text-sm line-clamp-2 mb-4">
                  {projeto.descricao}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(projeto)}
                    className="flex-1 border-white/10 text-white hover:bg-white/10"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(projeto.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10">
          <Briefcase className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum projeto ainda</h3>
          <p className="text-white/50 mb-6">
            Adicione seus projetos para mostrar no portfólio
          </p>
          <Button
            onClick={openNewDialog}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Primeiro Projeto
          </Button>
        </div>
      )}
    </div>
  );
}

