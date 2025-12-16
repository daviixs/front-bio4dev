import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  User, 
  Share2, 
  Briefcase, 
  FileText,
  ArrowRight, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Image,
  Github,
  Instagram,
  Youtube,
  Plus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { legendaApi, configApi, socialApi, projetosApi, pagesApi, profileApi } from '@/lib/api';
import { toast } from 'sonner';

interface LegendaData {
  legendaFoto: string;
  nome: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
}

interface SocialData {
  plataforma: 'instagram' | 'tiktok' | 'youtube' | 'github';
  url: string;
  ordem: number;
}

interface ProjetoData {
  nome: string;
  descricao: string;
  gif: string;
}

interface PageData {
  titulo: string;
  slug: string;
  ordem: number;
}

const steps = [
  { id: 1, title: 'Informações', icon: User },
  { id: 2, title: 'Redes Sociais', icon: Share2 },
  { id: 3, title: 'Projetos', icon: Briefcase },
  { id: 4, title: 'Páginas', icon: FileText },
];

const defaultLegenda: LegendaData = {
  legendaFoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  nome: 'Seu Nome',
  titulo: 'Desenvolvedor Full Stack',
  subtitulo: 'Apaixonado por tecnologia e inovação',
  descricao: 'Crie sua bio personalizada e mostre seus projetos ao mundo! Edite essas informações para contar sua história.',
};

const defaultSocials: SocialData[] = [
  { plataforma: 'github', url: 'https://github.com/', ordem: 1 },
  { plataforma: 'instagram', url: 'https://instagram.com/', ordem: 2 },
];

const defaultProjetos: ProjetoData[] = [
  {
    nome: 'Projeto Exemplo',
    descricao: 'Descrição do seu projeto incrível',
    gif: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
  },
];

const defaultPages: PageData[] = [
  { titulo: 'Sobre Mim', slug: 'sobre', ordem: 1 },
  { titulo: 'Projetos', slug: 'projetos', ordem: 2 },
];

const socialIcons = {
  github: Github,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
};

export function SetupWizardPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [legenda, setLegenda] = useState<LegendaData>(defaultLegenda);
  const [socials, setSocials] = useState<SocialData[]>(defaultSocials);
  const [projetos, setProjetos] = useState<ProjetoData[]>(defaultProjetos);
  const [pages, setPages] = useState<PageData[]>(defaultPages);
  const [config] = useState({ stacks: 8, projetos: 5 });

  const profileId = localStorage.getItem('bio4dev_profile_id');

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    if (!profileId) {
      toast.error('Perfil não encontrado. Crie um perfil primeiro.');
      navigate('/profile/create');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Criar legenda
      await legendaApi.create({
        profileId,
        ...legenda,
      });

      // 2. Criar config
      await configApi.create({
        profileId,
        stacks: config.stacks,
        projetos: config.projetos,
      });

      // 3. Criar redes sociais
      for (const social of socials) {
        if (social.url) {
          await socialApi.create({
            profileId,
            ...social,
          });
        }
      }

      // 4. Criar projetos
      for (const projeto of projetos) {
        if (projeto.nome && projeto.descricao) {
          await projetosApi.create({
            profileId,
            ...projeto,
          });
        }
      }

      // 5. Criar páginas
      for (const page of pages) {
        if (page.titulo && page.slug) {
          await pagesApi.create({
            profileId,
            ...page,
          });
        }
      }

      // 6. Marcar perfil como publicado
      await profileApi.update(profileId, { published: true });

      toast.success('Seu portfólio está pronto! 🎉');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao configurar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  // Add/Remove functions
  const addSocial = () => {
    setSocials([...socials, { plataforma: 'github', url: '', ordem: socials.length + 1 }]);
  };

  const removeSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  const addProjeto = () => {
    setProjetos([...projetos, { nome: '', descricao: '', gif: '' }]);
  };

  const removeProjeto = (index: number) => {
    setProjetos(projetos.filter((_, i) => i !== index));
  };

  const addPage = () => {
    setPages([...pages, { titulo: '', slug: '', ordem: pages.length + 1 }]);
  };

  const removePage = (index: number) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-8 px-6">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Code2 className="w-7 h-7 text-black" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Configure seu portfólio</h1>
          <p className="text-white/50">Preencha as informações abaixo</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isCompleted
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-white/5 text-white/30'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-white/10'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 mb-8">
          {/* Step 1: Informações Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white/70">URL da Foto</Label>
                  <Input
                    value={legenda.legendaFoto}
                    onChange={(e) => setLegenda({ ...legenda, legendaFoto: e.target.value })}
                    placeholder="https://exemplo.com/foto.jpg"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white/70">Nome</Label>
                  <Input
                    value={legenda.nome}
                    onChange={(e) => setLegenda({ ...legenda, nome: e.target.value })}
                    placeholder="Seu nome completo"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white/70">Título</Label>
                  <Input
                    value={legenda.titulo}
                    onChange={(e) => setLegenda({ ...legenda, titulo: e.target.value })}
                    placeholder="Ex: Desenvolvedor Full Stack"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white/70">Subtítulo</Label>
                  <Input
                    value={legenda.subtitulo}
                    onChange={(e) => setLegenda({ ...legenda, subtitulo: e.target.value })}
                    placeholder="Ex: Especialista em Node.js"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white/70">Descrição</Label>
                <Textarea
                  value={legenda.descricao}
                  onChange={(e) => setLegenda({ ...legenda, descricao: e.target.value })}
                  placeholder="Conte um pouco sobre você..."
                  rows={4}
                  className="bg-white/5 border-white/10 text-white resize-none"
                />
              </div>

              {/* Preview */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10">
                    {legenda.legendaFoto && (
                      <img src={legenda.legendaFoto} alt="Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{legenda.nome || 'Seu Nome'}</h3>
                    <p className="text-emerald-400 text-sm">{legenda.titulo || 'Título'}</p>
                    <p className="text-white/50 text-sm">{legenda.subtitulo || 'Subtítulo'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Redes Sociais */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Redes Sociais</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSocial}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              
              <div className="space-y-4">
                {socials.map((social, index) => {
                  const Icon = socialIcons[social.plataforma];
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                        <Icon />
                      </div>
                      
                      <Select
                        value={social.plataforma}
                        onValueChange={(value: any) => {
                          const newSocials = [...socials];
                          newSocials[index].plataforma = value;
                          setSocials(newSocials);
                        }}
                      >
                        <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="github">GitHub</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Input
                        value={social.url}
                        onChange={(e) => {
                          const newSocials = [...socials];
                          newSocials[index].url = e.target.value;
                          setSocials(newSocials);
                        }}
                        placeholder="URL do perfil"
                        className="flex-1 bg-white/5 border-white/10 text-white"
                      />
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSocial(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Projetos */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Projetos em Destaque</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addProjeto}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              
              <div className="space-y-6">
                {projetos.map((projeto, index) => (
                  <div key={index} className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Projeto {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProjeto(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        value={projeto.nome}
                        onChange={(e) => {
                          const newProjetos = [...projetos];
                          newProjetos[index].nome = e.target.value;
                          setProjetos(newProjetos);
                        }}
                        placeholder="Nome do projeto"
                        className="bg-white/5 border-white/10 text-white"
                      />
                      
                      <Input
                        value={projeto.gif}
                        onChange={(e) => {
                          const newProjetos = [...projetos];
                          newProjetos[index].gif = e.target.value;
                          setProjetos(newProjetos);
                        }}
                        placeholder="URL do GIF/Imagem"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    
                    <Textarea
                      value={projeto.descricao}
                      onChange={(e) => {
                        const newProjetos = [...projetos];
                        newProjetos[index].descricao = e.target.value;
                        setProjetos(newProjetos);
                      }}
                      placeholder="Descrição do projeto..."
                      rows={2}
                      className="bg-white/5 border-white/10 text-white resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Páginas */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Páginas do Menu</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPage}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              
              <div className="space-y-4">
                {pages.map((page, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/50 font-medium">
                      {index + 1}
                    </div>
                    
                    <Input
                      value={page.titulo}
                      onChange={(e) => {
                        const newPages = [...pages];
                        newPages[index].titulo = e.target.value;
                        // Auto-generate slug
                        newPages[index].slug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        setPages(newPages);
                      }}
                      placeholder="Título da página"
                      className="flex-1 bg-white/5 border-white/10 text-white"
                    />
                    
                    <Input
                      value={page.slug}
                      onChange={(e) => {
                        const newPages = [...pages];
                        newPages[index].slug = e.target.value;
                        setPages(newPages);
                      }}
                      placeholder="slug"
                      className="w-32 bg-white/5 border-white/10 text-white"
                    />
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePage(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="border-white/10 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleFinish}
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Finalizar
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

