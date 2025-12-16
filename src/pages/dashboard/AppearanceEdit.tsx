import React, { useState } from 'react';
import { Save, Loader2, Palette, Zap, Rocket, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfileStore } from '@/stores/profileStore';
import { toast } from 'sonner';

const templates = [
  {
    id: 'template_01',
    name: 'Minimal',
    description: 'Design limpo e profissional com foco no conteúdo',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-slate-500 to-slate-700',
    preview: 'bg-gradient-to-br from-slate-900 to-slate-800',
    features: ['Layout clean', 'Tipografia elegante', 'Cores neutras'],
  },
  {
    id: 'template_02',
    name: 'Neon',
    description: 'Moderno e vibrante com cores neon e gradientes',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-cyan-500',
    preview: 'bg-gradient-to-br from-[#0a0a0f] to-[#0f1419]',
    features: ['Gradientes neon', 'Animações suaves', 'Visual tech'],
  },
  {
    id: 'template_03',
    name: 'Creative',
    description: 'Criativo e único com elementos visuais marcantes',
    icon: <Rocket className="w-6 h-6" />,
    gradient: 'from-purple-500 to-pink-500',
    preview: 'bg-gradient-to-br from-purple-900/50 to-pink-900/50',
    features: ['Design bold', 'Cores vibrantes', 'Estilo artístico'],
  },
] as const;

export function AppearanceEdit() {
  const { profile, updateProfile } = useProfileStore();
  const [selectedTemplate, setSelectedTemplate] = useState(profile?.templateType || 'template_02');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!profile?.id) return;

    setIsLoading(true);
    try {
      await updateProfile(profile.id, { templateType: selectedTemplate as any });
      toast.success('Template atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar template');
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = selectedTemplate !== profile?.templateType;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Aparência</h1>
          <p className="text-white/50">Escolha o template do seu portfólio</p>
        </div>
        
        <Button
          onClick={handleSave}
          disabled={isLoading || !hasChanges}
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

      {/* Templates Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          
          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`relative text-left rounded-2xl overflow-hidden border-2 transition-all ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Selection Badge */}
              {isSelected && (
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-black" />
                </div>
              )}
              
              {/* Preview Area */}
              <div className={`h-48 ${template.preview} p-6 relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                {/* Template Icon */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br ${template.gradient} flex items-center justify-center text-white opacity-80`}>
                  {template.icon}
                </div>
              </div>
              
              {/* Info */}
              <div className="p-6 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.gradient} flex items-center justify-center text-white`}>
                    {template.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-xs text-white/50">Template</p>
                  </div>
                </div>
                
                <p className="text-sm text-white/60 mb-4">
                  {template.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Template Info */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${templates.find(t => t.id === profile?.templateType)?.gradient || 'from-emerald-500 to-cyan-500'} flex items-center justify-center text-white`}>
            {templates.find(t => t.id === profile?.templateType)?.icon || <Zap className="w-7 h-7" />}
          </div>
          <div>
            <p className="text-sm text-white/50">Template atual</p>
            <p className="text-lg font-semibold">
              {templates.find(t => t.id === profile?.templateType)?.name || 'Neon'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

