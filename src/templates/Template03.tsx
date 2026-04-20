import type { ProfileComplete } from '@/types';
import {
  getPortfolio3HeroHeadline,
  Portfolio3FooterSection,
  Portfolio3HeroSection,
  Portfolio3Layout,
  Portfolio3ProjectsSection,
  Portfolio3TechStackSection,
  Portfolio3ExperienceSection,
  getPortfolio3Initials,
} from '@/components/portfolio/portfolio3Shared';
import { buildRenderableSocialLinks } from '@/lib/socialIcons';

interface TemplateProps {
  profile: ProfileComplete;
}

export function Template03({ profile }: TemplateProps) {
  const legenda = profile.legendas?.[0];
  const techs = profile.techStack?.technologies || [];
  const projects = profile.projetos || [];
  const experience = profile.workHistory || [];
  const footerDescription =
    profile.footer?.subtitle || legenda?.descricao || 'Descreva seu trabalho.';
  const footerEmail = profile.footer?.email;
  const socialLinks = buildRenderableSocialLinks(profile.social, profile.footer);

  return (
    <Portfolio3Layout
      initials={getPortfolio3Initials(profile)}
      hero={
        <Portfolio3HeroSection
          avatar={
            <img
              src={
                profile.avatarUrl ||
                legenda?.legendaFoto ||
                'https://api.dicebear.com/7.x/notionists/svg?seed=Bio4Dev&backgroundColor=transparent'
              }
              alt={legenda?.nome || profile.username}
              className="h-full w-full object-cover"
            />
          }
          headline={
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF1493] bg-clip-text text-transparent">
              {getPortfolio3HeroHeadline(legenda)}
            </span>
          }
          description={
            legenda?.descricao ||
            'Descreva aqui sua atuação, experiência e o que você está construindo.'
          }
          primaryAction={
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gray-200"
            >
              Get In Touch
            </a>
          }
          secondaryAction={
            profile.footer?.resumeUrl ? (
              <a
                href={profile.footer.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Download CV
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white/40">
                Download CV
              </span>
            )
          }
        />
      }
      techStack={
        techs.length > 0 ? <Portfolio3TechStackSection items={techs} /> : null
      }
      projects={
        projects.length > 0 ? (
          <Portfolio3ProjectsSection projects={projects} />
        ) : null
      }
      experience={
        experience.length > 0 ? (
          <Portfolio3ExperienceSection items={experience} />
        ) : null
      }
      footer={
        <Portfolio3FooterSection
          description={<p>{footerDescription}</p>}
          email={
            footerEmail ? (
              <a
                href={`mailto:${footerEmail}`}
                className="transition-colors hover:text-[#FF6B35]"
              >
                {footerEmail}
              </a>
            ) : null
          }
          socialLinks={socialLinks}
        />
      }
    />
  );
}
