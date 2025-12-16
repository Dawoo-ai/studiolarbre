import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const degularSans = localFont({
  src: [
    {
      path: "../public/fonts/DegularDemo-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDemo-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDemo-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDemo-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDemo-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularDemo-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const degularMono = localFont({
  src: [
    {
      path: "../public/fonts/DegularMonoDemo-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularMonoDemo-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularMonoDemo-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularMonoDemo-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularMonoDemo-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/DegularMonoDemo-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
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
  title: "Studio Larbre - Studio d'enregistrement mixage et mastering - Paris",
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
        className={`${degularSans.variable} ${degularMono.variable} ${degularDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
