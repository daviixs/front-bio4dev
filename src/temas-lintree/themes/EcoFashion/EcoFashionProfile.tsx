
import React from 'react';
import { Instagram, Twitter, Music, ShoppingBag, Heart, MessageCircle, Sparkles, Recycle } from 'lucide-react';

const EcoFashionProfile: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#4A3F35] flex flex-col items-center p-8 relative overflow-hidden">
      {/* Recycled Paper Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/recycled-paper.png')]"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Minimal Circle Header */}
        <div className="mt-12 mb-6">
          <div className="p-2 rounded-full border border-[#DED9CF]">
            <img 
              src="https://picsum.photos/seed/eco-wear/300/300" 
              className="w-24 h-24 rounded-full object-cover grayscale-[20%]"
              alt="Clara Re-Fashion"
            />
          </div>
        </div>

        <h1 className="text-2xl font-serif font-bold italic tracking-tight text-[#3A332C]">Clara Re-Fashion</h1>
        <div className="flex items-center gap-2 mt-2 opacity-60">
          <Recycle size={14} />
          <p className="text-xs font-medium uppercase tracking-widest">Moda Circular</p>
        </div>
        
        <p className="text-sm opacity-80 text-center mt-4 font-medium max-w-[220px] leading-relaxed italic">
          "Dando uma segunda chance à roupa através da curadoria consciente."
        </p>

        {/* Soft Organic Buttons */}
        <div className="w-full flex flex-col gap-4 mt-12">
          <button className="w-full bg-white shadow-sm hover:shadow-md transition-all p-5 rounded-3xl flex items-center gap-4 border border-[#E5E1D8] group">
            <div className="bg-[#F9F7F2] p-3 rounded-2xl group-hover:bg-[#8B7E66] group-hover:text-white transition-colors">
              <ShoppingBag size={20} />
            </div>
            <div className="text-left">
              <span className="block font-bold text-sm">Loja Vintage</span>
              <span className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">Novidades toda segunda</span>
            </div>
          </button>

          <button className="w-full bg-white shadow-sm hover:shadow-md transition-all p-5 rounded-3xl flex items-center gap-4 border border-[#E5E1D8] group">
            <div className="bg-[#F9F7F2] p-3 rounded-2xl group-hover:bg-[#8B7E66] group-hover:text-white transition-colors">
              <Sparkles size={20} />
            </div>
            <div className="text-left">
              <span className="block font-bold text-sm">Inspirações</span>
              <span className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">Lookbook Outono</span>
            </div>
          </button>

          <button className="w-full bg-white shadow-sm hover:shadow-md transition-all p-5 rounded-3xl flex items-center gap-4 border border-[#E5E1D8] group">
            <div className="bg-[#F9F7F2] p-3 rounded-2xl group-hover:bg-[#8B7E66] group-hover:text-white transition-colors">
              <Heart size={20} />
            </div>
            <div className="text-left">
              <span className="block font-bold text-sm">Top Brechós</span>
              <span className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">Meu guia curado</span>
            </div>
          </button>

          <button className="w-full bg-[#8B7E66] text-white shadow-lg shadow-[#8B7E66]/20 p-5 rounded-3xl flex items-center justify-center gap-3 hover:bg-[#726754] transition-colors mt-2">
            <MessageCircle size={18} />
            <span className="font-bold text-sm uppercase tracking-widest">Fale Conosco</span>
          </button>
        </div>

        {/* Earthy Socials */}
        <div className="flex gap-10 mt-16 text-[#8B7E66]/50">
          <a href="#" className="hover:text-[#8B7E66] transition-colors"><Instagram size={22} /></a>
          <a href="#" className="hover:text-[#8B7E66] transition-colors"><Twitter size={22} /></a>
          <a href="#" className="hover:text-[#8B7E66] transition-colors"><Music size={22} /></a>
        </div>
      </div>
    </div>
  );
};

export default EcoFashionProfile;
