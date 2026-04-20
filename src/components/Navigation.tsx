import { motion } from "framer-motion";

export function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 grid-12 px-8 py-6 mix-blend-difference"
    >
      <div className="col-span-2">
        <span className="font-display text-xl tracking-tighter text-foreground">
          RAEVD
        </span>
      </div>
      <div className="col-span-8 flex items-center justify-center gap-12">
        <a href="#manifesto" className="font-mono-label text-foreground/70 transition-colors hover:text-foreground">
          Manifesto
        </a>
        <a href="#matrix" className="font-mono-label text-foreground/70 transition-colors hover:text-foreground">
          Matrix
        </a>
        <a href="#proof" className="font-mono-label text-foreground/70 transition-colors hover:text-foreground">
          Proof
        </a>
      </div>
      <div className="col-span-2 flex justify-end">
        <a href="#portal" className="font-mono-label text-foreground">
          Portal →
        </a>
      </div>
    </motion.nav>
  );
}
