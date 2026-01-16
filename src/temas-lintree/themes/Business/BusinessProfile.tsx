
import React from 'react';
import { ShoppingBag, MapPin, Phone, Instagram, Facebook, Star } from 'lucide-react';

const BusinessProfile: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#FCF8F4] text-[#4A2C2A] flex flex-col items-center p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mt-10 mb-6">
          <img 
            src="https://picsum.photos/seed/bakery/300/300" 
            className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg shadow-orange-900/5"
            alt="Business"
          />
        </div>

        <h1 className="text-2xl font-serif font-bold text-center">Padaria da Villa</h1>
        <div className="flex items-center gap-1 mt-1 mb-2">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="fill-orange-400 text-orange-400" />)}
          <span className="text-[10px] font-bold opacity-60 ml-1">(4.9/5.0)</span>
        </div>
        <p className="text-xs opacity-75 text-center px-4 leading-relaxed font-medium">
          Pães artesanais, fermentação natural e o melhor café do bairro. 🥐☕️
        </p>

        <div className="w-full space-y-3 mt-10">
          <button className="w-full bg-[#7B3F00] text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-orange-900/20 group">
             <div className="flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-xl"><ShoppingBag size={18} /></div>
               <span className="font-bold text-sm">Peça via WhatsApp</span>
             </div>
             <span className="text-[10px] font-bold opacity-60 bg-black/10 px-2 py-1 rounded-md">ABERTO</span>
          </button>

          {[
            { label: "Cardápio da Semana", icon: <Star size={18} /> },
            { label: "Clube da Assinatura", icon: <Star size={18} /> },
            { label: "Onde Estamos", icon: <MapPin size={18} /> }
          ].map((item, i) => (
            <button key={i} className="w-full bg-white border border-[#E8D9CE] p-4 rounded-2xl flex items-center gap-3 hover:bg-[#F3E6DB] transition-colors">
              <div className="text-[#7B3F00]">{item.icon}</div>
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-8 mt-12 mb-8">
          <a href="#" className="text-[#7B3F00]/60 hover:text-[#7B3F00]"><Instagram size={20} /></a>
          <a href="#" className="text-[#7B3F00]/60 hover:text-[#7B3F00]"><Facebook size={20} /></a>
          <a href="#" className="text-[#7B3F00]/60 hover:text-[#7B3F00]"><Phone size={20} /></a>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
