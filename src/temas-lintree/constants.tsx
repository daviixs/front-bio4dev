
import React from 'react';
import { ProfileData } from './types';

export const PROFILES: ProfileData[] = [
  {
    id: 'athlete',
    themeName: 'Esportista',
    name: "Leo 'Relâmpago' Silva",
    bio: "Corredor de Ultra Maratona | Embaixador Nike | focado em superar limites 🏃‍♂️⚡️",
    photoUrl: "https://picsum.photos/seed/athlete/300/300",
    backgroundStyle: "bg-gradient-to-br from-blue-900 via-slate-800 to-black",
    buttonStyle: "bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-xl transition-all duration-300",
    textColor: "text-white",
    accentColor: "bg-blue-500",
    socials: [
      { platform: 'instagram', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'youtube', url: '#' }
    ],
    buttons: [
      { label: "Meu Plano de Treinamento", url: "#", subtext: "Aprenda como comecei" },
      { label: "Loja Oficial - Equipamentos", url: "#" },
      { label: "Resultados da Última Prova", url: "#", subtext: "1º Lugar Maratona SP 2024" },
      { label: "Palestras & Mentoria", url: "#" }
    ]
  },
  {
    id: 'artist',
    themeName: 'Artista Musical',
    name: "Luna Noir",
    bio: "Cantora Indie Pop. Criando universos sonoros no meu quarto. 🌙✨",
    photoUrl: "https://picsum.photos/seed/artist/300/300",
    backgroundStyle: "bg-[url('https://picsum.photos/seed/night/800/1200')] bg-cover bg-center",
    buttonStyle: "bg-black/60 hover:bg-black/80 border border-purple-500/50 rounded-full transition-all duration-300",
    textColor: "text-white",
    accentColor: "bg-purple-600",
    socials: [
      { platform: 'spotify', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'tiktok', url: '#' }
    ],
    buttons: [
      { label: "Ouça 'Midnight Sun' no Spotify", url: "#", subtext: "Single novo já disponível!" },
      { label: "Ingressos Tour Europa 2025", url: "#" },
      { label: "Merch Exclusivo", url: "#" },
      { label: "Assine a Newsletter", url: "#" }
    ]
  },
  {
    id: 'creator',
    themeName: 'Criador de Conteúdo',
    name: "TechWithTati",
    bio: "Reviews de Gadgets, Setup Wars e a vida de uma dev nômade. 💻✈️",
    photoUrl: "https://picsum.photos/seed/tech/300/300",
    backgroundStyle: "bg-slate-50",
    buttonStyle: "bg-white hover:shadow-lg border border-slate-200 text-slate-800 rounded-2xl transition-all duration-300",
    textColor: "text-slate-900",
    accentColor: "bg-indigo-500",
    socials: [
      { platform: 'youtube', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'instagram', url: '#' }
    ],
    buttons: [
      { label: "Meu Canal no YouTube", url: "#", subtext: "Vídeos novos toda terça e quinta" },
      { label: "Meu Setup (Peças & Links)", url: "#" },
      { label: "Comunidade no Discord", url: "#", subtext: "Mais de 10k membros" },
      { label: "Cursos de Programação", url: "#" },
      { label: "Trabalhe Comigo", url: "#" }
    ]
  },
  {
    id: 'business',
    themeName: 'Pequeno Negócio',
    name: "Padaria da Villa",
    bio: "Pães artesanais, fermentação natural e o melhor café do bairro. 🥐☕️",
    photoUrl: "https://picsum.photos/seed/bakery/300/300",
    backgroundStyle: "bg-[#FDF6EC]",
    buttonStyle: "bg-[#7B3F00] hover:bg-[#5D2E00] text-white rounded-lg shadow-md transition-all duration-300",
    textColor: "text-[#4A2C2A]",
    accentColor: "bg-[#7B3F00]",
    socials: [
      { platform: 'whatsapp', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'facebook', url: '#' }
    ],
    buttons: [
      { label: "Peça via WhatsApp", url: "#", subtext: "Entregas das 08h às 18h" },
      { label: "Cardápio da Semana", url: "#" },
      { label: "Clube da Assinatura (Pães)", url: "#" },
      { label: "Veja as Avaliações", url: "#" }
    ]
  },
  {
    id: 'activist',
    themeName: 'Ativista/Educador',
    name: "Prof. Gabriel Sustentável",
    bio: "Educador ambiental. Vamos transformar nossa comunidade juntos. 🌱✊",
    photoUrl: "https://picsum.photos/seed/nature/300/300",
    backgroundStyle: "bg-emerald-50",
    buttonStyle: "bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-all duration-300",
    textColor: "text-emerald-900",
    accentColor: "bg-emerald-600",
    socials: [
      { platform: 'instagram', url: '#' },
      { platform: 'linkedin', url: '#' },
      { platform: 'youtube', url: '#' }
    ],
    buttons: [
      { label: "Curso Grátis: Horta Urbana", url: "#", subtext: "Vagas abertas para o próximo mês" },
      { label: "Guia de Reciclagem PDF", url: "#" },
      { label: "Apoie o Projeto Comunitário", url: "#", subtext: "Contribua com o Jardim Coletivo" },
      { label: "Próximos Eventos", url: "#" }
    ]
  }
];
