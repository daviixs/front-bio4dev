
import React from 'react';
import { Instagram, Music, Calendar, Mail, Disc, Share2 } from 'lucide-react';

const AltMusicProfile: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Profile Image - Grunge/Industrial vibe */}
        <div className="mt-14 mb-8 relative">
          <div className="absolute -top-3 -left-3 w-full h-full border border-zinc-700"></div>
          <div className="absolute -bottom-3 -right-3 w-full h-full border border-zinc-500 opacity-20"></div>
          <img 
            src="https://picsum.photos/seed/techno-dark/400/500" 
            className="w-36 h-44 object-cover grayscale brightness-75 contrast-125 border border-white/10 relative z-10"
            alt="VØID_CULT"
          />
        </div>

        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-1 text-white">VØID_CULT</h1>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mb-12 border-b border-zinc-800 pb-2">
          Metal suave // Techno pesado
        </p>

        {/* Brutalist Buttons */}
        <div className="w-full flex flex-col gap-2">
          <button className="w-full bg-white text-black p-5 flex items-center justify-between hover:bg-zinc-200 transition-colors">
            <span className="font-black uppercase text-sm italic">Datas de Shows</span>
            <Calendar size={18} strokeWidth={3} />
          </button>

          <button className="w-full bg-zinc-900 border border-zinc-800 text-white p-5 flex items-center justify-between hover:bg-zinc-800 transition-all">
            <span className="font-bold uppercase text-xs tracking-widest">Ouça a Playlist</span>
            <Music size={18} />
          </button>

          <button className="w-full bg-zinc-900 border border-zinc-800 text-white p-5 flex items-center justify-between hover:bg-zinc-800 transition-all">
            <span className="font-bold uppercase text-xs tracking-widest">Instagram</span>
            <Instagram size={18} />
          </button>

          <button className="w-full bg-zinc-900 border border-zinc-800 text-white p-5 flex items-center justify-between hover:bg-zinc-800 transition-all">
            <span className="font-bold uppercase text-xs tracking-widest">Contato</span>
            <Mail size={18} />
          </button>
        </div>

        {/* Footer decoration */}
        <div className="mt-16 flex items-center gap-4 opacity-10">
          <div className="h-[1px] w-12 bg-white"></div>
          <Disc size={24} className="animate-[spin_4s_linear_infinite]" />
          <div className="h-[1px] w-12 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default AltMusicProfile;
