import React from "react";
import { Section, SectionTitle, EmptyState, Tag } from "./ui";

interface TechStackProps {
  technologies: string[];
}

/**
 * Seção de tecnologias/stack técnico
 */
const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  return (
    <Section>
      <SectionTitle>Tech Stack</SectionTitle>

      {!technologies || technologies.length === 0 ? (
        <EmptyState message="No technologies listed" />
      ) : (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Tag key={tech} variant="tech">
              {tech}
            </Tag>
          ))}
        </div>
      )}
    </Section>
  );
};

export default TechStack;
