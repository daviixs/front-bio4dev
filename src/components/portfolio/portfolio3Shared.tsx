import { useState, type CSSProperties, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import {
  ArrowUpRight,
  Mail,
  Menu,
  Pencil,
  X,
} from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/components/ui/utils';
import { getSocialIconComponent } from '@/lib/socialIcons';
import { TechIcon } from './TechIcon';
import type {
  Legenda,
  PlataformaSocial,
  ProfileComplete,
  Projeto,
  Social,
  Technology,
  WorkExperience,
} from '@/types';

export interface Portfolio3SocialSlot {
  id: 'instagram' | 'twitter' | 'youtube';
  label: string;
  aliases: PlataformaSocial[];
  preferredPlatform: PlataformaSocial;
  icon: IconType;
}

export interface Portfolio3FooterSocialLink {
  id: string;
  label: string;
  url?: string;
  icon: IconType;
  onClick?: () => void;
}

export const PORTFOLIO3_SOCIAL_SLOTS: Portfolio3SocialSlot[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    aliases: ['instagram'],
    preferredPlatform: 'instagram',
    icon: getSocialIconComponent('instagram'),
  },
  {
    id: 'twitter',
    label: 'X (Twitter)',
    aliases: ['twitter', 'x'],
    preferredPlatform: 'twitter',
    icon: getSocialIconComponent('twitter'),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    aliases: ['youtube'],
    preferredPlatform: 'youtube',
    icon: getSocialIconComponent('youtube'),
  },
];

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const PORTFOLIO3_DEFAULT_HEADLINE =
  'I do code and make content about it!';

export function getPortfolio3Initials(profile: ProfileComplete) {
  const source = profile.legendas?.[0]?.nome?.trim() || profile.username || 'M';
  const initials = source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() || '')
    .join('');

  return initials || source.slice(0, 1).toUpperCase() || 'M';
}

export function getPortfolio3ProjectLink(project: Projeto) {
  return project.demoLink || project.codeLink || '';
}

export function getPortfolio3ProjectSubtitle(project: Projeto) {
  return project.tags?.[0] || project.nome?.toUpperCase() || 'PROJECT';
}

export function getPortfolio3HeroHeadline(legenda?: Legenda) {
  const greeting = legenda?.greeting?.trim();
  const titulo = legenda?.titulo?.trim();

  if (titulo && greeting) {
    const normalizedGreeting = greeting.toLowerCase();
    const normalizedTitulo = titulo.toLowerCase();

    if (
      normalizedTitulo === normalizedGreeting ||
      normalizedTitulo.startsWith(`${normalizedGreeting} `)
    ) {
      return titulo;
    }

    return `${greeting} ${titulo}`.trim();
  }

  return titulo || greeting || PORTFOLIO3_DEFAULT_HEADLINE;
}

export function isPortfolio3ColorToken(value?: string) {
  if (!value) return false;

  const normalized = value.trim();

  return (
    /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(normalized) ||
    /^rgb(a)?\(/i.test(normalized) ||
    /^hsl(a)?\(/i.test(normalized)
  );
}

export function getPortfolio3ProjectMediaStyle(
  asset?: string,
): CSSProperties | undefined {
  if (!asset?.trim()) return undefined;

  if (isPortfolio3ColorToken(asset)) {
    return { backgroundColor: asset.trim() };
  }

  return {
    backgroundImage: `url(${asset.trim()})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
}

export function getPortfolio3ExperienceDescription(work: WorkExperience) {
  return (
    work.impact ||
    work.responsibilities?.[0]?.responsibility ||
    'Descreva o impacto desta experiência.'
  );
}

export function getPortfolio3CompanyInitials(company?: string) {
  const source = company?.trim() || 'CO';
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

export function findPortfolio3Social(
  socials: Social[] | undefined,
  slotId: Portfolio3SocialSlot['id'],
) {
  const slot = PORTFOLIO3_SOCIAL_SLOTS.find((item) => item.id === slotId);

  if (!slot) return undefined;

  return socials?.find((social) =>
    slot.aliases.includes(social.plataforma as PlataformaSocial),
  );
}

interface Portfolio3NavbarProps {
  initials: string;
  onInitialsClick?: () => void;
}

export function Portfolio3Navbar({
  initials,
  onInitialsClick,
}: Portfolio3NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const BrandTag = onInitialsClick ? 'button' : 'div';

  return (
    <nav className="sticky top-0 z-[100] flex h-20 shrink-0 items-center justify-between border-b border-[#222] bg-[#0d0d0d]/80 backdrop-blur-md md:border-none">
      <BrandTag
        {...(onInitialsClick
          ? { type: 'button', onClick: onInitialsClick }
          : {})}
        className={cn(
          'font-serif text-3xl font-bold italic',
          onInitialsClick &&
            'cursor-pointer transition-opacity hover:opacity-80',
        )}
      >
        {initials}
      </BrandTag>

      <div className="hidden items-center md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="ml-6 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            {link.name}
          </a>
        ))}
      </div>

      <button
        type="button"
        className="p-2 text-white md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-4 absolute top-20 left-0 right-0 flex flex-col border-b border-[#222] bg-[#0d0d0d] p-6 duration-200 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="border-b border-[#1a1a1a] py-3 text-lg font-medium last:border-none"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

interface Portfolio3LayoutProps {
  initials: string;
  hero: ReactNode;
  techStack?: ReactNode;
  projects?: ReactNode;
  experience?: ReactNode;
  footer: ReactNode;
  onInitialsClick?: () => void;
}

export function Portfolio3Layout({
  initials,
  hero,
  techStack,
  projects,
  experience,
  footer,
  onInitialsClick,
}: Portfolio3LayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-[#0d0d0d] font-sans text-white selection:bg-[#FF6B35] selection:text-white">
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1024px] flex-col px-6 md:px-10">
        <Portfolio3Navbar
          initials={initials}
          onInitialsClick={onInitialsClick}
        />

        <main className="grid flex-1 grid-cols-1 gap-10 pb-10 lg:grid-cols-[420px_1fr] lg:gap-[30px]">
          <div className="h-full">
            <ScrollArea className="h-full pr-0 lg:pr-4">
              <div className="flex min-h-full flex-col justify-between gap-10">
                {hero}
                {techStack}
              </div>
            </ScrollArea>
          </div>

          <div className="h-full">
            <ScrollArea className="h-full pr-0 lg:pr-4">
              <div className="flex flex-col gap-10 lg:gap-[30px]">
                {projects}
                {experience}
              </div>
            </ScrollArea>
          </div>
        </main>

        {footer}
      </div>
    </div>
  );
}

interface Portfolio3HeroSectionProps {
  avatar: ReactNode;
  headline: ReactNode;
  description: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
}

export function Portfolio3HeroSection({
  avatar,
  headline,
  description,
  primaryAction,
  secondaryAction,
}: Portfolio3HeroSectionProps) {
  return (
    <section id="home" className="mt-8 md:mt-5">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#FF1493] to-[#8A2BE2] p-1 md:mx-0 md:h-28 md:w-28">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a]">
          {avatar}
        </div>
      </div>

      <div className="mb-4 text-center md:text-left">
        <div className="text-4xl font-extrabold leading-[1.1] md:text-[42px]">
          {headline}
        </div>
      </div>

      <div className="mx-auto mb-6 max-w-md text-center text-sm leading-[1.5] text-[#a0a0a0] md:mx-0 md:text-left md:text-[14px]">
        {description}
      </div>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </section>
  );
}

interface Portfolio3TechStackSectionProps {
  items: Technology[];
  action?: ReactNode;
  onRemoveTech?: (tech: Technology) => void;
  emptyState?: ReactNode;
}

export function Portfolio3TechStackSection({
  items,
  action,
  onRemoveTech,
  emptyState,
}: Portfolio3TechStackSectionProps) {
  return (
    <section className="mt-12 md:mt-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-center text-[11px] font-bold uppercase tracking-[2px] text-[#666] md:text-left">
          Experience With
        </div>
        {action}
      </div>

      {items.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          {items.map((item) => (
            <div key={item.id} className="group/item relative">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#333] bg-[#1a1a1a] text-[12px] font-bold transition-colors hover:border-[#555]"
                title={item.name}
              >
                <TechIcon
                  icon={item.icon}
                  size={20}
                  className={item.color || 'text-[#FF6B35]'}
                />
              </div>

              {onRemoveTech && (
                <button
                  type="button"
                  onClick={() => onRemoveTech(item)}
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B35] text-white opacity-0 shadow-md transition-opacity group-hover/item:opacity-100"
                  aria-label={`Remover ${item.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xs text-[#777] md:text-left">
          {emptyState || 'Nenhuma tecnologia adicionada ainda.'}
        </div>
      )}
    </section>
  );
}

interface Portfolio3ProjectsSectionProps {
  projects: Projeto[];
  action?: ReactNode;
  onProjectClick?: (project: Projeto) => void;
  emptyState?: ReactNode;
}

export function Portfolio3ProjectsSection({
  projects,
  action,
  onProjectClick,
  emptyState,
}: Portfolio3ProjectsSectionProps) {
  return (
    <section id="projects">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="text-lg font-bold text-[#FF6B35]">PROJECTS</div>
        {action}
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => {
            const link = getPortfolio3ProjectLink(project);
            const mediaStyle = getPortfolio3ProjectMediaStyle(project.gif);
            const interactive = Boolean(onProjectClick);
            const content = (
              <>
                <div
                  className="relative flex h-32 w-full items-center justify-center overflow-hidden font-black tracking-wider"
                  style={mediaStyle}
                >
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/60 to-transparent" />
                  <span className="z-20 px-4 text-center text-sm uppercase">
                    {project.nome || 'PROJECT'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 text-[10px] font-semibold">
                  <div>{getPortfolio3ProjectSubtitle(project)}</div>
                  <span className="flex items-center gap-1 uppercase opacity-60 transition-opacity group-hover:opacity-100">
                    {interactive ? 'Edit' : 'Visit'}
                    {interactive ? (
                      <Pencil className="h-3 w-3" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3" />
                    )}
                  </span>
                </div>
              </>
            );

            if (interactive) {
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onProjectClick?.(project)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#222] bg-[#1a1a1a] text-left transition-colors hover:border-[#444]"
                >
                  {content}
                </button>
              );
            }

            return (
              <a
                key={project.id}
                href={link || '#projects'}
                target={link ? '_blank' : undefined}
                rel={link ? 'noopener noreferrer' : undefined}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#222] bg-[#1a1a1a] transition-colors hover:border-[#444]"
              >
                {content}
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-xs text-[#777]">
          {emptyState || 'Nenhum projeto.'}
        </div>
      )}
    </section>
  );
}

interface Portfolio3ExperienceSectionProps {
  items: WorkExperience[];
  action?: ReactNode;
  onExperienceClick?: (work: WorkExperience) => void;
  emptyState?: ReactNode;
}

export function Portfolio3ExperienceSection({
  items,
  action,
  onExperienceClick,
  emptyState,
}: Portfolio3ExperienceSectionProps) {
  return (
    <section id="experience" className="flex-1">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="text-lg font-bold text-[#4A9EFF]">EXPERIENCE</div>
        {action}
      </div>

      {items.length > 0 ? (
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const interactive = Boolean(onExperienceClick);
            const content = (
              <>
                <div className="flex h-10 w-10 min-w-[40px] items-center justify-center overflow-hidden rounded-lg bg-[#eee] font-bold text-black">
                  {getPortfolio3CompanyInitials(item.company)}
                </div>
                <div className="min-w-0">
                  <div className="mb-0.5 flex items-start justify-between gap-3">
                    <h4 className="text-sm font-bold">{item.summary}</h4>
                    {interactive && (
                      <Pencil className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#777]" />
                    )}
                  </div>
                  <div className="mb-1.5 text-xs text-[#a0a0a0]">
                    {item.period}
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#888]">
                    {getPortfolio3ExperienceDescription(item)}
                  </p>
                </div>
              </>
            );

            if (interactive) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onExperienceClick?.(item)}
                  className="flex gap-4 border-b border-[#222] pb-4 text-left last:border-none"
                >
                  {content}
                </button>
              );
            }

            return (
              <div
                key={item.id}
                className="flex gap-4 border-b border-[#222] pb-4 last:border-none"
              >
                {content}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-xs text-[#777]">
          {emptyState || 'Nenhuma experiência adicionada.'}
        </div>
      )}
    </section>
  );
}

interface Portfolio3FooterSectionProps {
  description: ReactNode;
  email: ReactNode;
  socialLinks: Portfolio3FooterSocialLink[];
}

export function Portfolio3FooterSection({
  description,
  email,
  socialLinks,
}: Portfolio3FooterSectionProps) {
  return (
    <footer
      id="contact"
      className="flex min-h-[120px] shrink-0 flex-col items-center gap-8 border-t border-[#222] py-10 md:flex-row md:gap-8 md:py-0"
    >
      <div className="max-w-md text-center md:text-left">
        <h3 className="mb-2 text-lg font-bold">Contact</h3>
        <div className="text-[11px] leading-relaxed text-[#a0a0a0]">
          {description}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 md:items-end">
        {email ? (
          <div className="flex items-center gap-2 text-sm text-white">
            <Mail className="h-4 w-4 shrink-0" />
            {email}
          </div>
        ) : null}

        {socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 text-[12px] text-[#777] md:justify-end">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              if (social.onClick) {
                return (
                  <button
                    key={social.id}
                    type="button"
                    onClick={social.onClick}
                    className="flex cursor-pointer items-center gap-1 transition-colors hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {social.label}
                  </button>
                );
              }

              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {social.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </footer>
  );
}
