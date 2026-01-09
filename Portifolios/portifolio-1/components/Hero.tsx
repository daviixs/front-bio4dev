import React from 'react';
import { Legenda, Profile } from '@/types';

interface HeroProps {
  profile?: Profile;
  legenda?: Legenda;
}

export function Hero({ profile, legenda }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Imagem de Perfil */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src={legenda?.legendaFoto || profile?.avatarUrl || "https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQ5MjIxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"}
              alt={legenda?.nome || "Desenvolvedor"}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
          </div>
        </div>

        {/* Saudação */}
        <p className="text-blue-600 mb-4">{legenda?.greeting || "Olá, eu sou"}</p>

        {/* Nome */}
        <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {legenda?.nome || "João Silva"}
        </h1>

        {/* Frase de apresentação */}
        <p className="text-2xl md:text-3xl text-gray-700 mb-8">
          {legenda?.titulo || "Eu construo coisas para web"}
        </p>

        {/* Descrição adicional */}
        <p className="max-w-2xl mx-auto text-gray-600 mb-10">
          {legenda?.descricao || "Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis. Especializado em transformar ideias em aplicações web modernas e funcionais."}
        </p>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projetos"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  );
}
