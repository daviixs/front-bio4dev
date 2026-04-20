import { Layout, FileCode2, FileJson, Atom } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import { PortfolioData } from './types';
import { ScrollArea } from './components/ui/scroll-area';
import { motion } from 'motion/react';

const portfolioData: PortfolioData = {
  name: 'M Portfolio',
  initials: 'M',
  hero: {
    title: 'I do code and',
    gradientTitle: 'make content about it!',
    description:
      'I am a seasoned full-stack software engineer with over 8 years of professional experience, specializing in backend development. My expertise lies in crafting robust and scalable SaaS-based architectures on the Amazon AWS platform.',
    avatarUrl:
      'https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent',
  },
  techStack: [
    {
      name: 'JavaScript',
      icon: <FileJson className="w-5 h-5" />,
      color: '#f7df1e',
    },
    {
      name: 'Next.js',
      icon: <span className="text-[10px]">NEXT</span>,
      color: '#ffffff',
    },
    { name: 'HTML5', icon: <Layout className="w-5 h-5" />, color: '#e34f26' },
    { name: 'CSS3', icon: <FileCode2 className="w-5 h-5" />, color: '#1572b6' },
    { name: 'React', icon: <Atom className="w-5 h-5" />, color: '#61dafb' },
  ],
  projects: [
    {
      id: '1',
      title: 'HTML Tutorial',
      subtitle: 'HTML TUTORIAL',
      thumbnailText: 'POWER OF HTML',
      thumbnailBg: '#111111',
      link: '#',
    },
    {
      id: '2',
      title: 'CSS Tutorial',
      subtitle: 'CSS TUTORIAL',
      thumbnailText: 'UNLOCK CSS MAGIC',
      thumbnailBg: '#1a237e',
      link: '#',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Google',
      role: 'Lead Software Engineer at Google',
      period: 'Nov 2019 – Present',
      description:
        "Pivotal role in developing innovative solutions for Google's core search algorithms. Enhanced search accuracy and efficiency for millions worldwide.",
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
    },
    {
      id: '2',
      company: 'Apple',
      role: 'Junior Software Engineer at Apple',
      period: 'Jan 2016 – Dec 2017',
      description:
        'Software Architect for mission-critical projects, shaping scalable architectures and providing technical leadership to cross-functional teams.',
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 384 512">
          <path
            fill="#000"
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
          />
        </svg>
      ),
    },
    {
      id: '3',
      company: 'Meta',
      role: 'Software Engineer at Meta',
      period: 'Jan 2017 – Oct 2019',
      description:
        'Focused on backend systems for social media dynamic platforms, handling large-scale data processing and engagement features.',
      logo: (
        <svg className="w-5 h-5" viewBox="0 0 512 512">
          <path
            fill="#1877F2"
            d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256c0 120.3 82.7 220.8 196.2 246.4V328.6h-59.1v-72.6h59.1v-55.2c0-58.4 34.8-90.6 87.8-90.6 25.5 0 52.1 4.6 52.1 4.6v57.4h-29.3c-28.9 0-38 17.9-38 36.4v47.4h64.6l-10.3 72.6h-54.3v173.8C429.3 476.8 512 376.3 512 256z"
          />
        </svg>
      ),
    },
  ],
  contact: {
    description:
      'Seasoned Full Stack Software Engineer with over 8 years of hands-on experience in designing and implementing robust, scalable, and innovative web solutions. Adept at leveraging a comprehensive skill set.',
    email: 'abmcodehub@gmail.com',
    socials: {
      instagram: '#',
      twitter: '#',
      youtube: '#',
    },
  },
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#FF6B35] selection:text-white">
      <div className="w-full max-w-[1024px] mx-auto flex flex-col px-6 md:px-10 relative">
        <Navbar initials={portfolioData.initials} />

        <main className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-[30px] flex-1 pb-10">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <ScrollArea className="h-full pr-4">
              <div className="flex flex-col justify-between min-h-full">
                <Hero
                  title={portfolioData.hero.title}
                  gradientTitle={portfolioData.hero.gradientTitle}
                  description={portfolioData.hero.description}
                  avatarUrl={portfolioData.hero.avatarUrl}
                />
                <TechStack items={portfolioData.techStack} />
              </div>
            </ScrollArea>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <ScrollArea className="h-full pr-4">
              <div className="flex flex-col gap-10 lg:gap-[30px]">
                <Projects projects={portfolioData.projects} />
                <Experience items={portfolioData.experience} />
              </div>
            </ScrollArea>
          </motion.div>
        </main>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Footer
            description={portfolioData.contact.description}
            email={portfolioData.contact.email}
            socials={portfolioData.contact.socials}
          />
        </motion.div>
      </div>
    </div>
  );
}
