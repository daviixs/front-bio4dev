import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="relative group">
      {/* Main Container - Removed Glow */}
      <div className="relative w-40 h-40 mx-auto bg-[#fbbf24] rounded-full border-4 border-[#121318] overflow-hidden shadow-xl">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover pt-2"
        />
      </div>
    </div>
  );
};

export default Avatar;