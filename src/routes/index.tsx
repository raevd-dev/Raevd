import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SolutionMatrix } from "@/components/sections/SolutionMatrix";
import { TechnicalProof } from "@/components/sections/TechnicalProof";
import { Portal } from "@/components/sections/Portal";
import { SectionPinner } from "@/components/SectionPinner";

const MorphingWireframe = lazy(() =>
  import("@/components/MorphingWireframe").then((m) => ({ default: m.MorphingWireframe })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RAEVD — The Invisible Architect" },
      {
        name: "description",
        content:
          "RAEVD designs the invisible systems beneath the loudest brands of the next decade. Silent infrastructure, calibrated interfaces, lasting signal.",
      },
      { property: "og:title", content: "RAEVD — The Invisible Architect" },
      {
        property: "og:description",
        content: "Silent infrastructure for the loudest brands of the next decade.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative bg-background text-foreground noise">
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-60" />
      <Suspense fallback={null}>
        <MorphingWireframe />
      </Suspense>
      <Navigation />
      <SectionPinner />
      <div className="relative z-20">
        <Hero />
        <Manifesto />
        <SolutionMatrix />
        <TechnicalProof />
        <Portal />
      </div>
    </main>
  );
}
