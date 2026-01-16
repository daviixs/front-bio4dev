
import React from 'react';
import SharedHeader from '../../components/shared/SharedHeader';
import SharedLink from '../../components/shared/SharedLink';
import { Square, Layout, PenTool, Globe, Linkedin } from 'lucide-react';

const ArchitectProfile: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col items-center p-10 font-sans tracking-tight">
      <SharedHeader 
        name="Studio RAW"
        bio="Arquitetura brutalista e design de interiores minimalista."
        photoUrl="https://picsum.photos/seed/arch/300/300"
        imgClassName="w-24 h-24 rounded-none grayscale"
        textClassName="uppercase tracking-[0.2em]"
      />
      
      <div className="w-full flex flex-col gap-0 mt-16 max-w-md border-t border-black">
        <SharedLink 
          label="Portfólio 2024"
          icon={<Layout size={16} />}
          className="border-b border-black rounded-none py-6 px-2 hover:bg-zinc-100"
        />
        <SharedLink 
          label="Agende uma Consultoria"
          icon={<PenTool size={16} />}
          className="border-b border-black rounded-none py-6 px-2 hover:bg-zinc-100"
        />
        <SharedLink 
          label="Projetos em Andamento"
          icon={<Square size={16} />}
          className="border-b border-black rounded-none py-6 px-2 hover:bg-zinc-100"
        />
      </div>

      <div className="flex gap-12 mt-20 grayscale opacity-40">
        <Linkedin size={20} />
        <Globe size={20} />
      </div>
    </div>
  );
};

export default ArchitectProfile;
