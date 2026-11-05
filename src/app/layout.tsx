import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c244b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://genixmss.com"),
  title: {
    default:
      "Genix MSS | Your Partner in Healthcare Staffing & Home Care Solutions",
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
    "In-Home Senior Care Georgia",
    "Healthcare Facility Staffing Atlanta",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://genixmss.com",
    siteName: "Genix Medical Staffing Services (GenixMSS)",
    title:
      "Genix MSS | Healthcare Staffing & Compassionate Home Care in Metro Atlanta",
    description:
      "Hospital-grade medical oversight, personalized in-home care, memory support, and 24–48 hour RN, LPN & CNA facility staffing across Lithia Springs and 11 Metro Atlanta counties.",
    images: [
      {
        url: "/assets/services/HeroImage.png",
        width: 1200,
        height: 630,
        alt: "Genix Medical Staffing Services — Home Care & Clinical Staffing in Metro Atlanta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Genix MSS | Healthcare Staffing & Compassionate Home Care in Metro Atlanta",
    description:
      "Personalized in-home care, memory support, and 24–48 hour RN, LPN & CNA facility staffing across Lithia Springs and Greater Atlanta.",
    images: ["/assets/services/HeroImage.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "HomeAndConstructionBusiness"],
  name: "Genix Medical Staffing Services",
  alternateName: "GenixMSS",
  url: "https://genixmss.com",
  logo: "https://genixmss.com/assets/services/Genix Home Health Care & Medical Staffing Clean Logo.webp",
  image: "https://genixmss.com/assets/services/HeroImage.png",
  telephone: "+1-334-497-2713",
  email: "info@genixmss.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lithia Springs",
    addressRegion: "GA",
    postalCode: "30122",
    addressCountry: "US",
  },
  areaServed: [
    "Douglas County, GA",
    "Fulton County, GA",
    "Cobb County, GA",
    "DeKalb County, GA",
    "Gwinnett County, GA",
    "Clayton County, GA",
    "Cherokee County, GA",
    "Forsyth County, GA",
    "Fayette County, GA",
    "Henry County, GA",
    "Rockdale County, GA",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nourd.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConciergeWidget />
      </body>
    </html>
  );
}

