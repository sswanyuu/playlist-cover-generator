// =============================================================================
// COLOR PALETTE
// =============================================================================

// Core Brand Colors
export const BRAND = {
  SPOTIFY_GREEN: "#1DB954",
  SPOTIFY_GREEN_HOVER: "#1ED760",
  SPOTIFY_GREEN_ACTIVE: "#1AA34A",
  SPOTIFY_GREEN_LIGHT: "#389e0d",
} as const;

// Base Colors
export const BASE = {
  BLACK: "#121212",
  DARK_GRAY: "#1F1F1F",
  BORDER_GRAY: "#2A2A2A",
  MEDIUM_GRAY: "#333",
  LIGHT_GRAY: "#999999",
  PLACEHOLDER_GRAY: "#b3b3b3",
  WHITE: "#FFFFFF",
} as const;

// Text Colors
export const TEXT = {
  PRIMARY: "#FFFFFF",
  SECONDARY: "#E1E1E1",
  TERTIARY: "#C0C0DD",
  MUTED: "rgba(255, 255, 255, 0.8)",
  SUBTLE: "rgba(255, 255, 255, 0.7)",
  FADED: "rgba(255, 255, 255, 0.6)",
  VERY_FADED: "rgba(255, 255, 255, 0.3)",
  SEPARATOR: "rgba(255, 255, 255, 0.3)",
} as const;

// Status Colors
export const STATUS = {
  SUCCESS: "#52c41a",
  SUCCESS_HOVER: "#5ccc29",
  SUCCESS_ACTIVE: "#3fa00d",
  WARNING: "#FFD700",
  WARNING_ALT: "#faad14",
  ERROR: "#FF4D4F",
  INFO: "#1890ff",
  INFO_HOVER: "#40a9ff",
  INFO_ACTIVE: "#096dd9",
} as const;

// Purple Theme (for special buttons)
export const PURPLE = {
  PRIMARY: "#531dab",
  HOVER: "#722ed1",
  ACTIVE: "#401195",
  GRADIENT_START: "#667eea",
  GRADIENT_END: "#764ba2",
  LIGHT: "#7c8df8",
  MEDIUM: "#8a5fbe",
} as const;

// Background Colors with Alpha
export const BACKGROUND = {
  OVERLAY_LIGHT: "rgba(255, 255, 255, 0.02)",
  OVERLAY_MEDIUM: "rgba(255, 255, 255, 0.05)",
  OVERLAY_STRONG: "rgba(255, 255, 255, 0.1)",
  OVERLAY_VERY_STRONG: "rgba(255, 255, 255, 0.2)",

  // Glassmorphism
  GLASS_LIGHT: "rgba(255, 255, 255, 0.04)",
  GLASS_MEDIUM: "rgba(255, 255, 255, 0.05)",

  // Dark overlays
  SHADOW_LIGHT: "rgba(0, 0, 0, 0.2)",
  SHADOW_MEDIUM: "rgba(0, 0, 0, 0.4)",
  SHADOW_STRONG: "rgba(0, 0, 0, 0.5)",

  // Component specific
  HEADER: "rgb(21, 21, 21)",
  CARD_DARK: "#1a1a1a",
} as const;

// Success/Green Theme
export const SUCCESS_THEME = {
  BACKGROUND: "rgba(82, 196, 26, 0.1)",
  BACKGROUND_LIGHT: "rgba(82, 196, 26, 0.05)",
  BACKGROUND_MEDIUM: "rgba(82, 196, 26, 0.15)",
  BACKGROUND_STRONG: "rgba(82, 196, 26, 0.3)",
  BORDER: "rgba(82, 196, 26, 0.3)",
  TEXT: "rgba(82, 196, 26, 0.8)",
  TEXT_STRONG: "rgba(82, 196, 26, 0.9)",
} as const;

// Blue Theme
export const BLUE_THEME = {
  PRIMARY: "#1890ff",
  BORDER: "#1890ff",
  BACKGROUND: "rgba(24, 144, 255, 0.1)",
  TEXT: "#1890ff",
} as const;

// Special Effects Colors
export const EFFECTS = {
  GLOW_GREEN: "rgba(7, 142, 54, 0.4)",
  GLOW_GREEN_BRIGHT: "rgba(9, 255, 95, 0.7)",
  GLOW_GREEN_SOFT: "rgba(29, 185, 84, 0.3)",
  GLOW_GREEN_MEDIUM: "rgba(29, 185, 84, 0.5)",

  GLOW_BLUE: "rgba(24, 144, 255, 0.2)",
  GLOW_BLUE_MEDIUM: "rgba(24, 144, 255, 0.3)",
  GLOW_BLUE_STRONG: "rgba(24, 144, 255, 0.4)",

  GLOW_PURPLE: "rgba(102, 126, 234, 0.3)",
  GLOW_PURPLE_STRONG: "rgba(102, 126, 234, 0.4)",

  GLOW_SUCCESS: "rgba(82, 196, 26, 0.3)",
  GLOW_SUCCESS_STRONG: "rgba(82, 196, 26, 0.4)",
} as const;

// Gradient Definitions
export const GRADIENTS = {
  PURPLE: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  SUCCESS: "linear-gradient(135deg, #52c41a, #389e0d)",
  SUCCESS_BRIGHT: "linear-gradient(135deg, #5ccc29, #3fa00d)",
  BLUE: "linear-gradient(135deg, #1890ff, #096dd9)",
  BLUE_BRIGHT: "linear-gradient(135deg, #40a9ff, #0d84d9)",
  PURPLE_BRIGHT: "linear-gradient(135deg, #7c8df8, #8a5fbe)",
  HERO: "linear-gradient(45deg, #1db954, #1ed760, #ffffff)",
} as const;

// =============================================================================
// THEME COLLECTIONS
// =============================================================================

export const SPOTIFY_COLORS = {
  ...BRAND,
  ...BASE,
  ...TEXT,
  ...STATUS,
  ...BACKGROUND,
  ...EFFECTS,
} as const;

// Shadow Definitions (moved here for color organization)
export const SHADOWS = {
  SM: "0 2px 8px rgba(0, 0, 0, 0.1)",
  MD: "0 4px 12px rgba(0, 0, 0, 0.15)",
  LG: "0 8px 24px rgba(0, 0, 0, 0.3)",
  XL: "0 8px 32px rgba(0, 0, 0, 0.3)",
  XXL: "0 12px 48px rgba(0, 0, 0, 0.4)",
  FOCUS_BLUE: "0 0 0 2px rgba(24, 144, 255, 0.2)",
  GLOW_GREEN: "0 4px 16px rgba(82, 196, 26, 0.3)",
  GLOW_BLUE: "0 4px 16px rgba(24, 144, 255, 0.3)",
  GLOW_PURPLE: "0 4px 16px rgba(102, 126, 234, 0.3)",
} as const;

export const ALL_COLORS = {
  BRAND,
  BASE,
  TEXT,
  STATUS,
  PURPLE,
  BACKGROUND,
  SUCCESS_THEME,
  BLUE_THEME,
  EFFECTS,
  GRADIENTS,
  SHADOWS,
} as const;
