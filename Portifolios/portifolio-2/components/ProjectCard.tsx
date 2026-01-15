import React, { useState } from "react";
import { ExternalLink, FolderGit2, Edit2, X, Save } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: project.title,
    description: project.description,
    tags: project.tags.join(", "),
    link: project.link,
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
      link: project.link,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-[#18181b] p-5 rounded-2xl border border-yellow-500/50">
        <div className="flex justify-between items-center mb-4">
          <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
            <Edit2 size={20} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
            >
              <Save size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full bg-[#121318] border border-white/10 rounded-lg px-3 py-2 text-white text-lg font-bold focus:border-yellow-500 focus:outline-none"
            placeholder="Project title"
          />

          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full bg-[#121318] border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm focus:border-yellow-500 focus:outline-none resize-none"
            rows={3}
            placeholder="Project description"
          />

          <input
            type="text"
            value={editData.tags}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, tags: e.target.value }))
            }
            className="w-full bg-[#121318] border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm focus:border-yellow-500 focus:outline-none"
            placeholder="Tags (separated by commas)"
          />

          <input
            type="url"
            value={editData.link}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, link: e.target.value }))
            }
            className="w-full bg-[#121318] border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm focus:border-yellow-500 focus:outline-none"
            placeholder="Project link"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#18181b] p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group relative">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/5 rounded-lg text-yellow-500">
          <FolderGit2 size={20} />
        </div>
        <div className="flex gap-2">
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {onEdit && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-yellow-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-2 py-1 bg-white/5 text-gray-300 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
