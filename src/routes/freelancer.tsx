import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { StaggeredText } from "@/components/StaggeredText";

const MorphingWireframe = lazy(() =>
  import("@/components/MorphingWireframe").then((m) => ({ default: m.MorphingWireframe })),
);

export const Route = createFileRoute("/freelancer")({
  component: FreelancerPage,
  head: () => ({
    meta: [
      { title: "Raed ElMajdoub Solutions | SaaS & CRM Specialist" },
      {
        name: "description",
        content:
          "Raed ElMajdoub is a SaaS and CRM specialist, full stack JavaScript/TypeScript developer, and technical partner helping businesses start, fix, and scale digital products.",
      },
      {
        name: "keywords",
        content:
          "Raed ElMajdoub, Raed Elmajdoub, SaaS developer, CRM specialist, full stack JavaScript developer, TypeScript developer, technical partner",
      },
      { property: "og:title", content: "Raed ElMajdoub Solutions" },
      {
        property: "og:description",
        content:
          "SaaS and CRM specialist. Full stack JavaScript/TypeScript developer. Helping teams start, fix, and scale with confidence.",
      },
      { name: "twitter:title", content: "Raed ElMajdoub Solutions" },
      {
        name: "twitter:description",
        content:
          "SaaS & CRM specialist and full stack JavaScript/TypeScript developer.",
      },
    ],
  }),
});

function FreelancerPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground noise">
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 z-10 opacity-40">
        <Suspense fallback={null}>
          <MorphingWireframe />
        </Suspense>
      </div>

      <section className="section relative z-20 flex min-h-screen w-full items-center">
        <div className="grid-12 w-full px-4 py-24 md:px-6 lg:px-8">
          <div className="col-span-4 md:col-span-8 lg:col-span-1">
            <div className="font-mono-label text-muted-foreground">RAEVD / Freelancer</div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2 mt-4 lg:mt-0">
            <StaggeredText
              as="h1"
              text="Raed ElMajdoub"
              className="font-display text-[clamp(2.5rem,10vw,10rem)] text-foreground"
            />
            <StaggeredText
              as="h2"
              text="Solutions"
              className="font-display text-[clamp(2.5rem,10vw,10rem)] text-foreground/35 italic"
              delay={0.15}
            />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-2 mt-10 lg:mt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg font-light leading-relaxed text-foreground/80"
            >
              SaaS and CRM specialist. Full stack JavaScript/TypeScript developer.
              <br />
              I help teams start with clarity, fix unstable systems, and scale reliable products.
            </motion.p>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-2 mt-10">
            <div className="font-mono-label text-foreground/50">Focus</div>
            <p className="mt-3 text-sm md:text-base font-light leading-relaxed text-muted-foreground">
              System Architecture - Custom Web Solutions - CRM and SaaS Development - Performance and Reliability
            </p>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-2 mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-3 border border-brand px-7 py-4 font-mono-label text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              Visit RAEVD
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
