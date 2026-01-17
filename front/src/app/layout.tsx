import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { LobbyProvider } from "@/contexts/LobbyContext";
import { PlayerPreferencesProvider } from "@/contexts/PlayerPreferencesContext";
import { FloatingMatchmaking } from "@/components/shared/FloatingMatchmaking";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "For Honor Ranked - Plataforma Competitiva",
  description: "Sistema de ranqueada competitiva para For Honor",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          <SearchProvider>
            <LobbyProvider>
              <PlayerPreferencesProvider>
                {children}
                <FloatingMatchmaking />
              </PlayerPreferencesProvider>
            </LobbyProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
