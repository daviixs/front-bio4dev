import React from 'react';
import { MapPin, User } from 'lucide-react';
import Avatar from './components/Avatar';
import InfoRow from './components/InfoRow';
import SocialCard from './components/SocialCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectCard from './components/ProjectCard';
import TechStack from './components/TechStack';
import { PROFILE_DATA, SOCIAL_LINKS, PROJECTS_DATA } from './constants';

function App() {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden text-slate-200">
      
      {/* Main Container */}
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl z-10 px-6 py-10 flex flex-col gap-6">
        
        {/* Profile Card */}
        <div className="bg-[#121318] rounded-[2rem] p-6 sm:p-8 border border-white/5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="flex-shrink-0">
                     <Avatar src={PROFILE_DATA.avatarUrl} alt={PROFILE_DATA.name} />
                </div>
                
                <div className="flex-1 text-center sm:text-left mt-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">{PROFILE_DATA.name}</h1>
                    <p className="text-yellow-500 font-medium text-sm mb-4">{PROFILE_DATA.role}</p>
                    
                    <div className="flex flex-col gap-2 mb-4">
                        <InfoRow icon={User} text={PROFILE_DATA.tagline} />
                        <InfoRow icon={MapPin} text={PROFILE_DATA.location} />
                    </div>

                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Open to work
                    </div>
                </div>
            </div>
        </div>

        {/* Social Links Section - Moved Up */}
        <section className="grid grid-cols-2 gap-4">
            {SOCIAL_LINKS.map((link) => (
                <SocialCard key={link.id} item={link} />
            ))}
        </section>

        {/* Experience Section */}
        <ExperienceTimeline />

        {/* Projects Section */}
        <section>
             <div className="flex items-center gap-2 mb-4 px-2">
                <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
                <h2 className="text-xl font-bold text-white">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROJECTS_DATA.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>

        {/* Tech Stack Section - Replaced Skills */}
        <TechStack />

      </main>
    </div>
  );
}

export default App;
