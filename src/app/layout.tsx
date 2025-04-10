import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Cover Generator",
  description:
    "Create stunning, unique cover art for your Spotify playlists with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div style={{ marginTop: "40px", padding: "24px" }}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
