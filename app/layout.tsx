import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const degularDisplay = localFont({
  src: [
    {
      path: "../public/fonts/DegularDisplayDemo-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDisplayDemo-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDisplayDemo-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDisplayDemo-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDisplayDemo-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDisplayDemo-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-degular-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio L'Arbre - Studios d'enregistrement, mixage et Atmos à Paris",
  description: "Studio d'enregistrement professionnel à Paris offrant des services d'enregistrement haute fidélité, mixage, mastering et Dolby Atmos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${degularDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
