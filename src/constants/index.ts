// =============================================================================
// BUSINESS LOGIC CONSTANTS
// =============================================================================

export const LIMITS = {
  MAX_SELECTION_COUNT: 10,
  INITIAL_DISPLAY_COUNT: 5,
  MAX_ATTEMPTS: 10,
  IMAGE_COMPRESSION_QUALITY: 0.8,
  CANVAS_SIZE: 300,
} as const;

// =============================================================================
// API CONFIGURATION
// =============================================================================

export const API = {
  LEONARDO_BASE_URL: "https://cloud.leonardo.ai/api/rest/v1/generations",
  SPOTIFY_BASE_URL: "https://api.spotify.com/v1",
} as const;

// =============================================================================
// UI DIMENSIONS
// =============================================================================

export const SIZES = {
  HEADER_HEIGHT: 32,
  STEP_ICON_LARGE: 48,
  STEP_ICON_SMALL: 32,
  COVER_PREVIEW_LARGE: 300,
  COVER_PREVIEW_MEDIUM: 250,
  COVER_PREVIEW_SMALL: 200,
  HISTORY_ITEM_MOBILE: 80,
  HISTORY_ITEM_DESKTOP: 100,
  BADGE_HEIGHT: 32,
} as const;

// =============================================================================
// SPACING SYSTEM
// =============================================================================

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  XXL: 32,
  XXXL: 48,
  XXXXL: 64,
} as const;

// =============================================================================
// Z-INDEX LAYERS
// =============================================================================

export const Z_INDEX = {
  HEADER: 1000,
  FLOATING_NAV: 1000,
  MODAL: 2000,
  TOOLTIP: 3000,
} as const;

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const RADIUS = {
  SM: 6,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 20,
  ROUND: 999,
} as const;

// =============================================================================
// TYPOGRAPHY SIZES
// =============================================================================

export const FONT_SIZES = {
  XS: "11px",
  SM: "12px",
  BASE: "14px",
  MD: "16px",
  LG: "18px",
  XL: "20px",
  XXL: "24px",
  XXXL: "32px",
  HERO: "48px",
  MEGA: "64px",
} as const;

// =============================================================================
// ANIMATION DURATIONS
// =============================================================================

export const ANIMATIONS = {
  FAST: "0.2s",
  NORMAL: "0.3s",
  SLOW: "0.5s",
  GLOW_DURATION: "1.2s",
  TRANSFORM_DURATION: "0.5s",
} as const;

// =============================================================================
// GRID SYSTEM
// =============================================================================

export const GRID = {
  STYLE_CARD_MIN_WIDTH: "140px",
  HISTORY_CARD_MIN_WIDTH_DESKTOP: "120px",
  HISTORY_CARD_MIN_WIDTH_MOBILE: "100px",
  MAX_CONTENT_WIDTH: "1200px",
  MAX_DESCRIPTION_WIDTH: "600px",
  MAX_HISTORY_ITEM_WIDTH: "200px",
} as const;

// Shadow presets moved to colors.ts for better organization

// =============================================================================
// BACKDROP FILTERS
// =============================================================================

export const BLUR = {
  SM: "blur(5px)",
  MD: "blur(10px)",
  LG: "blur(15px)",
} as const;
