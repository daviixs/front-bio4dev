import React, { useState } from "react";
import { ExternalLink, FolderGit2, Edit2, X, Save } from "lucide-react";
import { Project } from "../types";
import { Tag, FormInput, FormTextarea, IconButton } from "./ui";

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  ariaLabel?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  ariaLabel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: project.title,
    description: project.description,
    tags: project.tags.join(", "),
    link: project.link || "",
  });

  const handleSave = () => {
    const updatedProject: Project = {
      ...project,
      title: editData.title,
      description: editData.description,
      tags: editData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      link: editData.link,
    };
    onEdit?.(updatedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      link: project.link || "",
    });
    setIsEditing(false);
  };

  const updateField = (field: keyof typeof editData, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  if (isEditing) {
    return (
      <article
        className="bg-[#18181b] p-5 rounded-2xl border border-yellow-500/50"
        aria-label={ariaLabel || `Editing project ${project.title}`}
        role="group"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
            <Edit2 size={20} />
          </div>
          <div className="flex gap-2">
            <IconButton icon={Save} variant="save" onClick={handleSave} />
            <IconButton icon={X} variant="cancel" onClick={handleCancel} />
          </div>
        </div>

        <div className="space-y-4">
          <FormInput
            value={editData.title}
            onChange={(v) => updateField("title", v)}
            placeholder="Project title"
            className="text-lg font-bold"
          />
          <FormTextarea
            value={editData.description}
            onChange={(v) => updateField("description", v)}
            placeholder="Project description"
          />
          <FormInput
            value={editData.tags}
            onChange={(v) => updateField("tags", v)}
            placeholder="Tags (separated by commas)"
            className="text-sm text-gray-300"
          />
          <FormInput
            type="url"
            value={editData.link}
            onChange={(v) => updateField("link", v)}
            placeholder="Project link"
            className="text-sm text-gray-300"
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-[#18181b] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group relative focus-within:border-yellow-500/50"
      aria-label={ariaLabel || `Project ${project.title}`}
      role="listitem"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg text-yellow-500">
          <FolderGit2 size={20} />
        </div>
        <div className="flex gap-2">
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181b]"
              aria-label={`Open ${project.title} in a new tab`}
              title={`Open ${project.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {onEdit && (
            <button
              onClick={() => setIsEditing(true)}
              type="button"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181b] opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label={`Edit ${project.title}`}
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
      </div>

      <h3 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-yellow-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2" aria-label="Project tags">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
