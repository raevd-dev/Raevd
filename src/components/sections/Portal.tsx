import { motion } from "framer-motion";
import { StaggeredText } from "../StaggeredText";

export function Portal() {
  return (
    <section
      id="portal"
      data-section="portal"
      className="section relative flex min-h-screen w-full items-center"
    >
      <div className="grid-12 w-full px-8">
        <div className="col-span-1">
          <div className="font-mono-label text-muted-foreground">04 / Portal</div>
        </div>
        <div className="col-span-10 col-start-2">
          <StaggeredText
            as="h2"
            text="Open the channel."
            className="font-display text-[clamp(3rem,10vw,12rem)] text-foreground"
          />
        </div>

        <div className="col-span-4 col-start-2 mt-20">
          <div className="font-mono-label mb-3 text-muted-foreground">Direct</div>
          <a
            href="mailto:signal@raevd.studio"
            className="font-display text-3xl text-foreground transition-colors hover:text-accent"
          >
            signal@raevd.studio
          </a>
        </div>

        <div className="col-span-3 col-start-7 mt-20">
          <div className="font-mono-label mb-3 text-muted-foreground">Studio</div>
          <p className="font-light leading-relaxed text-foreground/80">
            48.8566° N<br />2.3522° E<br />Paris — Remote
          </p>
        </div>

        <div className="col-span-2 col-start-11 mt-20 text-right">
          <div className="font-mono-label mb-3 text-muted-foreground">Index</div>
          <div className="flex flex-col gap-2 text-sm font-light text-foreground/80">
            <a href="#" className="transition-colors hover:text-foreground">LinkedIn</a>
            <a href="#" className="transition-colors hover:text-foreground">Are.na</a>
            <a href="#" className="transition-colors hover:text-foreground">GitHub</a>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 mt-32 h-px origin-left bg-foreground/30"
        />
        <div className="col-span-12 mt-6 flex justify-between font-mono-label text-muted-foreground">
          <span>RAEVD © MMXXVI</span>
          <span>The Invisible Architect</span>
          <span>v1.0</span>
        </div>
      </div>
    </section>
  );
}
