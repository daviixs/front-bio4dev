import React from "react";
import { useParams } from "react-router-dom";
import { profileApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import ProfileScreen from "@/temas-lintree/components/ProfileScreen";
import type { ProfileData } from "@/temas-lintree/types";

export default function InfluencerPreviewPage() {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const { profile } = useAuthStore();

  const [profileData, setProfileData] = React.useState<ProfileData | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProfileData = async () => {
      if (!portfolioId) return;

      setIsLoading(true);
      try {
        const profileResponse = await profileApi.getComplete(portfolioId);
        setProfileData(profileResponse);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [portfolioId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        {profileData ? (
          <ProfileScreen profile={profileData} />
        ) : (
          <p className="text-center text-slate-500">Profile not found.</p>
        )}
      </div>
    </div>
  );
}
