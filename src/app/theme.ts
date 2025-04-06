import { ThemeConfig } from "antd";

export const spotifyTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1DB954",
    colorBgBase: "#121212",
    colorTextBase: "#FFFFFF",
    colorTextSecondary: "#B3B3B3",
    borderRadius: 20,
    fontFamily:
      "Circular, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
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
    },
    Typography: {
      colorTextHeading: "#FFFFFF",
      fontWeightStrong: 700,
    },
    Layout: {
      headerBg: "#121212",
      bodyBg: "#121212",
    },
  },
};
