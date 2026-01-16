
import React from 'react';
import { ProfileData, SocialLink } from '../types';
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Music, 
  Video, 
  Linkedin, 
  MessageCircle, 
  Facebook,
  ExternalLink 
} from 'lucide-react';

interface ProfileScreenProps {
  profile: ProfileData;
}

const SocialIcon = ({ platform }: { platform: SocialLink['platform'] }) => {
  switch (platform) {
    case 'instagram': return <Instagram size={20} />;
    case 'twitter': return <Twitter size={20} />;
    case 'youtube': return <Youtube size={20} />;
    case 'spotify': return <Music size={20} />;
    case 'tiktok': return <Video size={20} />;
    case 'linkedin': return <Linkedin size={20} />;
    case 'whatsapp': return <MessageCircle size={20} />;
    case 'facebook': return <Facebook size={20} />;
    default: return <ExternalLink size={20} />;
  }
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile }) => {
  // Check if background is a Tailwind class or an image URL
  const isCustomBg = profile.backgroundStyle.includes('url');

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center p-6 ${!isCustomBg ? profile.backgroundStyle : ''}`} 
         style={isCustomBg ? { backgroundImage: profile.backgroundStyle.match(/url\(['"]?([^'"]+)['"]?\)/)?.[1] ? profile.backgroundStyle : undefined, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      
      {/* Overlay for image backgrounds to ensure readability */}
      {isCustomBg && <div className="absolute inset-0 bg-black/40 z-0" />}

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Profile Header */}
        <div className="mt-8 mb-6 flex flex-col items-center">
          <div className="relative mb-4 group">
             <div className={`absolute -inset-1 ${profile.accentColor} rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}></div>
             <img 
              src={profile.photoUrl} 
              alt={profile.name} 
              className="relative w-28 h-28 rounded-full border-4 border-white/50 shadow-xl object-cover"
            />
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${profile.textColor} text-center`}>
            {profile.name}
          </h1>
          <p className={`text-sm opacity-90 ${profile.textColor} text-center max-w-[280px] leading-relaxed font-medium`}>
            {profile.bio}
          </p>
        </div>

        {/* Buttons List */}
        <div className="w-full flex flex-col gap-4 mt-2">
          {profile.buttons.map((btn, index) => (
            <a 
              key={index}
              href={btn.url}
              className={`flex flex-col items-center justify-center p-4 text-center group ${profile.buttonStyle}`}
            >
              <span className="text-base font-semibold">{btn.label}</span>
              {btn.subtext && <span className="text-xs opacity-70 mt-0.5">{btn.subtext}</span>}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-10 mb-8">
          {profile.socials.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              className={`p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 transition-all duration-300 ${profile.textColor}`}
            >
              <SocialIcon platform={social.platform} />
            </a>
          ))}
        </div>

        <div className={`mt-auto mb-4 text-[10px] uppercase tracking-widest font-bold opacity-40 ${profile.textColor}`}>
          Powered by LinkHub
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
