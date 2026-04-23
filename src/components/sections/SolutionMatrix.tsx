import { motion } from "framer-motion";
import { StaggeredText } from "../StaggeredText";

const services = [
  {
    id: "01",
    title: "Systems",
    desc: "Design infrastructure for organizations that ship at frequency.",
  },
  {
    id: "02",
    title: "Interface",
    desc: "Surfaces that disappear into use. Interaction without ornament.",
  },
  {
    id: "03",
    title: "Signal",
    desc: "Brand languages calibrated for institutional permanence.",
  },
];

export function SolutionMatrix() {
  return (
    <section
      id="matrix"
      data-section="matrix"
      className="section relative flex min-h-screen w-full items-center"
    >
      <div className="grid-12 w-full px-4 md:px-6 lg:px-8 py-24 lg:py-0">
        <div className="col-span-4 md:col-span-8 lg:col-span-1">
          <div className="font-mono-label text-muted-foreground">02 / Matrix</div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-2 mt-4 lg:mt-0">
          <StaggeredText
            as="h2"
            text="Three disciplines."
            className="font-display text-[clamp(2.5rem,7vw,8rem)] text-foreground"
          />
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2 mt-12 lg:mt-24 flex flex-col">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group grid-12 cursor-default border-t border-border py-6 lg:py-10 transition-colors hover:border-foreground/40"
            >
              <div className="col-span-1 md:col-span-1 lg:col-span-1 font-mono-label text-muted-foreground transition-colors group-hover:text-accent">
                {s.id}
              </div>
              <div className="col-span-3 md:col-span-3 lg:col-span-4">
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground transition-transform duration-700 group-hover:translate-x-2">
                  {s.title}
                </h3>
              </div>
              <div className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-5 lg:col-start-7 mt-4 lg:mt-0">
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
              <div className="hidden lg:block lg:col-span-1 text-right font-mono-label text-muted-foreground">
                →
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
