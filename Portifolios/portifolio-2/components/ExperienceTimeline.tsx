import React, { useState } from "react";
import { Experience } from "../types";
import { Edit2, Save, X } from "lucide-react";
import { Section, SectionTitle, EmptyState } from "./ui";

interface ExperienceTimelineProps {
  experiences: Experience[];
  onEdit?: (id: string, updatedExperience: Partial<Experience>) => void;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  onEdit,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Experience>>({});

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setEditData({ ...experience });
  };

  const handleSave = () => {
    if (editingId && onEdit) {
      onEdit(editingId, editData);
    }
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleInputChange = (
    field: keyof Experience,
    value: string | boolean
  ) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Section>
      <SectionTitle>Experience</SectionTitle>

      {!experiences || experiences.length === 0 ? (
        <EmptyState message="No experience data available" />
      ) : (
        <div className="relative border-l border-gray-800 ml-3 space-y-8">
          {experiences.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div key={item.id} className="ml-6 relative group">
                {/* Dot on timeline */}
                <span
                  className={`absolute -left-[1.95rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#121318] ${
                    item.current ? "bg-yellow-500 animate-pulse" : "bg-gray-600"
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.role || ""}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-lg font-semibold focus:outline-none focus:border-yellow-500"
                      placeholder="Role"
                    />
                  ) : (
                    <h3 className="text-white font-semibold text-lg">
                      {item.role}
                    </h3>
                  )}

                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.date || ""}
                        onChange={(e) =>
                          handleInputChange("date", e.target.value)
                        }
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs font-mono text-gray-500 focus:outline-none focus:border-yellow-500"
                        placeholder="Date"
                      />
                    ) : (
                      <time className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                        {item.date}
                      </time>
                    )}

                    {!isEditing && onEdit && (
                      <button
                        onClick={() => handleEdit(item)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                        title="Edit experience"
                      >
                        <Edit2 className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
                      </button>
                    )}

                    {isEditing && (
                      <div className="flex gap-1">
                        <button
                          onClick={handleSave}
                          className="p-1 hover:bg-green-500/20 rounded"
                          title="Save changes"
                        >
                          <Save className="w-4 h-4 text-green-500" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-1 hover:bg-red-500/20 rounded"
                          title="Cancel editing"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.company || ""}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-yellow-500/90 text-sm font-medium focus:outline-none focus:border-yellow-500"
                      placeholder="Company"
                    />
                  ) : (
                    <p className="text-yellow-500/90 text-sm font-medium mb-2">
                      {item.company}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  {isEditing ? (
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                      <input
                        type="checkbox"
                        checked={editData.current || false}
                        onChange={(e) =>
                          handleInputChange("current", e.target.checked)
                        }
                        className="rounded border-white/20 bg-white/10"
                      />
                      Current position
                    </label>
                  ) : (
                    item.current && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">
                        Current
                      </span>
                    )
                  )}
                </div>

                {isEditing ? (
                  <textarea
                    value={editData.description || ""}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-gray-400 text-sm leading-relaxed focus:outline-none focus:border-yellow-500 w-full resize-none"
                    placeholder="Description"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
};
};

export default ExperienceTimeline;
