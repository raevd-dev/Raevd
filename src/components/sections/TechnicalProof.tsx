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
      className="section relative h-screen w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 grid-12 px-8 pt-32 z-20">
        <div className="col-span-1">
          <div className="font-mono-label text-muted-foreground">03 / Proof</div>
        </div>
        <div className="col-span-9 col-start-2">
          <StaggeredText
            as="h2"
            text="Evidence in motion."
            className="font-display text-[clamp(2rem,5vw,6rem)] text-foreground"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center">
        <div ref={trackRef} className="flex flex-nowrap gap-12 pl-[20vw] pr-[20vw]">
          {cases.map((c, i) => (
            <div
              key={c.idx}
              className="relative flex h-[55vh] w-[40vw] flex-shrink-0 flex-col justify-between border border-border bg-foreground/[0.015] p-10 transition-colors hover:border-foreground/40"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono-label text-muted-foreground">{c.idx}</span>
                <span className="font-mono-label text-muted-foreground">{c.year}</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono-label text-accent">{c.scope}</span>
                <h3 className="font-display text-5xl text-foreground">{c.client}</h3>
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
