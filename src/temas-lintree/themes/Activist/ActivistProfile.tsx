
import React from 'react';
import { Leaf, Users, Heart, BookOpen, Instagram, Linkedin, Mail } from 'lucide-react';

const ActivistProfile: React.FC = () => {
  const actions = [
    { label: "Curso Grátis: Horta Urbana", icon: <Leaf />, color: "bg-emerald-100 text-emerald-700" },
    { label: "Guia de Reciclagem PDF", icon: <BookOpen />, color: "bg-emerald-100 text-emerald-700" },
    { label: "Apoie o Projeto Comunitário", icon: <Heart />, color: "bg-rose-100 text-rose-700" },
    { label: "Participe do Próximo Evento", icon: <Users />, color: "bg-emerald-100 text-emerald-700" }
  ];

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 flex flex-col items-center p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mt-14 mb-6">
          <img 
            src="https://picsum.photos/seed/nature/300/300" 
            className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-50"
            alt="Activist"
          />
        </div>

        <h1 className="text-xl font-bold tracking-tight text-emerald-900">Prof. Gabriel Sustentável</h1>
        <p className="text-sm text-slate-500 text-center mt-2 max-w-[260px] leading-relaxed">
          Educador ambiental. Vamos transformar nossa comunidade juntos. 🌱✊
        </p>

        <div className="w-full flex flex-col gap-3 mt-12">
          {actions.map((action, i) => (
            <button key={i} className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all p-4 rounded-2xl flex items-center gap-4 group">
              <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
                {/* Fix: Cast to React.ReactElement<any> to allow 'size' prop to be applied via cloneElement */}
                {React.cloneElement(action.icon as React.ReactElement<any>, { size: 18 })}
              </div>
              <span className="font-bold text-sm tracking-tight">{action.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-16 w-full pt-8 border-t border-slate-100 flex justify-center gap-10">
          <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors"><Instagram size={22} /></a>
          <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors"><Linkedin size={22} /></a>
          <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors"><Mail size={22} /></a>
        </div>
      </div>
    </div>
  );
};

export default ActivistProfile;