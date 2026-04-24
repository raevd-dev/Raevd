import { motion } from "framer-motion";
import { StaggeredText } from "../StaggeredText";

export function Portal() {
  return (
    <section
      id="portal"
      data-section="portal"
      className="section relative flex min-h-screen w-full items-center"
    >
      <div className="grid-12 w-full px-4 md:px-6 lg:px-8 py-24 lg:py-0">
        <div className="col-span-4 md:col-span-8 lg:col-span-1">
          <div className="font-mono-label text-muted-foreground">05 / Connect</div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2 mt-4 lg:mt-0">
          <StaggeredText
            as="h2"
            text="No stress."
            className="font-display text-[clamp(3rem,10vw,12rem)] text-foreground"
          />
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-2 mt-12 lg:mt-20">
          <div className="font-mono-label mb-3 text-muted-foreground">Direct</div>
          <a
            href="mailto:contact@raevd.com"
            className="font-display text-xl md:text-2xl lg:text-3xl text-foreground transition-colors hover:text-accent break-all"
          >
            contact@raevd.com
          </a>
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-7 mt-8 md:mt-12 lg:mt-20">
          <div className="font-mono-label mb-3 text-muted-foreground">Approach</div>
          <p className="font-light leading-relaxed text-foreground/80">
            Start, fix, or scale<br />Tell us your vision<br />We build it with precision
          </p>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-2 lg:col-start-11 mt-8 md:mt-12 lg:mt-20 lg:text-right">
          <div className="font-mono-label mb-3 text-muted-foreground">Index</div>
          <div className="flex flex-row lg:flex-col gap-4 lg:gap-2 text-sm font-light text-foreground/80">
            <a href="https://wa.me/21629497446" className="transition-colors hover:text-foreground">WhatsApp</a>
            <a href="https://www.upwork.com/freelancers/~0154ec2d40368dcaad" className="transition-colors hover:text-foreground">Upwork</a>
            <a href="https://www.linkedin.com/feed" className="transition-colors hover:text-foreground">LinkedIn</a>
            <a href="https://github.com/raevd-dev" className="transition-colors hover:text-foreground">GitHub</a>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-4 md:col-span-8 lg:col-span-12 mt-16 lg:mt-32 h-px origin-left bg-foreground/30"
        />
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-6 flex flex-col gap-2 md:flex-row md:justify-between font-mono-label text-muted-foreground">
          <span>RAEVD © MMXXVI</span>
          <span className="hidden md:inline">You bring the vision. We make it real.</span>
          <span>v1.0</span>
        </div>
      </div>
    </section>
  );
}
