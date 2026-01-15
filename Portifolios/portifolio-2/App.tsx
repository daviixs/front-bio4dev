import React, { useEffect, useState } from "react";
import { MapPin, User } from "lucide-react";
import Avatar from "./components/Avatar";
import InfoRow from "./components/InfoRow";
import SocialCard from "./components/SocialCard";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectCard from "./components/ProjectCard";
import TechStack from "./components/TechStack";
import { getPortfolio2Data, Portfolio2Data } from "@/lib/api-portfolio2";

function App() {
  const [data, setData] = useState<Portfolio2Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pega username da URL (futuro: username.bio4dev.com ou bio4dev.com/username)
  const username = "joaosilva"; // TODO: Pegar da URL/rota

  // Pega preview token da query string se existir
  const previewToken = new URLSearchParams(window.location.search).get(
    "preview"
  );

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const portfolio = await getPortfolio2Data(
          username,
          previewToken || undefined
        );
        setData(portfolio);
      } catch (err: any) {
        console.error("Erro ao carregar portfólio:", err);
        setError(err.message || "Erro ao carregar dados do portfólio");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  const handleEditExperience = (id: string, updatedExperience: any) => {
    console.log("Editing experience:", id, updatedExperience);
    // TODO: Implement API call to update experience
    // For now, just update local state
    if (data) {
      setData({
        ...data,
        experience: data.experience.map(exp =>
          exp.id === id ? { ...exp, ...updatedExperience } : exp
        )
      });
    }
  };

  const handleEditProject = (id: string, updatedProject: any) => {
    console.log("Editing project:", id, updatedProject);
    // TODO: Implement API call to update project
    // For now, just update local state
    if (data) {
      setData({
        ...data,
        projects: data.projects.map(proj =>
          proj.id === id ? { ...proj, ...updatedProject } : proj
        )
      });
    }
  };
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
          <p className="text-gray-400 text-sm">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Profile not found</h1>
          <p className="text-gray-400 mb-8">
            {error || "This profile does not exist or is not published yet."}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Go back home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden text-slate-200">
      {/* Main Container */}
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl z-10 px-6 py-10 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-[#121318] rounded-[2rem] p-6 sm:p-8 border border-white/5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="flex-shrink-0">
              <Avatar src={data.profile.avatarUrl} alt={data.profile.name} />
            </div>

            <div className="flex-1 text-center sm:text-left mt-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                {data.profile.name}
              </h1>
              <p className="text-yellow-500 font-medium text-sm mb-4">
                {data.profile.role}
              </p>

              <div className="flex flex-col gap-2 mb-4">
                <InfoRow icon={User} text={data.profile.tagline} />
                <InfoRow icon={MapPin} text={data.profile.location} />
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
          {data.socialLinks.map((link) => (
            <SocialCard key={link.id} item={link} />
          ))}
        </section>

        {/* Experience Section */}
        <ExperienceTimeline experiences={data.experience} onEdit={handleEditExperience} />

        {/* Projects Section */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
            <h2 className="text-xl font-bold text-white">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} onEdit={handleEditProject} />
            ))}
          </div>
        </section>

        {/* Tech Stack Section - Replaced Skills */}
        <TechStack technologies={data.techStack} />
      </main>
    </div>
  );
}

export default App;
