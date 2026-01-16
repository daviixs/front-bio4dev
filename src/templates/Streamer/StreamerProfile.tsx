import React from "react";
import SharedHeader from "@/components/shared/SharedHeader";
import SharedLink from "@/components/shared/SharedLink";
import { Twitch, Youtube, Twitter, Play, Gamepad2, Gift } from "lucide-react";
import { ProfileData } from "../../temas-lintree/types";

interface StreamerProfileProps {
  data: ProfileData;
}

const StreamerProfile: React.FC<StreamerProfileProps> = ({ data }) => {
  return (
    <div className="min-h-screen w-full bg-[#0B021C] text-white flex flex-col items-center p-8 overflow-hidden relative">
      {/* Background Glows Dinâmicos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-600/10 blur-[100px]"></div>

      <SharedHeader
        name={data.name}
        bio={data.bio}
        photoUrl={data.photoUrl}
        imgClassName="w-24 h-24 rounded-full border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        textClassName="font-black italic uppercase tracking-tighter"
        containerClassName="z-10 mt-8"
      />

      <div className="w-full flex flex-col gap-3 mt-10 max-w-md relative z-10 mb-20">
        {data.buttons.map((btn, idx) => (
          <SharedLink
            key={idx}
            label={btn.label}
            subtext={btn.subtext}
            icon={<Gamepad2 size={18} className="text-purple-400" />}
            className="bg-white/5 border-l-4 border-purple-500 rounded-r-xl hover:bg-white/10 hover:translate-x-1"
          />
        ))}
      </div>

      <div className="fixed bottom-24 flex gap-8 z-10 opacity-40">
        <Twitch size={20} />
        <Twitter size={20} />
        <Youtube size={20} />
      </div>
    </div>
  );
};

export default StreamerProfile;
