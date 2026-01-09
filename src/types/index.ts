// Tipos base do Bio4Dev

export interface User {
  id: string;
  email: string;
  nome: string;
  createdAt: string;
  updatedAt?: string;
}

export type Colors = "LIGHT" | "DARK";
export type TemplateType = "template_01" | "template_02" | "template_03";

export interface Profile {
  id: string;
  userId: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  theme: Colors;
  mainColor?: string;
  templateType: TemplateType;
  published: boolean;
  createdAt: string;
}

export interface Legenda {
  id: string;
  profileId: string;
  greeting?: string;
  legendaFoto: string;
  nome: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  createdAt: string;
}

export interface Config {
  id: string;
  profileId: string;
  stacks: number;
  projetos: number;
  createdAt: string;
}

export interface Page {
  id: string;
  profileId: string;
  titulo: string;
  slug: string;
  ordem?: number;
  createdAt: string;
}

export type PlataformaSocial =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "github"
  | "linkedin"
  | "twitter";

export interface Social {
  id: string;
  profileId: string;
  plataforma: PlataformaSocial;
  url: string;
  ordem: number;
}

export interface Projeto {
  id: string;
  profileId: string;
  nome: string;
  descricao: string;
  demoLink?: string;
  codeLink?: string;
  ordem: number;
  gif: string;
  createdAt: string;
}

// Perfil completo com todos os relacionamentos
export interface ProfileComplete extends Profile {
  legendas?: Legenda[];
  social?: Social[];
  config?: Config;
  projetos?: Projeto[];
  techStack?: TechStack;
  workHistory?: WorkExperience[];
  footer?: Footer;
  user?: User;
}

export interface TechStack {
  id: string;
  profileId: string;
  title: string;
  subtitle: string;
  technologies: Technology[];
}

export interface Technology {
  id: string;
  techStackId: string;
  name: string;
  icon: string;
  color: string;
  ordem: number;
}

export interface WorkExperience {
  id: string;
  profileId: string;
  company: string;
  period: string;
  summary: string;
  impact?: string;
  ordem: number;
  technologies: WorkTechnology[];
  responsibilities: WorkResponsibility[];
}

export interface WorkTechnology {
  id: string;
  workExperienceId: string;
  technology: string;
}

export interface WorkResponsibility {
  id: string;
  workExperienceId: string;
  responsibility: string;
  ordem: number;
}

export interface Footer {
  id: string;
  profileId: string;
  title: string;
  subtitle: string;
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  copyrightName: string;
  madeWith: string;
  resumeUrl?: string;
}

// DTOs para criação/atualização
export interface CreateUserDTO {
  email: string;
  senha: string;
  nome: string;
}

export interface CreateProfileDTO {
  userId: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  themeId?: number;
  templateType: "template_01" | "template_02" | "template_03";
  published?: boolean;
}

export interface UpdateProfileDTO {
  username?: string;
  bio?: string;
  avatarUrl?: string;
  theme?: Colors;
  mainColor?: string;
  templateType?: TemplateType;
  published?: boolean;
}

export interface CreateLegendaDTO {
  profileId: string;
  greeting?: string;
  legendaFoto: string;
  nome: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
}

export interface CreateConfigDTO {
  profileId: string;
  stacks: number;
  projetos: number;
}

export interface CreatePageDTO {
  profileId: string;
  titulo: string;
  slug: string;
  ordem?: number;
}

export interface CreateSocialDTO {
  profileId: string;
  plataforma: PlataformaSocial;
  url: string;
  ordem: number;
}

export interface UpdateSocialDTO extends Partial<Omit<CreateSocialDTO, 'profileId'>> {}

export interface CreateProjetoDTO {
  profileId: string;
  nome: string;
  descricao: string;
  demoLink?: string;
  codeLink?: string;
  gif: string;
  ordem?: number;
}

export interface UpdateProjetoDTO extends Partial<Omit<CreateProjetoDTO, 'profileId'>> {}

export interface CreateTechStackDTO {
  profileId?: string;
  title: string;
  subtitle: string;
  technologies: CreateTechnologyDTO[];
}

export interface CreateTechnologyDTO {
  name: string;
  icon: string;
  color: string;
  ordem: number;
}

export interface CreateWorkExperienceDTO {
  profileId: string;
  company: string;
  period: string;
  summary: string;
  impact?: string;
  ordem: number;
  technologies: { technology: string }[];
  responsibilities: { responsibility: string; ordem: number }[];
}

export interface UpdateWorkExperienceDTO extends Partial<Omit<CreateWorkExperienceDTO, 'profileId'>> {}

export interface CreateFooterDTO {
  profileId: string;
  title: string;
  subtitle: string;
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  copyrightName: string;
  madeWith: string;
  resumeUrl?: string;
}

export interface UpdateFooterDTO extends Partial<Omit<CreateFooterDTO, 'profileId'>> {}

// Respostas da API
export interface ApiResponse<T> {
  message: string;
  [key: string]: T | string;
}

// Auth
export interface LoginDTO {
  email: string;
  senha: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token?: string;
}
