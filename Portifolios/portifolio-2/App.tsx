import React, { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import SocialLinksGrid from "./components/SocialLinksGrid";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectsGrid from "./components/ProjectsGrid";
import TechStack from "./components/TechStack";
import { LoadingSpinner, ErrorState } from "./components/ui";
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
  }, [username, previewToken]);

  const handleEditExperience = (id: string, updatedExperience: any) => {
    if (data) {
      setData({
        ...data,
        experience: data.experience.map((exp) =>
          exp.id === id ? { ...exp, ...updatedExperience } : exp
        ),
      });
    }
  };

  const handleEditProject = (id: string, updatedProject: any) => {
    if (data) {
      setData({
        ...data,
        projects: data.projects.map((proj) =>
          proj.id === id ? { ...proj, ...updatedProject } : proj
        ),
      });
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading portfolio..." />;
  }

  if (error || !data) {
    return (
      <ErrorState
        message={
          error || "This profile does not exist or is not published yet."
        }
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#050505] overflow-x-hidden text-slate-200">
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl z-10 px-6 py-10 flex flex-col gap-6">
        <ProfileCard profile={data.profile} />
        <SocialLinksGrid links={data.socialLinks} />
        <ExperienceTimeline
          experiences={data.experience}
          onEdit={handleEditExperience}
        />
        <ProjectsGrid projects={data.projects} onEdit={handleEditProject} />
        <TechStack technologies={data.techStack} />
      </main>
    </div>
  );
}

export default App;
