import Script from 'next/script';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://raevd.com";

export function StructuredData() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Raevd",
    "alternateName": "Raevd Web Agency",
    "url": baseUrl,
    "logo": `${baseUrl}/assets/Raevd.png`,
    "description": "Raevd is a web development agency specialized in landing page development. Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. Raevd builds high-converting landing pages and modern web experiences that make ideas clear, fast to understand, and impossible to ignore.",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Raevd Studio"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "contact@raevd.com",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/raevd",
      "https://github.com/raevd",
      "https://linkedin.com/company/raevd"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "Landing Page Development",
      "High-Converting Landing Pages",
      "SaaS Landing Page",
      "Web Development Services",
      "Modern Web Design"
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Raevd",
    "alternateName": "Raevd Web Agency",
    "url": baseUrl,
    "description": "Every great product deserves a great presentation. Raevd builds high-converting landing pages and modern web experiences that make ideas clear, fast to understand, and impossible to ignore. Specialized in landing page development, SaaS landing pages, and web development services.",
    "publisher": {
      "@type": "Organization",
      "name": "Raevd",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/Raevd.png`
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // WebPage Schema for homepage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Raevd - Landing Page Development & Web Design Agency | High-Converting Landing Pages",
    "description": "Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. Raevd builds high-converting landing pages and modern web experiences that make ideas clear, fast to understand, and impossible to ignore. Specialized in SaaS landing page development, web development services, and modern web design.",
    "url": baseUrl,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Raevd",
      "url": baseUrl
    },
    "about": {
      "@type": "Organization",
      "name": "Raevd",
      "alternateName": "Raevd Web Agency"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": `${baseUrl}/assets/Raevd.png`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Raevd",
      "alternateName": "Raevd Web Agency"
    }
  };

  // Service Schema for Landing Page Development
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Landing Page Development",
    "provider": {
      "@type": "Organization",
      "name": "Raevd",
      "alternateName": "Raevd Web Agency",
      "url": baseUrl
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    },
    "description": "Every great product deserves a great presentation. Raevd specializes in landing page development, creating high-converting landing pages and SaaS landing pages that make ideas clear, fast to understand, and impossible to ignore. Our web development services focus on modern web design and presentation excellence.",
    "name": "Landing Page Development Service",
    "category": "Web Development Services",
    "offers": {
      "@type": "Offer",
      "description": "High-converting landing page development tailored to present your product or idea effectively. Specialized in SaaS landing pages, modern web design, and web development services that make ideas impossible to ignore.",
      "category": "Web Development"
    },
    "serviceOutput": {
      "@type": "Product",
      "name": "High-Converting Landing Page",
      "description": "A landing page that makes your product or idea clear, fast to understand, and impossible to ignore"
    }
  };

  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-webpage"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="schema-service"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

