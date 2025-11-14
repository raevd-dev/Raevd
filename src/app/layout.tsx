import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://raevd.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Raevd - Landing Page Development & Web Design Agency | High-Converting Landing Pages",
    template: "%s | Raevd - Web Development Agency"
  },
  description: "Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. Raevd builds high-converting landing pages and modern web experiences that make ideas clear, fast to understand, and impossible to ignore. Specialized in SaaS landing page development, web development services, and modern web design by Raevd web agency.",
  keywords: [
    "Raevd",
    "Raevd web agency",
    "landing page development",
    "high-converting landing pages",
    "SaaS landing page",
    "web development services",
    "modern web design",
    "landing page agency",
    "web development agency",
    "Raevd web development",
    "custom landing pages",
    "conversion optimization",
    "web design services",
    "Raevd studio"
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
    siteName: "Raevd",
    title: "Raevd - Landing Page Development & Web Design Agency | High-Converting Landing Pages",
    description: "Every great product deserves a great presentation. Raevd builds high-converting landing pages and modern web experiences that make ideas clear, fast to understand, and impossible to ignore. Specialized in SaaS landing page development and web development services.",
    images: [
      {
        url: `${baseUrl}/assets/Raevd.png`,
        width: 1200,
        height: 630,
        alt: "Raevd - Landing Page Development & Web Design Agency",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raevd - Landing Page Development & Web Design Agency",
    description: "Every great product deserves a great presentation. Raevd builds high-converting landing pages and modern web experiences that make ideas clear, fast to understand, and impossible to ignore.",
    images: [`${baseUrl}/assets/Raevd.png`],
    creator: "@raevd",
    site: "@raevd",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "Web Development",
  classification: "Web Development Agency",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased font-sans`}>
        <ClientErrorBoundary>
          <StructuredData />
          {children}
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
