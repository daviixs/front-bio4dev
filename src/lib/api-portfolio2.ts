import { profileApi } from "./api";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Code2,
  Figma,
} from "lucide-react";
import type { ProfileComplete } from "@/types";
import type {
  SocialLink,
  Experience,
  Project,
} from "../../Portifolios/portifolio-2/types";

/**
 * API para integração do Portfólio 2 com o backend
 * Usa as rotas existentes e faz o mapeamento de dados
 */

export interface Portfolio2Data {
  profile: {
    name: string;
    handle: string;
    role: string;
    tagline: string;
    location: string;
    avatarUrl: string;
    joinedDate: string;
  };
  socialLinks: SocialLink[];
  experience: Experience[];
  projects: Project[];
  techStack: string[];
}

/**
 * Busca todos os dados necessários para o Portfólio 2
 * @param slug - Slug do perfil
 * @param previewToken - Token opcional para visualizar perfil não publicado
 */
export async function getPortfolio2Data(
  slug: string,
  previewToken?: string
): Promise<Portfolio2Data> {
  try {
    // Busca perfil completo usando a rota existente
    const profile = await profileApi.getBySlug(slug, previewToken);

    // Transforma os dados para o formato do Portfólio 2
    return {
      profile: mapProfile(profile),
      socialLinks: mapSocialLinks(profile.social || []),
      experience: mapExperience(profile.workHistory || []),
      projects: mapProjects(profile.projetos || []),
      techStack: mapTechStack(profile.techStack),
    };
  } catch (error: any) {
    console.error("Erro ao buscar dados do portfólio:", error);
    throw new Error(
      error.response?.data?.message ||
        "Erro ao carregar dados do portfólio. Verifique se o perfil existe e está publicado."
    );
  }
}

/**
 * Mapeia dados do perfil
 */
function mapProfile(profile: ProfileComplete) {
  const legenda = profile.legendas?.[0];

  return {
    name: legenda?.nome || profile.username || "Nome não definido",
    handle: `@${profile.username}`,
    role: legenda?.titulo || "Desenvolvedor",
    tagline: profile.bio || "Building digital products",
    // ✅ Usando campo subtitulo da Legenda como location
    location: legenda?.subtitulo || "Location not set",
    avatarUrl: profile.avatarUrl || generateDefaultAvatar(profile.username),
    joinedDate: formatJoinedDate(profile.createdAt),
  };
}

/**
 * Mapeia links sociais com ícones e cores
 */
function mapSocialLinks(socials: any[]): SocialLink[] {
  // Mapa de ícones por plataforma
  const iconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    facebook: Facebook,
    figma: Figma,
    email: Mail,
    instagram: Mail, // Temporário
    tiktok: Mail, // Temporário
    youtube: Mail, // Temporário
  };

  // Mapa de cores por plataforma (Tailwind classes)
  const colorMap: Record<string, string> = {
    github: "bg-[#18181b] hover:bg-[#27272a] border border-gray-800",
    linkedin: "bg-[#0077b5] hover:bg-[#006399]",
    twitter: "bg-[#1DA1F2] hover:bg-[#1a8cd8]",
    facebook: "bg-[#3b82f6] hover:bg-[#2563eb]",
    figma: "bg-[#1e1e1e] hover:bg-[#2d2d2d]",
    instagram:
      "bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600",
    tiktok: "bg-black hover:bg-gray-900",
    youtube: "bg-[#FF0000] hover:bg-[#CC0000]",
  };

  // Nome legível por plataforma
  const nameMap: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    facebook: "Facebook",
    figma: "Figma",
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
    email: "Email",
  };

  return socials
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
    .map((social) => ({
      id: social.id,
      name: nameMap[social.plataforma] || social.plataforma,
      handle: extractHandle(social.url, social.plataforma),
      icon: iconMap[social.plataforma] || Mail,
      url: social.url,
      colorClass:
        colorMap[social.plataforma] || "bg-gray-800 hover:bg-gray-700",
      textColorClass: undefined,
      // GitHub ocupa 2 colunas no layout
      colSpan: social.plataforma === "github" ? 2 : 1,
    }));
}

/**
 * Mapeia experiências profissionais
 */
function mapExperience(workHistory: any[]): Experience[] {
  return workHistory
    .sort((a, b) => (b.ordem || 0) - (a.ordem || 0)) // Mais recente primeiro
    .map((exp) => {
      // Verifica se é experiência atual
      const isCurrent =
        exp.period?.toLowerCase().includes("present") ||
        exp.period?.toLowerCase().includes("atual") ||
        exp.period?.toLowerCase().includes("current");

      return {
        id: exp.id,
        role: exp.company || "Cargo", // No backend está invertido
        company: exp.summary || "Empresa", // No backend está invertido
        date: exp.period || "Data não definida",
        description: exp.impact || exp.summary || "Descrição não disponível",
        current: isCurrent,
      };
    });
}

/**
 * Mapeia projetos
 */
function mapProjects(projetos: any[]): Project[] {
  return projetos
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
    .map((proj) => ({
      id: proj.id,
      title: proj.nome,
      description: proj.descricao,
      tags: proj.tags || [],
      link: proj.demoLink || proj.codeLink || "#",
      image: proj.gif,
    }));
}

/**
 * Mapeia tech stack
 */
function mapTechStack(techStack: any): string[] {
  if (!techStack) {
    return []; // Retorna vazio se não houver tech stack
  }

  // Se for array de objetos Technology
  if (Array.isArray(techStack.technologies)) {
    return techStack.technologies
      .sort((a: any, b: any) => (a.ordem || 0) - (b.ordem || 0))
      .map((tech: any) => tech.name);
  }

  // Se for array direto de strings
  if (Array.isArray(techStack)) {
    return techStack;
  }

  return [];
}

/**
 * Extrai handle/username da URL da rede social
 */
function extractHandle(url: string, plataforma: string): string {
  try {
    if (plataforma === "email" || url.includes("@")) {
      return url.replace("mailto:", "");
    }

    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/").filter(Boolean);

    if (parts.length > 0) {
      const handle = parts[parts.length - 1];
      return `@${handle}`;
    }

    return url;
  } catch {
    return url;
  }
}

/**
 * Gera avatar default usando DiceBear API
 */
function generateDefaultAvatar(username: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=fbbf24`;
}

/**
 * Formata data de criação para "Joined on MMM DD, YYYY"
 */
function formatJoinedDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return `Joined on ${date.toLocaleDateString("en-US", options)}`;
  } catch {
    return "Joined recently";
  }
}

/**
 * Gera token de preview para visualizar perfil não publicado
 */
export async function generatePreviewToken(
  profileId: string
): Promise<{ token: string; expiresAt: string }> {
  const response = await profileApi.generatePreviewToken(profileId);
  return response;
}
