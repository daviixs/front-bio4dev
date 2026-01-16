
import React from 'react';
import { Instagram, Globe, ShoppingCart, Cpu, Radio, Zap, Box } from 'lucide-react';

const InnovationProfile: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#00F0FF] flex flex-col items-center p-8 font-mono">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header com efeito de moldura digital */}
        <div className="mt-12 mb-8 relative">
          <div className="absolute inset-0 border border-[#00F0FF] scale-110 opacity-30 animate-pulse"></div>
          <img 
            src="https://picsum.photos/seed/cyber-vision/300/300" 
            className="w-28 h-28 object-cover border-2 border-[#00F0FF] relative z-10"
            alt="Nova Lab"
          />
        </div>

        <h1 className="text-xl font-black uppercase tracking-[0.3em] text-center">NOVA_LAB.v3</h1>
        <p className="text-[10px] text-[#00F0FF]/70 text-center mt-4 uppercase tracking-widest max-w-[240px] leading-relaxed">
          Design solar e interfaces orgânicas para o futuro do dia a dia.
        </p>

        {/* Botões Estilo Terminal */}
        <div className="w-full flex flex-col gap-4 mt-12">
          <button className="w-full bg-transparent border border-[#00F0FF]/40 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all p-4 flex items-center justify-between group">
            <span className="font-bold uppercase text-xs tracking-tighter">Ver Loja Digital</span>
            <ShoppingCart size={16} />
          </button>

          <button className="w-full bg-transparent border border-[#00F0FF]/40 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all p-4 flex items-center justify-between group">
            <span className="font-bold uppercase text-xs tracking-tighter">Conheça o Projeto</span>
            <Cpu size={16} />
          </button>

          <button className="w-full bg-[#00F0FF] text-black p-4 flex items-center justify-between hover:scale-[1.02] transition-transform">
            <span className="font-black uppercase text-xs tracking-tighter">Compre Agora</span>
            <Zap size={16} fill="currentColor" />
          </button>
        </div>

        {/* Socials */}
        <div className="flex gap-8 mt-16 text-[#00F0FF]/60">
          <a href="#" className="hover:text-[#00F0FF] hover:scale-125 transition-all"><Instagram size={20} /></a>
          <a href="#" className="hover:text-[#00F0FF] hover:scale-125 transition-all"><Box size={20} /></a>
          <a href="#" className="hover:text-[#00F0FF] hover:scale-125 transition-all"><Radio size={20} /></a>
        </div>

        <div className="mt-20 opacity-20 text-[8px] tracking-[0.5em] uppercase text-center">
          Neural Interface Protocol // Active
        </div>
      </div>
    </div>
  );
};

export default InnovationProfile;
