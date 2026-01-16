import React from "react";
import SharedHeader from "@/components/shared/SharedHeader";
import SharedLink from "@/components/shared/SharedLink";
import { Utensils, Book, Star, Instagram, MapPin } from "lucide-react";

const GourmetProfile: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#1A1A1A] text-[#E5D3B3] flex flex-col items-center p-8">
      <SharedHeader
        name="Chef Marco Aurélio"
        bio="Cozinha autoral, fogo e alma. Pratos que contam histórias. 🔥🍷"
        photoUrl="https://picsum.photos/seed/chef/300/300"
        imgClassName="w-28 h-28 rounded-2xl border-2 border-[#C5A059]"
        textClassName="font-serif"
      />

      <div className="w-full flex flex-col gap-4 mt-12 max-w-md">
        <SharedLink
          label="Menu Degustação"
          subtext="Reserve sua experiência para o jantar"
          icon={<Utensils size={18} />}
          className="bg-[#C5A059] text-black rounded-xl"
        />
        <SharedLink
          label="Workshop de Massas"
          subtext="Próxima turma: 15 de Outubro"
          icon={<Book size={18} />}
          className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl"
        />
        <SharedLink
          label="Nossas Unidades"
          icon={<MapPin size={18} />}
          className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl"
        />
      </div>

      <div className="flex gap-8 mt-16 opacity-60">
        <Instagram size={24} />
        <Star size={24} />
      </div>
    </div>
  );
};

export default GourmetProfile;
