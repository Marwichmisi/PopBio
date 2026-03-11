export const DESIGN_TOKENS = {
  colors: {
    primary: "#1A535C",
    accent: "#4ECDC4",
    surface: "#F7FFF7",
  },
  dark: {
    background: "#0a0a0a",
    foreground: "#F7FFF7",
  },
  light: {
    background: "#F7FFF7",
    foreground: "#1A535C",
  },
} as const;

export const TWITTER_MAX_CHARS = 280;
export const LINKEDIN_MAX_CHARS = 3000;

export const BIO_VARIANTS = {
  twitter: { count: 4, maxLength: TWITTER_MAX_CHARS },
  linkedin: { count: 4, maxLength: LINKEDIN_MAX_CHARS },
} as const;
