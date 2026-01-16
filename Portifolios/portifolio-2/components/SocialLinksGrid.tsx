import React from "react";
import { SocialLink } from "../types";
import SocialCard from "./SocialCard";

interface SocialLinksGridProps {
  links: SocialLink[];
}

/**
 * Grid de links sociais
 */
const SocialLinksGrid: React.FC<SocialLinksGridProps> = ({ links }) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <section className="grid grid-cols-2 gap-4">
      {links.map((link) => (
        <SocialCard key={link.id} item={link} />
      ))}
    </section>
  );
};

export default SocialLinksGrid;
