import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins each .section[data-section] to the viewport, fading the previous one out
 * (opacity 0) while the next one scales up (0.9 -> 1.0) and fades in.
 * Skips horizontal-scroll sections that manage their own pin (data-section="proof").
 */
export function SectionPinner() {
  useEffect(() => {
    // Skip pin/fade choreography on mobile/tablet — keeps content readable
    // and avoids opacity glitches on touch scroll.
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".section[data-section]");

      sections.forEach((section) => {
        if (section.dataset.section === "proof") return;
        if (section.dataset.section === "contact") return;

        gsap.fromTo(
          section,
          { opacity: 0.0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );

        gsap.to(section, {
          opacity: 0,
          ease: "power2.in",
          scrollTrigger: {
            trigger: section,
            start: "bottom 70%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
