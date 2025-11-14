import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_LANDING_URL || "https://landing.raevd.com";
const parentBrand = process.env.NEXT_PUBLIC_BASE_URL || "https://raevd.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "High-Converting Landing Page Development | Raevd Landing Page Agency",
    template: "%s | Raevd Landing"
  },
  description: "Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. Raevd builds high-converting landing pages and SaaS landing pages that make ideas clear, fast to understand, and impossible to ignore. Professional landing page development services by Raevd web agency, part of the Raevd ecosystem specializing in modern web design.",
  keywords: [
    "landing page development",
    "high-converting landing pages",
    "SaaS landing page",
    "Raevd landing page",
    "landing page agency",
    "conversion optimization",
    "landing page design",
    "Raevd web agency",
    "custom landing pages",
    "web development services",
    "modern web design",
    "landing page services",
    "Raevd"
  ],
  authors: [{ name: "Raevd Studio" }],
  creator: "Raevd Studio",
  publisher: "Raevd Studio",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Raevd Landing",
    title: "High-Converting Landing Page Development | Raevd Landing Page Agency",
    description: "Every great product deserves a great presentation. Raevd builds high-converting landing pages and SaaS landing pages that make ideas clear, fast to understand, and impossible to ignore. Professional landing page development services by Raevd web agency.",
    images: [
      {
        url: `${parentBrand}/assets/Raevd.png`,
        width: 1200,
        height: 630,
        alt: "Raevd Landing Page Development Services - High-Converting Landing Pages",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Converting Landing Page Development | Raevd Landing Page Agency",
    description: "Every great product deserves a great presentation. Raevd builds high-converting landing pages and SaaS landing pages that make ideas clear, fast to understand, and impossible to ignore.",
    images: [`${parentBrand}/assets/Raevd.png`],
    creator: "@raevd",
    site: "@raevd",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "Landing Page Development",
  classification: "Landing Page Agency",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

