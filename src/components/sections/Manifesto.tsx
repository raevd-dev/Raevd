import { StaggeredText } from "../StaggeredText";
import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      data-section="manifesto"
      className="section relative flex min-h-screen w-full items-center"
    >
      <div className="grid-12 w-full px-4 md:px-6 lg:px-8 py-24 lg:py-0">
        <div className="col-span-4 md:col-span-8 lg:col-span-1 self-start">
          <div className="font-mono-label text-muted-foreground">01 / Why</div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-2 mt-4 lg:mt-0">
          <StaggeredText
            as="h2"
            text="Too much complexity?"
            className="font-display text-[clamp(2.5rem,8vw,10rem)] text-foreground"
          />
          <StaggeredText
            as="h2"
            text="We clear the path."
            className="font-display text-[clamp(2.5rem,8vw,10rem)] text-foreground/30 italic"
            delay={0.2}
          />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-1 lg:col-start-2 mt-12 lg:mt-24">
          <div className="font-mono-label text-muted-foreground">Doctrine</div>
        </div>
        <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-3 mt-2 lg:mt-24">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base font-light leading-relaxed text-foreground/80"
          >
            If you do not know where to start, need to fix a broken platform, or want to scale without risk, we guide the technical direction and execute with precision. Your vision stays in front. We handle the complexity.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
