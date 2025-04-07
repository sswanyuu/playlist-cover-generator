import { ThemeConfig } from "antd";

export const spotifyTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1DB954",
    colorBgBase: "#000000",
    colorTextBase: "#FFFFFF",
    colorTextSecondary: "#B3B3B3",
    borderRadius: 20,
    fontFamily:
      "Circular, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    colorPrimaryBg: "rgba(29, 185, 84, 0.1)",
    colorPrimaryBgHover: "rgba(29, 185, 84, 0.2)",
    colorPrimaryBorder: "rgba(29, 185, 84, 0.3)",
    colorPrimaryHover: "#1ed760",
    colorPrimaryActive: "#1aa34a",
  },
  components: {
    Button: {
      colorPrimary: "#1DB954",
      colorPrimaryHover: "#1ed760",
      colorPrimaryActive: "#1aa34a",
      borderRadius: 20,
      paddingContentHorizontal: 24,
      paddingContentVertical: 12,
      fontSize: 16,
      fontWeight: 700,
      boxShadow: "0 0 20px rgba(29, 185, 84, 0.3)",
    },
    Typography: {
      colorTextHeading: "#FFFFFF",
      fontWeightStrong: 700,
    },
    Layout: {
      headerBg: "#000000",
      bodyBg: "#000000",
    },
  },
};
