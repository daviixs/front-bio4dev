import { Mail, Facebook, Github, Figma, Code2, MapPin, Calendar, Briefcase, User } from 'lucide-react';
import { SocialLink, Experience, Project } from './types';

export const PROFILE_DATA = {
  name: "Muhammad Aqsam",
  handle: "@maqsam",
  role: "Product Designer & Developer",
  dob: "30.10.2002",
  tagline: "Building digital products that matter.",
  location: "Bahawalpur, Pakistan",
  joinedDate: "Joined on Feb 11, 2024",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=fbbf24&clothing=hoodie&clothingColor=3c4f5c"
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@m-aqsam',
    icon: Github,
    url: 'https://github.com',
    colorClass: 'bg-[#18181b] hover:bg-[#27272a] border border-gray-800', // Dark/Black
    colSpan: 2
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'maqsam1155@gmail.com',
    icon: Mail,
    url: 'mailto:maqsam1155@gmail.com',
    colorClass: 'bg-[#1e293b] hover:bg-[#263345]', // Dark Slate Blue
    colSpan: 1
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: '@m_aqsam',
    icon: Facebook,
    url: 'https://facebook.com',
    colorClass: 'bg-[#3b82f6] hover:bg-[#2563eb]', // Bright Blue
    colSpan: 1
  },
  {
    id: 'figma',
    name: 'Figma',
    handle: '@maqsam',
    icon: Figma,
    url: 'https://figma.com',
    colorClass: 'bg-[#1e1e1e] hover:bg-[#2d2d2d]', // Dark Gray
    colSpan: 1,
  },
  {
    id: 'dev',
    name: 'DEV',
    handle: '@maqsam',
    icon: Code2,
    url: 'https://dev.to',
    colorClass: 'bg-white hover:bg-gray-100', // White
    textColorClass: 'text-black',
    colSpan: 1
  }
];

export const TECH_STACK = [
  "React",
  "TypeScript", 
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Figma",
  "Git",
  "PostgreSQL", 
  "Framer Motion",
  "Prisma"
];

export const SKILL_DATA = [
  { subject: 'Frontend', A: 95, fullMark: 100 },
  { subject: 'Backend', A: 70, fullMark: 100 },
  { subject: 'Design', A: 90, fullMark: 100 },
  { subject: 'DevOps', A: 60, fullMark: 100 },
  { subject: 'Mobile', A: 75, fullMark: 100 },
  { subject: 'Strategy', A: 85, fullMark: 100 },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: '1',
    role: "Senior Product Designer",
    company: "TechFlow Solutions",
    date: "2023 - Present",
    description: "Leading the design system initiative and overseeing product UX for enterprise clients.",
    current: true
  },
  {
    id: '2',
    role: "Frontend Developer",
    company: "Creative Digital",
    date: "2021 - 2023",
    description: "Developed responsive web applications using React and TypeScript. Collaborated closely with UI designers.",
    current: false
  },
  {
    id: '3',
    role: "UI/UX Intern",
    company: "StartUp Inc",
    date: "2020 - 2021",
    description: "Assisted in wireframing and prototyping mobile applications. Conducted user research interviews.",
    current: false
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    title: "E-Commerce Dashboard",
    description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization.",
    tags: ["React", "Tailwind", "Recharts"],
    link: "#"
  },
  {
    id: 'p2',
    title: "HealthTrack App",
    description: "Mobile-first fitness tracking application focusing on simplicity and user retention.",
    tags: ["Figma", "UX Research", "Prototyping"],
    link: "#"
  },
  {
    id: 'p3',
    title: "Finance AI",
    description: "Personal finance assistant powered by generative AI to help users save money.",
    tags: ["TypeScript", "OpenAI API", "Node.js"],
    link: "#"
  }
];