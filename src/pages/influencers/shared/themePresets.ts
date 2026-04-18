import type { ProfileData } from "@/temas-lintree/types";
import type { ThemeId } from "./templateMap";

type InfluencerProfilePalette = Pick<
  ProfileData,
  "backgroundStyle" | "buttonStyle" | "textColor" | "accentColor"
>;

export interface InfluencerThemeChrome {
  page: string;
  previewToolbar: string;
  previewToolbarTitle: string;
  previewToolbarMeta: string;
  previewToolbarPrimary: string;
  previewToolbarSecondary: string;
  accentText: string;
  accentTextHover: string;
  accentBg: string;
  accentSoft: string;
  accentBorder: string;
  buttonPrimary: string;
  buttonSecondary: string;
  input: string;
  focusRing: string;
}

export interface InfluencerThemePreset {
  profile: InfluencerProfilePalette;
  chrome: InfluencerThemeChrome;
}

const LIGHT_BUTTON_BASE =
  "text-white shadow-sm hover:-translate-y-[1px] active:translate-y-0";
const LIGHT_SECONDARY_BASE =
  "border bg-white text-slate-900 shadow-sm hover:-translate-y-[1px] active:translate-y-0";
const INPUT_BASE =
  "bg-white text-slate-900 placeholder:text-slate-400";

export const INFLUENCER_THEME_PRESETS: Record<
  ThemeId,
  InfluencerThemePreset
> = {
  activist: {
    profile: {
      backgroundStyle: "bg-emerald-50",
      buttonStyle:
        "bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-all duration-300",
      textColor: "text-emerald-900",
      accentColor: "bg-emerald-600",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_34%)] bg-[#f4fbf6]",
      previewToolbar:
        "border border-emerald-200/80 bg-white/92 text-emerald-950 shadow-[0_24px_60px_-36px_rgba(5,150,105,0.45)] backdrop-blur",
      previewToolbarTitle: "text-emerald-950",
      previewToolbarMeta: "text-emerald-700/80",
      previewToolbarPrimary:
        "border border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800",
      previewToolbarSecondary:
        "border border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50",
      accentText: "text-emerald-700",
      accentTextHover: "hover:text-emerald-800",
      accentBg: "bg-emerald-600",
      accentSoft: "bg-emerald-50 text-emerald-900",
      accentBorder: "border-emerald-300",
      buttonPrimary: `bg-emerald-600 hover:bg-emerald-700 ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-emerald-200 text-emerald-900 hover:bg-emerald-50`,
      input:
        `${INPUT_BASE} border-emerald-100 focus:border-emerald-500 focus:ring-emerald-500/20`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-emerald-500/20",
    },
  },
  altmusic: {
    profile: {
      backgroundStyle: "bg-zinc-950",
      buttonStyle:
        "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 rounded-none transition-all duration-300",
      textColor: "text-white",
      accentColor: "bg-white",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(24,24,27,0.12),transparent_34%)] bg-[#f5f4f4]",
      previewToolbar:
        "border border-white/10 bg-zinc-950/88 text-white shadow-[0_28px_70px_-40px_rgba(0,0,0,0.8)] backdrop-blur",
      previewToolbarTitle: "text-white",
      previewToolbarMeta: "text-zinc-400",
      previewToolbarPrimary:
        "border border-white bg-white text-black hover:bg-zinc-200",
      previewToolbarSecondary:
        "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800",
      accentText: "text-zinc-900",
      accentTextHover: "hover:text-zinc-700",
      accentBg: "bg-zinc-950",
      accentSoft: "bg-zinc-100 text-zinc-950",
      accentBorder: "border-zinc-900",
      buttonPrimary: `bg-zinc-950 hover:bg-zinc-800 ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-zinc-200 text-zinc-900 hover:bg-zinc-50`,
      input:
        `${INPUT_BASE} border-zinc-200 focus:border-zinc-500 focus:ring-zinc-500/20`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-zinc-500/20",
    },
  },
  architect: {
    profile: {
      backgroundStyle: "bg-white",
      buttonStyle:
        "border border-black text-black hover:bg-zinc-100 rounded-none transition-all duration-300",
      textColor: "text-black",
      accentColor: "bg-black",
    },
    chrome: {
      page:
        "bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:32px_32px] bg-white",
      previewToolbar:
        "border border-black/10 bg-white/96 text-black shadow-[0_24px_60px_-36px_rgba(15,23,42,0.2)] backdrop-blur",
      previewToolbarTitle: "text-black",
      previewToolbarMeta: "text-black/55",
      previewToolbarPrimary:
        "border border-black bg-black text-white hover:bg-zinc-800",
      previewToolbarSecondary:
        "border border-black/15 bg-white text-black hover:bg-zinc-100",
      accentText: "text-black",
      accentTextHover: "hover:text-zinc-700",
      accentBg: "bg-black",
      accentSoft: "bg-zinc-100 text-black",
      accentBorder: "border-black/15",
      buttonPrimary: `bg-black hover:bg-zinc-800 ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-black/15 text-black hover:bg-zinc-100`,
      input:
        `${INPUT_BASE} border-zinc-200 focus:border-black focus:ring-black/10`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-black/10",
    },
  },
  artist: {
    profile: {
      backgroundStyle: "bg-zinc-900",
      buttonStyle:
        "bg-black/60 hover:bg-black/80 border border-purple-500/50 rounded-full transition-all duration-300",
      textColor: "text-white",
      accentColor: "bg-purple-600",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.1),transparent_34%)] bg-[#faf7fd]",
      previewToolbar:
        "border border-purple-500/20 bg-zinc-950/88 text-white shadow-[0_28px_70px_-40px_rgba(88,28,135,0.55)] backdrop-blur",
      previewToolbarTitle: "text-white",
      previewToolbarMeta: "text-zinc-400",
      previewToolbarPrimary:
        "border border-purple-600 bg-purple-600 text-white hover:bg-purple-700",
      previewToolbarSecondary:
        "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800",
      accentText: "text-purple-700",
      accentTextHover: "hover:text-purple-800",
      accentBg: "bg-purple-600",
      accentSoft: "bg-purple-50 text-purple-900",
      accentBorder: "border-purple-300",
      buttonPrimary: `bg-purple-600 hover:bg-purple-700 ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-purple-200 text-purple-900 hover:bg-purple-50`,
      input:
        `${INPUT_BASE} border-purple-100 focus:border-purple-500 focus:ring-purple-500/20`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-purple-500/20",
    },
  },
  athlete: {
    profile: {
      backgroundStyle: "bg-slate-950",
      buttonStyle:
        "bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300",
      textColor: "text-white",
      accentColor: "bg-blue-500",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_34%)] bg-[#f3f6fb]",
      previewToolbar:
        "border border-blue-400/20 bg-slate-950/88 text-white shadow-[0_28px_70px_-40px_rgba(30,64,175,0.55)] backdrop-blur",
      previewToolbarTitle: "text-white",
      previewToolbarMeta: "text-slate-300/70",
      previewToolbarPrimary:
        "border border-blue-500 bg-blue-500 text-white hover:bg-blue-400",
      previewToolbarSecondary:
        "border border-slate-700 bg-slate-900 text-white hover:bg-slate-800",
      accentText: "text-blue-700",
      accentTextHover: "hover:text-blue-800",
      accentBg: "bg-blue-500",
      accentSoft: "bg-blue-50 text-blue-900",
      accentBorder: "border-blue-300",
      buttonPrimary: `bg-blue-600 hover:bg-blue-700 ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-blue-200 text-blue-900 hover:bg-blue-50`,
      input:
        `${INPUT_BASE} border-blue-100 focus:border-blue-500 focus:ring-blue-500/20`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-blue-500/20",
    },
  },
  business: {
    profile: {
      backgroundStyle: "bg-[#FCF8F4]",
      buttonStyle:
        "bg-[#7B3F00] hover:bg-[#5D2E00] text-white rounded-lg shadow-md transition-all duration-300",
      textColor: "text-[#4A2C2A]",
      accentColor: "bg-[#7B3F00]",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(123,63,0,0.12),transparent_34%)] bg-[#f7f1e8]",
      previewToolbar:
        "border border-[#E6D6C2] bg-[#FFF9F1]/94 text-[#4A2C2A] shadow-[0_24px_60px_-36px_rgba(123,63,0,0.35)] backdrop-blur",
      previewToolbarTitle: "text-[#4A2C2A]",
      previewToolbarMeta: "text-[#7A5B4A]",
      previewToolbarPrimary:
        "border border-[#7B3F00] bg-[#7B3F00] text-white hover:bg-[#5D2E00]",
      previewToolbarSecondary:
        "border border-[#D8C0A7] bg-white text-[#4A2C2A] hover:bg-[#F8EFE4]",
      accentText: "text-[#7B3F00]",
      accentTextHover: "hover:text-[#5D2E00]",
      accentBg: "bg-[#7B3F00]",
      accentSoft: "bg-[#F8EFE4] text-[#4A2C2A]",
      accentBorder: "border-[#D8C0A7]",
      buttonPrimary: `bg-[#7B3F00] hover:bg-[#5D2E00] ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-[#D8C0A7] text-[#4A2C2A] hover:bg-[#F8EFE4]`,
      input:
        `${INPUT_BASE} border-[#E6D6C2] focus:border-[#7B3F00] focus:ring-[#7B3F00]/15`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-[#7B3F00]/15",
    },
  },
  creator: {
    profile: {
      backgroundStyle: "bg-slate-50",
      buttonStyle:
        "bg-white hover:shadow-lg border border-slate-200 text-slate-800 rounded-2xl transition-all duration-300",
      textColor: "text-slate-900",
      accentColor: "bg-indigo-500",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.12),transparent_34%)] bg-slate-50",
      previewToolbar:
        "border border-indigo-200/80 bg-white/94 text-slate-900 shadow-[0_24px_60px_-36px_rgba(79,70,229,0.35)] backdrop-blur",
      previewToolbarTitle: "text-slate-900",
      previewToolbarMeta: "text-slate-500",
      previewToolbarPrimary:
        "border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700",
      previewToolbarSecondary:
        "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100",
      accentText: "text-indigo-700",
      accentTextHover: "hover:text-indigo-800",
      accentBg: "bg-indigo-600",
      accentSoft: "bg-indigo-50 text-indigo-900",
      accentBorder: "border-indigo-300",
      buttonPrimary: `bg-indigo-600 hover:bg-indigo-700 ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-slate-200 text-slate-900 hover:bg-slate-100`,
      input:
        `${INPUT_BASE} border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-indigo-500/20",
    },
  },
  ecofashion: {
    profile: {
      backgroundStyle: "bg-[#F4F1EA]",
      buttonStyle:
        "bg-[#6B7B5B] hover:bg-[#59674C] text-white rounded-2xl transition-all duration-300",
      textColor: "text-[#4A3F35]",
      accentColor: "bg-[#6B7B5B]",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(107,123,91,0.12),transparent_34%)] bg-[#F1EEE7]",
      previewToolbar:
        "border border-[#D7D0C4] bg-[#FAF7F0]/94 text-[#4A3F35] shadow-[0_24px_60px_-36px_rgba(74,63,53,0.28)] backdrop-blur",
      previewToolbarTitle: "text-[#4A3F35]",
      previewToolbarMeta: "text-[#7A6E63]",
      previewToolbarPrimary:
        "border border-[#6B7B5B] bg-[#6B7B5B] text-white hover:bg-[#59674C]",
      previewToolbarSecondary:
        "border border-[#D7D0C4] bg-white text-[#4A3F35] hover:bg-[#F4F1EA]",
      accentText: "text-[#6B7B5B]",
      accentTextHover: "hover:text-[#59674C]",
      accentBg: "bg-[#6B7B5B]",
      accentSoft: "bg-[#EEF1EA] text-[#4A3F35]",
      accentBorder: "border-[#C9D0BE]",
      buttonPrimary: `bg-[#6B7B5B] hover:bg-[#59674C] ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-[#D7D0C4] text-[#4A3F35] hover:bg-[#F4F1EA]`,
      input:
        `${INPUT_BASE} border-[#D7D0C4] focus:border-[#6B7B5B] focus:ring-[#6B7B5B]/15`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-[#6B7B5B]/15",
    },
  },
  gourmet: {
    profile: {
      backgroundStyle: "bg-[#1A1A1A]",
      buttonStyle:
        "bg-[#C5A059] hover:bg-[#D5B069] text-black rounded-xl transition-all duration-300",
      textColor: "text-[#E5D3B3]",
      accentColor: "bg-[#C5A059]",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(197,160,89,0.12),transparent_34%)] bg-[#f8f3ea]",
      previewToolbar:
        "border border-[#C5A059]/25 bg-[#151515]/92 text-[#F4E8CF] shadow-[0_28px_70px_-40px_rgba(197,160,89,0.38)] backdrop-blur",
      previewToolbarTitle: "text-[#F4E8CF]",
      previewToolbarMeta: "text-[#C5A059]/75",
      previewToolbarPrimary:
        "border border-[#C5A059] bg-[#C5A059] text-black hover:bg-[#D5B069]",
      previewToolbarSecondary:
        "border border-white/10 bg-white/5 text-[#F4E8CF] hover:bg-white/10",
      accentText: "text-[#A68243]",
      accentTextHover: "hover:text-[#8B6A34]",
      accentBg: "bg-[#C5A059]",
      accentSoft: "bg-[#F6EBD7] text-[#3B2B13]",
      accentBorder: "border-[#D9C298]",
      buttonPrimary: `bg-[#C5A059] hover:bg-[#D5B069] text-black shadow-sm hover:-translate-y-[1px] active:translate-y-0`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-[#D9C298] text-[#3B2B13] hover:bg-[#F6EBD7]`,
      input:
        `${INPUT_BASE} border-[#E7D8BC] focus:border-[#C5A059] focus:ring-[#C5A059]/15`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-[#C5A059]/15",
    },
  },
  innovation: {
    profile: {
      backgroundStyle: "bg-[#050505]",
      buttonStyle:
        "border border-[#00F0FF]/40 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 rounded-none transition-all duration-300",
      textColor: "text-[#00F0FF]",
      accentColor: "bg-[#00F0FF]",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(0,240,255,0.1),transparent_34%)] bg-[#f3fbfd]",
      previewToolbar:
        "border border-[#00F0FF]/20 bg-black/88 text-[#B2FCFF] shadow-[0_28px_70px_-40px_rgba(0,240,255,0.35)] backdrop-blur",
      previewToolbarTitle: "text-[#B2FCFF]",
      previewToolbarMeta: "text-[#00F0FF]/70",
      previewToolbarPrimary:
        "border border-[#00F0FF] bg-[#00F0FF] text-black hover:bg-[#00D0DF]",
      previewToolbarSecondary:
        "border border-[#00F0FF]/30 bg-transparent text-[#B2FCFF] hover:bg-[#00F0FF]/10",
      accentText: "text-[#00AAB5]",
      accentTextHover: "hover:text-[#008A93]",
      accentBg: "bg-[#00F0FF]",
      accentSoft: "bg-[#E0FCFF] text-[#033B40]",
      accentBorder: "border-[#7BE8F0]",
      buttonPrimary: `bg-[#00F0FF] hover:bg-[#00D0DF] text-black shadow-sm hover:-translate-y-[1px] active:translate-y-0`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-[#7BE8F0] text-[#033B40] hover:bg-[#E0FCFF]`,
      input:
        `${INPUT_BASE} border-[#B9F6FA] focus:border-[#00F0FF] focus:ring-[#00F0FF]/15`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-[#00F0FF]/15",
    },
  },
  streamer: {
    profile: {
      backgroundStyle: "bg-[#0B021C]",
      buttonStyle:
        "bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-[0_0_24px_rgba(168,85,247,0.25)] transition-all duration-300",
      textColor: "text-white",
      accentColor: "bg-purple-500",
    },
    chrome: {
      page:
        "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.1),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.08),transparent_28%)] bg-[#f8f5ff]",
      previewToolbar:
        "border border-purple-500/20 bg-[#12072A]/88 text-white shadow-[0_28px_70px_-40px_rgba(88,28,135,0.65)] backdrop-blur",
      previewToolbarTitle: "text-white",
      previewToolbarMeta: "text-purple-200/70",
      previewToolbarPrimary:
        "border border-purple-500 bg-purple-500 text-white hover:bg-purple-400",
      previewToolbarSecondary:
        "border border-white/10 bg-white/5 text-white hover:bg-white/10",
      accentText: "text-violet-700",
      accentTextHover: "hover:text-violet-800",
      accentBg: "bg-violet-600",
      accentSoft: "bg-violet-50 text-violet-900",
      accentBorder: "border-violet-300",
      buttonPrimary: `bg-violet-600 hover:bg-violet-700 ${LIGHT_BUTTON_BASE}`,
      buttonSecondary:
        `${LIGHT_SECONDARY_BASE} border-violet-200 text-violet-900 hover:bg-violet-50`,
      input:
        `${INPUT_BASE} border-violet-100 focus:border-violet-500 focus:ring-violet-500/20`,
      focusRing: "focus-visible:ring-2 focus-visible:ring-violet-500/20",
    },
  },
};

export function getInfluencerThemePreset(themeId: string): InfluencerThemePreset {
  return (
    INFLUENCER_THEME_PRESETS[themeId as ThemeId] ??
    INFLUENCER_THEME_PRESETS.creator
  );
}
