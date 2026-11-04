import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConciergeWidget } from "@/components/ConciergeWidget";

const nourd = localFont({
  src: [
    {
      path: "../../public/fonts/nourd_light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/nourd_regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/nourd_medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/nourd_semi_bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/nourd_bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/nourd_heavy.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nourd",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Genix MSS | Your Partner in Healthcare Staffing & Home Care Solutions",
    template: "%s | Genix Medical Staffing Services",
  },
  description:
    "Genix Medical Staffing Services (GenixMSS) bridges the gap between hospital-grade medical oversight and personalized in-home support across Lithia Springs and the Greater Atlanta Metro area.",
  keywords: [
    "Genix Medical Staffing Services",
    "Genix MSS",
    "Home Care Atlanta",
    "Medical Staffing Georgia",
    "Memory Care Atlanta",
    "Alzheimer's Care Lithia Springs",
    "Hospital to Home Care",
    "RN LPN CNA Staffing Atlanta",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nourd.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConciergeWidget />
      </body>
    </html>
  );
}

