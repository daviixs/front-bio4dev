import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Layout, Share2, ArrowRight, Code2, Palette, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingPage() {
  const features = [
    {
      icon: <Layout className="w-8 h-8" />,
      title: '3 Templates Únicos',
      description: 'Escolha entre templates modernos e profissionais para destacar seu trabalho.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Setup em Minutos',
      description: 'Crie seu portfólio completo em poucos minutos com nosso wizard intuitivo.',
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Link Personalizado',
      description: 'Compartilhe seu perfil com um link único: bio4dev.com/seuusername',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Crie sua conta',
      description: 'Cadastre-se gratuitamente em segundos.',
    },
    {
      step: '02',
      title: 'Configure seu perfil',
      description: 'Adicione suas informações, projetos e redes sociais.',
    },
    {
      step: '03',
      title: 'Escolha seu template',
      description: 'Selecione o visual que mais combina com você.',
    },
    {
      step: '04',
      title: 'Compartilhe',
      description: 'Seu portfólio está pronto para o mundo!',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">Bio4Dev</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/70">A nova forma de mostrar seu trabalho</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Seu portfólio
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              em minutos
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            Crie uma página de bio profissional para desenvolvedores. 
            Destaque seus projetos, skills e redes sociais em um só lugar.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105">
                Criar Meu Portfólio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                Ver Demo
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '500+', label: 'Devs usando' },
              { value: '3', label: 'Templates' },
              { value: '100%', label: 'Gratuito' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Por que Bio4Dev?
              </span>
            </h2>
            <p className="text-xl text-white/40">
              Tudo que você precisa para impressionar recrutadores e clientes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/50">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Como funciona
              </span>
            </h2>
            <p className="text-xl text-white/40">
              4 passos simples para ter seu portfólio online
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Templates Exclusivos
              </span>
            </h2>
            <p className="text-xl text-white/40">
              Designs modernos para cada estilo de desenvolvedor
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Minimal', gradient: 'from-slate-500 to-slate-700', icon: <Palette className="w-8 h-8" /> },
              { name: 'Neon', gradient: 'from-emerald-500 to-cyan-500', icon: <Zap className="w-8 h-8" /> },
              { name: 'Creative', gradient: 'from-purple-500 to-pink-500', icon: <Rocket className="w-8 h-8" /> },
            ].map((template, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="absolute inset-0 bg-[#0a0a0f]/80" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${template.gradient} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {template.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                  <p className="text-white/50 text-sm">Template {i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Pronto para começar?
                </span>
              </h2>
              <p className="text-xl text-white/50 mb-8">
                Crie seu portfólio profissional agora mesmo. É grátis!
              </p>
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold px-12 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105">
                  Criar Minha Conta Grátis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-black" />
            </div>
            <span className="font-semibold">Bio4Dev</span>
          </div>
          <p className="text-white/40 text-sm">
            © 2025 Bio4Dev. Feito com 💚 para desenvolvedores.
          </p>
        </div>
      </footer>
    </div>
  );
}

