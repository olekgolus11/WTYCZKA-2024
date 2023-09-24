import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import { LanguageModeContextProvider } from "@/contexts/LanguageModeContext";
import { SelectedSectionContextProvider } from "@/contexts/SelectedSectionContext";
import { theme } from "@/styles/muiThemeSetup";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Wtyczka",
  description: "Oficjalna strona zapisów na Wtyczkę 2023",
  keywords: ["Wtyczka", "WEEIA", "Wyjazd WEEIA", "Integracja"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo/logo-favicon.png" sizes="any" />
      <body className={`${montserrat.className} p-0 m-0 box-border`}>
        <ThemeProvider theme={theme}>
          <LanguageModeContextProvider>
            <SelectedSectionContextProvider>
              {children}
            </SelectedSectionContextProvider>
          </LanguageModeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
