import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/raevd-logo.png";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 grid-12 px-8 py-6 backdrop-blur-sm"
    >
      <div className="col-span-2">
        <a href="#" className="inline-flex items-center gap-2">
          <img
            src={logo}
            alt="RAEVD"
            className="h-7 w-auto"
          />
        </a>
      </div>
      <div className="col-span-8 flex items-center justify-center gap-12">
        <a href="#manifesto" className="font-mono-label text-brand/70 transition-colors hover:text-brand">
          Manifesto
        </a>
        <a href="#matrix" className="font-mono-label text-brand/70 transition-colors hover:text-brand">
          Matrix
        </a>
        <a href="#proof" className="font-mono-label text-brand/70 transition-colors hover:text-brand">
          Proof
        </a>
      </div>
      <div className="col-span-2 flex items-center justify-end gap-6">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="font-mono-label text-brand/70 transition-colors hover:text-brand"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <a href="#portal" className="font-mono-label text-brand">
          Portal →
        </a>
      </div>
    </motion.nav>
  );
}
