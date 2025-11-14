import { Metadata } from 'next';
import { StructuredDataLanding } from '@/components/StructuredDataLanding';

const baseUrl = "https://landing.raevd.com";
const parentBrand = "https://raevd.com";

export const metadata: Metadata = {
  title: "Landing Page Development Services | Raevd Landing Page Agency",
  description: "Professional landing page development services by Raevd. We create high-converting, immersive landing pages that drive results. Part of the Raevd web agency ecosystem.",
  alternates: {
    canonical: baseUrl,
  },
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <StructuredDataLanding />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-cyan-950/20 to-black" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)'
        }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Parent Brand Reference */}
          <div className="mb-8">
            <a 
              href={parentBrand}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-cyan-400 transition-colors"
            >
              <span>← Back to</span>
              <span className="font-semibold">Raevd</span>
            </a>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Landing Page Development
          </h1>

          {/* Subheading */}
          <h2 className="text-2xl md:text-3xl text-white/80 mb-8 font-light">
            High-Converting Landing Pages by Raevd Web Agency
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. 
            Raevd builds high-converting landing pages and SaaS landing pages that make ideas clear, fast to understand, and impossible to ignore. 
            As part of the Raevd web agency ecosystem, we specialize in landing page development, modern web design, and web development services 
            that ensure your product gets the presentation it deserves.
          </p>

          {/* Services Section */}
          <section className="mt-16 text-left">
            <h2 className="text-3xl font-bold mb-8 text-center bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Landing Page Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">Custom Landing Page Design</h3>
                <p className="text-white/70">
                  Tailored landing page designs that reflect your brand and convert visitors into customers.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Conversion Optimization</h3>
                <p className="text-white/70">
                  Data-driven optimization strategies to maximize your landing page conversion rates.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-pink-400">Responsive Development</h3>
                <p className="text-white/70">
                  Fully responsive landing pages that work seamlessly across all devices and screen sizes.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">Performance Optimization</h3>
                <p className="text-white/70">
                  Lightning-fast landing pages optimized for speed, SEO, and user experience.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Ready to Launch Your Landing Page?</h2>
            <a
              href={`${parentBrand}#contact`}
              className="inline-block px-10 py-5 rounded-full bg-linear-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started with Raevd
            </a>
          </section>

          {/* AI Search Optimization - Entity-based content */}
          <div className="sr-only" aria-hidden="true">
            <p>
              Every great product deserves a great presentation. Raevd landing page development services are provided by Raevd web agency, 
              a web development agency specialized in landing page development. We are experts in high-converting landing pages, SaaS landing page development, 
              modern web design, and web development services. Without the right presentation, even powerful ideas get lost. 
              Our landing page agency specializes in creating landing pages that make ideas clear, fast to understand, and impossible to ignore. 
              Contact Raevd for professional landing page development services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

