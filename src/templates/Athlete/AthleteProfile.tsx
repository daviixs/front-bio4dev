
import React from 'react';
import { Instagram, Twitter, Youtube, Trophy } from 'lucide-react';

const AthleteProfile: React.FC = () => {
  const buttons = [
    { label: "Meu Plano de Treinamento", sub: "Aprenda como comecei", icon: <Trophy size={18} /> },
    { label: "Loja Oficial - Equipamentos", sub: "Cupom: LEO10" },
    { label: "Resultados da Última Prova", sub: "1º Lugar Maratona SP 2024" },
    { label: "Palestras & Mentoria", sub: "Vagas limitadas" }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col items-center p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mt-10 mb-8">
          <img 
            src="https://picsum.photos/seed/athlete/300/300" 
            className="w-32 h-32 rounded-full border-2 border-blue-500 p-1 object-cover"
            alt="Athlete"
          />
        </div>
        
        <h1 className="text-2xl font-black tracking-tighter uppercase italic">Leo 'Relâmpago' Silva</h1>
        <p className="text-sm text-slate-400 text-center mt-2 max-w-[280px] font-medium">
          Corredor de Ultra Maratona | Embaixador Nike | Focado em superar limites 🏃‍♂️⚡️
        </p>

        <div className="w-full flex flex-col gap-3 mt-10">
          {buttons.map((btn, i) => (
            <button key={i} className="w-full bg-blue-600 hover:bg-blue-500 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
              <span className="font-bold flex items-center gap-2">
                {btn.icon} {btn.label}
              </span>
              <span className="text-[10px] opacity-80 uppercase tracking-widest mt-1 font-bold">{btn.sub}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-4 mt-12">
          {[<Instagram />, <Twitter />, <Youtube />].map((icon, i) => (
            <a key={i} href="#" className="p-3 bg-slate-900 rounded-lg hover:text-blue-400 transition-colors">
              {icon}
            </a>
          ))}
        </div>
        
        <span className="mt-16 text-[10px] opacity-20 font-bold tracking-[0.3em]">ATHLETE CORE</span>
      </div>
    </div>
  );
};

export default AthleteProfile;
