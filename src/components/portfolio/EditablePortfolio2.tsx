import React, { useState } from "react";
import {
  MapPin,
  User,
  Mail,
  Github,
  ExternalLink,
  FolderGit2,
  ArrowUpRight,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { EditableResumeButton } from "./EditableResumeButton";
import { toast } from "sonner";
import { footerApi } from "@/lib/api";
import type {
  ProfileComplete,
  Social,
  Projeto,
  WorkExperience,
  Technology,
} from "@/types";

interface EditablePortfolio2Props {
  profile: ProfileComplete;
}

// ============= COMPONENTES EXATAMENTE COMO PORTIFOLIO-2 =============

// Componente Avatar - EXATAMENTE como portifolio-2/components/Avatar.tsx
const Avatar = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative group">
      {/* Main Container - Removed Glow */}
      <div className="relative w-40 h-40 mx-auto bg-[#fbbf24] rounded-full border-4 border-[#121318] overflow-hidden shadow-xl">
        <img src={src} alt={alt} className="w-full h-full object-cover pt-2" />
      </div>
    </div>
  );
};

// Componente InfoRow - EXATAMENTE como portifolio-2/components/InfoRow.tsx
const InfoRow = ({
  icon: Icon,
  text,
  className = "",
}: {
  icon: LucideIcon;
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center gap-3 text-sm text-gray-300 ${className}`}
    >
      <Icon
        size={16}
        className={
          text.includes("Product Designer") || text.includes("Dev")
            ? "text-yellow-500"
            : "text-red-500"
        }
      />
      <span className="font-medium tracking-wide">{text}</span>
    </div>
  );
};

// Helper para obter ícone social
const getSocialIcon = (platform: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    github: <Github size={22} />,
    linkedin: <Linkedin size={22} />,
    instagram: <Instagram size={22} />,
    youtube: <Youtube size={22} />,
    twitter: <Twitter size={22} />,
    facebook: <Facebook size={22} />,
  };
  return icons[platform.toLowerCase()] || <Mail size={22} />;
};

// Componente SocialCard - EXATAMENTE como portifolio-2/components/SocialCard.tsx
const SocialCard = ({ social }: { social: Social }) => {
  const platform = social.plataforma.toLowerCase();

  const getColorClass = (plat: string): string => {
    const colors: Record<string, string> = {
      github: "bg-[#18181b]",
      linkedin: "bg-[#0077b5]",
      instagram: "bg-gradient-to-br from-purple-600 to-pink-500",
      youtube: "bg-[#FF0000]",
      twitter: "bg-[#1DA1F2]",
      facebook: "bg-[#1877F2]",
    };
    return colors[plat] || "bg-[#121318]";
  };

  const textColor = platform === "dev" ? "text-black" : "text-white";
  const subTextColor = platform === "dev" ? "text-gray-600" : "text-gray-400";

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        col-span-1
        ${getColorClass(platform)}
        relative p-6 rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-95
        flex flex-col justify-between
        shadow-md
        h-40
        group
        overflow-hidden
        border border-white/5
      `}
    >
      <div className="flex justify-between items-start z-10">
        <div
          className={`p-2.5 rounded-xl ${
            platform === "dev" ? "bg-black text-white" : "bg-white/10"
          }`}
        >
          {getSocialIcon(platform)}
        </div>
        <div
          className={`p-1.5 rounded-full ${
            platform === "dev" ? "bg-gray-200" : "bg-white/10"
          } opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          <ArrowUpRight
            size={18}
            className={platform === "dev" ? "text-black" : "text-white"}
          />
        </div>
      </div>

      <div className="z-10">
        {platform === "github" && (
          <span className="mb-2 inline-block px-2.5 py-0.5 text-[10px] font-bold bg-white text-black rounded uppercase tracking-wider">
            Follow
          </span>
        )}
        <h3 className={`font-bold text-lg ${textColor}`}>
          {social.plataforma}
        </h3>
        <p className={`text-xs ${subTextColor} font-medium truncate mt-0.5`}>
          {social.url.replace("https://", "").replace("http://", "")}
        </p>
      </div>
    </a>
  );
};

// Componente ExperienceTimeline - EXATAMENTE como portifolio-2/components/ExperienceTimeline.tsx
const ExperienceTimeline = ({
  workHistory,
}: {
  workHistory?: WorkExperience[];
}) => {
  if (!workHistory || workHistory.length === 0) return null;

  return (
    <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
        Experience
      </h2>

      <div className="relative border-l border-gray-800 ml-3 space-y-8">
        {workHistory.map((item, index) => (
          <div key={item.id} className="ml-6 relative">
            {/* Dot on timeline */}
            <span
              className={`absolute -left-[1.95rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#121318] ${
                index === 0 ? "bg-yellow-500 animate-pulse" : "bg-gray-600"
              }`}
            ></span>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="text-white font-semibold text-lg">
                {item.company}
              </h3>
              <time className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                {item.period}
              </time>
            </div>

            <p className="text-yellow-500/90 text-sm font-medium mb-2">
              {item.summary}
            </p>
            {item.impact && (
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.impact}
              </p>
            )}

            {item.technologies && item.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-1 bg-white/5 text-gray-300 rounded-md"
                  >
                    {tech.technology}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente ProjectCard - EXATAMENTE como portifolio-2/components/ProjectCard.tsx
const ProjectCard = ({ project }: { project: Projeto }) => {
  return (
    <div className="bg-[#18181b] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg text-yellow-500">
          <FolderGit2 size={20} />
        </div>
        {(project.demoLink || project.codeLink) && (
          <a
            href={project.demoLink || project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      {project.gif && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={project.gif}
            alt={project.nome}
            className="w-full h-32 object-cover"
          />
        </div>
      )}

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
        {project.nome}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {project.descricao}
      </p>

      {/* Tags não estão disponíveis na interface do backend */}
    </div>
  );
};

// Componente TechStack - EXATAMENTE como portifolio-2/components/TechStack.tsx
const TechStack = ({ technologies }: { technologies?: Technology[] }) => {
  if (!technologies || technologies.length === 0) return null;

  return (
    <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-[#18181b] hover:bg-[#202025] text-gray-300 font-medium rounded-xl border border-white/5 hover:border-yellow-500/30 hover:text-yellow-500 transition-all cursor-default text-sm"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};

// ============= COMPONENTE PRINCIPAL EDITÁVEL =============

export function EditablePortfolio2({ profile }: EditablePortfolio2Props) {
  const [currentProfile, setCurrentProfile] = useState(profile);

  const legenda = currentProfile.legendas?.[0];
  const socials = currentProfile.social || [];
  const projects = currentProfile.projetos || [];
  const workHistory = currentProfile.workHistory || [];
  const techStack = currentProfile.techStack;

  // Handler para atualizar o currículo
  const handleResumeUpdate = async (resumeUrl: string) => {
    try {
      if (!currentProfile.footer) {
        throw new Error("Footer não encontrado");
      }

      await footerApi.update(currentProfile.footer.id, {
        ...currentProfile.footer,
        resumeUrl,
      });

      setCurrentProfile({
        ...currentProfile,
        footer: {
          ...currentProfile.footer,
          resumeUrl,
        },
      });

      toast.success("Currículo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar currículo:", error);
      toast.error("Erro ao atualizar currículo");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden text-slate-200">
      {/* Botão Editável de Upload do Currículo */}
      <EditableResumeButton
        resumeUrl={currentProfile.footer?.resumeUrl}
        onResumeUpdate={handleResumeUpdate}
        className="from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
      />

      {/* Main Container */}
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl z-10 px-6 py-10 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-[#121318] rounded-[2rem] p-6 sm:p-8 border border-white/5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="flex-shrink-0">
              <Avatar
                src={
                  legenda?.legendaFoto ||
                  currentProfile.avatarUrl ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Default&backgroundColor=fbbf24"
                }
                alt={legenda?.nome || "Profile"}
              />
            </div>

            <div className="flex-1 text-center sm:text-left mt-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                {legenda?.nome || "Your Name"}
              </h1>
              <p className="text-yellow-500 font-medium text-sm mb-4">
                {legenda?.titulo || "Your Title"}
              </p>

              <div className="flex flex-col gap-2 mb-4">
                {legenda?.subtitulo && (
                  <InfoRow icon={User} text={legenda.subtitulo} />
                )}
                {currentProfile.footer?.email && (
                  <InfoRow icon={Mail} text={currentProfile.footer.email} />
                )}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Open to work
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section - Moved Up */}
        {socials.length > 0 && (
          <section className="grid grid-cols-2 gap-4">
            {socials.slice(0, 6).map((social) => (
              <SocialCard key={social.id} social={social} />
            ))}
          </section>
        )}

        {/* Experience Section */}
        <ExperienceTimeline workHistory={workHistory} />

        {/* Projects Section */}
        {projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
              <h2 className="text-xl font-bold text-white">
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack Section - Replaced Skills */}
        {techStack && techStack.technologies && (
          <TechStack technologies={techStack.technologies} />
        )}

        {/* Footer */}
        {currentProfile.footer && (
          <footer className="text-center py-8 text-gray-500 text-sm border-t border-white/5 mt-8">
            <p>{currentProfile.footer.copyrightName}</p>
            {currentProfile.footer.madeWith && (
              <p className="mt-2">{currentProfile.footer.madeWith}</p>
            )}
          </footer>
        )}
      </main>
    </div>
  );
}
