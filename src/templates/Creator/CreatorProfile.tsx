import React from "react";
import {
  Youtube,
  Twitter,
  Instagram,
  Send,
  Code,
  Terminal,
} from "lucide-react";
import { ProfileData } from "../../temas-lintree/types";

interface CreatorProfileProps {
  data: ProfileData;
}

const CreatorProfile: React.FC<CreatorProfileProps> = ({ data }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col items-center p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mt-12 mb-6">
          <div className="p-1 rounded-2xl bg-indigo-100">
            <img
              src={data.photoUrl}
              className="w-24 h-24 rounded-xl object-cover shadow-sm"
              alt={data.name}
            />
          </div>
        </div>

        <h1 className="text-xl font-bold flex items-center gap-2">
          {data.name}{" "}
          <span className="bg-indigo-600 text-[10px] text-white px-2 py-0.5 rounded-full uppercase">
            Pro
          </span>
        </h1>
        <p className="text-sm text-slate-500 text-center mt-2 font-medium">
          {data.bio}
        </p>

        <div className="w-full grid grid-cols-1 gap-3 mt-10">
          {data.buttons.map((btn, i) => (
            <a
              key={i}
              href={btn.url}
              className="w-full bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all p-4 rounded-xl flex items-center gap-4"
            >
              <div className="bg-slate-50 p-2 rounded-lg">
                <Terminal size={18} className="text-indigo-600" />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-sm">{btn.label}</span>
                {btn.subtext && (
                  <span className="text-[10px] text-slate-400">
                    {btn.subtext}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="flex gap-4 mt-12 mb-10">
          <Instagram
            size={22}
            className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
          />
          <Twitter
            size={22}
            className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
          />
          <Youtube
            size={22}
            className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
