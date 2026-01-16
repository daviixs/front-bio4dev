import React from "react";
import { ProfileData } from "@/temas-lintree/types";
import {
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Facebook,
  Mail,
  Music,
  Video,
  MessageCircle,
  Calendar,
  Disc,
  Square,
  Layout,
  PenTool,
  Globe,
  ShoppingBag,
  MapPin,
  Phone,
  Star,
  Send,
  Terminal,
  Heart,
  Sparkles,
  Recycle,
  Utensils,
  Book,
  ShoppingCart,
  Cpu,
  Zap,
  Box,
  Radio,
  Twitch,
  Gamepad2,
  Pencil,
  Edit3,
  Trash2,
} from "lucide-react";

interface DynamicThemeRendererProps {
  profileData: ProfileData;
  themeId: string;
  editMode?: boolean;
  onEdit?: (field: string, type: string, label: string, value: any) => void;
}

// Edit button component for inline editing
const EditButton: React.FC<{
  onClick: () => void;
  tooltip?: string;
}> = ({ onClick, tooltip = "Editar" }) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
    className="absolute -top-2 -right-2 z-20 p-1.5 bg-white rounded-full shadow-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-400 transition-all opacity-0 group-hover:opacity-100"
    title={tooltip}
    aria-label={tooltip}
  >
    <Pencil className="w-3 h-3 text-slate-700" />
  </button>
);

// This component dynamically renders each theme with updated data
export function DynamicThemeRenderer({
  profileData,
  themeId,
  editMode = false,
  onEdit,
}: DynamicThemeRendererProps) {
  const { name, bio, photoUrl, buttons, socials } = profileData;

  const handleEdit = (
    field: string,
    type: string,
    label: string,
    value: any
  ) => {
    if (onEdit) {
      onEdit(field, type, label, value);
    }
  };

  // Get icon component for social platform
  const getSocialIcon = (platform: string, size: number = 20) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={size} />;
      case "twitter":
        return <Twitter size={size} />;
      case "youtube":
        return <Youtube size={size} />;
      case "linkedin":
        return <Linkedin size={size} />;
      case "facebook":
        return <Facebook size={size} />;
      case "spotify":
        return <Music size={size} />;
      case "tiktok":
        return <Video size={size} />;
      case "whatsapp":
        return <MessageCircle size={size} />;
      default:
        return <Instagram size={size} />;
    }
  };

  // Render Activist Theme
  if (themeId === "activist") {
    return (
      <div className="min-h-screen w-full bg-white text-slate-800 flex flex-col items-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Profile Image - Editable */}
          <div className="mt-14 mb-6 relative group">
            <img
              src={photoUrl}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-50"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-xl font-bold tracking-tight text-emerald-900">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          {/* Bio - Editable */}
          <div className="relative group mt-2">
            <p className="text-sm text-slate-500 text-center max-w-[260px] leading-relaxed">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-8 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each with edit pencil */}
          <div className="w-full flex flex-col gap-3 mt-4">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all p-4 rounded-2xl flex items-center gap-4 group"
                  data-edit-key={`buttons[${i}]`}
                >
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-tight">
                      {button.label}
                    </span>
                    {button.subtext && (
                      <span className="text-xs text-slate-400">
                        {button.subtext}
                      </span>
                    )}
                  </div>
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-16 w-full pt-8 border-t border-slate-100 flex justify-center gap-10">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {getSocialIcon(social.platform, 22)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Artist Theme
  if (themeId === "artist") {
    return (
      <div className="min-h-screen w-full bg-zinc-900 text-zinc-100 flex flex-col items-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-12 mb-6 relative group">
            <img
              src={photoUrl}
              className="w-28 h-28 rounded-full grayscale hover:grayscale-0 transition-all duration-700 object-cover border border-zinc-700"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-3xl font-light tracking-[0.2em] uppercase">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          <div className="h-[1px] w-12 bg-purple-500 my-4"></div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-xs text-zinc-400 text-center tracking-wider italic">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-10 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors text-sm"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full flex flex-col gap-4 mt-12">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-zinc-700 hover:border-purple-500 hover:bg-zinc-800 transition-all py-4 px-6 rounded-full flex justify-between items-center"
                  data-edit-key={`buttons[${i}]`}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium tracking-tight">
                      {button.label}
                    </span>
                    {button.subtext && (
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest">
                        {button.subtext}
                      </span>
                    )}
                  </div>
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="flex gap-8 mt-14">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  {getSocialIcon(social.platform, 20)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Athlete Theme
  if (themeId === "athlete") {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col items-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-10 mb-8 relative group">
            <img
              src={photoUrl}
              className="w-32 h-32 rounded-full border-2 border-blue-500 p-1 object-cover"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-sm text-slate-400 text-center mt-2 max-w-[280px] font-medium">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-8 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-sm"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full flex flex-col gap-3 mt-10">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-500 transition-colors p-4 rounded-lg flex flex-col items-center text-center"
                  data-edit-key={`buttons[${i}]`}
                >
                  <span className="font-bold flex items-center gap-2">
                    {button.label}
                  </span>
                  {button.subtext && (
                    <span className="text-[10px] opacity-80 uppercase tracking-widest mt-1 font-bold">
                      {button.subtext}
                    </span>
                  )}
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="flex gap-4 mt-12">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 rounded-lg hover:text-blue-400 transition-colors"
                >
                  {getSocialIcon(social.platform, 20)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <span className="mt-16 text-[10px] opacity-20 font-bold tracking-[0.3em]">
            ATHLETE CORE
          </span>
        </div>
      </div>
    );
  }

  // Render AltMusic Theme
  if (themeId === "altmusic") {
    return (
      <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-14 mb-8 relative group">
            <div className="absolute -top-3 -left-3 w-full h-full border border-zinc-700"></div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-zinc-500 opacity-20"></div>
            <img
              src={photoUrl}
              className="w-36 h-44 object-cover grayscale brightness-75 contrast-125 border border-white/10 relative z-10"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-1 text-white">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mb-12 border-b border-zinc-800 pb-2">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-8 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-zinc-200 transition-colors text-sm font-bold"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full flex flex-col gap-2">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-5 flex items-center justify-between transition-all ${
                    i === 0
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800"
                  }`}
                  data-edit-key={`buttons[${i}]`}
                >
                  <span
                    className={`${
                      i === 0
                        ? "font-black uppercase text-sm italic"
                        : "font-bold uppercase text-xs tracking-widest"
                    }`}
                  >
                    {button.label}
                  </span>
                  {i === 0 ? (
                    <Calendar size={18} strokeWidth={3} />
                  ) : (
                    <Music size={18} />
                  )}
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 flex items-center gap-4 opacity-10">
            <div className="h-[1px] w-12 bg-white"></div>
            <Disc size={24} className="animate-[spin_4s_linear_infinite]" />
            <div className="h-[1px] w-12 bg-white"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render Architect Theme
  if (themeId === "architect") {
    return (
      <div className="min-h-screen w-full bg-white text-black flex flex-col items-center p-10 font-sans tracking-tight">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-14 mb-6 relative group">
            <img
              src={photoUrl}
              className="w-24 h-24 rounded-none grayscale object-cover"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-xl font-bold uppercase tracking-[0.2em]">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-sm opacity-75 text-center mt-2">{bio}</p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-14 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-none shadow-md hover:bg-zinc-800 transition-colors text-sm"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full flex flex-col gap-0 mt-16 border-t border-black">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-black rounded-none py-6 px-2 hover:bg-zinc-100 flex items-center justify-between"
                  data-edit-key={`buttons[${i}]`}
                >
                  <span className="text-sm font-medium">{button.label}</span>
                  <Layout size={16} />
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="flex gap-12 mt-20 grayscale opacity-40">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {getSocialIcon(social.platform, 20)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Business Theme
  if (themeId === "business") {
    return (
      <div className="min-h-screen w-full bg-[#FCF8F4] text-[#4A2C2A] flex flex-col items-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-10 mb-6 relative group">
            <img
              src={photoUrl}
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg shadow-orange-900/5"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-2xl font-serif font-bold text-center">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          <div className="flex items-center gap-1 mt-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={12}
                className="fill-orange-400 text-orange-400"
              />
            ))}
            <span className="text-[10px] font-bold opacity-60 ml-1">
              (4.9/5.0)
            </span>
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-xs opacity-75 text-center px-4 leading-relaxed font-medium">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-8 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-[#7B3F00] text-white rounded-2xl shadow-md hover:bg-[#5A2E00] transition-colors text-sm"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full space-y-3 mt-10">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-4 rounded-2xl flex items-center ${
                    i === 0
                      ? "bg-[#7B3F00] text-white shadow-lg shadow-orange-900/20 justify-between"
                      : "bg-white border border-[#E8D9CE] hover:bg-[#F3E6DB] gap-3"
                  } transition-colors`}
                  data-edit-key={`buttons[${i}]`}
                >
                  <div className="flex items-center gap-3">
                    {i === 0 && (
                      <div className="bg-white/20 p-2 rounded-xl">
                        <ShoppingBag size={18} />
                      </div>
                    )}
                    {i > 0 && (
                      <div className="text-[#7B3F00]">
                        <Star size={18} />
                      </div>
                    )}
                    <span className="font-bold text-sm">{button.label}</span>
                  </div>
                  {i === 0 && (
                    <span className="text-[10px] font-bold opacity-60 bg-black/10 px-2 py-1 rounded-md">
                      ABERTO
                    </span>
                  )}
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="flex items-center gap-8 mt-12 mb-8">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7B3F00]/60 hover:text-[#7B3F00]"
                >
                  {getSocialIcon(social.platform, 20)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Creator Theme
  if (themeId === "creator") {
    return (
      <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col items-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-12 mb-6 relative group">
            <div className="p-1 rounded-2xl bg-indigo-100">
              <img
                src={photoUrl}
                className="w-24 h-24 rounded-xl object-cover shadow-sm"
                alt={name}
              />
            </div>
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-xl font-bold flex items-center gap-2">
              {name}{" "}
              <span className="bg-indigo-600 text-[10px] text-white px-2 py-0.5 rounded-full uppercase">
                Pro
              </span>
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-sm text-slate-500 text-center mt-2 font-medium">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-8 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-colors text-sm"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full grid grid-cols-1 gap-3 mt-10">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all p-4 rounded-xl flex items-center gap-4"
                  data-edit-key={`buttons[${i}]`}
                >
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <Terminal size={18} className="text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-sm">
                      {button.label}
                    </span>
                    {button.subtext && (
                      <span className="text-[10px] text-slate-400">
                        {button.subtext}
                      </span>
                    )}
                  </div>
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="flex gap-4 mt-12 mb-10">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {getSocialIcon(social.platform, 22)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render EcoFashion Theme
  if (themeId === "ecofashion") {
    return (
      <div className="min-h-screen w-full bg-[#F4F1EA] text-[#4A3F35] flex flex-col items-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/recycled-paper.png')]"></div>

        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-12 mb-6 relative group">
            <div className="p-2 rounded-full border border-[#DED9CF]">
              <img
                src={photoUrl}
                className="w-24 h-24 rounded-full object-cover grayscale-[20%]"
                alt={name}
              />
            </div>
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-2xl font-serif font-bold italic tracking-tight text-[#3A332C]">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          <div className="flex items-center gap-2 mt-2 opacity-60">
            <Recycle size={14} />
            <p className="text-xs font-medium uppercase tracking-widest">
              Moda Circular
            </p>
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-sm opacity-80 text-center mt-4 font-medium max-w-[220px] leading-relaxed italic">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-10 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-[#8B7E66] text-white rounded-3xl shadow-md hover:bg-[#6B5E46] transition-colors text-sm"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full flex flex-col gap-4 mt-12">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white shadow-sm hover:shadow-md transition-all p-5 rounded-3xl flex items-center gap-4 border border-[#E5E1D8] group"
                  data-edit-key={`buttons[${i}]`}
                >
                  <div className="bg-[#F9F7F2] p-3 rounded-2xl group-hover:bg-[#8B7E66] group-hover:text-white transition-colors">
                    {i === 0 ? (
                      <ShoppingBag size={20} />
                    ) : i === 1 ? (
                      <Sparkles size={20} />
                    ) : (
                      <Heart size={20} />
                    )}
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm">
                      {button.label}
                    </span>
                    {button.subtext && (
                      <span className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">
                        {button.subtext}
                      </span>
                    )}
                  </div>
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="flex gap-6 mt-14 opacity-60">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {getSocialIcon(social.platform, 20)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Gourmet Theme
  if (themeId === "gourmet") {
    return (
      <div className="min-h-screen w-full bg-[#1A1A1A] text-[#E5D3B3] flex flex-col items-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-14 mb-6 relative group">
            <img
              src={photoUrl}
              className="w-28 h-28 rounded-2xl border-2 border-[#C5A059] object-cover"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-2xl font-serif font-bold">{name}</h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-sm opacity-75 text-center mt-2 max-w-[280px]">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-10 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-[#C5A059] text-black rounded-xl shadow-md hover:bg-[#D5B069] transition-colors text-sm font-bold"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full flex flex-col gap-4 mt-12">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-4 rounded-xl flex items-center gap-3 transition-colors ${
                    i === 0
                      ? "bg-[#C5A059] text-black font-bold"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                  data-edit-key={`buttons[${i}]`}
                >
                  <div>
                    {i === 0 ? (
                      <Utensils size={18} />
                    ) : i === 1 ? (
                      <Book size={18} />
                    ) : (
                      <MapPin size={18} />
                    )}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-medium">
                      {button.label}
                    </span>
                    {button.subtext && (
                      <span className="text-[10px] opacity-60">
                        {button.subtext}
                      </span>
                    )}
                  </div>
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="flex gap-8 mt-16 opacity-60">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {getSocialIcon(social.platform, 20)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Innovation Theme
  if (themeId === "innovation") {
    return (
      <div className="min-h-screen w-full bg-[#050505] text-[#00F0FF] flex flex-col items-center p-8 font-mono">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Photo - Editable */}
          <div className="mt-12 mb-8 relative group">
            <div className="absolute inset-0 border border-[#00F0FF] scale-110 opacity-30 animate-pulse"></div>
            <img
              src={photoUrl}
              className="w-28 h-28 object-cover border-2 border-[#00F0FF] relative z-10"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-xl font-black uppercase tracking-[0.3em] text-center">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-[10px] text-[#00F0FF]/70 text-center mt-4 uppercase tracking-widest max-w-[240px] leading-relaxed">
              {bio}
            </p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-10 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-[#00F0FF] text-black rounded-none shadow-md hover:bg-[#00D0DF] transition-colors text-sm font-bold uppercase"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full flex flex-col gap-4 mt-12">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full p-4 flex items-center justify-between transition-all ${
                    i === buttons.length - 1
                      ? "bg-[#00F0FF] text-black hover:scale-[1.02]"
                      : "bg-transparent border border-[#00F0FF]/40 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10"
                  }`}
                  data-edit-key={`buttons[${i}]`}
                >
                  <span className="font-bold uppercase text-xs tracking-tighter">
                    {button.label}
                  </span>
                  {i === 0 ? (
                    <ShoppingCart size={16} />
                  ) : i === 1 ? (
                    <Cpu size={16} />
                  ) : (
                    <Zap size={16} fill="currentColor" />
                  )}
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="flex gap-8 mt-16 text-[#00F0FF]/60">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00F0FF] hover:scale-125 transition-all"
                >
                  {getSocialIcon(social.platform, 20)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 opacity-20 text-[8px] tracking-[0.5em] uppercase text-center">
            Neural Interface Protocol // Active
          </div>
        </div>
      </div>
    );
  }

  // Render Streamer Theme
  if (themeId === "streamer") {
    return (
      <div className="min-h-screen w-full bg-[#0B021C] text-white flex flex-col items-center p-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-600/10 blur-[100px]"></div>

        <div className="relative z-10 w-full max-w-md flex flex-col items-center mt-8">
          {/* Photo - Editable */}
          <div className="mb-6 relative group">
            <img
              src={photoUrl}
              className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] object-cover"
              alt={name}
            />
            {editMode && (
              <EditButton
                onClick={() =>
                  handleEdit("photoUrl", "image", "Foto de Perfil", photoUrl)
                }
                tooltip="Editar foto"
              />
            )}
          </div>

          {/* Name - Editable */}
          <div className="relative group">
            <h1 className="text-2xl font-black italic uppercase tracking-tighter">
              {name}
            </h1>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("name", "text", "Nome", name)}
                tooltip="Editar nome"
              />
            )}
          </div>

          {/* Bio - Editable */}
          <div className="relative group">
            <p className="text-sm text-slate-400 text-center mt-2">{bio}</p>
            {editMode && (
              <EditButton
                onClick={() => handleEdit("bio", "textarea", "Bio", bio)}
                tooltip="Editar bio"
              />
            )}
          </div>

          {/* Buttons Toolbar */}
          {editMode && (
            <div className="w-full flex justify-center gap-2 mt-8 mb-2">
              <button
                onClick={() =>
                  handleEdit("buttons", "list", "Botões/Links", buttons)
                }
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-colors text-sm"
              >
                <Edit3 className="w-4 h-4" />
                Editar Links
              </button>
            </div>
          )}

          {/* Buttons - Each Editable */}
          <div className="w-full flex flex-col gap-3 mt-10 mb-20">
            {buttons.map((button, i) => (
              <div key={i} className="relative group">
                <a
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 border-l-4 border-purple-500 rounded-r-xl hover:bg-white/10 hover:translate-x-1 transition-all p-4 flex items-center gap-3"
                  data-edit-key={`buttons[${i}]`}
                >
                  <Gamepad2 size={18} className="text-purple-400" />
                  <div className="text-left">
                    <span className="block font-semibold text-sm">
                      {button.label}
                    </span>
                    {button.subtext && (
                      <span className="text-[10px] text-slate-400">
                        {button.subtext}
                      </span>
                    )}
                  </div>
                </a>
                {editMode && (
                  <EditButton
                    onClick={() =>
                      handleEdit(
                        `buttons[${i}]`,
                        "link",
                        `Botão ${i + 1}`,
                        button
                      )
                    }
                    tooltip="Editar botão"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Socials - Each Editable */}
          <div className="fixed bottom-24 flex gap-8 opacity-40">
            {socials.map((social, i) => (
              <div key={i} className="relative group">
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {getSocialIcon(social.platform, 20)}
                </a>
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(
                        `socials[${i}]`,
                        "social",
                        "Rede Social",
                        social
                      );
                    }}
                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-md border border-slate-200 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Editar rede social"
                  >
                    <Pencil className="w-2.5 h-2.5 text-slate-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Generic fallback for other themes (we'll add more specific ones as needed)
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col items-center p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mt-14 mb-6">
          <img
            src={photoUrl}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-50"
            alt={name}
          />
        </div>

        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm text-slate-500 text-center mt-2 max-w-[300px]">
          {bio}
        </p>

        <div className="w-full flex flex-col gap-3 mt-12">
          {buttons.map((button, i) => (
            <a
              key={i}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-100 hover:bg-slate-200 transition-all p-4 rounded-lg text-center"
            >
              <span className="font-semibold">{button.label}</span>
              {button.subtext && (
                <span className="block text-xs text-slate-500 mt-1">
                  {button.subtext}
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="flex gap-6 mt-12">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              {getSocialIcon(social.platform, 22)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
