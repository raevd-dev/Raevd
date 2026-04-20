import { StaggeredText } from "../StaggeredText";
import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      data-section="manifesto"
      className="section relative flex min-h-screen w-full items-center"
    >
      <div className="grid-12 w-full px-8">
        <div className="col-span-1 self-start">
          <div className="font-mono-label text-muted-foreground">01 / Why</div>
        </div>
        <div className="col-span-9 col-start-2">
          <StaggeredText
            as="h2"
            text="Most work shouts."
            className="font-display text-[clamp(2.5rem,8vw,10rem)] text-foreground"
          />
          <StaggeredText
            as="h2"
            text="Ours operates."
            className="font-display text-[clamp(2.5rem,8vw,10rem)] text-foreground/30 italic"
            delay={0.2}
          />
        </div>

        <div className="col-span-1 col-start-2 mt-24">
          <div className="font-mono-label text-muted-foreground">Doctrine</div>
        </div>
        <div className="col-span-4 col-start-3 mt-24">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base font-light leading-relaxed text-foreground/80"
          >
            Architecture is not decoration. It is the load-bearing intelligence beneath every meaningful product. We compose with restraint — and let absence carry the weight.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
