import { LucideIcon } from 'lucide-react';

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
