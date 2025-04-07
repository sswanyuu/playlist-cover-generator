import { ThemeConfig } from "antd";

export const spotifyTheme: ThemeConfig = {
  token: {
    // Core Branding
    colorPrimary: "#1DB954", // Spotify Green
    colorBgBase: "#121212", // Deep black background (Spotify-like)
    colorTextBase: "#FFFFFF",
    colorTextSecondary: "#C0C0DD",
    colorText: "#E1E1E1",
    colorBorder: "#2A2A2A",

    // Typography
    fontSize: 14,
    fontSizeLG: 16,
    fontFamily: "'Inter', 'Roboto', 'Segoe UI', sans-serif",

    // Rounded elements for futuristic vibe
    borderRadius: 12,

    // Card/Container Styling
    colorBgContainer: "rgba(255, 255, 255, 0.04)", // Glassmorphism-style background
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",

    // Highlight/Fancy Accent
    colorSuccess: "#00FFA3", // Futuristic teal
    colorWarning: "#FFD700", // Gold highlight
    colorError: "#FF4D4F",
  },

  components: {
    Button: {
      colorPrimary: "#1DB954",
      colorPrimaryHover: "#1ED760",
      colorPrimaryActive: "#1AA34A",
      borderRadius: 999,
      fontWeight: 600,
    },

    Card: {
      padding: 24,
      colorBgContainer: "rgba(255, 255, 255, 0.05)",
      borderRadius: 16,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    },

    Input: {
      colorBgContainer: "#1F1F1F",
      borderRadius: 10,
      colorTextPlaceholder: "#999999",
    },

    Typography: {
      // Typography.Text
      colorText: "#E1E1E1",
      fontSize: 14,

      // Typography.Title
      titleMarginBottom: 12,
    },
  },
};
