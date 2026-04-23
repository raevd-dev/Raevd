import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StaggeredText } from "../StaggeredText";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  { idx: "CS-01", client: "Vault Capital", scope: "Treasury OS", year: "2025" },
  { idx: "CS-02", client: "North Foundry", scope: "Identity System", year: "2025" },
  { idx: "CS-03", client: "Lattice Health", scope: "Clinical Interface", year: "2024" },
  { idx: "CS-04", client: "Meridian Labs", scope: "Research Portal", year: "2024" },
];

export function TechnicalProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Disable horizontal scroll pin on mobile/tablet — fall back to vertical stack.
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proof"
      data-section="proof"
      className="section relative w-full overflow-hidden lg:h-screen"
    >
      <div className="relative lg:absolute top-0 left-0 right-0 grid-12 px-4 md:px-6 lg:px-8 pt-24 lg:pt-32 z-20">
        <div className="col-span-4 md:col-span-8 lg:col-span-1">
          <div className="font-mono-label text-muted-foreground">03 / Proof</div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-2 mt-4 lg:mt-0">
          <StaggeredText
            as="h2"
            text="Evidence in motion."
            className="font-display text-[clamp(2rem,5vw,6rem)] text-foreground"
          />
        </div>
      </div>

      {/* Desktop: horizontal pinned track. Mobile/tablet: vertical stack. */}
      <div className="lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:flex lg:items-center">
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-4 py-12 md:px-6 md:gap-8 md:py-16 lg:flex-row lg:flex-nowrap lg:gap-12 lg:px-0 lg:py-0 lg:pl-[20vw] lg:pr-[20vw]"
        >
          {cases.map((c, i) => (
            <div
              key={c.idx}
              className="relative flex w-full min-h-[60vh] flex-shrink-0 flex-col justify-between gap-8 border border-border bg-foreground/[0.015] p-6 transition-colors hover:border-foreground/40 md:p-8 lg:h-[55vh] lg:min-h-0 lg:w-[40vw] lg:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono-label text-muted-foreground">{c.idx}</span>
                <span className="font-mono-label text-muted-foreground">{c.year}</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono-label text-accent">{c.scope}</span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
                  {c.client}
                </h3>
              </div>
              <div className="flex justify-between font-mono-label text-muted-foreground">
                <span>0{i + 1} / 0{cases.length}</span>
                <span>View →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
