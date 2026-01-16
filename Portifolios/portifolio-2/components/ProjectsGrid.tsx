import React from "react";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";
import { SectionTitle } from "./ui";

interface ProjectsGridProps {
  projects: Project[];
  onEdit?: (id: string, updatedProject: Partial<Project>) => void;
}

/**
 * Grid de projetos com título de seção
 */
const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onEdit }) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  const handleEdit = (project: Project) => {
    onEdit?.(project.id, project);
  };

  return (
    <section className="w-full">
      <div className="px-3 sm:px-4 lg:px-1">
        <SectionTitle className="mb-2 sm:mb-3">
          Featured Projects
        </SectionTitle>
        <p className="text-sm text-gray-400 mb-4 sm:mb-6">
          Projects that best represent your work — optimized for every screen
          size.
        </p>
      </div>
      <div
        className="grid auto-rows-fr gap-4 sm:gap-5 md:gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
        role="list"
        aria-label="Project cards"
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={onEdit ? handleEdit : undefined}
            ariaLabel={`Project ${project.title}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsGrid;
