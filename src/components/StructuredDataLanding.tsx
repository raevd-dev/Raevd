import Script from 'next/script';

const baseUrl = process.env.NEXT_PUBLIC_LANDING_URL || "https://landing.raevd.com";
const parentBrand = process.env.NEXT_PUBLIC_BASE_URL || "https://raevd.com";

export function StructuredDataLanding() {
  // WebPage Schema for landing page
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "High-Converting Landing Page Development | Raevd Landing Page Agency",
    "description": "Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. Raevd builds high-converting landing pages and SaaS landing pages that make ideas clear, fast to understand, and impossible to ignore. Professional landing page development services by Raevd web agency.",
    "url": baseUrl,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Raevd Landing",
      "url": baseUrl,
      "publisher": {
        "@type": "Organization",
        "name": "Raevd",
        "alternateName": "Raevd Web Agency",
        "url": parentBrand
      }
    },
    "about": {
      "@type": "Organization",
      "name": "Raevd",
      "alternateName": "Raevd Web Agency",
      "url": parentBrand
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": `${parentBrand}/assets/Raevd.png`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Raevd",
          "item": parentBrand
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Landing Page Development",
          "item": baseUrl
        }
      ]
    },
    "mainEntity": {
      "@type": "Service",
      "name": "Landing Page Development",
      "provider": {
        "@type": "Organization",
        "name": "Raevd",
        "alternateName": "Raevd Web Agency"
      }
    }
  };

  // Service Schema for Landing Page Development (specific to landing subdomain)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Landing Page Development",
    "provider": {
      "@type": "Organization",
      "name": "Raevd",
      "url": parentBrand,
      "alternateName": "Raevd Web Agency"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    },
    "description": "Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. Raevd specializes in landing page development, creating high-converting landing pages and SaaS landing pages that make ideas clear, fast to understand, and impossible to ignore. Our web development services focus on modern web design and presentation excellence.",
    "name": "Landing Page Development Service",
    "category": "Web Development Services",
    "offers": {
      "@type": "Offer",
      "description": "High-converting landing page development tailored to present your product or idea effectively. Services include SaaS landing page development, landing page design, conversion optimization, responsive development, and performance optimization. Every great product deserves a great presentation - Raevd ensures your ideas don't get lost.",
      "category": "Web Development",
      "itemOffered": {
        "@type": "Service",
        "name": "Landing Page Development"
      }
    },
    "serviceOutput": {
      "@type": "Product",
      "name": "High-Converting Landing Page",
      "description": "A landing page that makes your product or idea clear, fast to understand, and impossible to ignore"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Landing Page Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Converting Landing Page Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SaaS Landing Page Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Conversion Optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Modern Web Design"
          }
        }
      ]
    }
  };

  // Organization reference (points to parent)
  const organizationReference = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Raevd",
    "alternateName": "Raevd Web Agency",
    "url": parentBrand,
    "description": "Raevd is a web development agency specialized in landing page development. Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. Raevd builds high-converting landing pages and modern web experiences that make ideas clear, fast to understand, and impossible to ignore. This landing page service is part of the Raevd web agency ecosystem.",
    "knowsAbout": [
      "Landing Page Development",
      "High-Converting Landing Pages",
      "SaaS Landing Page",
      "Web Development Services",
      "Modern Web Design"
    ]
  };

  return (
    <>
      <Script
        id="schema-landing-webpage"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="schema-landing-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="schema-landing-organization"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationReference) }}
      />
    </>
  );
}

