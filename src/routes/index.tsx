import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SolutionMatrix } from "@/components/sections/SolutionMatrix";
import { TechnicalProof } from "@/components/sections/TechnicalProof";
import { Contact } from "@/components/sections/Contact";
import { Portal } from "@/components/sections/Portal";
import { SectionPinner } from "@/components/SectionPinner";

const MorphingWireframe = lazy(() =>
  import("@/components/MorphingWireframe").then((m) => ({ default: m.MorphingWireframe })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RAEVD — Start, Fix, and Scale with Confidence" },
      {
        name: "description",
        content:
          "RAEVD is a technical partner for System Architecture, Custom Web Solutions, and Minimalist Design. Founded by Raed ElMajdoub to help teams start right, fix what is broken, and scale with reliable execution.",
      },
      { property: "og:title", content: "RAEVD — Start, Fix, and Scale with Confidence" },
      {
        property: "og:description",
        content:
          "System Architecture, Custom Web Solutions, and Minimalist Design for founders and businesses that need reliable digital resolution.",
      },
      { name: "keywords", content: "System Architecture, Custom Web Solutions, Minimalist Design, Technical Partner, Raed ElMajdoub, Raed Elmajdoub, web performance optimization, digital architecture" },
    ],
  }),
});

function Index() {
  return (
    <main className="relative bg-background text-foreground noise">
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 z-10 opacity-40">
        <Suspense fallback={null}>
          <MorphingWireframe />
        </Suspense>
      </div>
      <Navigation />
      <SectionPinner />
      <div className="relative z-20">
        <Hero />
        <Manifesto />
        <SolutionMatrix />
        <TechnicalProof />
        <Contact />
        <Portal />
      </div>
    </main>
  );
}
