import { ThemeConfig } from "antd";
import {
  BRAND,
  BASE,
  TEXT,
  STATUS,
  BACKGROUND,
  PURPLE,
  SHADOWS,
} from "@/constants/colors";
import { RADIUS, FONT_SIZES, SPACING } from "@/constants";

export const spotifyTheme: ThemeConfig = {
  token: {
    // Core Branding
    colorPrimary: BRAND.SPOTIFY_GREEN,
    colorBgBase: BASE.BLACK,
    colorTextBase: TEXT.PRIMARY,
    colorTextSecondary: TEXT.TERTIARY,
    colorText: TEXT.SECONDARY,
    colorBorder: BASE.BORDER_GRAY,

    // Typography
    fontSize: 14,
    fontSizeLG: 16,
    fontFamily: "'Inter', 'Roboto', 'Segoe UI', sans-serif",

    // Rounded elements for futuristic vibe
    borderRadius: RADIUS.LG,

    // Card/Container Styling
    colorBgContainer: BACKGROUND.GLASS_LIGHT,
    boxShadow: SHADOWS.LG,

    // Highlight/Fancy Accent
    colorSuccess: BRAND.SPOTIFY_GREEN,
    colorWarning: STATUS.WARNING,
    colorError: STATUS.ERROR,
  },

  components: {
    Button: {
      colorPrimary: BRAND.SPOTIFY_GREEN,
      colorPrimaryHover: BRAND.SPOTIFY_GREEN_HOVER,
      colorPrimaryActive: BRAND.SPOTIFY_GREEN_ACTIVE,
      borderRadius: RADIUS.ROUND,
      fontWeight: 600,
    },

    Card: {
      padding: SPACING.XL,
      colorBgContainer: BACKGROUND.GLASS_MEDIUM,
      borderRadius: RADIUS.XL,
      boxShadow: SHADOWS.XXL,
    },

    Input: {
      colorBgContainer: BASE.DARK_GRAY,
      borderRadius: RADIUS.MD,
      colorTextPlaceholder: BASE.LIGHT_GRAY,
    },

    Typography: {
      colorText: TEXT.SECONDARY,
      fontSize: 14,
      titleMarginBottom: SPACING.MD,
    },
  },
};

// Custom theme variants
export const purpleButtonColors = {
  colorPurple: PURPLE.PRIMARY,
  colorPurpleHover: PURPLE.HOVER,
  colorPurpleActive: PURPLE.ACTIVE,
};

// Export all theme-related constants for easy access
export const THEME = {
  colors: {
    BRAND,
    BASE,
    TEXT,
    STATUS,
    BACKGROUND,
    PURPLE,
  },
  spacing: SPACING,
  radius: RADIUS,
  fontSizes: FONT_SIZES,
  shadows: SHADOWS,
} as const;
