import { motion } from "framer-motion";
import { StaggeredText } from "../StaggeredText";

export function Hero() {
  return (
    <section
      data-section="hero"
      className="section relative flex min-h-screen w-full items-center"
    >
      <div className="grid-12 w-full px-8">
        <div className="col-span-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-mono-label text-muted-foreground"
          >
            00 / Resolution
          </motion.div>
        </div>
        <div className="col-span-10">
          <StaggeredText
            as="h1"
            text="The invisible"
            className="font-display text-[clamp(4rem,14vw,18rem)] text-foreground"
            delay={0.6}
          />
          <StaggeredText
            as="h1"
            text="architect."
            className="font-display text-[clamp(4rem,14vw,18rem)] text-foreground/40 italic"
            delay={1.0}
          />
        </div>
        <div className="col-span-1" />
        <div className="col-span-3 col-start-9 mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm font-light leading-relaxed text-muted-foreground"
          >
            We design the systems you never see. Silent infrastructure for the loudest brands of the next decade.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-8 right-8 grid-12"
      >
        <div className="col-span-2 font-mono-label text-muted-foreground">
          Scroll
        </div>
        <div className="col-span-2 col-start-11 text-right font-mono-label text-muted-foreground">
          MMXXVI
        </div>
      </motion.div>
    </section>
  );
}
