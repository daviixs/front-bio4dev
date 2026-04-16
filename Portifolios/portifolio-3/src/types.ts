import { ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  thumbnailText: string;
  thumbnailBg: string;
  link: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo: ReactNode;
}

export interface TechItem {
  name: string;
  icon: ReactNode;
  color: string;
}

export interface PortfolioData {
  name: string;
  initials: string;
  hero: {
    title: string;
    gradientTitle: string;
    description: string;
    avatarUrl: string;
  };
  techStack: TechItem[];
  projects: Project[];
  experience: ExperienceItem[];
  contact: {
    description: string;
    email: string;
    socials: {
      instagram: string;
      twitter: string;
      youtube: string;
    };
  };
}
