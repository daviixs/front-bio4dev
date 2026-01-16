import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ProfileData } from "@/temas-lintree/types";

interface GourmetEditorProps {
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

const GourmetEditor: React.FC<GourmetEditorProps> = ({ profileData, onSave }) => {
  const [name, setName] = useState(profileData.name);
  const [bio, setBio] = useState(profileData.bio);
  const [photoUrl, setPhotoUrl] = useState(profileData.photoUrl);

  const handleSave = () => {
    const updatedProfile = {
      ...profileData,
      name,
      bio,
      photoUrl,
    };
    onSave(updatedProfile);
    toast.success("Gourmet profile saved successfully!");
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Gourmet Profile Editor</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
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
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
      </div>
    </div>
  );
};

export default GourmetEditor;