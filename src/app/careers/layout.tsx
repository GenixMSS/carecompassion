import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical Careers & Job Application | RN, LPN, CNA & Home Caregivers",
  description:
    "Apply online to join Genix Medical Staffing Services across 11 Metro Atlanta counties. Competitive weekly pay, flexible PRN and full-time shifts for RNs, LPNs, CNAs, and compassionate home caregivers.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at Genix Medical Staffing Services | Apply Online",
    description:
      "Join our clinical network of RNs, LPNs, CNAs, and home caregivers across Lithia Springs and Metro Atlanta. Upload your resume and apply in minutes.",
    url: "https://genixmss.com/careers",
    images: ["/assets/services/Genix M Staffing S Skilled Nurse Image 3.webp"],
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

