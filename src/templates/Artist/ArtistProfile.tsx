
import React from 'react';
import { Music, Instagram, Video, Disc } from 'lucide-react';

const ArtistProfile: React.FC = () => {
  const links = [
    { label: "Ouça 'Midnight Sun' no Spotify", sub: "Novo Single" },
    { label: "Ingressos Tour Europa 2025", sub: "Vendas Abertas" },
    { label: "Merch Exclusivo", sub: "Limited Edition" },
    { label: "Assine a Newsletter", sub: "Conteúdo VIP" }
  ];

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-zinc-100 flex flex-col items-center p-8 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="mt-12 mb-6">
          <img 
            src="https://picsum.photos/seed/artist/300/300" 
            className="w-28 h-28 rounded-full grayscale hover:grayscale-0 transition-all duration-700 object-cover border border-zinc-700"
            alt="Artist"
          />
        </div>

        <h1 className="text-3xl font-light tracking-[0.2em] uppercase">Luna Noir</h1>
        <div className="h-[1px] w-12 bg-purple-500 my-4"></div>
        <p className="text-xs text-zinc-400 text-center tracking-wider italic">
          Cantora Indie Pop. Criando universos sonoros no meu quarto. 🌙✨
        </p>

        <div className="w-full flex flex-col gap-4 mt-12">
          {links.map((link, i) => (
            <button key={i} className="w-full border border-zinc-700 hover:border-purple-500 hover:bg-zinc-800 transition-all py-4 px-6 rounded-full flex justify-between items-center group">
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium tracking-tight">{link.label}</span>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest">{link.sub}</span>
              </div>
              <Disc size={16} className="text-zinc-600 group-hover:text-purple-500 group-hover:rotate-180 transition-all duration-500" />
            </button>
          ))}
        </div>

        <div className="flex gap-8 mt-14">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Music size={20} /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Video size={20} /></a>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
