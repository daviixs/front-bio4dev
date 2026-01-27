import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Pencil,
} from "lucide-react";
import { EditableField } from "./EditableField";
import { EditableResumeButton } from "./EditableResumeButton";
import { footerApi, legendaApi, profileApi } from "@/lib/api";
import type { Footer, Legenda, ProfileComplete } from "@/types";
import { toast } from "sonner";

interface EditablePortfolio3Props {
  profile: ProfileComplete;
  onProfileUpdate?: () => void;
}

export function EditablePortfolio3({
  profile,
  onProfileUpdate,
}: EditablePortfolio3Props) {
  const [localProfile, setLocalProfile] = useState<ProfileComplete>(profile);
  const legenda = localProfile.legendas?.[0];
  const footer = localProfile.footer;
  const techStack = localProfile.techStack?.technologies ?? [];
  const workHistory = localProfile.workHistory ?? [];
  const projects = localProfile.projetos ?? [];

  const handleLegendaUpdate = async (field: keyof Legenda, value: string) => {
    if (!legenda?.id) {
      toast.error("Legenda nao encontrada");
      return;
    }

    try {
      await legendaApi.update(legenda.id, { [field]: value });
      setLocalProfile((prev) => {
        if (!prev.legendas || prev.legendas.length === 0) return prev;
        return {
          ...prev,
          legendas: [
            {
              ...prev.legendas![0],
              [field]: value,
            },
          ],
        };
      });
      toast.success("Campo atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar legenda:", error);
      toast.error("Erro ao atualizar campo");
    }
  };

  const handleAvatarUpdate = async (url: string) => {
    if (!localProfile.id) {
      toast.error("Perfil nao encontrado");
      return;
    }

    try {
      await profileApi.update(localProfile.id, { avatarUrl: url });
      setLocalProfile((prev) => ({ ...prev, avatarUrl: url }));
      toast.success("Avatar atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
      toast.error("Erro ao atualizar avatar");
    }
  };

  const handleFooterUpdate = async (field: keyof Footer, value: string) => {
    if (!footer?.id) {
      toast.error("Footer nao encontrado");
      return;
    }

    try {
      await footerApi.update(footer.id, { [field]: value });
      setLocalProfile((prev) => ({
        ...prev,
        footer: prev.footer ? { ...prev.footer, [field]: value } : undefined,
      }));
      toast.success("Campo atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar footer:", error);
      toast.error("Erro ao atualizar campo");
    }
  };

  const handleResumeUpdate = async (url: string) => {
    if (!footer?.id) {
      toast.error("Footer nao encontrado");
      return;
    }

    try {
      await footerApi.update(footer.id, { resumeUrl: url });
      setLocalProfile((prev) => ({
        ...prev,
        footer: prev.footer ? { ...prev.footer, resumeUrl: url } : undefined,
      }));
      toast.success("Curriculo atualizado com sucesso!");
      onProfileUpdate?.();
    } catch (error) {
      console.error("Erro ao atualizar curriculo:", error);
      toast.error("Erro ao atualizar curriculo");
    }
  };

  const handleAvatarClick = async () => {
    const url = prompt("Digite a URL do avatar:");
    if (url) {
      await handleAvatarUpdate(url);
    }
  };

  return (
    <div className="portfolio-3-scope min-h-screen bg-[#0F0F0F] text-white">
      <style>{`
        .portfolio-3-scope { font-family: 'Sora', sans-serif; }
      `}</style>

      <main className="w-full max-w-6xl mx-auto">
        <section className="flex flex-col items-center text-center py-20 md:py-28 px-6">
          <div className="relative mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-[#C084FC] to-[#60A5FA] p-1 shadow-2xl shadow-[#C084FC]/20">
              <img
                src={
                  localProfile.avatarUrl ||
                  legenda?.legendaFoto ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Developer"
                }
                alt={legenda?.nome || "Developer Avatar"}
                className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                onClick={handleAvatarClick}
              />
              <div className="absolute inset-0 rounded-full bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                <Pencil className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#1A1A1A] p-2 rounded-lg border border-white/10 shadow-xl">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">
            <EditableField
              value={legenda?.greeting || "Developer Portfolio"}
              onSave={(value) => handleLegendaUpdate("greeting", value)}
              className="text-white/60"
            />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            <EditableField
              value={legenda?.nome || "Seu Nome"}
              onSave={(value) => handleLegendaUpdate("nome", value)}
              className="text-white"
            />
            <br />
            <span className="bg-gradient-to-r from-[#C084FC] to-[#60A5FA] bg-clip-text text-transparent">
              <EditableField
                value={legenda?.titulo || "Full Stack Developer"}
                onSave={(value) => handleLegendaUpdate("titulo", value)}
                className="bg-gradient-to-r from-[#C084FC] to-[#60A5FA] bg-clip-text text-transparent"
              />
            </span>
          </h1>

          <p className="text-[#AAAAAA] text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
            <EditableField
              value={
                legenda?.descricao ||
                "Especialista em software corporativo, engenharia de produtos e lideranca tecnica."
              }
              onSave={(value) => handleLegendaUpdate("descricao", value)}
              multiline
              type="textarea"
              className="text-[#AAAAAA]"
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <a
              href="#contact"
              className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              Entre em Contato
            </a>
            <div className="relative group">
              <EditableResumeButton
                resumeUrl={footer?.resumeUrl}
                onResumeUpdate={handleResumeUpdate}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {(techStack.length > 0
              ? techStack.map((tech) => tech.name)
              : ["TypeScript", "React", "Node", "Postgres", "AWS", "Docker"]
            ).map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-white/5 text-xs uppercase tracking-widest text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="experience" className="py-20 px-6 bg-[#0B0B0B]">
          <div className="flex items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight shrink-0">
              EXPERIENCIA
            </h2>
            <div className="h-px flex-grow ml-8 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="flex flex-col">
            {workHistory.length === 0 && (
              <p className="text-[#AAAAAA] text-sm">
                Adicione experiencias para destacar sua trajetoria.
              </p>
            )}
            {workHistory.map((item) => (
              <div
                key={item.id}
                className="group py-8 flex flex-col md:flex-row gap-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-4 -mx-4 transition-colors rounded-xl"
              >
                <div className="md:w-1/4">
                  <h4 className="font-bold text-white/90 text-lg">
                    {item.company}
                  </h4>
                  <div className="text-sm text-[#AAAAAA] mt-1">
                    {item.period}
                  </div>
                </div>
                <div className="md:w-3/4 space-y-3">
                  <h3 className="text-xl font-bold text-[#60A5FA]">
                    {item.summary}
                  </h3>
                  {item.impact && (
                    <p className="text-[#AAAAAA] leading-relaxed text-base">
                      {item.impact}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-20 px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              PROJECTS
            </h2>
            <div className="h-px flex-grow ml-8 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.length === 0 && (
              <div className="col-span-full text-[#AAAAAA] text-sm">
                Adicione projetos para exibir suas entregas mais relevantes.
              </div>
            )}
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={
                      project.gif ||
                      "https://picsum.photos/seed/corporate/800/450"
                    }
                    alt={project.nome}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-8">
                  <p className="text-[#C084FC] text-xs font-semibold tracking-wider uppercase mb-2">
                    {project.tags?.[0] || "Case Study"}
                  </p>
                  <h3 className="text-2xl font-bold mb-4">{project.nome}</h3>
                  <p className="text-sm text-[#AAAAAA] mb-6">
                    {project.descricao}
                  </p>
                  <div className="flex gap-3">
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="py-20 px-6 border-t border-white/5"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Contato
            </h2>
            <p className="text-xl text-[#AAAAAA] mb-12 leading-relaxed font-light">
              <EditableField
                value={
                  footer?.subtitle ||
                  "Disponivel para projetos, consultorias e oportunidades corporativas."
                }
                onSave={(value) => handleFooterUpdate("subtitle", value)}
                multiline
                type="textarea"
                className="text-[#AAAAAA]"
              />
            </p>

            <div className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-bold text-white hover:text-[#C084FC] transition-colors mb-12">
              <Mail className="text-[#C084FC]" />
              <EditableField
                value={footer?.email || "email@dominio.com"}
                onSave={(value) => handleFooterUpdate("email", value)}
                className="text-white"
              />
            </div>

            <div className="flex justify-center gap-6 flex-wrap">
              {footer?.github && (
                <a
                  href={footer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 hover:border-[#C084FC]/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg"
                >
                  <Github size={28} className="group-hover:text-[#C084FC]" />
                </a>
              )}
              {footer?.linkedin && (
                <a
                  href={footer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 hover:border-[#C084FC]/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg"
                >
                  <Linkedin size={28} className="group-hover:text-[#C084FC]" />
                </a>
              )}
              {footer?.twitter && (
                <a
                  href={footer.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 hover:border-[#C084FC]/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg"
                >
                  <Twitter size={28} className="group-hover:text-[#C084FC]" />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-[#0B0B0B] border-t border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#AAAAAA]">
          <div className="flex items-center gap-2">
            <EditableField
              value={footer?.copyrightName || "Bio4Dev"}
              onSave={(value) => handleFooterUpdate("copyrightName", value)}
              className="text-[#AAAAAA]"
            />
            <span>-</span>
            <EditableField
              value={footer?.madeWith || "Handcrafted with passion and code."}
              onSave={(value) => handleFooterUpdate("madeWith", value)}
              className="text-[#AAAAAA]"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>Template Corporate Dev</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
