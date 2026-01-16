import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProfileData } from "@/temas-lintree/types";

interface BusinessEditorProps {
  profile: ProfileData;
  onSave: (data: ProfileData) => void;
}

const BusinessEditor: React.FC<BusinessEditorProps> = ({ profile, onSave }) => {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl);
  const [backgroundStyle, setBackgroundStyle] = useState(profile.backgroundStyle);
  const [textColor, setTextColor] = useState(profile.textColor);
  const [accentColor, setAccentColor] = useState(profile.accentColor);

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      name,
      bio,
      photoUrl,
      backgroundStyle,
      textColor,
      accentColor,
    };
    onSave(updatedProfile);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900">Business Portfolio Editor</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Describe yourself or your business"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="photoUrl">Photo URL</Label>
          <Input
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div>
          <Label htmlFor="backgroundStyle">Background Style</Label>
          <Input
            id="backgroundStyle"
            value={backgroundStyle}
            onChange={(e) => setBackgroundStyle(e.target.value)}
            placeholder="e.g., bg-slate-50"
          />
        </div>
        <div>
          <Label htmlFor="textColor">Text Color</Label>
          <Input
            id="textColor"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            placeholder="e.g., text-slate-900"
          />
        </div>
        <div>
          <Label htmlFor="accentColor">Accent Color</Label>
          <Input
            id="accentColor"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            placeholder="e.g., bg-blue-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
      </div>
    </div>
  );
};

export default BusinessEditor;