import React from "react";
import { MapPin, User } from "lucide-react";
import Avatar from "./Avatar";
import InfoRow from "./InfoRow";
import { Section, Tag } from "./ui";

interface ProfileData {
  avatarUrl: string;
  name: string;
  role: string;
  tagline: string;
  location: string;
  openToWork?: boolean;
}

interface ProfileCardProps {
  profile: ProfileData;
}

/**
 * Card de perfil principal com avatar, nome, role e informações
 */
const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Section className="sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex-shrink-0">
          <Avatar src={profile.avatarUrl} alt={profile.name} />
        </div>

        <div className="flex-1 text-center sm:text-left mt-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
            {profile.name}
          </h1>
          <p className="text-yellow-500 font-medium text-sm mb-4">
            {profile.role}
          </p>

          <div className="flex flex-col gap-2 mb-4">
            <InfoRow icon={User} text={profile.tagline} />
            <InfoRow icon={MapPin} text={profile.location} />
          </div>

          {profile.openToWork !== false && (
            <Tag variant="status">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open to work
            </Tag>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ProfileCard;
