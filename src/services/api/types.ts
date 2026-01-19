export enum Colors {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export enum TemplateType {
  template_01 = "template_01",
  template_02 = "template_02",
  template_03 = "template_03",
  template_04 = "template_04",
  template_05 = "template_05",
  template_06 = "template_06",
  template_07 = "template_07",
  template_08 = "template_08",
  template_09 = "template_09",
  template_10 = "template_10",
  template_11 = "template_11",
  template_12 = "template_12",
  template_13 = "template_13",
  template_14 = "template_14",
}

export enum Plataforma {
  instagram = "instagram",
  tiktok = "tiktok",
  youtube = "youtube",
  github = "github",
  linkedin = "linkedin",
  twitter = "twitter",
  facebook = "facebook",
  figma = "figma",
  devto = "devto",
  email = "email",
  behance = "behance",
  dribbble = "dribbble",
  medium = "medium",
  pinterest = "pinterest",
  gitlab = "gitlab",
  bitbucket = "bitbucket",
  stackoverflow = "stackoverflow",
  codepen = "codepen",
  discord = "discord",
  whatsapp = "whatsapp",
  telegram = "telegram",
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
  color: string;
  ordem: number;
}

export interface TechStack {
  id: string;
  title: string;
  subtitle: string;
  technologies: Technology[];
}

export interface WorkResponsibility {
  id: string;
  responsibility: string;
  ordem: number;
}

export interface WorkTechnology {
  id: string;
  technology: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  period: string;
  summary: string;
  impact?: string;
  ordem: number;
  technologies: WorkTechnology[];
  responsibilities: WorkResponsibility[];
}

export interface Social {
  id: string;
  plataforma: Plataforma;
  url: string;
  ordem: number;
}

export interface Legenda {
  id: string;
  greeting?: string;
  legendaFoto: string;
  nome: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
}

export interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  demoLink?: string;
  codeLink?: string;
  ordem: number;
  gif?: string;
  tags: string[];
}

export interface LinkButton {
  id: string;
  profileId: string;
  label: string;
  url: string;
  subtext?: string;
  icon?: string;
  style?: string;
  ordem: number;
  ativo: boolean;
}

export interface Config {
  id: string;
  stacks: number;
  projetos: number;
}

export interface Footer {
  id: string;
  title: string;
  subtitle: string;
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  copyrightName: string;
  madeWith?: string;
  resumeUrl?: string;
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  slug: string;
  bio?: string;
  avatarUrl?: string;
  theme: Colors;
  mainColor?: string;
  templateType: TemplateType;
  published: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioData {
  // Profile básico
  id: string;
  userId: string;
  username: string;
  slug: string;
  bio?: string;
  avatarUrl?: string;
  theme: Colors;
  mainColor?: string;
  templateType: TemplateType;
  published: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // Dados relacionados
  legendas: Legenda[];
  projetos: Projeto[];
  social: Social[];
  linkButtons?: LinkButton[];
  techStack?: TechStack;
  workHistory: WorkExperience[];
  footer?: Footer;
  config?: Config;
}

export interface PortfolioListItem {
  id: string;
  slug: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  templateType: TemplateType;
  published: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PreviewToken {
  token: string;
  expiresAt: string;
}
