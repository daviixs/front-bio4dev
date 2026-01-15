import React from "react";
import {
  MapPin,
  User,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Figma,
  Code2,
  ArrowUpRight,
  FolderGit2,
  ExternalLink,
  Cpu,
  FileDown,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { TechIcon } from "@/components/portfolio/TechIcon";
import type {
  ProfileComplete,
  Social,
  Projeto,
  WorkExperience,
  Technology,
} from "@/types";

// ==========================================
// TYPES (From Portifolios/portifolio-2/types.ts)
// ==========================================

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  icon: LucideIcon;
  url: string;
  colorClass: string;
  textColorClass?: string;
  colSpan?: 1 | 2;
  bgImage?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
  current?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

// ==========================================
// COMPONENTS (Verbatim from Portifolios/portifolio-2/components)
// ==========================================

// --- Avatar.tsx ---
interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="relative group">
      {/* Main Container - Removed Glow */}
      <div className="relative w-40 h-40 mx-auto bg-[#fbbf24] rounded-full border-4 border-[#121318] overflow-hidden shadow-xl">
        <img src={src} alt={alt} className="w-full h-full object-cover pt-2" />
      </div>
    </div>
  );
};

// --- InfoRow.tsx ---
interface InfoRowProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon: Icon,
  text,
  className = "",
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

// --- SocialCard.tsx ---
interface SocialCardProps {
  item: SocialLink;
}

const SocialCard: React.FC<SocialCardProps> = ({ item }) => {
  const textColor = item.textColorClass || "text-white";
  const subTextColor = item.textColorClass ? "text-gray-600" : "text-gray-400";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${item.colSpan === 2 ? "col-span-2" : "col-span-1"}
        ${item.colorClass}
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
            item.id === "dev" ? "bg-black text-white" : "bg-white/10"
          }`}
        >
          <item.icon
            size={22}
            className={item.id === "dev" ? "text-white" : "text-white"}
          />
        </div>
        <div
          className={`p-1.5 rounded-full ${
            item.id === "dev" ? "bg-gray-200" : "bg-white/10"
          } opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          <ArrowUpRight
            size={18}
            className={item.id === "dev" ? "text-black" : "text-white"}
          />
        </div>
      </div>

      <div className="z-10">
        {item.id === "github" && (
          <span className="mb-2 inline-block px-2.5 py-0.5 text-[10px] font-bold bg-white text-black rounded uppercase tracking-wider">
            Follow
          </span>
        )}
        <h3 className={`font-bold text-lg ${textColor}`}>{item.name}</h3>
        <p className={`text-xs ${subTextColor} font-medium truncate mt-0.5`}>
          {item.handle}
        </p>
      </div>
    </a>
  );
};

// --- ExperienceTimeline.tsx ---
// Adapted to accept data as prop instead of importing from constants
interface ExperienceTimelineProps {
  data: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
        Experience
      </h2>

      <div className="relative border-l border-gray-800 ml-3 space-y-8">
        {data.map((item, index) => (
          <div key={item.id} className="ml-6 relative">
            {/* Dot on timeline */}
            <span
              className={`absolute -left-[1.95rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#121318] ${
                item.current ? "bg-yellow-500 animate-pulse" : "bg-gray-600"
              }`}
            ></span>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="text-white font-semibold text-lg">{item.role}</h3>
              <time className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                {item.date}
              </time>
            </div>

            <p className="text-yellow-500/90 text-sm font-medium mb-2">
              {item.company}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ProjectCard.tsx ---
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-[#18181b] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg text-yellow-500">
          <FolderGit2 size={20} />
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-2 py-1 bg-white/5 text-gray-300 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- TechStack.tsx ---
// Adapted to accept Technology objects with icons
interface TechStackProps {
  data: Technology[];
}

const TechStack: React.FC<TechStackProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-[#121318] rounded-[2rem] p-6 border border-white/5">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-4">
        {data.map((tech) => (
          <div
            key={tech.id}
            className="flex flex-col items-center gap-2 p-3 bg-[#18181b] hover:bg-[#202025] rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all cursor-default group"
          >
            <TechIcon
              icon={tech.icon}
              size={32}
              className="text-gray-300 group-hover:text-yellow-500 transition-colors"
            />
            <span className="text-xs text-gray-400 group-hover:text-gray-300 font-medium">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// DATA MAPPING HELPERS
// ==========================================

const convertToSocialLink = (social: Social): SocialLink => {
  const platform = social.plataforma.toLowerCase();

  const getIcon = (plat: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      github: Github,
      linkedin: Linkedin,
      instagram: Instagram,
      youtube: Youtube,
      twitter: Twitter,
      facebook: Facebook,
      figma: Figma,
      email: Mail,
      dev: Code2,
    };
    return icons[plat] || Mail;
  };

  const getColorClass = (plat: string): string => {
    // Styles from Portifolios/portifolio-2/constants.tsx + fallbacks
    const colors: Record<string, string> = {
      github: "bg-[#18181b] hover:bg-[#27272a] border border-gray-800",
      email: "bg-[#1e293b] hover:bg-[#263345]",
      facebook: "bg-[#3b82f6] hover:bg-[#2563eb]",
      figma: "bg-[#1e1e1e] hover:bg-[#2d2d2d]",
      dev: "bg-white hover:bg-gray-100",
      linkedin: "bg-[#0077b5] hover:bg-[#006399]", // Kept for completeness
      instagram:
        "bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600",
    };
    return colors[plat] || "bg-[#121318] hover:bg-[#18181b]";
  };

  return {
    id: social.id?.toString() || platform,
    name: social.plataforma,
    handle: social.url
      ? social.url.replace("https://", "").replace("http://", "")
      : social.plataforma,
    icon: getIcon(platform),
    url: social.url || `https://${platform}.com`,
    colorClass: getColorClass(platform),
    textColorClass: platform === "dev" ? "text-black" : undefined,
    colSpan: platform === "github" ? 2 : 1,
  };
};

// ... types and components remain the same ...

// ==========================================
// CONSTANTS (From Portifolios/portifolio-2/constants.tsx)
// ==========================================

const DEMO_SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    handle: "@m-aqsam",
    icon: Github,
    url: "https://github.com",
    colorClass: "bg-[#18181b] hover:bg-[#27272a] border border-gray-800",
    colSpan: 2,
  },
  {
    id: "email",
    name: "Email",
    handle: "maqsam1155@gmail.com",
    icon: Mail,
    url: "mailto:maqsam1155@gmail.com",
    colorClass: "bg-[#1e293b] hover:bg-[#263345]",
    colSpan: 1,
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "@m_aqsam",
    icon: Facebook,
    url: "https://facebook.com",
    colorClass: "bg-[#3b82f6] hover:bg-[#2563eb]",
    colSpan: 1,
  },
  {
    id: "figma",
    name: "Figma",
    handle: "@maqsam",
    icon: Figma,
    url: "https://figma.com",
    colorClass: "bg-[#1e1e1e] hover:bg-[#2d2d2d]",
    colSpan: 1,
  },
  {
    id: "dev",
    name: "DEV",
    handle: "@maqsam",
    icon: Code2,
    url: "https://dev.to",
    colorClass: "bg-white hover:bg-gray-100",
    textColorClass: "text-black",
    colSpan: 1,
  },
];

const DEMO_TECH_STACK: Technology[] = [
  {
    id: "1",
    techStackId: "demo",
    name: "React",
    icon: "logos:react",
    color: "#61DAFB",
    ordem: 1,
  },
  {
    id: "2",
    techStackId: "demo",
    name: "TypeScript",
    icon: "logos:typescript-icon",
    color: "#3178C6",
    ordem: 2,
  },
  {
    id: "3",
    techStackId: "demo",
    name: "Next.js",
    icon: "logos:nextjs-icon",
    color: "#000000",
    ordem: 3,
  },
  {
    id: "4",
    techStackId: "demo",
    name: "Tailwind CSS",
    icon: "logos:tailwindcss-icon",
    color: "#06B6D4",
    ordem: 4,
  },
  {
    id: "5",
    techStackId: "demo",
    name: "Node.js",
    icon: "logos:nodejs-icon",
    color: "#339933",
    ordem: 5,
  },
  {
    id: "6",
    techStackId: "demo",
    name: "Figma",
    icon: "logos:figma",
    color: "#F24E1E",
    ordem: 6,
  },
  {
    id: "7",
    techStackId: "demo",
    name: "Git",
    icon: "logos:git-icon",
    color: "#F05032",
    ordem: 7,
  },
  {
    id: "8",
    techStackId: "demo",
    name: "PostgreSQL",
    icon: "logos:postgresql",
    color: "#4169E1",
    ordem: 8,
  },
  {
    id: "9",
    techStackId: "demo",
    name: "Framer Motion",
    icon: "logos:framer",
    color: "#0055FF",
    ordem: 9,
  },
  {
    id: "10",
    techStackId: "demo",
    name: "Prisma",
    icon: "logos:prisma",
    color: "#2D3748",
    ordem: 10,
  },
  {
    id: "11",
    techStackId: "demo",
    name: "Python",
    icon: "logos:python",
    color: "#3776AB",
    ordem: 11,
  },
  {
    id: "12",
    techStackId: "demo",
    name: "Django",
    icon: "logos:django-icon",
    color: "#092E20",
    ordem: 12,
  },
  {
    id: "13",
    techStackId: "demo",
    name: "FastAPI",
    icon: "logos:fastapi-icon",
    color: "#009688",
    ordem: 13,
  },
  {
    id: "14",
    techStackId: "demo",
    name: "Docker",
    icon: "logos:docker-icon",
    color: "#2496ED",
    ordem: 14,
  },
  {
    id: "15",
    techStackId: "demo",
    name: "Kubernetes",
    icon: "logos:kubernetes",
    color: "#326CE5",
    ordem: 15,
  },
  {
    id: "16",
    techStackId: "demo",
    name: "AWS",
    icon: "logos:aws",
    color: "#FF9900",
    ordem: 16,
  },
  {
    id: "17",
    techStackId: "demo",
    name: "MongoDB",
    icon: "logos:mongodb-icon",
    color: "#47A248",
    ordem: 17,
  },
  {
    id: "18",
    techStackId: "demo",
    name: "Redis",
    icon: "logos:redis",
    color: "#DC382D",
    ordem: 18,
  },
  {
    id: "19",
    techStackId: "demo",
    name: "GraphQL",
    icon: "logos:graphql",
    color: "#E10098",
    ordem: 19,
  },
  {
    id: "20",
    techStackId: "demo",
    name: "Jest",
    icon: "logos:jest",
    color: "#C21325",
    ordem: 20,
  },
];

const DEMO_EXPERIENCE_DATA: Experience[] = [
  {
    id: "1",
    role: "Senior Product Designer",
    company: "TechFlow Solutions",
    date: "2023 - Present",
    description:
      "Leading the design system initiative and overseeing product UX for enterprise clients.",
    current: true,
  },
  {
    id: "2",
    role: "Frontend Developer",
    company: "Creative Digital",
    date: "2021 - 2023",
    description:
      "Developed responsive web applications using React and TypeScript. Collaborated closely with UI designers.",
    current: false,
  },
  {
    id: "3",
    role: "UI/UX Intern",
    company: "StartUp Inc",
    date: "2020 - 2021",
    description:
      "Assisted in wireframing and prototyping mobile applications. Conducted user research interviews.",
    current: false,
  },
];

const DEMO_PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive analytics dashboard for online retailers featuring real-time data visualization.",
    tags: ["React", "Tailwind", "Recharts"],
    link: "#",
  },
  {
    id: "p2",
    title: "HealthTrack App",
    description:
      "Mobile-first fitness tracking application focusing on simplicity and user retention.",
    tags: ["Figma", "UX Research", "Prototyping"],
    link: "#",
  },
  {
    id: "p3",
    title: "Finance AI",
    description:
      "Personal finance assistant powered by generative AI to help users save money.",
    tags: ["TypeScript", "OpenAI API", "Node.js"],
    link: "#",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

interface TemplateProps {
  profile: ProfileComplete;
}

export function Template02({ profile }: TemplateProps) {
  const legenda = profile.legendas?.[0];

  // Map Socials (Filter only those with valid data, no fallback to DEMO)
  const mappedSocials = (profile.social || [])
    .filter((social) => social.plataforma) // Only require platform name
    .map(convertToSocialLink);
  const socials = mappedSocials;

  // Map Experience (Fallback to DEMO if empty)
  const mappedExperience: Experience[] = (profile.workHistory || []).map(
    (work) => ({
      id: work.id,
      role: work.company,
      company: "",
      date: work.period,
      description: work.summary,
      current:
        work.period.toLowerCase().includes("present") ||
        work.period.toLowerCase().includes("atua"),
    })
  );
  const experienceData =
    mappedExperience.length > 0 ? mappedExperience : DEMO_EXPERIENCE_DATA;

  // Map Projects (Fallback to DEMO if empty)
  const mappedProjects: Project[] = (profile.projetos || []).map((p) => ({
    id: p.id,
    title: p.nome,
    description: p.descricao,
    tags: [],
    link: p.demoLink || p.codeLink,
    image: p.gif,
  }));
  const projectsData =
    mappedProjects.length > 0 ? mappedProjects : DEMO_PROJECTS_DATA;

  // Map Tech Stack (Fallback to DEMO if empty)
  const mappedTechStack: Technology[] = profile.techStack?.technologies || [];
  const techStackData =
    mappedTechStack.length > 0 ? mappedTechStack : DEMO_TECH_STACK;

  return (
    <>
      {/* Inject Font strictly for this template */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
            .portfolio-2-scope {
                font-family: 'Plus Jakarta Sans', sans-serif;
            }
            .portfolio-2-scope ::-webkit-scrollbar {
                width: 0px;
                background: transparent;
            }
        `}</style>

      <div className="portfolio-2-scope min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden text-slate-200">
        {/* Main Container */}
        <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl z-10 px-6 py-10 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-[#121318] rounded-[2rem] p-6 sm:p-8 border border-white/5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex-shrink-0">
                <Avatar
                  src={
                    legenda?.legendaFoto ||
                    profile.avatarUrl ||
                    (profile.social?.length
                      ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Default&backgroundColor=fbbf24"
                      : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=fbbf24&clothing=hoodie&clothingColor=3c4f5c")
                  }
                  alt={legenda?.nome || "Profile"}
                />
              </div>

              <div className="flex-1 text-center sm:text-left mt-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                  {legenda?.nome || "Muhammad Aqsam"}
                </h1>
                <p className="text-yellow-500 font-medium text-sm mb-4">
                  {legenda?.titulo || "Product Designer & Developer"}
                </p>

                <div className="flex flex-col gap-2 mb-4">
                  {legenda?.subtitulo ? (
                    <InfoRow icon={User} text={legenda.subtitulo} />
                  ) : (
                    <InfoRow
                      icon={User}
                      text={"Building digital products that matter."}
                    />
                  )}
                  {profile.footer?.email ? (
                    <InfoRow icon={MapPin} text={profile.footer.email} />
                  ) : (
                    <InfoRow icon={MapPin} text={"Bahawalpur, Pakistan"} />
                  )}
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Open to work
                </div>

                {/* Resume Button - Inline within profile card */}
                {profile.footer?.resumeUrl ? (
                  <div className="mt-4">
                    <a
                      href={profile.footer.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <FileDown size={16} />
                      <span>Download CV</span>
                    </a>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full bg-gray-400 text-gray-200 font-semibold rounded-lg text-sm cursor-not-allowed opacity-50"
                    >
                      <FileDown size={16} />
                      <span>Currículo não disponível</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          {socials.length > 0 && (
            <section className="grid grid-cols-2 gap-4">
              {socials.map((link) => (
                <SocialCard key={link.id} item={link} />
              ))}
            </section>
          )}

          {/* Experience Section */}
          <ExperienceTimeline data={experienceData} />

          {/* Projects Section */}
          <section>
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
              <h2 className="text-xl font-bold text-white">
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {/* Tech Stack Section */}
          <TechStack data={techStackData} />

          {/* Footer */}
          {profile.footer && (
            <footer className="text-center py-8 text-gray-500 text-sm border-t border-white/5 mt-8">
              <p>{profile.footer.copyrightName}</p>
              {profile.footer.madeWith && (
                <p className="mt-2">{profile.footer.madeWith}</p>
              )}
            </footer>
          )}
        </main>
      </div>
    </>
  );
}
