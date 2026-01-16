
import React from 'react';

interface SharedHeaderProps {
  name: string;
  bio: string;
  photoUrl: string;
  textClassName?: string;
  imgClassName?: string;
  containerClassName?: string;
  decoration?: React.ReactNode;
}

const SharedHeader: React.FC<SharedHeaderProps> = ({ 
  name, bio, photoUrl, textClassName, imgClassName, containerClassName, decoration 
}) => (
  <div className={`flex flex-col items-center ${containerClassName || ''}`}>
    <div className="relative mb-6">
      {decoration}
      <img 
        src={photoUrl} 
        alt={name} 
        className={`object-cover shadow-lg ${imgClassName || 'w-24 h-24 rounded-full'}`} 
      />
    </div>
    <h1 className={`text-2xl font-bold text-center ${textClassName || ''}`}>{name}</h1>
    <p className={`text-sm text-center mt-2 px-4 opacity-80 ${textClassName || ''}`}>{bio}</p>
  </div>
);

export default SharedHeader;
