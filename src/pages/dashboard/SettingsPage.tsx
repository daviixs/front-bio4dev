import React, { useState } from 'react';
import { Save, Loader2, Eye, EyeOff, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useProfileStore } from '@/stores/profileStore';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function SettingsPage() {
  const navigate = useNavigate();
  const { profile, updateProfile, updateConfig } = useProfileStore();
  const { logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [settings, setSettings] = useState({
    published: profile?.published || false,
    stacks: profile?.config?.stacks || 8,
    projetos: profile?.config?.projetos || 5,
  });

  const handlePublishToggle = async () => {
    if (!profile?.id) return;
    
    const newPublished = !settings.published;
    setSettings({ ...settings, published: newPublished });
    
    try {
      await updateProfile(profile.id, { published: newPublished });
      toast.success(newPublished ? 'Portfólio publicado!' : 'Portfólio despublicado');
    } catch (error) {
      setSettings({ ...settings, published: !newPublished });
      toast.error('Erro ao atualizar');
    }
  };

  const handleSaveConfig = async () => {
    if (!profile?.config?.id) return;
    
    setIsLoading(true);
    try {
      await updateConfig(profile.config.id, {
        stacks: settings.stacks,
        projetos: settings.projetos,
      });
      toast.success('Configurações salvas!');
    } catch (error) {
      toast.error('Erro ao salvar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Aqui deveria chamar uma API para deletar a conta
    // Por enquanto, apenas faz logout
    logout();
    navigate('/');
    toast.success('Conta deletada');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Configurações</h1>
        <p className="text-white/50">Gerencie as configurações do seu portfólio</p>
      </div>

      {/* Visibility Settings */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          {settings.published ? (
            <Eye className="w-5 h-5 text-emerald-400" />
          ) : (
            <EyeOff className="w-5 h-5 text-yellow-400" />
          )}
          Visibilidade
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Portfólio Público</p>
            <p className="text-sm text-white/50">
              {settings.published
                ? 'Seu portfólio está visível para todos'
                : 'Seu portfólio está oculto'}
            </p>
          </div>
          <Switch
            checked={settings.published}
            onCheckedChange={handlePublishToggle}
          />
        </div>
        
        {!settings.published && (
          <div className="mt-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-sm text-yellow-400">
              ⚠️ Seu portfólio não está visível publicamente. Ative para que outros possam ver.
            </p>
          </div>
        )}
      </div>

      {/* Stats Config */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold mb-4">Estatísticas Exibidas</h2>
        <p className="text-sm text-white/50 mb-6">
          Configure os números que aparecem na seção de estatísticas do seu portfólio
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-white/70">Quantidade de Stacks</Label>
            <Input
              type="number"
              value={settings.stacks}
              onChange={(e) => setSettings({ ...settings, stacks: parseInt(e.target.value) || 0 })}
              min={0}
              max={100}
              className="bg-white/5 border-white/10 text-white"
            />
            <p className="text-xs text-white/40">
              Número de tecnologias que você domina
            </p>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white/70">Quantidade de Projetos</Label>
            <Input
              type="number"
              value={settings.projetos}
              onChange={(e) => setSettings({ ...settings, projetos: parseInt(e.target.value) || 0 })}
              min={0}
              max={100}
              className="bg-white/5 border-white/10 text-white"
            />
            <p className="text-xs text-white/40">
              Número total de projetos realizados
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSaveConfig}
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
      </div>

      {/* Profile URL */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h2 className="text-lg font-semibold mb-4">URL do Perfil</h2>
        
        <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
          <span className="text-white/50">{window.location.origin}/</span>
          <span className="text-emerald-400 font-mono">{profile?.username}</span>
        </div>
        
        <p className="text-xs text-white/40 mt-2">
          O username não pode ser alterado após a criação
        </p>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
        <h2 className="text-lg font-semibold mb-4 text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Zona de Perigo
        </h2>
        
        <p className="text-sm text-white/50 mb-6">
          Ações irreversíveis. Tenha cuidado ao executar.
        </p>
        
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Deletar Conta
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-[#0f0f17] border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Deletar Conta
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <p className="text-white/70">
                Tem certeza que deseja deletar sua conta? Esta ação é irreversível e todos os seus dados serão perdidos.
              </p>
              
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">
                  ⚠️ Seu perfil, projetos, redes sociais e todas as configurações serão deletados permanentemente.
                </p>
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Sim, Deletar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

