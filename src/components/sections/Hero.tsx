import { motion } from "framer-motion";
import { StaggeredText } from "../StaggeredText";

export function Hero() {
  return (
    <section
      data-section="hero"
      className="section relative flex min-h-screen w-full items-center"
    >
      <div className="grid-12 w-full px-4 md:px-6 lg:px-8 pt-28 lg:pt-0">
        <div className="col-span-4 md:col-span-8 lg:col-span-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-mono-label text-muted-foreground"
          >
            00 / Resolution
          </motion.div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-10">
          <StaggeredText
            as="h1"
            text="Start. Fix."
            className="font-display text-[clamp(2.75rem,14vw,18rem)] text-foreground"
            delay={0.6}
          />
          <StaggeredText
            as="h1"
            text="Scale."
            className="font-display text-[clamp(2.75rem,14vw,18rem)] text-foreground/40 italic"
            delay={1.0}
          />
        </div>
        <div className="hidden lg:block lg:col-span-1" />
        <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-3 lg:col-start-9 mt-10 lg:mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm font-light leading-relaxed text-muted-foreground"
          >
            Do not stress about the technical side. Share your vision and we make it real through System Architecture, Custom Web Solutions, and reliable delivery.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-6 left-4 right-4 md:left-6 md:right-6 lg:bottom-8 lg:left-8 lg:right-8 grid-12"
      >
        <div className="col-span-2 md:col-span-2 lg:col-span-2 font-mono-label text-muted-foreground">
          Scroll
        </div>
        <div className="col-span-2 col-start-3 md:col-start-7 lg:col-start-11 text-right font-mono-label text-muted-foreground">
          MMXXVI
        </div>
      </motion.div>
    </section>
  );
}
