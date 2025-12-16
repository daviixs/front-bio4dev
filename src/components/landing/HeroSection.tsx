import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mockupImage from '@/landingpage-images/mockup-portrait.png';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles className="h-4 w-4" />
              Crie seu portfólio em minutos
            </div>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Seu portfólio de{' '}
              <span className="text-blue-600">desenvolvedor</span> em um só lugar
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 lg:text-lg">
              Crie uma página de bio profissional para mostrar seus projetos, 
              tecnologias e redes sociais. Escolha entre templates modernos e 
              personalize tudo do seu jeito. Sua URL única: bio4dev.com/seuusername
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-blue-600 px-8 py-6 text-lg font-bold text-white hover:bg-blue-700"
                >
                  Criar Meu Portfólio
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <span className="font-medium">Conecte suas redes:</span>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5" />
                <Linkedin className="h-5 w-5" />
                <Instagram className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Hero Image / Phone Mockup */}
          <div className="relative flex items-center justify-center">
            {/* Decorative circles */}
            <div className="absolute h-[350px] w-[350px] rounded-full border-[5px] border-blue-500 opacity-20 lg:h-[550px] lg:w-[550px]" />
            <div className="absolute h-[280px] w-[280px] rounded-full border-2 border-blue-500 opacity-30 lg:h-[468px] lg:w-[468px]" />
            
            {/* Phone Mockup Image */}
            <div className="relative z-10">
              <img 
                src={mockupImage} 
                alt="Preview do template Bio4Dev em um iPhone"
                className="h-[500px] w-auto drop-shadow-2xl lg:h-[700px]"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -right-4 top-20 h-6 w-6 rounded-full bg-blue-500 lg:-right-8 lg:h-8 lg:w-8" />
            <div className="absolute -left-4 bottom-40 h-4 w-4 rounded-full bg-purple-500 lg:-left-8 lg:h-6 lg:w-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

