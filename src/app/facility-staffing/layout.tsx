import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Facility Staffing Portal | 24–48 Hr RN, LPN & CNA Dispatch",
  description:
    "Request primary-source credentialed RNs, LPNs, CNAs, and Allied Health clinicians for hospitals, clinics, and senior living communities across Metro Atlanta.",
  alternates: {
    canonical: "/facility-staffing",
  },
  openGraph: {
    title: "Healthcare Facility Staffing Portal | Genix Medical Staffing Services",
    description:
      "92% Time-to-Fill Rate and 24–48 hour rapid clinician dispatch for hospitals, skilled nursing facilities, and clinics across Metro Atlanta.",
    url: "https://genixmss.com/facility-staffing",
    images: ["/assets/services/Genix MSS Nursing Care Image.webp"],
  },
};

export default function FacilityStaffingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

